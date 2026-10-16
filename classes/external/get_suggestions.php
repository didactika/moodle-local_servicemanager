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

namespace local_servicemanager\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_multiple_structure;
use core_external\external_single_structure;
use core_external\external_value;
use local_servicemanager\schema\suggester;

/**
 * External web service function: what the fields of the guided form suggest for what has been typed.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class get_suggestions extends external_api {
    /**
     * Describe the parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'kind' => new external_value(PARAM_ALPHA, 'What is suggested: function, capability, plugin or user'),
            'query' => new external_value(PARAM_TEXT, 'What the person has typed', VALUE_DEFAULT, ''),
        ]);
    }

    /**
     * Suggest.
     *
     * @param string $kind What is suggested.
     * @param string $query What the person has typed.
     * @return array The suggestions.
     */
    public static function execute(string $kind, string $query = ''): array {
        ['kind' => $kind, 'query' => $query] = self::validate_parameters(
            self::execute_parameters(),
            ['kind' => $kind, 'query' => $query]
        );

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/servicemanager:manage', $context);

        if (!in_array($kind, suggester::KINDS, true)) {
            throw new \invalid_parameter_exception('kind');
        }
        return (new suggester())->suggest($kind, $query);
    }

    /**
     * Describe the return value.
     *
     * @return external_multiple_structure
     */
    public static function execute_returns(): external_multiple_structure {
        return new external_multiple_structure(new external_single_structure([
            'value' => new external_value(PARAM_RAW, 'What is written in the schema'),
            'label' => new external_value(PARAM_RAW, 'What is shown'),
        ]));
    }
}
