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

namespace local_servicemanager;

use local_servicemanager\schema\manager;

/**
 * What the plugin does when Moodle changes something that a schema owns.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class observer {
    /**
     * A web service was changed in the administration of Moodle: the schema that owns it takes the state it was given there.
     *
     * @param \core\event\webservice_service_updated $event The event.
     */
    public static function webservice_service_updated(\core\event\webservice_service_updated $event): void {
        global $DB;

        $manager = new manager();
        foreach ($DB->get_records('local_servicemanager_schemas', ['serviceid' => $event->objectid]) as $schema) {
            $manager->adopt_service_state($schema);
        }
    }
}
