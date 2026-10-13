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

use local_servicemanager\schema\version_summary;

/**
 * Tests for the summary of what changed between two versions of a schema.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\schema\version_summary
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class version_summary_test extends \advanced_testcase {
    /**
     * The YAML of a schema.
     *
     * @param string $version Its version.
     * @param string $functions The lines of its functions.
     * @param string $extra Anything that goes after the functions.
     * @return string The YAML.
     */
    private function yaml(string $version, string $functions, string $extra = ''): string {
        return "meta:\n  id: \"a.b\"\n  name: \"Service\"\n  version: \"{$version}\"\n" .
            "requirements:\n  download_files: " . (str_contains($extra, 'download') ? 'true' : 'false') . "\n" .
            "definition:\n  functions:\n{$functions}\n";
    }

    /**
     * What came, went and changed is said by name.
     */
    public function test_changes_are_named(): void {
        $this->resetAfterTest();
        $before = $this->yaml('1.0.0', "    - core_user_get_users\n    - core_course_get_courses");
        $after = $this->yaml(
            '1.1.0',
            "    - core_user_get_users\n    - name: core_course_get_courses\n      critical: false\n" .
            "    - core_webservice_get_site_info",
            'download'
        );

        $changes = (new version_summary())->changes($before, $after);
        $byarea = [];
        foreach ($changes as $change) {
            $byarea[$change['area'] . ':' . $change['kind'] . ':' . $change['name']] = $change;
        }

        $this->assertSame('1.0.0', $byarea['field:changed:version']['from']);
        $this->assertSame('1.1.0', $byarea['field:changed:version']['to']);
        $this->assertArrayHasKey('function:added:core_webservice_get_site_info', $byarea);
        $this->assertSame('critical', $byarea['function:changed:core_course_get_courses']['from']);
        $this->assertSame('optional', $byarea['function:changed:core_course_get_courses']['to']);
        $this->assertSame('on', $byarea['files:changed:download_files']['to']);
        $this->assertArrayNotHasKey('field:changed:name', $byarea);
    }

    /**
     * What the role gained and lost is told by relation.
     */
    public function test_role_changes_are_named(): void {
        $this->resetAfterTest();
        $base = "meta:\n  id: \"a.b\"\n  name: \"Service\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_user_get_users\n";
        $before = $base . "role:\n  allow_assign:\n    - student\n";
        $after = $base . "role:\n  allow_assign:\n    - editingteacher\n  context_levels:\n    - course\n";

        $names = array_map(
            fn(array $change) => $change['kind'] . ' ' . $change['name'],
            (new version_summary())->changes($before, $after)
        );

        $this->assertContains('added allow_assign: editingteacher', $names);
        $this->assertContains('removed allow_assign: student', $names);
        $this->assertContains('added context_levels: course', $names);
    }

    /**
     * Two equal versions have nothing to say.
     */
    public function test_equal_versions_have_no_changes(): void {
        $this->resetAfterTest();
        $yaml = $this->yaml('1.0.0', '    - core_user_get_users');

        $this->assertSame([], (new version_summary())->changes($yaml, $yaml));
    }
}
