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
 * Turns the web services of the site on or off from the dashboard, without opening the administration.
 *
 * The setting is written the way the administration writes it, so the change is kept in the log of the configuration
 * (which triggers the event config_log_created) and every callback of the setting runs.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

require_login();
require_capability('moodle/site:config', context_system::instance());
require_sesskey();
$PAGE->set_context(context_system::instance());
$PAGE->set_url(new moodle_url('/local/servicemanager/pages/web_services.php'));

$enable = required_param('enable', PARAM_BOOL);
$protocol = optional_param('protocol', '', PARAM_PLUGIN);
$returnurl = optional_param('returnurl', '', PARAM_LOCALURL);
$back = $returnurl !== '' ? new moodle_url($returnurl) : new moodle_url('/local/servicemanager/pages/dashboard.php');

$message = \local_servicemanager\local\web_services::apply((bool) $enable, $protocol);

redirect($back, $message, null, \core\output\notification::NOTIFY_SUCCESS);
