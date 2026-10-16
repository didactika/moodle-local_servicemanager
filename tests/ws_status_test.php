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

use local_servicemanager\output\ws_status;

/**
 * Tests for the state of the web services of the site and the links that turn on what is off.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\output\ws_status
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class ws_status_test extends \advanced_testcase {
    /**
     * With the web services off, the link to turn them on searches the administration for the setting.
     */
    public function test_the_web_services_are_turned_on_from_the_search_of_the_setting(): void {
        $this->resetAfterTest();
        set_config('enablewebservices', 0);

        $status = ws_status::describe(true);

        $this->assertSame('disabled', $status['level']);
        $this->assertSame((new \moodle_url('/admin/search.php', ['query' => 'enablewebservices']))->out(false), $status['fixUrl']);
        $this->assertSame(get_string('ws_enable_services', 'local_servicemanager'), $status['fixLabel']);
    }

    /**
     * Who cannot manage schemas is not offered the link, and with everything on there is nothing to turn on.
     */
    public function test_there_is_no_link_when_it_cannot_be_used_or_is_not_needed(): void {
        global $CFG;
        $this->resetAfterTest();
        set_config('enablewebservices', 0);
        $this->assertSame('', ws_status::describe(false)['fixUrl']);

        set_config('enablewebservices', 1);
        set_config('webserviceprotocols', 'rest');
        $CFG->webserviceprotocols = 'rest';
        $this->assertSame('operational', ws_status::describe(true)['level']);
        $this->assertSame('', ws_status::describe(true)['fixUrl']);
    }
}
