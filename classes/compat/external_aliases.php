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

namespace local_servicemanager\compat;

/**
 * Makes the web service classes of Moodle 4.2 and later available under their new names in Moodle 4.0 and 4.1.
 *
 * Moodle 4.2 moved external_api and its helpers into the core_external namespace. The classes of this plugin extend them by
 * their new names, so on a Moodle that still has them under the old ones the new names are made aliases before a class is
 * declared.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class external_aliases {
    /** @var string[] The classes that moved, by their short name. */
    private const CLASSES = [
        'external_api',
        'external_function_parameters',
        'external_single_structure',
        'external_multiple_structure',
        'external_value',
    ];

    /**
     * Declare the aliases, when the running Moodle needs them.
     */
    public static function register(): void {
        global $CFG;
        if (class_exists('core_external\external_api')) {
            return;
        }
        require_once($CFG->libdir . '/externallib.php');
        foreach (self::CLASSES as $name) {
            if (!class_exists('core_external\\' . $name, false)) {
                class_alias($name, 'core_external\\' . $name);
            }
        }
    }
}
