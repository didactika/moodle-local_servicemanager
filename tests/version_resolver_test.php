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
use local_servicemanager\schema\version_resolver;

/**
 * Tests for the version that a schema is saved with.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\schema\version_resolver
 * @covers     \local_servicemanager\schema\manager
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class version_resolver_test extends \advanced_testcase {
    /**
     * The YAML of a schema.
     *
     * @param string $version The line of the version, with its line break, or nothing.
     * @param string $functions The functions, one in each line.
     * @return string The YAML.
     */
    private function yaml(string $version, string $functions = "    - core_webservice_get_site_info\n"): string {
        return "meta:\n  id: \"ver.test\"\n  name: \"Version test\"\n" . $version .
            "definition:\n  functions:\n" . $functions;
    }

    /**
     * The next version adds one to the number after the last point.
     */
    public function test_next_adds_one_to_the_last_number(): void {
        $resolver = new version_resolver();

        $this->assertSame('1.0.1', $resolver->next('1.0.0'));
        $this->assertSame('1.0.10', $resolver->next('1.0.9'));
        $this->assertSame('2.4', $resolver->next('2.3'));
        $this->assertSame('3', $resolver->next('2'));
    }

    /**
     * The version is written where the schema has it, and added when it has none.
     */
    public function test_with_version_replaces_or_adds_the_line(): void {
        $resolver = new version_resolver();

        $replaced = $resolver->with_version($this->yaml("  version: \"1.0.0\"\n"), '1.0.1');
        $added = $resolver->with_version($this->yaml(''), '1.0.0');

        $this->assertStringContainsString("  version: \"1.0.1\"\n", $replaced);
        $this->assertSame(1, substr_count($replaced, 'version:'));
        $this->assertStringContainsString("meta:\n  version: \"1.0.0\"\n", $added);
    }

    /**
     * A new schema without a version starts at 1.0.0, and one that has it keeps it.
     */
    public function test_a_new_schema_starts_at_the_first_version(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $manager = new manager();

        $id = $manager->create_schema($this->yaml(''))['id'];
        $this->assertSame('1.0.0', $DB->get_field('local_servicemanager_schemas', 'version', ['id' => $id]));

        $other = str_replace('ver.test', 'ver.other', str_replace('Version test', 'Other', $this->yaml("  version: \"3.2.0\"\n")));
        $otherid = $manager->create_schema($other)['id'];
        $this->assertSame('3.2.0', $DB->get_field('local_servicemanager_schemas', 'version', ['id' => $otherid]));
    }

    /**
     * Changes that do not bring a new version are saved with the one after the highest the schema has had.
     */
    public function test_a_change_without_a_new_version_is_saved_with_the_next_one(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $manager = new manager();
        $id = $manager->create_schema($this->yaml("  version: \"1.0.0\"\n"))['id'];
        $functions = "    - core_webservice_get_site_info\n    - core_user_get_users\n";

        // The same version, then none, then a lower one that was never used: each one is the next one.
        $manager->update_schema($id, $this->yaml("  version: \"1.0.0\"\n", $functions));
        $this->assertSame('1.0.1', $DB->get_field('local_servicemanager_schemas', 'version', ['id' => $id]));

        $functions .= "    - core_course_get_courses\n";
        $manager->update_schema($id, $this->yaml('', $functions));
        $this->assertSame('1.0.2', $DB->get_field('local_servicemanager_schemas', 'version', ['id' => $id]));

        $functions .= "    - core_enrol_get_users_courses\n";
        $manager->update_schema($id, $this->yaml("  version: \"0.5.0\"\n", $functions));
        $this->assertSame('1.0.3', $DB->get_field('local_servicemanager_schemas', 'version', ['id' => $id]));

        // A version that is higher than every one is kept.
        $functions .= "    - core_course_get_categories\n";
        $manager->update_schema($id, $this->yaml("  version: \"2.0.0\"\n", $functions));
        $this->assertSame('2.0.0', $DB->get_field('local_servicemanager_schemas', 'version', ['id' => $id]));
    }

    /**
     * What is stored carries the version that was worked out, not the one that was sent.
     */
    public function test_the_stored_yaml_has_the_version_that_was_worked_out(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $manager = new manager();
        $id = $manager->create_schema($this->yaml("  version: \"1.0.0\"\n"))['id'];

        $manager->update_schema($id, $this->yaml('', "    - core_webservice_get_site_info\n    - core_user_get_users\n"));

        $stored = $DB->get_field('local_servicemanager_schemas', 'yaml_content', ['id' => $id]);
        $this->assertStringContainsString('version: "1.0.1"', $stored);
        $this->assertTrue($DB->record_exists('local_servicemanager_history', ['schemaid' => $id, 'version' => '1.0.1']));
    }
}
