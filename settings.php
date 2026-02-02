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

/**
 * Settings for local_serviceschema
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    // Create category for our plugin.
    $ADMIN->add('server', new admin_category(
        'local_serviceschema_category',
        get_string('pluginname', 'local_serviceschema')
    ));

    // Add dashboard link.
    $ADMIN->add('local_serviceschema_category', new admin_externalpage(
        'local_serviceschema_dashboard',
        get_string('dashboard', 'local_serviceschema'),
        new moodle_url('/local/serviceschema/pages/dashboard.php'),
        'local/serviceschema:view'
    ));

    // Add import page link.
    $ADMIN->add('local_serviceschema_category', new admin_externalpage(
        'local_serviceschema_import',
        get_string('import_schemas', 'local_serviceschema'),
        new moodle_url('/local/serviceschema/pages/import.php'),
        'local/serviceschema:manage'
    ));

    // Create settings page with tabs.
    $settings = new admin_settingpage(
        'local_serviceschema_settings',
        get_string('settings', 'local_serviceschema')
    );

    if ($ADMIN->fulltree) {
        // =====================================
        // TAB: Notifications
        // =====================================
        $settings->add(new admin_setting_heading(
            'local_serviceschema/notifications_heading',
            get_string('settings_notifications', 'local_serviceschema'),
            get_string('settings_notifications_desc', 'local_serviceschema')
        ));

        // Notification emails (comma-separated).
        $settings->add(new admin_setting_configtextarea(
            'local_serviceschema/notification_emails',
            get_string('notification_emails', 'local_serviceschema'),
            get_string('notification_emails_desc', 'local_serviceschema'),
            '', // Default empty = use site admins.
            PARAM_TEXT
        ));

        // Send to site admins as well.
        $settings->add(new admin_setting_configcheckbox(
            'local_serviceschema/notify_admins',
            get_string('notify_admins', 'local_serviceschema'),
            get_string('notify_admins_desc', 'local_serviceschema'),
            1
        ));

        // Notification level.
        $settings->add(new admin_setting_configselect(
            'local_serviceschema/notification_level',
            get_string('notification_level', 'local_serviceschema'),
            get_string('notification_level_desc', 'local_serviceschema'),
            'warning',
            [
                'critical' => get_string('status_critical', 'local_serviceschema'),
                'warning' => get_string('status_warning', 'local_serviceschema'),
                'all' => get_string('notification_level_all', 'local_serviceschema'),
            ]
        ));

        // =====================================
        // TAB: Health Check
        // =====================================
        $settings->add(new admin_setting_heading(
            'local_serviceschema/healthcheck_heading',
            get_string('settings_healthcheck', 'local_serviceschema'),
            get_string('settings_healthcheck_desc', 'local_serviceschema')
        ));

        // Health check enabled.
        $settings->add(new admin_setting_configcheckbox(
            'local_serviceschema/healthcheck_enabled',
            get_string('healthcheck_enabled', 'local_serviceschema'),
            get_string('healthcheck_enabled_desc', 'local_serviceschema'),
            1
        ));

        // =====================================
        // TAB: Log Cleanup
        // =====================================
        $settings->add(new admin_setting_heading(
            'local_serviceschema/cleanup_heading',
            get_string('settings_cleanup', 'local_serviceschema'),
            get_string('settings_cleanup_desc', 'local_serviceschema')
        ));

        // Log cleanup enabled.
        $settings->add(new admin_setting_configcheckbox(
            'local_serviceschema/cleanup_enabled',
            get_string('cleanup_enabled', 'local_serviceschema'),
            get_string('cleanup_enabled_desc', 'local_serviceschema'),
            1
        ));

        // Log retention days.
        $settings->add(new admin_setting_configtext(
            'local_serviceschema/cleanup_retention_days',
            get_string('cleanup_retention_days', 'local_serviceschema'),
            get_string('cleanup_retention_days_desc', 'local_serviceschema'),
            30,
            PARAM_INT
        ));

        // =====================================
        // TAB: Version Retention
        // =====================================
        $settings->add(new admin_setting_heading(
            'local_serviceschema/version_retention_heading',
            get_string('settings_version_retention', 'local_serviceschema'),
            get_string('settings_version_retention_desc', 'local_serviceschema')
        ));

        // Version retention enabled.
        $settings->add(new admin_setting_configcheckbox(
            'local_serviceschema/version_retention_enabled',
            get_string('version_retention_enabled', 'local_serviceschema'),
            get_string('version_retention_enabled_desc', 'local_serviceschema'),
            1
        ));

        // Max versions per schema.
        $settings->add(new admin_setting_configtext(
            'local_serviceschema/version_retention_max',
            get_string('version_retention_max', 'local_serviceschema'),
            get_string('version_retention_max_desc', 'local_serviceschema'),
            10,
            PARAM_INT
        ));
    }

    $ADMIN->add('local_serviceschema_category', $settings);
}
