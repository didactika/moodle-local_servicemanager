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

use local_servicemanager\output\health_page;
use local_servicemanager\schema\manager;

/**
 * Tests for the page of the health checks of a schema and the summary of them on the page of the schema.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\output\health_page
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class health_page_test extends \advanced_testcase {
    /**
     * Create a schema with checks whose status goes healthy, warning, critical, from the newest one back, a day apart.
     *
     * @param int $count How many checks.
     * @return \stdClass The schema record.
     */
    private function schema_with_checks(int $count): \stdClass {
        global $DB;

        $yaml = "meta:\n  id: \"health.test\"\n  name: \"Health test\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n";
        $manager = new manager();
        $schema = $manager->get_schema($manager->create_schema($yaml)['id']);
        $statuses = ['healthy', 'warning', 'critical'];
        for ($i = 0; $i < $count; $i++) {
            $status = $statuses[$i % 3];
            $DB->insert_record('local_servicemanager_logs', (object) [
                'schemaid' => $schema->id,
                'status' => $status,
                'message' => $status === 'healthy' ? 'All checks passed' : "Check {$i}: Service disabled; Token: expired",
                'details' => '{}',
                'timecreated' => time() - $i * DAYSECS,
            ]);
        }
        return $schema;
    }

    /**
     * The context of the page.
     *
     * @param health_page $page The page.
     * @return array The context.
     */
    private function export(health_page $page): array {
        global $PAGE;

        $PAGE->set_url(new \moodle_url('/local/servicemanager/pages/health.php'));
        return $page->export_for_template($PAGE->get_renderer('core'));
    }

    /**
     * The checks are shown a page at a time, newest first, with the count of each status.
     */
    public function test_the_checks_are_shown_a_page_at_a_time(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->schema_with_checks(30);

        $first = $this->export(new health_page($schema));
        $second = $this->export(new health_page($schema, '', 1));

        $this->assertCount(25, $first['rows']);
        $this->assertSame('Showing 1 to 25 of 30', $first['showing']);
        $this->assertSame('healthy', $first['rows'][0]['status']);
        $this->assertSame('Healthy', $first['rows'][0]['statuslabel']);
        $this->assertStringContainsString('page=1', $first['pagingbar']);
        $this->assertCount(5, $second['rows']);
        $this->assertSame('Showing 26 to 30 of 30', $second['showing']);
        $this->assertSame([30, 10, 10, 10], array_column($first['filters'], 'count'));
        $this->assertSame([true, false, false, false], array_column($first['filters'], 'active'));
    }

    /**
     * The checks are narrowed to one status, and the pages count only those.
     */
    public function test_the_checks_are_narrowed_to_one_status(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->schema_with_checks(30);

        $context = $this->export(new health_page($schema, 'warning', 0, 10));

        $this->assertCount(10, $context['rows']);
        $this->assertSame(['warning'], array_values(array_unique(array_column($context['rows'], 'status'))));
        $this->assertSame('Showing 1 to 10 of 10', $context['showing']);
        $this->assertSame([false, false, true, false], array_column($context['filters'], 'active'));
        $this->assertStringContainsString('status=warning', $context['filters'][2]['url']);
    }

    /**
     * What a page cannot be is taken as what it can: an unknown status shows all of them, an unknown size of page the default
     * one, and a page after the last one the last one.
     */
    public function test_what_cannot_be_asked_for_falls_back(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->schema_with_checks(30);

        $context = $this->export(new health_page($schema, 'bogus', 99, 7));

        $this->assertCount(5, $context['rows']);
        $this->assertSame('Showing 26 to 30 of 30', $context['showing']);
        $this->assertTrue($context['filters'][0]['active']);
    }

    /**
     * Each thing a check found is apart from the others.
     */
    public function test_the_findings_of_a_check_are_apart(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->schema_with_checks(2);

        $context = $this->export(new health_page($schema, 'warning'));

        $this->assertSame(
            [['label' => 'Check 1:', 'text' => 'Service disabled'], ['label' => 'Token:', 'text' => 'expired']],
            $context['rows'][0]['findings']
        );
        $this->assertSame('triangle-exclamation', $context['rows'][0]['icon']);
        $this->assertStringEndsWith(' ago', $context['rows'][0]['ago']);
    }

    /**
     * The page of the schema sums the checks up: the latest one, the count of each status there is and where all of them are.
     */
    public function test_the_summary_has_the_latest_check_and_the_counts(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->schema_with_checks(4);

        $summary = health_page::summary($schema);

        $this->assertTrue($summary['hasany']);
        $this->assertSame(4, $summary['total']);
        $this->assertSame('healthy', $summary['latest']['status']);
        $this->assertSame([2, 1, 1], array_column($summary['counts'], 'count'));
        $this->assertStringContainsString('/local/servicemanager/pages/health.php?id=' . $schema->id, $summary['url']);
    }

    /**
     * A schema that was never checked has nothing to sum up, and its page says so.
     */
    public function test_a_schema_never_checked_has_nothing(): void {
        $this->resetAfterTest();
        $this->setAdminUser();
        $schema = $this->schema_with_checks(0);

        $this->assertFalse(health_page::summary($schema)['hasany']);
        $context = $this->export(new health_page($schema));
        $this->assertFalse($context['hasany']);
        $this->assertSame([], $context['rows']);
    }
}
