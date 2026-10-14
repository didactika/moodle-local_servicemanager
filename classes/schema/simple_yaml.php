<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace local_servicemanager\schema;

/**
 * Fallback YAML reader for the subset of YAML a schema uses.
 *
 * Only reached when the PHP yaml extension is missing. It handles
 * "key: value", nested maps, sequences and sequences of objects, which is
 * everything a schema file is allowed to contain.
 *
 * The reader walks the document once, keeping a stack of open containers and,
 * beside it, a stack of frames describing each one. A frame records the indent
 * its children sit at, so the reader can tell when a line has left the
 * container it was in.
 *
 * Indentation is checked as strictly as the PHP yaml extension does it: a line
 * that does not fit any open container is rejected rather than dropped, so a
 * schema means the same thing whichever parser reads it. Lenient mode keeps the
 * pre-1.0.3 behaviour, for reading schemas saved before the check existed.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class simple_yaml {
    /** Reject lines that are indented inconsistently. */
    const STRICT = 'strict';

    /** Read the indentation as releases before 1.0.3 did, which accepted what does not fit. */
    const LENIENT = 'lenient';

    /** @var bool Whether to reject lines that fit no open container. */
    protected $strict;

    /**
     * Constructor.
     *
     * @param string $mode STRICT, which rejects inconsistent indentation, or LENIENT
     */
    public function __construct(string $mode = self::STRICT) {
        $this->strict = $mode !== self::LENIENT;
    }

    /**
     * Read a YAML document.
     *
     * @param string $content YAML content
     * @return array Parsed data
     * @throws \moodle_exception If a line is indented inconsistently (strict mode only)
     */
    public function parse(string $content): array {
        $result = [];
        $stack = [&$result];
        // One frame per open container on $stack, kept in parallel.
        // type:        'map' | 'seq' | null   (null = not yet known)
        // childindent: indent at which this container's direct children sit (null until first child)
        // keyindent:   indent of the key that opened this container (-1 for the root).
        $frames = [['type' => 'map', 'childindent' => 0, 'keyindent' => -1]];

        foreach (explode("\n", $content) as $index => $line) {
            $token = $this->classify($line);
            if ($token === null) {
                continue;
            }

            $this->close_finished_containers($stack, $frames, $token, $index + 1);

            $topidx = count($stack) - 1;
            $current = &$stack[$topidx];
            if (!is_array($current)) {
                $current = [];
            }

            // Resolve the container's type the first time a child is added to it.
            if ($frames[$topidx]['childindent'] === null) {
                $frames[$topidx]['childindent'] = $token['indent'];
                $frames[$topidx]['type'] = $token['isseq'] ? 'seq' : 'map';
            }

            if ($token['isseq']) {
                $this->append_sequence_item($current, $stack, $frames, $token);
            } else {
                $this->append_mapping_entry($current, $stack, $frames, $token);
            }

            unset($current);
        }

        return $result;
    }

    /**
     * Work out what a line is, or null if it carries no data.
     *
     * A sequence item starts with "-". A mapping key is "<key>:" where the colon
     * is followed by whitespace or end of line, so a value such as
     * "moodle/role:assign" is not mistaken for a key.
     *
     * @param string $line Raw line
     * @return array|null ['line', 'isseq', 'iskey', 'indent'] or null to skip
     */
    protected function classify(string $line): ?array {
        $trimmed = trim($line);

        // Empty lines and whole-line comments.
        if ($trimmed === '' || strpos($trimmed, '#') === 0) {
            return null;
        }

        $isseq = preg_match('/^\s*-(\s|$)/', $line) === 1;
        $iskey = !$isseq && preg_match('/^\s*[^\s:#][^:]*:(\s|$)/', $line) === 1;

        // Unsupported construct (block scalar, etc.); ignore.
        if (!$isseq && !$iskey) {
            return null;
        }

        return [
            'line' => $line,
            'isseq' => $isseq,
            'iskey' => $iskey,
            'indent' => strlen($line) - strlen(ltrim($line)),
        ];
    }

    /**
     * Pop every container this line has left.
     *
     * In strict mode the line must then fit the container it lands in. If it does
     * not even fit the root, it is indented inconsistently with every block around it.
     * Lenient mode adds it to the root regardless.
     *
     * @param array $stack Open containers, by reference
     * @param array $frames Frames describing them, by reference
     * @param array $token Classified line
     * @param int $linenumber 1-based line number, for the error message
     * @throws \moodle_exception If the line fits no open container (strict mode only)
     */
    protected function close_finished_containers(array &$stack, array &$frames, array $token, int $linenumber): void {
        $depth = count($frames);

        while (!$this->belongs_to($frames[$depth - 1], $token)) {
            if ($depth === 1) {
                if (!$this->strict) {
                    return;
                }
                throw new \moodle_exception('error_yaml_indentation', 'local_servicemanager', '', $linenumber);
            }
            array_pop($stack);
            array_pop($frames);
            $depth--;
        }
    }

    /**
     * Whether a line belongs inside the container described by a frame.
     *
     * The rule mirrors block YAML: a sequence may share its key's indent, a
     * mapping key must be deeper than its key, and once a container has
     * children the line must match both their indent and the container's type.
     * A line deeper than the children has nothing to nest under, because only
     * a key with an empty value opens a new container; lenient mode accepts it.
     *
     * @param array $frame Frame of the innermost open container
     * @param array $token Classified line
     * @return bool
     */
    protected function belongs_to(array $frame, array $token): bool {
        if ($frame['childindent'] === null) {
            return $this->belongs_to_an_empty_one($frame, $token);
        }

        if (!$this->strict && $token['indent'] > $frame['childindent']) {
            return true;
        }

        if ($token['indent'] !== $frame['childindent']) {
            return false;
        }

        return ($token['isseq'] && $frame['type'] === 'seq')
            || ($token['iskey'] && $frame['type'] === 'map');
    }

    /**
     * Whether a line belongs inside a container that has been opened and has no child yet.
     *
     * @param array $frame Frame of the container
     * @param array $token Classified line
     * @return bool
     */
    private function belongs_to_an_empty_one(array $frame, array $token): bool {
        if ($token['isseq']) {
            return $token['indent'] >= $frame['keyindent'];
        }
        return $token['iskey'] && $token['indent'] > $frame['keyindent'];
    }

    /**
     * Add a sequence item to the open container.
     *
     * "- key: value" starts an object inside the sequence, so a map frame is
     * opened for any further keys belonging to it.
     *
     * @param array $current Innermost container, by reference
     * @param array $stack Open containers, by reference
     * @param array $frames Frames describing them, by reference
     * @param array $token Classified line
     */
    protected function append_sequence_item(array &$current, array &$stack, array &$frames, array $token): void {
        preg_match('/^(\s*-\s*)(.*)$/', $token['line'], $sm);
        $value = rtrim($sm[2]);

        if (!preg_match('/^([^\s:#][^:]*):(?:\s+(.*))?$/', $value, $om)) {
            $current[] = $this->parse_value($value);
            return;
        }

        $okey = rtrim($om[1]);
        $oval = isset($om[2]) ? trim($om[2]) : '';
        $innerindent = strlen($sm[1]);

        $current[] = [$okey => $this->parse_value($oval)];
        $last = array_key_last($current);
        $stack[] = &$current[$last];
        $frames[] = ['type' => 'map', 'childindent' => $innerindent, 'keyindent' => $innerindent];
    }

    /**
     * Add a mapping entry to the open container.
     *
     * @param array $current Innermost container, by reference
     * @param array $stack Open containers, by reference
     * @param array $frames Frames describing them, by reference
     * @param array $token Classified line
     */
    protected function append_mapping_entry(array &$current, array &$stack, array &$frames, array $token): void {
        preg_match('/^\s*([^\s:#][^:]*):(?:\s+(.*))?$/', $token['line'], $km);
        $key = rtrim($km[1]);
        $value = isset($km[2]) ? trim($km[2]) : '';

        if ($value === '[]') {
            $current[$key] = [];
            return;
        }

        if ($value !== '' && !str_starts_with($value, '#')) {
            $current[$key] = $this->parse_value($value);
            return;
        }

        // Empty value (or a pure inline comment) means a nested map or sequence follows.
        $current[$key] = [];
        $stack[] = &$current[$key];
        $frames[] = ['type' => null, 'childindent' => null, 'keyindent' => $token['indent']];
    }

    /**
     * Parse a YAML value (string, number, boolean, null)
     *
     * @param string $value Raw value
     * @return mixed Parsed value
     */
    public function parse_value(string $value) {
        return yaml_scalar::parse($value);
    }
}
