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

// Pagination parameters.
$page = optional_param('page', 0, PARAM_INT);
$perpage = optional_param('perpage', 10, PARAM_INT);

// Filter parameters.
$filterstatus = optional_param('status', '', PARAM_ALPHANUMEXT);
$filtername = optional_param('name', '', PARAM_TEXT);
$datefrom = optional_param('datefrom', 0, PARAM_INT);
$dateto = optional_param('dateto', 0, PARAM_INT);

// Build filters array.
$filters = [];
if (!empty($filterstatus)) {
    $filters['status'] = $filterstatus;
}
if (!empty($filtername)) {
    $filters['name'] = $filtername;
}
if ($datefrom > 0) {
    $filters['datefrom'] = $datefrom;
}
if ($dateto > 0) {
    $filters['dateto'] = $dateto;
}

$hasfilters = !empty($filters);

$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/serviceschema/pages/dashboard.php', [
    'page' => $page,
    'perpage' => $perpage,
    'status' => $filterstatus,
    'name' => $filtername,
    'datefrom' => $datefrom,
    'dateto' => $dateto,
]));
$PAGE->set_title(get_string('dashboard', 'local_serviceschema'));
$PAGE->set_heading(get_string('pluginname', 'local_serviceschema'));
$PAGE->set_pagelayout('admin');

// Get paginated schemas.
$manager = new \local_serviceschema\schema\manager();
$totalcount = $manager->count_schemas($filters);
$schemas = $manager->get_schemas_paginated($page, $perpage, $filters);

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

// Calculate pagination.
$totalpages = ceil($totalcount / $perpage);
$paginationdata = [];
if ($totalpages > 1) {
    $baseurl = new moodle_url('/local/serviceschema/pages/dashboard.php', [
        'perpage' => $perpage,
        'status' => $filterstatus,
        'name' => $filtername,
        'datefrom' => $datefrom,
        'dateto' => $dateto,
    ]);

    // First.
    $paginationdata['show_first'] = $page > 1;
    $paginationdata['first_url'] = $baseurl->out(false, ['page' => 0]);

    // Previous.
    $paginationdata['show_previous'] = $page > 0;
    $paginationdata['previous_url'] = $baseurl->out(false, ['page' => $page - 1]);

    // Page numbers.
    $pages = [];
    $start = max(0, $page - 2);
    $end = min($totalpages - 1, $page + 2);

    for ($i = $start; $i <= $end; $i++) {
        $pages[] = [
            'page_num' => $i + 1,
            'page_url' => $baseurl->out(false, ['page' => $i]),
            'is_current' => $i === $page,
        ];
    }
    $paginationdata['pages'] = $pages;

    // Show dots.
    $paginationdata['show_start_dots'] = $start > 0;
    $paginationdata['show_end_dots'] = $end < $totalpages - 1;

    // Last page link.
    $paginationdata['show_last'] = $page < $totalpages - 2;
    $paginationdata['last_url'] = $baseurl->out(false, ['page' => $totalpages - 1]);
    $paginationdata['last_page_num'] = $totalpages;

    // Next.
    $paginationdata['show_next'] = $page < $totalpages - 1;
    $paginationdata['next_url'] = $baseurl->out(false, ['page' => $page + 1]);

    // Page info.
    $paginationdata['current_page'] = $page + 1;
    $paginationdata['total_pages'] = $totalpages;
}
$haspagination = $totalpages > 1;

$templatedata = [
    'schemas' => $schemasdata,
    'schemas_length' => count($schemasdata),
    'import_url' => (new moodle_url('/local/serviceschema/pages/import.php'))->out(false),
    'export_all_url' => (new moodle_url('/local/serviceschema/pages/export.php', ['all' => 1]))->out(false),
    'bulk_action_url' => (new moodle_url('/local/serviceschema/pages/bulk_action.php'))->out(false),
    'documentation_url' => (new moodle_url('/local/serviceschema/pages/documentation.php'))->out(false),
    'can_manage' => has_capability('local/serviceschema:manage', $context),
    'sesskey' => sesskey(),
    'has_any_schemas' => $totalcount > 0,
    // Pagination.
    'has_pagination' => $haspagination,
    'pagination' => $paginationdata,
    'total_count' => $totalcount,
    // Filters.
    'has_filters' => $hasfilters,
    'filter_count' => count($filters),
    'filter_status' => $filterstatus,
    'filter_status_healthy' => $filterstatus === 'healthy',
    'filter_status_warning' => $filterstatus === 'warning',
    'filter_status_critical' => $filterstatus === 'critical',
    'filter_name' => $filtername,
    'filter_datefrom' => $datefrom > 0 ? date('Y-m-d', $datefrom) : '',
    'filter_dateto' => $dateto > 0 ? date('Y-m-d', $dateto) : '',
    'perpage' => $perpage,
    'perpage_options' => [
        ['value' => 10, 'selected' => $perpage == 10],
        ['value' => 25, 'selected' => $perpage == 25],
        ['value' => 50, 'selected' => $perpage == 50],
        ['value' => 100, 'selected' => $perpage == 100],
    ],
    'current_url' => $PAGE->url->out(false),
];

echo $OUTPUT->header();
echo $OUTPUT->render_from_template('local_serviceschema/dashboard', $templatedata);
echo $OUTPUT->footer();
