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
        $active = self::active_protocols($enabled);
        $level = self::level($enabled, count($active));
        $fix = self::fix($level, $canmanage);
        $tones = ['disabled' => 'danger', 'warning' => 'warning', 'operational' => 'success'];
        $icons = ['disabled' => 'plug-circle-xmark', 'warning' => 'plug-circle-exclamation', 'operational' => 'plug-circle-check'];

        return [
            'enabled' => $enabled,
            'level' => $level,
            'tone' => $tones[$level],
            'icon' => $icons[$level],
            'label' => get_string('ws_status_' . $level, 'local_servicemanager'),
            'protocols' => self::protocols($active),
            'fixurl' => $fix['url'],
            'fixlabel' => $fix['label'],
            'protocolsurl' => $canmanage ? self::settings_url('webserviceprotocols') : '',
        ];
    }

    /**
     * Each protocol of the site, with whether it is on and how to say so.
     *
     * @param string[] $active Names of the protocols that are on.
     * @return array[] One entry for each protocol.
     */
    private static function protocols(array $active): array {
        $protocols = [];
        foreach (array_keys(\core_plugin_manager::instance()->get_plugins_of_type('webservice')) as $key) {
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
        return $protocols;
    }

    /**
     * The protocols that are turned on, when the web services are.
     *
     * @param bool $enabled Whether the web services are turned on.
     * @return string[] Names of the protocols.
     */
    private static function active_protocols(bool $enabled): array {
        global $CFG;

        if (!$enabled || empty($CFG->webserviceprotocols)) {
            return [];
        }
        return array_map('trim', explode(',', $CFG->webserviceprotocols));
    }

    /**
     * How the web services are: off, on without a protocol, or working.
     *
     * @param bool $enabled Whether the web services are turned on.
     * @param int $active How many protocols are turned on.
     * @return string The level.
     */
    private static function level(bool $enabled, int $active): string {
        if (!$enabled) {
            return 'disabled';
        }
        return $active === 0 ? 'warning' : 'operational';
    }

    /**
     * Where to turn on what is off, for a person who can.
     *
     * @param string $level How the web services are.
     * @param bool $canmanage Whether the person can open the settings of the web services.
     * @return string[] The address and the text of the button, empty when nothing is to be turned on.
     */
    private static function fix(string $level, bool $canmanage): array {
        if (!$canmanage || $level === 'operational') {
            return ['url' => '', 'label' => ''];
        }
        if ($level === 'disabled') {
            // The search of the administration shows the setting alone, wherever the release keeps it.
            $search = new \moodle_url('/admin/search.php', ['query' => 'enablewebservices']);
            return ['url' => $search->out(false), 'label' => get_string('ws_enable_services', 'local_servicemanager')];
        }
        return [
            'url' => self::settings_url('webserviceprotocols'),
            'label' => get_string('ws_enable_protocols', 'local_servicemanager'),
        ];
    }
}
