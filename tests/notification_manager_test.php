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

    /**
     * Every configured address gets the report once, whether its account is active, suspended, deleted or there is none.
     */
    public function test_every_configured_address_gets_the_report_once(): void {
        global $DB;
        $this->resetAfterTest();
        $generator = $this->getDataGenerator();
        $generator->create_user(['email' => 'suspended@example.com', 'suspended' => 1]);
        $deleted = $generator->create_user(['email' => 'gone@example.com']);
        $DB->set_field('user', 'deleted', 1, ['id' => $deleted->id]);
        $generator->create_user(['email' => 'ops@example.com']);
        $generator->create_user(['email' => 'ops@example.com']);
        set_config(
            'notification_emails',
            'suspended@example.com, gone@example.com, ops@example.com, outside@example.com',
            'local_servicemanager'
        );
        set_config('notify_admins', 0, 'local_servicemanager');
        $sink = $this->redirectEmails();

        (new manager())->send_daily_report([]);

        $recipients = array_column($sink->get_messages(), 'to');
        $sink->close();
        sort($recipients);
        $this->assertSame(['gone@example.com', 'ops@example.com', 'outside@example.com', 'suspended@example.com'], $recipients);
    }
}
