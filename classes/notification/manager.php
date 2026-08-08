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

namespace local_servicemanager\notification;

/**
 * Notification manager for health alerts
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class manager {
    /** Brand colour used when the theme declares none. Moodle teal. */
    const FALLBACK_COLOR = '#0f6674';

    /** Marker ID for a recipient that is an address rather than a Moodle user. */
    const EXTERNAL_RECIPIENT_ID = -1;

    /**
     * Send daily report of health issues (and optionally healthy status)
     *
     * @param array $issues Array of issues with 'schema' and 'result'
     * @param array $healthyschemas Array of healthy schemas
     */
    public function send_daily_report(array $issues, array $healthyschemas = []): void {
        global $OUTPUT;

        $recipients = $this->get_notification_recipients();
        if (empty($recipients)) {
            return;
        }

        $site = get_site();
        $context = array_merge(
            $this->report_context($site, $issues, $healthyschemas),
            $this->branding_context(),
            $this->status_context($issues),
            [
                'issues' => $this->describe_issues($issues),
                'healthy_schemas' => $this->describe_healthy_schemas($healthyschemas),
            ]
        );

        $htmlbody = $OUTPUT->render_from_template('local_servicemanager/email_health_report', $context);
        $subject = 'Campus ' . $site->shortname . ': '
            . get_string('healthcheck_report_subject', 'local_servicemanager');

        $this->deliver($recipients, $subject, strip_tags($htmlbody), $htmlbody);
    }

    /**
     * Send critical alert for a specific schema
     *
     * @param \stdClass $schema Schema record
     * @param string $message Alert message
     */
    public function send_critical_alert(\stdClass $schema, string $message): void {
        global $CFG;

        $recipients = $this->get_notification_recipients();
        if (empty($recipients)) {
            return;
        }

        $subject = get_string('alert_critical_subject', 'local_servicemanager', $schema->name);
        $body = get_string('alert_critical_body', 'local_servicemanager', (object) [
            'name' => $schema->name,
            'message' => $message,
        ]);
        $htmlbody = nl2br(s($body)) . '<br><br><a href="' . $CFG->wwwroot
            . '/local/servicemanager/pages/view.php?id=' . $schema->id . '">'
            . get_string('view_schema', 'local_servicemanager') . '</a>';

        $this->deliver($recipients, $subject, $body, $htmlbody);
    }

    /**
     * Site-level part of the report template context.
     *
     * @param \stdClass $site Site record from get_site()
     * @param array $issues Array of issues
     * @param array $healthyschemas Array of healthy schemas
     * @return array
     */
    protected function report_context(\stdClass $site, array $issues, array $healthyschemas): array {
        global $CFG;

        return [
            'site_name' => $site->fullname,
            'site_url' => $CFG->wwwroot,
            'report_date' => userdate(time()),
            'dashboard_url' => (new \moodle_url('/local/servicemanager/pages/dashboard.php'))->out(false),
            'has_issues' => !empty($issues),
            'has_healthy' => !empty($healthyschemas),
        ];
    }

    /**
     * Logo and brand colour taken from the current theme.
     *
     * Branding is decoration, so a theme that cannot answer must not stop the
     * report going out: any failure falls back to the default colour.
     *
     * @return array
     */
    protected function branding_context(): array {
        global $CFG;

        $context = ['primary_color' => self::FALLBACK_COLOR];

        try {
            $logourl = $this->get_theme_logo_url();
            if ($logourl) {
                $context['logo_url'] = $logourl;
            }

            $brandcolor = get_config('theme_' . $CFG->theme, 'brandcolor');
            if ($brandcolor) {
                $context['primary_color'] = $brandcolor;
            }
        } catch (\Exception $e) {
            $context['primary_color'] = self::FALLBACK_COLOR;
        }

        return $context;
    }

    /**
     * Headline strings, which depend only on whether anything is wrong.
     *
     * @param array $issues Array of issues
     * @return array
     */
    protected function status_context(array $issues): array {
        if (!empty($issues)) {
            return [
                'status_class' => 'danger',
                'status_text' => get_string('healthcheck_issues_found', 'local_servicemanager', count($issues)),
                'summary_text' => get_string('healthcheck_issues_summary', 'local_servicemanager'),
            ];
        }

        return [
            'status_class' => 'success',
            'status_text' => get_string('healthcheck_all_healthy', 'local_servicemanager'),
            'summary_text' => get_string('healthcheck_healthy_summary', 'local_servicemanager'),
        ];
    }

    /**
     * Flatten issues into rows the template can render.
     *
     * @param array $issues Array of issues with 'schema' and 'result'
     * @return array
     */
    protected function describe_issues(array $issues): array {
        $rows = [];

        foreach ($issues as $issue) {
            $schema = $issue['schema'];
            $result = $issue['result'];

            $rows[] = [
                'name' => $schema->name,
                'schema_id' => $schema->schema_id,
                'status' => $result['status'], // Either warning or critical.
                'status_label' => strtoupper($result['status']),
                'messages' => explode('; ', $result['message']),
                'view_url' => (new \moodle_url(
                    '/local/servicemanager/pages/view.php',
                    ['id' => $schema->id]
                ))->out(false),
            ];
        }

        return $rows;
    }

    /**
     * Flatten healthy schemas into rows the template can render.
     *
     * @param array $schemas Schema records
     * @return array
     */
    protected function describe_healthy_schemas(array $schemas): array {
        $rows = [];

        foreach ($schemas as $schema) {
            $rows[] = [
                'name' => $schema->name,
                'schema_id' => $schema->schema_id,
            ];
        }

        return $rows;
    }

    /**
     * Mail one message to every recipient.
     *
     * External addresses carry a marker ID instead of a real user ID, but
     * email_to_user() only needs the address, so both kinds are sent the same way.
     *
     * @param array $recipients User objects
     * @param string $subject Subject
     * @param string $textbody Plain text body
     * @param string $htmlbody HTML body
     */
    protected function deliver(array $recipients, string $subject, string $textbody, string $htmlbody): void {
        $noreplyuser = \core_user::get_noreply_user();

        foreach ($recipients as $recipient) {
            email_to_user($recipient, $noreplyuser, $subject, $textbody, $htmlbody);
        }
    }

    /**
     * Get recipients based on settings
     *
     * Uses notification_emails from settings and optionally site admins
     *
     * @return array User objects
     */
    protected function get_notification_recipients(): array {
        return $this->add_admin_recipients($this->configured_recipients());
    }

    /**
     * Recipients named in the notification_emails setting.
     *
     * Keys are the user ID for real users and a prefixed address otherwise, so
     * an address repeated in the setting cannot produce two copies of the mail.
     *
     * @return array User objects
     */
    protected function configured_recipients(): array {
        global $DB;

        $emailsconfig = get_config('local_servicemanager', 'notification_emails');
        if (empty($emailsconfig)) {
            return [];
        }

        $recipients = [];

        foreach (array_map('trim', explode(',', $emailsconfig)) as $email) {
            if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                continue;
            }

            $user = $DB->get_record('user', ['email' => $email, 'deleted' => 0, 'suspended' => 0]);
            if ($user) {
                $recipients[$user->id] = $user;
            } else {
                $recipients['external_' . $email] = $this->external_recipient($email);
            }
        }

        return $recipients;
    }

    /**
     * Add site admins unless the setting turns them off.
     *
     * @param array $recipients Recipients gathered so far
     * @return array User objects
     */
    protected function add_admin_recipients(array $recipients): array {
        $notifyadmins = get_config('local_servicemanager', 'notify_admins');
        if ($notifyadmins !== false && !$notifyadmins) {
            return $recipients;
        }

        $known = array_column($recipients, 'email');

        foreach (get_admins() as $admin) {
            if (!in_array($admin->email, $known)) {
                $recipients[$admin->id] = $admin;
                $known[] = $admin->email;
            }
        }

        return $recipients;
    }

    /**
     * Build a stand-in user for an address that belongs to no Moodle account.
     *
     * @param string $email Email address
     * @return \stdClass
     */
    protected function external_recipient(string $email): \stdClass {
        global $CFG;

        $user = new \stdClass();
        $user->id = self::EXTERNAL_RECIPIENT_ID;
        $user->email = $email;
        $user->firstname = 'External';
        $user->lastname = 'Recipient';
        $user->mailformat = 1;
        $user->mnethostid = $CFG->mnet_localhost_id ?? 1;

        return $user;
    }

    /**
     * Get theme logo URL safely
     *
     * @return string|null URL or null
     */
    protected function get_theme_logo_url(): ?string {
        // Moodle stores logos in core_admin, not in the theme.
        $logo = get_config('core_admin', 'logo');
        if (empty($logo)) {
            return null;
        }

        // Build URL matching core's approach.
        $syscontext = \context_system::instance();
        $filepath = '200x200/'; // Standard size.

        $url = \moodle_url::make_pluginfile_url(
            $syscontext->id,
            'core_admin',
            'logo',
            $filepath,
            theme_get_revision(),
            $logo
        );

        return $url->out(false);
    }
}
