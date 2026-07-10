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

/**
 * Upgrade steps for local_servicemanager
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Upgrade the local_servicemanager plugin.
 *
 * @param int $oldversion The old version of the plugin
 * @return bool
 */
function xmldb_local_servicemanager_upgrade($oldversion) {
    global $DB;

    // Re-tag provisioned services to the sentinel component so they survive upgrades
    // (external_update_descriptions() deletes services tagged with the plugin's own
    // component that aren't in db/services.php). Normalises any current value
    // (NULL or 'local_servicemanager') and leaves the declared ws_servicemanager
    // alone. Literal matches service_manager::MANAGED_COMPONENT (upgrade steps are frozen).
    if ($oldversion < 2026071000) {
        $sql = "UPDATE {external_services}
                   SET component = :sentinel
                 WHERE id IN (SELECT serviceid
                                FROM {local_servicemanager_schemas}
                               WHERE serviceid IS NOT NULL)";
        $DB->execute($sql, ['sentinel' => 'local_servicemanager_managed']);

        upgrade_plugin_savepoint(true, 2026071000, 'local', 'servicemanager');
    }

    return true;
}
