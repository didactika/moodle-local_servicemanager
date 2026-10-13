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

namespace local_servicemanager\output;

/**
 * The state of the web services of the site, which the dashboard and the page of a schema show in the same place.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class ws_status {
    /**
     * The address of a page of the settings of Moodle.
     *
     * @param string $section Section of the settings.
     * @return string The address.
     */
    private static function settings_url(string $section): string {
        return (new \moodle_url('/admin/settings.php', ['section' => $section]))->out(false);
    }

    /**
     * Whether the web services work, with each protocol and where to turn on what is off.
     *
     * @param bool $canmanage Whether the person can open the settings of the web services.
     * @return array The state, in the shape the template of the page takes.
     */
    public static function describe(bool $canmanage): array {
        global $CFG;

        $enabled = !empty($CFG->enablewebservices);
        $active = ($enabled && !empty($CFG->webserviceprotocols))
            ? array_map('trim', explode(',', $CFG->webserviceprotocols))
            : [];

        $protocols = [];
        foreach (\core_plugin_manager::instance()->get_plugins_of_type('webservice') as $key => $plugin) {
            $on = in_array($key, $active);
            $protocols[] = [
                'name' => strtoupper($key),
                'fullname' => get_string('pluginname', 'webservice_' . $key),
                'enabled' => $on,
                'state' => $on ? 'on' : 'off',
                'icon' => $on ? 'circle-check' : 'circle-minus',
                'label' => get_string($on ? 'ws_enabled_label' : 'ws_disabled_label', 'local_servicemanager'),
            ];
        }

        if (!$enabled) {
            $level = 'disabled';
        } else if (count($active) === 0) {
            $level = 'warning';
        } else {
            $level = 'operational';
        }
        $tones = ['disabled' => 'danger', 'warning' => 'warning', 'operational' => 'success'];
        $icons = ['disabled' => 'plug-circle-xmark', 'warning' => 'plug-circle-exclamation', 'operational' => 'plug-circle-check'];

        $fix = ['url' => '', 'label' => ''];
        if ($canmanage && $level === 'disabled') {
            $subsystems = new \moodle_url('/admin/settings.php', ['section' => 'optionalsubsystems'], 'admin-enablewebservices');
            $fix = [
                'url' => $subsystems->out(false),
                'label' => get_string('ws_enable_services', 'local_servicemanager'),
            ];
        } else if ($canmanage && $level === 'warning') {
            $fix = [
                'url' => self::settings_url('webserviceprotocols'),
                'label' => get_string('ws_enable_protocols', 'local_servicemanager'),
            ];
        }

        return [
            'enabled' => $enabled,
            'level' => $level,
            'tone' => $tones[$level],
            'icon' => $icons[$level],
            'label' => get_string('ws_status_' . $level, 'local_servicemanager'),
            'protocols' => $protocols,
            'fixurl' => $fix['url'],
            'fixlabel' => $fix['label'],
            'protocolsurl' => $canmanage ? self::settings_url('webserviceprotocols') : '',
        ];
    }
}
