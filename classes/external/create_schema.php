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
 * External web service function: create a new service schema.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class create_schema extends external_api {
    /**
     * Describe the parameters for create_schema.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'yamlcontent' => new external_value(PARAM_RAW, 'YAML content of the schema'),
            'generatetoken' => new external_value(PARAM_BOOL, 'Generate token automatically', VALUE_DEFAULT, false),
        ]);
    }

    /**
     * Create a new schema.
     *
     * The parameter carries no default: the web service layer validates the
     * arguments before calling, which fills in the VALUE_DEFAULT declared in
     * execute_parameters(), so this method is always handed both values.
     *
     * @param string $yamlcontent YAML content of the schema.
     * @param bool $generatetoken Whether to generate a token automatically.
     * @return array Result of the operation.
     */
    public static function execute(string $yamlcontent, bool $generatetoken): array {
        [
            'yamlcontent' => $yamlcontent,
            'generatetoken' => $generatetoken,
        ] = self::validate_parameters(self::execute_parameters(), [
            'yamlcontent' => $yamlcontent,
            'generatetoken' => $generatetoken,
        ]);

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/servicemanager:manage', $context);

        $manager = new manager();
        $result = $generatetoken
            ? $manager->create_schema_with_token($yamlcontent)
            : $manager->create_schema($yamlcontent);

        return [
            'id' => $result['id'],
            'status' => 'success',
            'message' => 'Schema created successfully',
            'token' => $result['token'] ?? '',
        ];
    }

    /**
     * Describe the return value for create_schema.
     *
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure(
            [
                'id' => new external_value(PARAM_INT, 'ID of the created schema'),
                'status' => new external_value(PARAM_TEXT, 'Status of operation'),
                'message' => new external_value(PARAM_TEXT, 'Message'),
                'token' => new external_value(PARAM_TEXT, 'Generated token if requested', VALUE_OPTIONAL),
            ]
        );
    }
}
