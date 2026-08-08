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

namespace local_servicemanager\health;

/**
 * Puts an inspection into words.
 *
 * Deciding whether a schema is healthy is the inspector's job; saying what went
 * wrong is this one's. The result is stored in the log table and shown in the
 * daily report, so it reads as a sentence rather than a status code.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class status_summary {
    /**
     * Summarise what is wrong, in the order the checks ran
     *
     * @param array $details Details collected by the checks
     * @return string
     */
    public static function describe(array $details): string {
        $messages = array_filter([
            self::functions_message($details),
            self::user_message($details),
            self::service_message($details),
            self::token_message($details),
        ]);

        if (empty($messages)) {
            return 'All checks passed';
        }

        return implode('; ', $messages);
    }

    /**
     * Message for the function check, or null if there is nothing to say
     *
     * @param array $details Details collected by the checks
     * @return string|null
     */
    protected static function functions_message(array $details): ?string {
        if (empty($details['functions']['missing'])) {
            return null;
        }

        return 'Missing functions: ' . implode(', ', $details['functions']['missing']);
    }

    /**
     * Message for the user check, or null if there is nothing to say
     *
     * @param array $details Details collected by the checks
     * @return string|null
     */
    protected static function user_message(array $details): ?string {
        if (isset($details['user']) && !$details['user']['valid']) {
            return 'User issue: ' . ($details['user']['error'] ?? 'unknown');
        }

        if (!empty($details['user']['suspended'])) {
            return 'User is suspended';
        }

        return null;
    }

    /**
     * Message for the service check, or null if there is nothing to say
     *
     * @param array $details Details collected by the checks
     * @return string|null
     */
    protected static function service_message(array $details): ?string {
        if (isset($details['service']) && !$details['service']['exists']) {
            return 'Service issue: ' . ($details['service']['error'] ?? 'unknown');
        }

        if (isset($details['service']['enabled']) && !$details['service']['enabled']) {
            return 'Service is disabled';
        }

        return null;
    }

    /**
     * Message for the token check, or null if there is nothing to say
     *
     * @param array $details Details collected by the checks
     * @return string|null
     */
    protected static function token_message(array $details): ?string {
        if (isset($details['token']) && !$details['token']['exists'] && isset($details['token']['error'])) {
            return 'Token issue: ' . $details['token']['error'];
        }

        if (isset($details['token']['valid']) && !$details['token']['valid']) {
            return 'Token expired';
        }

        return null;
    }
}
