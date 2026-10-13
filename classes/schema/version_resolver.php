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
 * Works out the version a schema is saved with, so that nobody gets an error for forgetting to change it.
 *
 * A schema that is new and says no version starts at 1.0.0. A change of what a schema does that does not carry a version higher
 * than every one the schema has had, or none at all, is saved with the highest one plus one in its last number (1.0.0 becomes
 * 1.0.1). A change that leaves what the schema does as it was keeps its version.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class version_resolver {
    /** @var string The version a schema starts with. */
    public const FIRST = '1.0.0';

    /** @var yaml_parser The reader of the YAML. */
    private $parser;

    /**
     * Create the resolver.
     *
     * @param yaml_parser|null $parser The reader of the YAML; a new one when it is not given.
     */
    public function __construct(?yaml_parser $parser = null) {
        $this->parser = $parser ?? new yaml_parser();
    }

    /**
     * The version that follows another: the number after the last point plus one.
     *
     * @param string $version A version, such as 1.0.9 or 2.
     * @return string The next one, such as 1.0.10 or 3.
     */
    public function next(string $version): string {
        $parts = explode('.', trim($version));
        $last = (string) array_pop($parts);
        if (preg_match('/^(\d+)/', $last, $match)) {
            $parts[] = (string) ((int) $match[1] + 1);
        } else {
            $parts[] = $last === '' ? '1' : $last;
            $parts[] = '1';
        }
        return implode('.', $parts);
    }

    /**
     * The highest version that a schema has had, the one it has now included.
     *
     * @param \stdClass $existing The record of the schema.
     * @return string The version.
     */
    public function latest(\stdClass $existing): string {
        global $DB;

        $latest = (string) $existing->version;
        $versions = $DB->get_fieldset_select('local_servicemanager_history', 'version', 'schemaid = ?', [$existing->id]);
        foreach ($versions as $version) {
            if (version_compare((string) $version, $latest, '>')) {
                $latest = (string) $version;
            }
        }
        return $latest;
    }

    /**
     * The YAML with the version that the schema is to be saved with.
     *
     * A YAML that cannot be read is given back as it is, because it is told wrong by the validation that follows.
     *
     * @param string $yaml The YAML the person sent.
     * @param \stdClass|null $existing The record of the schema that is being changed, or null for a new one.
     * @param bool $contentchanged Whether what the schema does, anything outside meta, differs from what is stored.
     * @return string The YAML to validate and store.
     */
    public function resolve(string $yaml, ?\stdClass $existing, bool $contentchanged): string {
        $declared = $this->declared($yaml);
        if ($declared === null) {
            return $yaml;
        }
        if ($existing === null) {
            return $declared === '' ? $this->with_version($yaml, self::FIRST) : $yaml;
        }
        return $contentchanged
            ? $this->for_a_change($yaml, $declared, $existing)
            : $this->for_the_same($yaml, $declared, $existing);
    }

    /**
     * The version that the YAML says it has.
     *
     * @param string $yaml The YAML.
     * @return string|null The version, empty when it says none, and null when the YAML cannot be read or has no meta section.
     */
    private function declared(string $yaml): ?string {
        try {
            $data = $this->parser->parse($yaml);
        } catch (\moodle_exception $e) {
            return null;
        }
        if (!isset($data['meta']) || !is_array($data['meta'])) {
            return null;
        }
        return trim((string) ($data['meta']['version'] ?? ''));
    }

    /**
     * The YAML of a schema whose content did not change: it keeps the version it has.
     *
     * @param string $yaml The YAML the person sent.
     * @param string $declared The version it says.
     * @param \stdClass $existing The record of the schema.
     * @return string The YAML to store.
     */
    private function for_the_same(string $yaml, string $declared, \stdClass $existing): string {
        return $declared === (string) $existing->version ? $yaml : $this->with_version($yaml, (string) $existing->version);
    }

    /**
     * The YAML of a schema whose content changed: a version higher than every one it has had, or the next one.
     *
     * @param string $yaml The YAML the person sent.
     * @param string $declared The version it says.
     * @param \stdClass $existing The record of the schema.
     * @return string The YAML to store.
     */
    private function for_a_change(string $yaml, string $declared, \stdClass $existing): string {
        $latest = $this->latest($existing);
        if ($declared !== '' && version_compare($declared, $latest, '>')) {
            return $yaml;
        }
        return $this->with_version($yaml, $this->next($latest));
    }

    /**
     * The YAML with the version of its meta section set, added when it has none.
     *
     * @param string $yaml The YAML.
     * @param string $version The version to write.
     * @return string The YAML.
     */
    public function with_version(string $yaml, string $version): string {
        $lines = preg_split('/\R/', $yaml);
        $metaat = null;
        foreach ($lines as $index => $line) {
            if ($metaat === null) {
                if (preg_match('/^meta:\s*(#.*)?$/', $line)) {
                    $metaat = $index;
                }
                continue;
            }
            if (trim($line) !== '' && !preg_match('/^\s/', $line)) {
                break;
            }
            if (preg_match('/^(\s+)version:/', $line, $match)) {
                $lines[$index] = $match[1] . 'version: "' . $version . '"';
                return implode("\n", $lines);
            }
        }
        if ($metaat === null) {
            return $yaml;
        }
        array_splice($lines, $metaat + 1, 0, ['  version: "' . $version . '"']);
        return implode("\n", $lines);
    }
}
