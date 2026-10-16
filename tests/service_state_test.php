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
 * Tests for the state of a schema when its web service is enabled or disabled in Moodle and not in the plugin.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\schema\manager
 * @covers     \local_servicemanager\observer
 * @covers     \local_servicemanager\task\health_check
 * @covers     \local_servicemanager\output\dashboard_page
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class service_state_test extends \advanced_testcase {
    /**
     * Create a schema, which starts enabled.
     *
     * @return \stdClass The schema record.
     */
    private function create_schema(): \stdClass {
        $yaml = "meta:\n  id: \"state.test\"\n  name: \"State test\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n";
        $manager = new manager();
        return $manager->get_schema($manager->create_schema($yaml)['id']);
    }

    /**
     * Enable or disable the web service of a schema the way the administration of Moodle does, with the event it triggers.
     *
     * @param \stdClass $schema The schema record.
     * @param bool $enabled The state to give it.
     */
    private function set_in_moodle(\stdClass $schema, bool $enabled): void {
        global $DB;

        $DB->set_field('external_services', 'enabled', (int) $enabled, ['id' => $schema->serviceid]);
        \core\event\webservice_service_updated::create(['objectid' => $schema->serviceid])->trigger();
    }

    /**
     * What is shown is the state of the service in Moodle, even before the schema takes it.
     */
    public function test_the_state_shown_is_the_one_of_the_service(): void {
        global $DB, $PAGE;
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->create_schema();

        // Disabled behind the plugin's back, without an event.
        $DB->set_field('external_services', 'enabled', 0, ['id' => $schema->serviceid]);

        $manager = new manager();
        $this->assertFalse($manager->is_enabled($schema));
        $this->assertSame([(int) $schema->id => false], $manager->service_states());

        $page = (new output\dashboard_page())->export_for_template($PAGE->get_renderer('core'));
        $this->assertFalse($page['schemas'][0]['enabled']);
        $this->assertSame('0', $page['schemas'][0]['enabledvalue']);

        $returned = external\get_schema::execute((int) $schema->id);
        $this->assertFalse((bool) $returned['enabled']);
    }

    /**
     * A schema whose service is gone keeps the state it stored.
     */
    public function test_a_schema_without_a_service_keeps_its_state(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->create_schema();

        $DB->delete_records('external_services', ['id' => $schema->serviceid]);

        $this->assertTrue((new manager())->is_enabled($schema));
        $this->assertFalse((new manager())->adopt_service_state($schema));
    }

    /**
     * A service disabled and enabled again in the administration of Moodle disables and enables its schema and its user.
     */
    public function test_the_schema_takes_the_state_given_in_moodle(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->create_schema();

        $this->set_in_moodle($schema, false);

        $this->assertEquals(0, $DB->get_field('local_servicemanager_schemas', 'enabled', ['id' => $schema->id]));
        $this->assertEquals(1, $DB->get_field('user', 'suspended', ['id' => $schema->userid]));

        $this->set_in_moodle($schema, true);

        $this->assertEquals(1, $DB->get_field('local_servicemanager_schemas', 'enabled', ['id' => $schema->id]));
        $this->assertEquals(0, $DB->get_field('user', 'suspended', ['id' => $schema->userid]));
        $this->assertEquals(1, $DB->get_field('external_services', 'enabled', ['id' => $schema->serviceid]));
    }

    /**
     * A service enabled in Moodle while the schema was disabled in the plugin enables the schema and its user.
     */
    public function test_a_service_enabled_in_moodle_enables_a_disabled_schema(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->create_schema();
        (new manager())->set_enabled((int) $schema->id, false);

        $this->set_in_moodle($schema, true);

        $this->assertEquals(1, $DB->get_field('local_servicemanager_schemas', 'enabled', ['id' => $schema->id]));
        $this->assertEquals(0, $DB->get_field('user', 'suspended', ['id' => $schema->userid]));
    }

    /**
     * The daily health check takes a state that was changed without an event, by a script or in the database.
     */
    public function test_the_health_check_takes_a_state_changed_without_an_event(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->create_schema();
        $DB->set_field('external_services', 'enabled', 0, ['id' => $schema->serviceid]);
        $sink = $this->redirectMessages();

        $this->expectOutputRegex('/took the state of its web service: disabled/');
        (new task\health_check())->execute();
        $sink->close();

        $this->assertEquals(0, $DB->get_field('local_servicemanager_schemas', 'enabled', ['id' => $schema->id]));
        $this->assertEquals(1, $DB->get_field('user', 'suspended', ['id' => $schema->userid]));
    }

    /**
     * With the health checks turned off the task checks nothing, logs nothing and mails nothing, and the state of a schema is
     * still taken from its service, which is not a check.
     */
    public function test_the_health_check_turned_off_checks_nothing(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->create_schema();
        $other = (new manager())->get_schema((new manager())->create_schema(
            "meta:\n  id: \"state.other\"\n  name: \"Other\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n" .
            "    - name: core_fake_function_that_does_not_exist\n      critical: false\n"
        )['id']);
        $DB->set_field('local_servicemanager_schemas', 'status', 'healthy', ['id' => $other->id]);
        $DB->set_field('external_services', 'enabled', 0, ['id' => $schema->serviceid]);
        set_config('healthcheck_enabled', 0, 'local_servicemanager');
        set_config('notification_level', 'all', 'local_servicemanager');
        $sink = $this->redirectEmails();

        $this->expectOutputRegex('/health check is turned off/');
        (new task\health_check())->execute();
        $mails = $sink->get_messages();
        $sink->close();

        $this->assertSame(0, $DB->count_records('local_servicemanager_logs'));
        $this->assertSame([], $mails);
        $this->assertSame('healthy', $DB->get_field('local_servicemanager_schemas', 'status', ['id' => $other->id]));
        $this->assertEquals(0, $DB->get_field('local_servicemanager_schemas', 'enabled', ['id' => $schema->id]));
    }

    /**
     * With the setting on, or never saved, which is its default, the task checks every enabled schema and logs it.
     */
    public function test_the_health_check_runs_by_default(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->create_schema();
        unset_config('healthcheck_enabled', 'local_servicemanager');
        $sink = $this->redirectEmails();

        $this->expectOutputRegex('/Health Check completed/');
        (new task\health_check())->execute();
        $sink->close();

        $this->assertSame(1, $DB->count_records('local_servicemanager_logs', ['schemaid' => $schema->id]));
    }
}
