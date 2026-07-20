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

/**
 * External web service function: get a single service schema by ID.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class get_schema extends external_api {
    /**
     * Describe the parameters for get_schema.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'Internal ID of the schema'),
        ]);
    }

    /**
     * Get a single schema.
     *
     * @param int $id Internal ID of the schema.
     * @return array Schema details.
     */
    public static function execute(int $id): array {
        global $DB;

        ['id' => $id] = self::validate_parameters(self::execute_parameters(), ['id' => $id]);

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/servicemanager:view', $context);

        $schema = $DB->get_record('local_servicemanager_schemas', ['id' => $id], '*', MUST_EXIST);

        return [
            'id' => $schema->id,
            'schemaid' => $schema->schema_id,
            'name' => $schema->name,
            'version' => $schema->version,
            'description' => $schema->description ?? '',
            'yaml_content' => $schema->yaml_content,
            'enabled' => $schema->enabled,
            'timecreated' => $schema->timecreated,
            'timemodified' => $schema->timemodified,
        ];
    }

    /**
     * Describe the return value for get_schema.
     *
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure(
            [
                'id' => new external_value(PARAM_INT, 'Internal ID of the schema'),
                'schemaid' => new external_value(PARAM_TEXT, 'Schema unique ID'),
                'name' => new external_value(PARAM_TEXT, 'Schema name'),
                'version' => new external_value(PARAM_TEXT, 'Schema version'),
                'description' => new external_value(PARAM_RAW, 'Schema description'),
                'yaml_content' => new external_value(PARAM_RAW, 'YAML content'),
                'enabled' => new external_value(PARAM_BOOL, 'Whether the schema is enabled'),
                'timecreated' => new external_value(PARAM_INT, 'Time created'),
                'timemodified' => new external_value(PARAM_INT, 'Time modified'),
            ]
        );
    }
}
