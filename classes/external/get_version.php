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
use local_servicemanager\schema\history_manager;

// The classes below extend those of core_external, which Moodle 4.0 and 4.1 only have under their old names.
// phpcs:ignore moodle.Files.MoodleInternal.MoodleInternalGlobalState
\local_servicemanager\compat\external_aliases::register();

/**
 * External web service function: the YAML of one past version of a schema.
 *
 * The history lists its versions without their YAML, because it is the heavy part of each, and the interface asks for the one that
 * the person opens.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class get_version extends external_api {
    /**
     * Describe the parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'historyid' => new external_value(PARAM_INT, 'Id of the version in the history'),
        ]);
    }

    /**
     * Get the YAML of a version.
     *
     * @param int $historyid Id of the version in the history.
     * @return array The id of the version and its YAML.
     */
    public static function execute(int $historyid): array {
        ['historyid' => $historyid] = self::validate_parameters(self::execute_parameters(), ['historyid' => $historyid]);

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/servicemanager:view', $context);

        $version = (new history_manager())->get_version($historyid);
        if (!$version) {
            throw new \moodle_exception('historynotfound', 'local_servicemanager');
        }
        return ['id' => (int) $version->id, 'yaml' => $version->yaml_content];
    }

    /**
     * Describe the return value.
     *
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure([
            'id' => new external_value(PARAM_INT, 'Id of the version in the history'),
            'yaml' => new external_value(PARAM_RAW, 'YAML of the version'),
        ]);
    }
}
