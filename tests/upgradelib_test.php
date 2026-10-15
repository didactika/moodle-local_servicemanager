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

defined('MOODLE_INTERNAL') || die();

global $CFG;
require_once($CFG->dirroot . '/local/servicemanager/db/upgradelib.php');

/**
 * Tests for the helpers of the upgrade steps.
 *
 * @package    local_servicemanager
 * @covers     ::local_servicemanager_upgrade_manage_for_admins_only
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class upgradelib_test extends \advanced_testcase {
    /**
     * The manager roles lose the capability to manage schemas, and a role that was given it on purpose keeps it.
     */
    public function test_manage_is_taken_from_the_manager_roles_only(): void {
        global $DB;
        $this->resetAfterTest();
        $context = \context_system::instance();
        $manager = (int) $DB->get_field('role', 'id', ['shortname' => 'manager']);
        $othermanager = create_role('Other manager', 'othermanager', '', 'manager');
        $integrator = create_role('Integrator', 'integrator', '', '');
        foreach ([$manager, $othermanager, $integrator] as $roleid) {
            assign_capability('local/servicemanager:manage', CAP_ALLOW, $roleid, $context->id, true);
        }
        $user = $this->getDataGenerator()->create_user();
        role_assign($manager, $user->id, $context->id);
        $this->assertTrue(has_capability('local/servicemanager:manage', $context, $user));

        local_servicemanager_upgrade_manage_for_admins_only();

        $permission = fn(int $roleid) => $DB->get_field(
            'role_capabilities',
            'permission',
            ['roleid' => $roleid, 'capability' => 'local/servicemanager:manage', 'contextid' => $context->id]
        );
        $this->assertFalse($permission($manager));
        $this->assertFalse($permission($othermanager));
        $this->assertEquals(CAP_ALLOW, $permission($integrator));
        $this->assertFalse(has_capability('local/servicemanager:manage', $context, $user));
        $this->assertTrue(has_capability('local/servicemanager:manage', $context, get_admin()));
    }
}
