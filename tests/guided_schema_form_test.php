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
}
