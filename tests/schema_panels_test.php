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

use local_servicemanager\output\schema_panels;

/**
 * Tests for the panels of the page of a schema.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\output\schema_panels
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class schema_panels_test extends \advanced_testcase {
    /**
     * The places where the role can be assigned are named with the strings of the plugin, the whole site, which is always one
     * of them, included.
     */
    public function test_the_context_levels_of_the_role_are_named_with_strings(): void {
        $this->resetAfterTest();

        $panel = schema_panels::role_panel(['context_levels' => ['course', 'user']]);

        $this->assertTrue($panel['visible']);
        $this->assertSame(
            [
                get_string('role_level_system', 'local_servicemanager'),
                get_string('role_level_course', 'local_servicemanager'),
                get_string('role_level_user', 'local_servicemanager'),
            ],
            array_column($panel['rows'][0]['names'], 'name')
        );
    }
}
