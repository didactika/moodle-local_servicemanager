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
 * Dashboard page for Service Schema Manager
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

require_login();
$context = context_system::instance();
require_capability('local/serviceschema:view', $context);

$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/serviceschema/pages/dashboard.php'));
$PAGE->set_title(get_string('dashboard', 'local_serviceschema'));
$PAGE->set_heading(get_string('pluginname', 'local_serviceschema'));
$PAGE->set_pagelayout('admin');

// Get all schemas.
$manager = new \local_serviceschema\schema\manager();
$schemas = $manager->get_all_schemas();

// Build data for template.
$schemasdata = [];
foreach ($schemas as $schema) {
    $statusclass = 'badge-success';
    $statusicon = 'fa-check-circle';
    if ($schema->status === 'warning') {
        $statusclass = 'badge-warning';
        $statusicon = 'fa-exclamation-triangle';
    } elseif ($schema->status === 'critical') {
        $statusclass = 'badge-danger';
        $statusicon = 'fa-times-circle';
    }

    $schemasdata[] = [
        'id' => $schema->id,
        'schema_id' => $schema->schema_id,
        'name' => $schema->name,
        'version' => $schema->version,
        'status' => $schema->status,
        'status_label' => get_string('status_' . $schema->status, 'local_serviceschema'),
        'status_class' => $statusclass,
        'status_icon' => $statusicon,
        'enabled' => (bool) $schema->enabled,
        'has_token' => !empty($schema->tokenid),
        'timecreated' => userdate($schema->timecreated),
        'timemodified' => userdate($schema->timemodified),
        'view_url' => (new moodle_url('/local/serviceschema/pages/view.php', ['id' => $schema->id]))->out(false),
        'edit_url' => (new moodle_url('/local/serviceschema/pages/edit.php', ['id' => $schema->id]))->out(false),
        'delete_url' => (new moodle_url('/local/serviceschema/pages/delete.php', ['id' => $schema->id]))->out(false),
        'export_url' => (new moodle_url('/local/serviceschema/pages/export.php', ['id' => $schema->id]))->out(false),
        'history_url' => (new moodle_url('/local/serviceschema/pages/history.php', ['id' => $schema->id]))->out(false),
        'can_manage' => has_capability('local/serviceschema:manage', $context),
    ];
}

$templatedata = [
    'schemas' => $schemasdata,
    'has_schemas' => !empty($schemasdata),
    'upload_url' => (new moodle_url('/local/serviceschema/pages/upload.php'))->out(false),
    'import_url' => (new moodle_url('/local/serviceschema/pages/import.php'))->out(false),
    'export_all_url' => (new moodle_url('/local/serviceschema/pages/export.php', ['all' => 1]))->out(false),
    'bulk_action_url' => (new moodle_url('/local/serviceschema/pages/bulk_action.php'))->out(false),
    'can_manage' => has_capability('local/serviceschema:manage', $context),
    'sesskey' => sesskey(),
];

echo $OUTPUT->header();
echo $OUTPUT->render_from_template('local_serviceschema/dashboard', $templatedata);
echo $OUTPUT->footer();
