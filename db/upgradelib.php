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
 * Helpers of the upgrade steps of local_servicemanager.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Take the capability to manage schemas away from the roles of the manager archetype, which had it by default.
 *
 * Only the allow at the system context that the archetype gave is taken away; a role of another archetype that was given the
 * capability on purpose keeps it, and site administrators have it anyway.
 */
function local_servicemanager_upgrade_manage_for_admins_only(): void {
    global $DB;

    $context = context_system::instance();
    $sql = "SELECT rc.roleid
              FROM {role_capabilities} rc
              JOIN {role} r ON r.id = rc.roleid
             WHERE rc.capability = :capability
                   AND rc.contextid = :contextid
                   AND rc.permission = :permission
                   AND r.archetype = :archetype";
    $roleids = $DB->get_fieldset_sql($sql, [
        'capability' => 'local/servicemanager:manage',
        'contextid' => $context->id,
        'permission' => CAP_ALLOW,
        'archetype' => 'manager',
    ]);
    foreach ($roleids as $roleid) {
        unassign_capability('local/servicemanager:manage', $roleid, $context->id);
    }
}
