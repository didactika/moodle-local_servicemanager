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
use core_external\external_single_structure;
use core_external\external_value;
use local_servicemanager\automation\token_manager;
use local_servicemanager\schema\manager;

// The classes below extend those of core_external, which Moodle 4.0 and 4.1 only have under their old names.
// phpcs:ignore moodle.Files.MoodleInternal.MoodleInternalGlobalState
\local_servicemanager\compat\external_aliases::register();

/**
 * External web service function: make the token of a schema, or a new one when it has one, and give it back once.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class regenerate_token extends external_api {
    /**
     * Describe the parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'Id of the schema'),
        ]);
    }

    /**
     * Make the token.
     *
     * @param int $id Id of the schema.
     * @return array The token, which is not shown again.
     */
    public static function execute(int $id): array {
        ['id' => $id] = self::validate_parameters(self::execute_parameters(), ['id' => $id]);

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/servicemanager:manage', $context);

        if (!(new manager())->get_schema($id)) {
            throw new \moodle_exception('schema_not_found', 'local_servicemanager');
        }
        $result = (new token_manager())->regenerate_token($id);
        return ['id' => $id, 'token' => $result['token']];
    }

    /**
     * Describe the return value.
     *
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure([
            'id' => new external_value(PARAM_INT, 'Id of the schema'),
            'token' => new external_value(PARAM_RAW, 'The new token'),
        ]);
    }
}
