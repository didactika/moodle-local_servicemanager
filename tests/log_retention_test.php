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
 * Tests for how long the health checks are kept: as long as the settings of the log cleanup say, and nothing else.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\task\health_check
 * @covers     \local_servicemanager\task\cleanup_logs
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class log_retention_test extends \advanced_testcase {
    /**
     * Create a schema with health checks made some days ago.
     *
     * @param int[] $daysago How many days ago each check was made.
     * @return \stdClass The schema record.
     */
    private function schema_checked(array $daysago): \stdClass {
        global $DB;

        $yaml = "meta:\n  id: \"retention.test\"\n  name: \"Retention test\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n";
        $manager = new manager();
        $schema = $manager->get_schema($manager->create_schema($yaml)['id']);
        foreach ($daysago as $days) {
            $DB->insert_record('local_servicemanager_logs', (object) [
                'schemaid' => $schema->id,
                'status' => 'healthy',
                'message' => 'All checks passed',
                'details' => '{}',
                'timecreated' => time() - $days * DAYSECS,
            ]);
        }
        return $schema;
    }

    /**
     * The health check keeps the checks that are older than thirty days when the retention says more.
     */
    public function test_the_health_check_keeps_what_the_retention_keeps(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->schema_checked([40]);
        set_config('cleanup_retention_days', 90, 'local_servicemanager');
        $sink = $this->redirectEmails();

        $this->expectOutputRegex('/Health Check completed/');
        (new task\health_check())->execute();
        $sink->close();

        $this->assertSame(2, $DB->count_records('local_servicemanager_logs', ['schemaid' => $schema->id]));
    }

    /**
     * The cleanup deletes the checks older than the retention days, and only those.
     */
    public function test_the_cleanup_deletes_what_is_older_than_the_retention(): void {
        global $DB;
        $this->resetAfterTest();
        $schema = $this->schema_checked([40, 100]);
        set_config('cleanup_enabled', 1, 'local_servicemanager');
        set_config('cleanup_retention_days', 90, 'local_servicemanager');

        $this->expectOutputRegex('/Deleted 1 records older than 90 days/');
        (new task\cleanup_logs())->execute();

        $this->assertSame(1, $DB->count_records('local_servicemanager_logs', ['schemaid' => $schema->id]));
    }

    /**
     * With the cleanup turned off nothing is deleted, however old it is.
     */
    public function test_nothing_is_deleted_with_the_cleanup_off(): void {
        global $DB;
        $this->resetAfterTest();
        $schema = $this->schema_checked([40, 400]);
        set_config('cleanup_enabled', 0, 'local_servicemanager');

        $this->expectOutputRegex('/cleanup is disabled/');
        (new task\cleanup_logs())->execute();

        $this->assertSame(2, $DB->count_records('local_servicemanager_logs', ['schemaid' => $schema->id]));
    }
}
