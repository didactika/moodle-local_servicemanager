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
 * The results of the health checks of a schema, a page at a time.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

$id = required_param('id', PARAM_INT);
$status = optional_param('status', '', PARAM_ALPHA);
$page = optional_param('page', 0, PARAM_INT);
$perpage = optional_param('perpage', \local_servicemanager\output\health_page::PERPAGE_DEFAULT, PARAM_INT);

require_login();
$context = context_system::instance();
require_capability('local/servicemanager:view', $context);

$dashboardurl = new moodle_url('/local/servicemanager/pages/dashboard.php');
$schema = (new \local_servicemanager\schema\manager())->get_schema($id);
if (!$schema) {
    redirect(
        $dashboardurl,
        get_string('schema_not_found', 'local_servicemanager'),
        null,
        \core\output\notification::NOTIFY_WARNING
    );
}

$title = get_string('health_checks', 'local_servicemanager');
$PAGE->set_context($context);
$PAGE->set_url(new moodle_url(
    '/local/servicemanager/pages/health.php',
    ['id' => $id, 'status' => $status, 'page' => $page, 'perpage' => $perpage]
));
$PAGE->set_title($schema->name . ': ' . $title);
$PAGE->set_heading($schema->name);
$PAGE->set_pagelayout('admin');
$PAGE->navbar->add(get_string('pluginname', 'local_servicemanager'), $dashboardurl);
$PAGE->navbar->add($schema->name, new moodle_url('/local/servicemanager/pages/view.php', ['id' => $id]));
$PAGE->navbar->add($title);

echo $OUTPUT->header();
echo \local_servicemanager\output\react_page::render(
    new \local_servicemanager\output\health_page($schema, $status, $page, $perpage),
    'list'
);
echo $OUTPUT->footer();
