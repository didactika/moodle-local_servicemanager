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

use local_servicemanager\schema\suggester;

/**
 * Tests for what the guided form suggests while the person types.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\schema\suggester
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class suggester_test extends \advanced_testcase {
    /**
     * Two letters are enough to get a good number of functions, and every one of them contains what was typed.
     */
    public function test_functions_that_match_are_suggested(): void {
        $this->resetAfterTest();

        $found = (new suggester())->suggest('function', 'core_user');

        $this->assertGreaterThanOrEqual(10, count($found));
        $this->assertLessThanOrEqual(suggester::LIMIT, count($found));
        foreach ($found as $suggestion) {
            $this->assertStringContainsString('core_user', $suggestion['value']);
            $this->assertSame($suggestion['value'], $suggestion['label']);
        }
    }

    /**
     * Capabilities and plugins are suggested the same way.
     */
    public function test_capabilities_and_plugins_are_suggested(): void {
        $this->resetAfterTest();
        $suggester = new suggester();

        $capabilities = $suggester->suggest('capability', 'moodle/course:');
        $this->assertGreaterThanOrEqual(10, count($capabilities));
        $this->assertSame('moodle/course:update', $suggester->suggest('capability', 'moodle/course:update')[0]['value']);

        $plugins = $suggester->suggest('plugin', 'mod_');
        $this->assertGreaterThanOrEqual(10, count($plugins));
        $this->assertContains('mod_forum', array_column($suggester->suggest('plugin', 'forum'), 'value'));
    }

    /**
     * People are suggested by their email, which is what a schema names them by, and the label says who they are.
     */
    public function test_users_are_suggested_by_email(): void {
        $this->resetAfterTest();
        $this->getDataGenerator()->create_user(['firstname' => 'Ada', 'lastname' => 'Lovelace', 'email' => 'ada@example.com']);
        $this->getDataGenerator()->create_user(['firstname' => 'Alan', 'lastname' => 'Turing', 'email' => 'alan@example.com']);
        $deleted = $this->getDataGenerator()->create_user(
            ['firstname' => 'Ada', 'lastname' => 'Gone', 'email' => 'gone@example.com']
        );
        delete_user($deleted);

        $byname = (new suggester())->suggest('user', 'lovelace');
        $this->assertCount(1, $byname);
        $this->assertSame('ada@example.com', $byname[0]['value']);
        $this->assertStringContainsString('Ada Lovelace', $byname[0]['label']);

        $byemail = (new suggester())->suggest('user', 'alan@');
        $this->assertSame(['alan@example.com'], array_column($byemail, 'value'));
        $this->assertSame([], (new suggester())->suggest('user', 'gone@'));
    }

    /**
     * Something that is not suggested gives nothing.
     */
    public function test_an_unknown_kind_gives_nothing(): void {
        $this->resetAfterTest();

        $this->assertSame([], (new suggester())->suggest('colour', 'red'));
    }

    /**
     * What is typed is text: markup in it is refused as a parameter that is not, instead of being searched for as it came.
     */
    public function test_what_is_typed_must_be_text(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $suggestions = \local_servicemanager\external\get_suggestions::execute('function', 'core_webservice_get_site');
        $this->assertContains('core_webservice_get_site_info', array_column($suggestions, 'value'));

        $this->expectException(\invalid_parameter_exception::class);
        \local_servicemanager\external\get_suggestions::execute('function', '<b>core_webservice_get_site_info</b>');
    }
}
