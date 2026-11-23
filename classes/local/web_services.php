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

namespace local_servicemanager\local;

/**
 * Turns the web services of the site, or one of their protocols, on or off.
 *
 * The settings are written the way the administration writes them, so every change is kept in the log of the configuration
 * (which triggers the event config_log_created) and every callback of the setting runs.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class web_services {
    /**
     * Turns the web services, or one protocol, on or off.
     *
     * @param bool $enable Whether to turn it on.
     * @param string $protocol The protocol, or empty for the web services of the site.
     * @return string What was done, to tell the person.
     */
    public static function apply(bool $enable, string $protocol = ''): string {
        global $CFG;

        require_once($CFG->libdir . '/adminlib.php');
        if ($protocol !== '') {
            // A protocol: the same call as the page of the protocols, which writes the setting and keeps the change in the log.
            if (!array_key_exists($protocol, \core_component::get_plugin_list('webservice'))) {
                throw new \moodle_exception('invalidparameter', 'debug');
            }
            \core\plugininfo\webservice::enable_plugin($protocol, $enable ? 1 : 0);
            $key = $enable ? 'ws_protocol_enabled_done' : 'ws_protocol_disabled_done';
            return get_string($key, 'local_servicemanager', strtoupper($protocol));
        }
        if ((bool) !empty($CFG->enablewebservices) !== $enable) {
            // The same path as saving the page of the administration: the value, the log of the configuration and its callbacks.
            admin_write_settings((object) ['s__enablewebservices' => $enable ? '1' : '0']);
        }
        return get_string($enable ? 'ws_enabled_done' : 'ws_disabled_done', 'local_servicemanager');
    }
}
