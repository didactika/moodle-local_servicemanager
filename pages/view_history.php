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
 * View page for historical schema details
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

require_login();
$context = context_system::instance();
require_capability('local/servicemanager:view', $context);

$historyid = required_param('historyid', PARAM_INT);

$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/servicemanager/pages/view_history.php', ['historyid' => $historyid]));
$PAGE->set_title(get_string('view_schema', 'local_servicemanager'));
$PAGE->set_heading(get_string('view_schema', 'local_servicemanager'));
$PAGE->set_pagelayout('admin');

$historymanager = new \local_servicemanager\schema\history_manager();
$history = $historymanager->get_version($historyid);

if (!$history) {
    throw new moodle_exception('historynotfound', 'local_servicemanager');
}

echo $OUTPUT->header();
echo \local_servicemanager\output\react_page::render(
    \local_servicemanager\output\schema_page::for_history($history),
    'detail'
);
echo $OUTPUT->footer();
