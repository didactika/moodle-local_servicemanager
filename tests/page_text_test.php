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

use local_servicemanager\automation\role_settings;
use local_servicemanager\output\page_text;

/**
 * Tests for the strings that the pages give their React components.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\output\page_text
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class page_text_test extends \advanced_testcase {
    /**
     * Every place where the role of a schema can be assigned has a name for the panel of the role, the whole site included,
     * which the panel always lists first.
     */
    public function test_every_context_level_has_a_name(): void {
        $this->resetAfterTest();

        $strings = page_text::strings();

        foreach (array_keys(role_settings::CONTEXT_LEVELS) as $level) {
            $this->assertNotEmpty($strings['role_level_' . $level] ?? '', $level);
        }
        $this->assertSame(get_string('role_level_system', 'local_servicemanager'), $strings['role_level_system']);
    }
}
