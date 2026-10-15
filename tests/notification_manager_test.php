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

use local_servicemanager\notification\manager;

/**
 * Tests for the mails that the plugin sends.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\notification\manager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class notification_manager_test extends \advanced_testcase {
    /**
     * The daily report is titled with the short name of the site and nothing else of a particular organisation.
     */
    public function test_the_daily_report_is_titled_with_the_site(): void {
        $this->resetAfterTest();
        $user = $this->getDataGenerator()->create_user(['email' => 'ops@example.com']);
        set_config('notification_emails', $user->email, 'local_servicemanager');
        set_config('notify_admins', 0, 'local_servicemanager');
        $sink = $this->redirectEmails();

        (new manager())->send_daily_report([]);

        $messages = $sink->get_messages();
        $sink->close();
        $this->assertCount(1, $messages);
        $this->assertSame(get_site()->shortname . ': Web service schema health report', $messages[0]->subject);
    }
}
