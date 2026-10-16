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

use local_servicemanager\form\guided_schema_form;

/**
 * Tests for the form that creates a schema step by step and edits one that exists.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\form\guided_schema_form
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class guided_schema_form_test extends \advanced_testcase {
    /**
     * The values of a form that is written as YAML and read back are the ones that were written.
     */
    public function test_the_values_of_a_schema_are_what_the_form_wrote(): void {
        $this->resetAfterTest();
        $written = [
            'schemaid' => 'crm.sync',
            'name' => 'CRM sync',
            'version' => '2.1.0',
            'maintainer' => 'Ops',
            'description' => 'Reads users',
            'functions' => ['core_webservice_get_site_info'],
            'optionalfunctions' => ['core_user_get_users'],
            'plugins' => ['mod_forum'],
            'extracapabilities' => ['moodle/user:viewdetails'],
            'additionalusers' => ['ops@example.com'],
            'downloadfiles' => 1,
            'uploadfiles' => 0,
            'contextlevels' => ['course'],
            'prevent' => ['moodle/user:delete'],
            'prohibit' => ['moodle/site:config'],
            'allow_assign' => ['student'],
            'allow_override' => [],
            'allow_switch' => [],
            'allow_view' => ['student', 'editingteacher'],
        ];

        $values = guided_schema_form::values_from_yaml(guided_schema_form::yaml($written));

        $this->assertEquals($written, $values);
    }

    /**
     * What the role is allowed is shown with the extra capabilities, which is what it is for the service.
     */
    public function test_allowed_permissions_of_the_role_join_the_extra_capabilities(): void {
        $this->resetAfterTest();
        $yaml = "meta:\n  id: \"a.b\"\n  name: \"Service\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n" .
            "  extra_capabilities:\n    - moodle/user:viewdetails\n" .
            "role:\n  permissions:\n    allow:\n      - moodle/course:view\n      - moodle/user:viewdetails\n";

        $values = guided_schema_form::values_from_yaml($yaml);

        $this->assertEqualsCanonicalizing(['moodle/user:viewdetails', 'moodle/course:view'], $values['extracapabilities']);
    }

    /**
     * A schema written by hand, with comments, functions written as maps and empty lists.
     *
     * @return string The YAML.
     */
    private function hand_written_yaml(): string {
        return <<<YAML
# A schema written by hand.
meta:
  id: "hand.written"   # The id.
  name: "Hand written"
  version: "1.0.0"
  description: "Reads   the users"

requirements:
  plugins: []
  download_files: false
  upload_files: false

definition:
  functions:
    - name: "core_webservice_get_site_info"
      critical: true
    - core_user_get_users
    - name: core_course_get_courses
      critical: false
  extra_capabilities:
    - "moodle/user:viewdetails"
  additional_users: []

role:
  context_levels:
    - course
  permissions:
    allow:
      - moodle/course:view
  allow_view:
    - student
YAML;
    }

    /**
     * Saving the form of a schema untouched says what is stored, so it is neither a change nor a new version.
     */
    public function test_saving_the_form_untouched_is_not_a_change(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $manager = new \local_servicemanager\schema\manager();
        $id = $manager->create_schema($this->hand_written_yaml())['id'];
        $stored = $manager->get_schema($id);
        $versions = $DB->count_records('local_servicemanager_history', ['schemaid' => $id]);

        $yaml = guided_schema_form::yaml(guided_schema_form::values_from_yaml($stored->yaml_content));
        $this->assertNotSame($stored->yaml_content, $yaml);
        $this->assertTrue($manager->says_the_same($stored, $yaml));

        $result = $manager->update_schema($id, $yaml);

        $this->assertSame('1.0.0', $result['version']);
        $this->assertFalse($result['adjusted']);
        $this->assertSame('1.0.0', $manager->get_schema($id)->version);
        $this->assertSame($versions, $DB->count_records('local_servicemanager_history', ['schemaid' => $id]));
    }

    /**
     * A change made in the form is still a change, and a change of the name says something else too.
     */
    public function test_a_change_made_in_the_form_is_a_new_version(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        $manager = new \local_servicemanager\schema\manager();
        $id = $manager->create_schema($this->hand_written_yaml())['id'];
        $stored = $manager->get_schema($id);
        $values = guided_schema_form::values_from_yaml($stored->yaml_content);

        $renamed = guided_schema_form::yaml(['name' => 'Renamed'] + $values);
        $this->assertFalse($manager->says_the_same($stored, $renamed));

        $values['optionalfunctions'] = [];
        $yaml = guided_schema_form::yaml($values);
        $this->assertFalse($manager->says_the_same($stored, $yaml));

        $this->assertSame('1.0.1', $manager->update_schema($id, $yaml)['version']);
    }

    /**
     * The id and the version are read as text and trimmed, so markup or spaces around them do not make the schema invalid.
     */
    public function test_the_id_and_the_version_are_read_as_text(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        guided_schema_form::mock_submit([
            'schemaid' => ' <b>crm.sync</b> ',
            'name' => 'CRM sync',
            'version' => ' <i>2.0.0</i> ',
            'functions' => ['core_webservice_get_site_info'],
            'submitbutton' => 1,
        ]);

        $data = (new guided_schema_form(null, ['schema' => null, 'values' => []]))->get_data();

        $this->assertNotNull($data);
        $fields = guided_schema_form::fields($data);
        $this->assertSame('crm.sync', $fields['id']);
        $this->assertSame('2.0.0', $fields['version']);
    }
}
