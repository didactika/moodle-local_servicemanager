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

use local_servicemanager\schema\schema_builder;
use local_servicemanager\schema\validator;
use local_servicemanager\schema\yaml_parser;
use local_servicemanager\schema\schema_extractor;

/**
 * Tests for the YAML that the guided form writes.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\schema\schema_builder
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class schema_builder_test extends \advanced_testcase {
    /**
     * The fields of a small schema.
     *
     * @return array The fields.
     */
    private function fields(): array {
        return [
            'id' => 'crm.sync',
            'name' => 'CRM sync',
            'version' => '1.0.0',
            'maintainer' => '',
            'description' => 'Reads "users" from \\ Moodle',
            'functions' => ['core_webservice_get_site_info', '', 'core_webservice_get_site_info'],
            'optionalfunctions' => ['core_user_get_users'],
            'plugins' => ['mod_forum'],
            'extracapabilities' => ['moodle/user:viewdetails'],
            'additionalusers' => ['ops@example.com'],
            'downloadfiles' => true,
            'uploadfiles' => false,
        ];
    }

    /**
     * What the person left empty is not written, and what is repeated is written once.
     */
    public function test_empty_and_repeated_values_are_left_out(): void {
        $yaml = (new schema_builder())->to_yaml($this->fields());

        $this->assertStringNotContainsString('maintainer', $yaml);
        $this->assertStringNotContainsString('upload_files', $yaml);
        $this->assertSame(1, substr_count($yaml, 'core_webservice_get_site_info'));
        $this->assertStringContainsString("  download_files: true\n", $yaml);
    }

    /**
     * Quotes and backslashes in a text do not break the YAML, and it reads back as what was written.
     */
    public function test_yaml_reads_back_as_the_fields(): void {
        $this->resetAfterTest();
        $yaml = (new schema_builder())->to_yaml($this->fields());

        $parser = new yaml_parser();
        $data = $parser->parse($yaml);
        $this->assertNotNull($data);
        $meta = schema_extractor::meta($data);
        $this->assertSame('crm.sync', $meta['id']);
        $this->assertSame('Reads "users" from \\ Moodle', $meta['description']);

        $functions = schema_extractor::functions($data);
        $this->assertSame(['core_webservice_get_site_info', 'core_user_get_users'], array_column($functions, 'name'));
        $this->assertSame([true, false], array_column($functions, 'critical'));
        $this->assertSame(['mod_forum'], schema_extractor::required_plugins($data));
        $this->assertSame(['moodle/user:viewdetails'], schema_extractor::extra_capabilities($data));
        $this->assertSame(['ops@example.com'], schema_extractor::additional_users($data));
    }

    /**
     * The role section is written only when the person asked something of the role, and it reads back as they asked.
     */
    public function test_role_section_reads_back(): void {
        $this->resetAfterTest();
        $builder = new schema_builder();

        $this->assertStringNotContainsString('role:', $builder->to_yaml($this->fields()));

        $fields = $this->fields() + [
            'contextlevels' => ['system', 'course'],
            'prohibit' => ['moodle/site:config'],
            'allow_assign' => ['student'],
            'allow_view' => ['student', 'editingteacher'],
        ];
        $parser = new yaml_parser();
        $settings = schema_extractor::role_settings($parser->parse($builder->to_yaml($fields)));

        $this->assertSame(['system', 'course'], $settings->context_levels());
        $this->assertSame(['moodle/site:config'], $settings->capabilities('prohibit'));
        $this->assertSame(['student'], $settings->roles('allow_assign'));
        $this->assertSame(['student', 'editingteacher'], $settings->roles('allow_view'));
        $this->assertSame([], (new validator())->validate_content($builder->to_yaml($fields))['errors']);
    }

    /**
     * A schema the form writes passes the validation of the plugin.
     */
    public function test_yaml_passes_validation(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        $yaml = (new schema_builder())->to_yaml($this->fields());

        $result = (new validator())->validate_content($yaml);

        $this->assertSame([], $result['errors']);
    }
}
