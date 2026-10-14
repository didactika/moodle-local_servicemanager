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
 * Reads the value of a YAML entry: a quoted string, a boolean, null, a number or plain text.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class yaml_scalar {
    /** Unquoted words that stand for a value rather than naming a string. */
    const KEYWORDS = [
        'true' => true,
        'yes' => true,
        'false' => false,
        'no' => false,
        'null' => null,
        '~' => null,
        '' => null,
    ];

    /**
     * Parse a YAML value (string, number, boolean, null)
     *
     * @param string $value Raw value
     * @return mixed Parsed value
     */
    public static function parse(string $value) {
        $value = trim($value);

        $unquoted = self::unquote($value);
        if ($unquoted !== null) {
            return $unquoted;
        }

        // A value that is purely a comment (e.g. key: # note) means null.
        if (strpos($value, '#') === 0) {
            return null;
        }

        return self::scalar(self::strip_comment($value));
    }

    /**
     * Contents of a quoted string, or null if the value is not quoted.
     *
     * strrpos finds the closing quote, so a trailing comment after it
     * (e.g. "value" # comment) does not break the match.
     *
     * @param string $value Trimmed value
     * @return string|null
     */
    private static function unquote(string $value): ?string {
        foreach (['"', "'"] as $quote) {
            if (strpos($value, $quote) !== 0) {
                continue;
            }

            $endquote = strrpos($value, $quote);
            if ($endquote > 0) {
                return self::unescape(substr($value, 1, $endquote - 1), $quote);
            }
        }

        return null;
    }

    /**
     * The text of a quoted string with the escapes of YAML resolved, as the yaml extension reads it.
     *
     * A double-quoted string escapes a quote and a backslash with a backslash; a single-quoted one writes a quote twice.
     *
     * @param string $text The text between the quotes.
     * @param string $quote The quote that surrounds it.
     * @return string
     */
    private static function unescape(string $text, string $quote): string {
        if ($quote === "'") {
            return str_replace("''", "'", $text);
        }
        return preg_replace_callback('/\\\\(["\\\\])/', fn($match) => $match[1], $text);
    }

    /**
     * Drop an inline comment from an unquoted value.
     *
     * Per the YAML spec a comment starts at " #" (space followed by hash).
     *
     * @param string $value Trimmed value
     * @return string
     */
    private static function strip_comment(string $value): string {
        $commentpos = strpos($value, ' #');
        if ($commentpos === false) {
            return $value;
        }

        return trim(substr($value, 0, $commentpos));
    }

    /**
     * Read an unquoted scalar as a boolean, null or number, or leave it a string.
     *
     * @param string $value Value with any comment already removed
     * @return mixed
     */
    private static function scalar(string $value) {
        $lower = strtolower($value);

        if (array_key_exists($lower, self::KEYWORDS)) {
            return self::KEYWORDS[$lower];
        }

        if (is_numeric($value)) {
            return strpos($value, '.') !== false ? (float) $value : (int) $value;
        }

        return $value;
    }
}
