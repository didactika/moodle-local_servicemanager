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
use local_servicemanager\schema\manager;

/**
 * External web service function: update an existing service schema.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class update_schema extends external_api {
    /**
     * Describe the parameters for update_schema.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'Internal ID of the schema'),
            'yamlcontent' => new external_value(PARAM_RAW, 'New YAML content'),
        ]);
    }

    /**
     * Update an existing schema.
     *
     * @param int $id Internal ID of the schema.
     * @param string $yamlcontent New YAML content.
     * @return array Result of the operation.
     */
    public static function execute(int $id, string $yamlcontent): array {
        [
            'id' => $id,
            'yamlcontent' => $yamlcontent,
        ] = self::validate_parameters(self::execute_parameters(), [
            'id' => $id,
            'yamlcontent' => $yamlcontent,
        ]);

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/servicemanager:manage', $context);

        $manager = new manager();
        $manager->update_schema($id, $yamlcontent);

        return [
            'status' => 'success',
            'message' => 'Schema updated successfully',
        ];
    }

    /**
     * Describe the return value for update_schema.
     *
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure(
            [
                'status' => new external_value(PARAM_TEXT, 'Status of operation'),
                'message' => new external_value(PARAM_TEXT, 'Message'),
            ]
        );
    }
}
