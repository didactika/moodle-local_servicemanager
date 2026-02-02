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

namespace local_serviceschema\notification;

/**
 * Notification manager for health alerts
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class manager {

    /**
     * Send daily report of health issues
     *
     * @param array $issues Array of issues with 'schema' and 'result'
     */
    public function send_daily_report(array $issues): void {
        if (empty($issues)) {
            return;
        }

        $recipients = $this->get_notification_recipients();
        $subject = get_string('healthcheck_report_subject', 'local_serviceschema');
        $body = $this->build_report_body($issues);

        foreach ($recipients as $recipient) {
            $this->send_message($recipient, $subject, $body);
        }
    }

    /**
     * Send critical alert for a specific schema
     *
     * @param \stdClass $schema Schema record
     * @param string $message Alert message
     */
    public function send_critical_alert(\stdClass $schema, string $message): void {
        $recipients = $this->get_notification_recipients();
        $subject = '[CRITICAL] Service Schema: ' . $schema->name;
        $body = "Critical issue detected with schema '{$schema->name}':\n\n{$message}";

        foreach ($recipients as $recipient) {
            $this->send_message($recipient, $subject, $body);
        }
    }

    /**
     * Build report body from issues
     *
     * @param array $issues Array of issues
     * @return string
     */
    protected function build_report_body(array $issues): string {
        $lines = [];
        $lines[] = get_string('healthcheck_issues_found', 'local_serviceschema', count($issues));
        $lines[] = '';

        foreach ($issues as $issue) {
            $schema = $issue['schema'];
            $result = $issue['result'];

            $icon = $result['status'] === 'critical' ? '❌' : '⚠️';
            $lines[] = "{$icon} {$schema->name} ({$schema->schema_id}):";
            $lines[] = "   Status: " . strtoupper($result['status']);
            $lines[] = "   {$result['message']}";
            $lines[] = '';
        }

        $lines[] = '---';
        $lines[] = 'This is an automated message from Service Schema Manager.';

        return implode("\n", $lines);
    }

    /**
     * Get recipients based on settings
     *
     * Uses notification_emails from settings and optionally site admins
     *
     * @return array User objects
     */
    protected function get_notification_recipients(): array {
        global $DB;

        $recipients = [];

        // Get configured emails.
        $emailsconfig = get_config('local_serviceschema', 'notification_emails');
        if (!empty($emailsconfig)) {
            $emails = array_map('trim', explode(',', $emailsconfig));
            foreach ($emails as $email) {
                if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $user = $DB->get_record('user', ['email' => $email, 'deleted' => 0, 'suspended' => 0]);
                    if ($user) {
                        $recipients[$user->id] = $user;
                    } else {
                        // Create a dummy user for email-only notification.
                        $dummyuser = new \stdClass();
                        $dummyuser->id = -1;
                        $dummyuser->email = $email;
                        $dummyuser->firstname = 'External';
                        $dummyuser->lastname = 'Recipient';
                        $dummyuser->mailformat = 1;
                        $this->send_email_directly($dummyuser, '', '');
                    }
                }
            }
        }

        // Add site admins if configured.
        $notifyadmins = get_config('local_serviceschema', 'notify_admins');
        if ($notifyadmins === false || $notifyadmins) { // Default to true.
            $admins = get_admins();
            foreach ($admins as $admin) {
                $recipients[$admin->id] = $admin;
            }
        }

        return $recipients;
    }

    /**
     * Send email directly to external address
     *
     * @param \stdClass $recipient Recipient with email
     * @param string $subject Subject
     * @param string $body Body
     */
    protected function send_email_directly(\stdClass $recipient, string $subject, string $body): void {
        if (empty($subject) || empty($body)) {
            return;
        }
        
        $noreplyuser = \core_user::get_noreply_user();
        email_to_user($recipient, $noreplyuser, $subject, $body, nl2br(s($body)));
    }

    /**
     * Send a message to a user
     *
     * @param \stdClass $user User object
     * @param string $subject Subject
     * @param string $body Message body
     */
    protected function send_message(\stdClass $user, string $subject, string $body): void {
        $message = new \core\message\message();
        $message->component = 'local_serviceschema';
        $message->name = 'healthalert';
        $message->userfrom = \core_user::get_noreply_user();
        $message->userto = $user;
        $message->subject = $subject;
        $message->fullmessage = $body;
        $message->fullmessageformat = FORMAT_PLAIN;
        $message->fullmessagehtml = nl2br(s($body));
        $message->smallmessage = $subject;
        $message->notification = 1;

        try {
            message_send($message);
        } catch (\Exception $e) {
            mtrace('Failed to send notification to user ' . $user->id . ': ' . $e->getMessage());
        }
    }
}
