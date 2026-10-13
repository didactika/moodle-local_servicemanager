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

use local_servicemanager\automation\role_manager;
use local_servicemanager\automation\role_settings;
use local_servicemanager\schema\validator;
use local_servicemanager\schema\yaml_parser;

/**
 * Tests for the part of a schema that says what its role may do.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\automation\role_settings
 * @covers     \local_servicemanager\automation\role_manager
 * @covers     \local_servicemanager\schema\yaml_parser
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class role_settings_test extends \advanced_testcase {
    /**
     * A schema with a role section.
     *
     * @param string $role The lines of the role section, indented as they go under "role:".
     * @return string The YAML.
     */
    private function yaml(string $role): string {
        return "meta:\n  id: \"roles.test\"\n  name: \"Roles test\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n" . ($role === '' ? '' : "role:\n" . $role);
    }

    /**
     * The section is read into its parts, and a schema without one asks for nothing.
     */
    public function test_the_section_is_read(): void {
        $parser = new yaml_parser();
        $none = $parser->extract_role_settings($parser->parse($this->yaml('')));
        $this->assertTrue($none->is_empty());
        $this->assertSame(['system'], $none->context_levels());

        $settings = $parser->extract_role_settings($parser->parse($this->yaml(
            "  context_levels:\n    - course\n    - category\n" .
            "  permissions:\n    prohibit:\n      - moodle/site:config\n    prevent:\n      - moodle/user:delete\n" .
            "  allow_assign:\n    - student\n  allow_view:\n    - student\n    - teacher\n"
        )));

        $this->assertSame(['system', 'course', 'category'], $settings->context_levels());
        $this->assertSame([CONTEXT_SYSTEM, CONTEXT_COURSE, CONTEXT_COURSECAT], $settings->context_level_numbers());
        $this->assertSame(['moodle/site:config'], $settings->capabilities('prohibit'));
        $this->assertSame(['moodle/user:delete'], $settings->capabilities('prevent'));
        $this->assertSame(['student', 'teacher'], $settings->roles('allow_view'));
        $this->assertSame([], $settings->roles('allow_switch'));
        $this->assertFalse($settings->is_empty());
        $this->assertSame(['student', 'teacher'], $settings->all_roles());
    }

    /**
     * What is not shaped as the section needs is an error that says which part.
     */
    public function test_the_shape_is_checked(): void {
        $this->resetAfterTest();
        $parser = new yaml_parser();

        $errors = $parser->validate_structure($parser->parse($this->yaml(
            "  nonsense: 1\n  context_levels:\n    - galaxy\n  permissions:\n    sometimes:\n      - a/b:c\n" .
            "  allow_assign: student\n"
        )));

        $this->assertCount(4, $errors);
        $this->assertStringContainsString('nonsense', $errors[0]);
        $this->assertStringContainsString('allow_assign', implode(' ', $errors));
        $this->assertStringContainsString('galaxy', implode(' ', $errors));
        $this->assertStringContainsString('sometimes', implode(' ', $errors));
    }

    /**
     * A role that does not exist is an error and a capability that does not is a warning.
     */
    public function test_roles_must_exist_and_capabilities_only_warn(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $result = (new validator())->validate_content($this->yaml(
            "  permissions:\n    allow:\n      - local_nothing/here:do\n" .
            "  allow_assign:\n    - student\n    - nobody_has_this_role\n"
        ));

        $this->assertCount(1, $result['errors']);
        $this->assertStringContainsString('nobody_has_this_role', $result['errors'][0]);
        $this->assertStringContainsString('local_nothing/here:do', implode(' ', $result['warnings']));
    }

    /**
     * Applying the settings gives the role what they say, and applying others replaces it.
     */
    public function test_settings_are_applied_and_replaced(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();

        $manager = new role_manager();
        $roleid = $manager->create_service_role('apply.test', 'Apply test', 'Description');
        $student = (int) $DB->get_field('role', 'id', ['shortname' => 'student']);
        $teacher = (int) $DB->get_field('role', 'id', ['shortname' => 'editingteacher']);

        $manager->apply_settings($roleid, new role_settings(
            ['course'],
            ['prohibit' => ['moodle/site:config'], 'prevent' => ['moodle/user:delete']],
            ['allow_assign' => ['student'], 'allow_view' => ['student', 'editingteacher'], 'allow_override' => ['student']]
        ));

        $this->assertTrue($DB->record_exists('role_allow_assign', ['roleid' => $roleid, 'allowassign' => $student]));
        $this->assertTrue($DB->record_exists('role_allow_override', ['roleid' => $roleid, 'allowoverride' => $student]));
        $this->assertTrue($DB->record_exists('role_allow_view', ['roleid' => $roleid, 'allowview' => $teacher]));
        $this->assertFalse($DB->record_exists('role_allow_switch', ['roleid' => $roleid]));
        $levels = $DB->get_fieldset_select('role_context_levels', 'contextlevel', 'roleid = ?', [$roleid]);
        $this->assertEqualsCanonicalizing([CONTEXT_SYSTEM, CONTEXT_COURSE], array_map('intval', $levels));
        $context = \context_system::instance();
        $permission = fn(string $capability) => $DB->get_field(
            'role_capabilities',
            'permission',
            ['roleid' => $roleid, 'capability' => $capability, 'contextid' => $context->id]
        );
        $this->assertEquals(CAP_PROHIBIT, $permission('moodle/site:config'));
        $this->assertEquals(CAP_PREVENT, $permission('moodle/user:delete'));

        // Another version of the schema asks for something else: what it no longer says stops being given.
        $manager->apply_settings($roleid, new role_settings([], [], ['allow_switch' => ['student']]));

        $this->assertFalse($DB->record_exists('role_allow_assign', ['roleid' => $roleid]));
        $this->assertFalse($DB->record_exists('role_allow_view', ['roleid' => $roleid]));
        $this->assertTrue($DB->record_exists('role_allow_switch', ['roleid' => $roleid, 'allowswitch' => $student]));
        $levels = $DB->get_fieldset_select('role_context_levels', 'contextlevel', 'roleid = ?', [$roleid]);
        $this->assertSame([CONTEXT_SYSTEM], array_map('intval', $levels));
    }

    /**
     * A whole schema is created with its role settings, and rolling it forward replaces them.
     */
    public function test_a_schema_creates_and_updates_its_role(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();

        $manager = new \local_servicemanager\schema\manager();
        $created = $manager->create_schema($this->yaml("  allow_assign:\n    - student\n"));
        $schema = $manager->get_schema($created['id']);
        $student = (int) $DB->get_field('role', 'id', ['shortname' => 'student']);
        $this->assertTrue($DB->record_exists('role_allow_assign', ['roleid' => $schema->roleid, 'allowassign' => $student]));

        $changed = str_replace('version: "1.0.0"', 'version: "1.1.0"', $this->yaml("  allow_view:\n    - student\n"));
        $manager->update_schema($created['id'], $changed);

        $this->assertFalse($DB->record_exists('role_allow_assign', ['roleid' => $schema->roleid]));
        $this->assertTrue($DB->record_exists('role_allow_view', ['roleid' => $schema->roleid, 'allowview' => $student]));
    }
}
