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
use local_servicemanager\output\version_rows;
use local_servicemanager\schema\history_manager;
use local_servicemanager\schema\manager;

/**
 * External web service function: bring a schema back to one of its versions without leaving the history.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class rollback_schema extends external_api {
    /**
     * Describe the parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'Id of the schema'),
            'historyid' => new external_value(PARAM_INT, 'Id of the version, in the history, to go back to'),
        ]);
    }

    /**
     * Roll a schema back to a version.
     *
     * @param int $id Id of the schema.
     * @param int $historyid Id of the version.
     * @return array The version the schema has now and the versions of its history.
     */
    public static function execute(int $id, int $historyid): array {
        global $PAGE;

        ['id' => $id, 'historyid' => $historyid] = self::validate_parameters(
            self::execute_parameters(),
            ['id' => $id, 'historyid' => $historyid]
        );

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/servicemanager:manage', $context);

        $manager = new manager();
        if (!$manager->get_schema($id)) {
            throw new \moodle_exception('schema_not_found', 'local_servicemanager');
        }
        (new history_manager())->rollback($id, $historyid);

        $schema = $manager->get_schema($id);
        return [
            'id' => $id,
            'version' => (string) $schema->version,
            'rows' => version_rows::describe($schema, $PAGE),
        ];
    }

    /**
     * Describe the return value.
     *
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure([
            'id' => new external_value(PARAM_INT, 'Id of the schema'),
            'version' => new external_value(PARAM_RAW, 'The version the schema has now'),
            'rows' => new external_multiple_structure(new external_single_structure([
                'id' => new external_value(PARAM_INT, 'Id of the version in the history'),
                'version' => new external_value(PARAM_RAW, 'The version'),
                'username' => new external_value(PARAM_RAW, 'Who made it'),
                'userpicture' => new external_value(PARAM_RAW, 'Address of the picture of that person'),
                'date' => new external_value(PARAM_RAW, 'When it was made, for the person to read'),
                'at' => new external_value(PARAM_INT, 'When it was made, as a timestamp'),
                'reason' => new external_value(PARAM_RAW, 'Why it was made'),
                'iscurrent' => new external_value(PARAM_BOOL, 'Whether it is the version the schema has now'),
                'canrollback' => new external_value(PARAM_BOOL, 'Whether the schema can be brought back to it'),
                'text' => new external_value(PARAM_RAW, 'What the search looks into'),
                'viewurl' => new external_value(PARAM_RAW, 'Address of the page of the schema as it was in that version'),
            ])),
        ]);
    }
}
