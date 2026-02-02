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
 * Schema version history page.
 *
 * @package    local_serviceschema
 * @copyright  2026 Your Organization
 * @license    http://www.opensource.org/licenses/MIT MIT License
 */

require_once(__DIR__ . '/../../../config.php');

$id = required_param('id', PARAM_INT);
$action = optional_param('action', '', PARAM_ALPHA);
$historyid = optional_param('historyid', 0, PARAM_INT);

require_login();
require_capability('local/serviceschema:manage', context_system::instance());

$manager = new \local_serviceschema\schema\manager();
$historymanager = new \local_serviceschema\schema\history_manager();

$schema = $manager->get_schema($id);
if (!$schema) {
    throw new moodle_exception('schemanotfound', 'local_serviceschema');
}

$PAGE->set_url(new moodle_url('/local/serviceschema/pages/history.php', ['id' => $id]));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('pluginname', 'local_serviceschema') . ' - ' . get_string('version_history', 'local_serviceschema'));
$PAGE->set_heading(get_string('version_history', 'local_serviceschema') . ': ' . $schema->name);
$PAGE->set_pagelayout('admin');

// Navigation.
$PAGE->navbar->add(get_string('pluginname', 'local_serviceschema'), new moodle_url('/local/serviceschema/pages/dashboard.php'));
$PAGE->navbar->add($schema->name, new moodle_url('/local/serviceschema/pages/view.php', ['id' => $id]));
$PAGE->navbar->add(get_string('version_history', 'local_serviceschema'));

// Handle rollback action.
if ($action === 'rollback' && $historyid && confirm_sesskey()) {
    try {
        $historymanager->rollback($id, $historyid);
        redirect(
            new moodle_url('/local/serviceschema/pages/view.php', ['id' => $id]),
            get_string('rollback_success', 'local_serviceschema'),
            null,
            \core\output\notification::NOTIFY_SUCCESS
        );
    } catch (Exception $e) {
        redirect(
            $PAGE->url,
            get_string('rollback_error', 'local_serviceschema') . ': ' . $e->getMessage(),
            null,
            \core\output\notification::NOTIFY_ERROR
        );
    }
}

echo $OUTPUT->header();

// Back button.
$backurl = new moodle_url('/local/serviceschema/pages/view.php', ['id' => $id]);
echo html_writer::start_div('mb-4');
echo html_writer::link($backurl, html_writer::tag('i', '', ['class' => 'fa fa-arrow-left mr-2']) . get_string('back'), ['class' => 'btn btn-secondary']);
echo html_writer::end_div();

// Get history.
$history = $historymanager->get_history($id);

echo html_writer::start_div('serviceschema-history');

if (empty($history)) {
    echo html_writer::tag('div', get_string('no_history', 'local_serviceschema'), ['class' => 'alert alert-info']);
} else {
    echo html_writer::tag('p', get_string('history_count', 'local_serviceschema', count($history)), ['class' => 'text-muted']);

    foreach ($history as $index => $record) {
        $iscurrent = ($index === 0);
        $classes = 'version-item' . ($iscurrent ? ' current' : '');

        echo html_writer::start_div($classes);

        // Version header.
        echo html_writer::start_div('d-flex justify-content-between align-items-start');
        echo html_writer::start_div();
        echo html_writer::tag('strong', get_string('version') . ' ' . $record->version);
        if ($iscurrent) {
            echo ' ' . html_writer::tag('span', get_string('current', 'local_serviceschema'), ['class' => 'badge badge-success ml-2']);
        }
        echo html_writer::end_div();

        // Rollback button (not for current version).
        if (!$iscurrent) {
            $rollbackurl = new moodle_url($PAGE->url, [
                'action' => 'rollback',
                'historyid' => $record->id,
                'sesskey' => sesskey(),
            ]);
            echo html_writer::link(
                $rollbackurl,
                html_writer::tag('i', '', ['class' => 'fa fa-undo mr-1']) . get_string('rollback', 'local_serviceschema'),
                ['class' => 'btn btn-sm btn-outline-warning', 'onclick' => "return confirm('" . get_string('rollback_confirm', 'local_serviceschema') . "');"]
            );
        }
        echo html_writer::end_div();

        // Meta info.
        echo html_writer::start_div('version-meta mt-2');
        echo html_writer::tag('i', '', ['class' => 'fa fa-user mr-1']);
        echo fullname($record) . ' &bull; ';
        echo html_writer::tag('i', '', ['class' => 'fa fa-clock-o mr-1']);
        echo userdate($record->timecreated, get_string('strftimedatetimeshort'));

        if (!empty($record->change_reason)) {
            echo ' &bull; ';
            echo html_writer::tag('em', $record->change_reason);
        }
        echo html_writer::end_div();

        // Collapsible YAML content.
        $collapseid = 'yaml-content-' . $record->id;
        echo html_writer::start_div('mt-2');
        echo html_writer::tag(
            'a',
            html_writer::tag('i', '', ['class' => 'fa fa-code mr-1']) . get_string('view_yaml', 'local_serviceschema'),
            [
                'class' => 'btn btn-sm btn-link',
                'data-toggle' => 'collapse',
                'href' => '#' . $collapseid,
                'role' => 'button',
                'aria-expanded' => 'false',
            ]
        );
        
        // View Detail Button.
        $viewdetailurl = new moodle_url('/local/serviceschema/pages/view_history.php', ['historyid' => $record->id]);
        echo html_writer::link(
            $viewdetailurl,
            html_writer::tag('i', '', ['class' => 'fa fa-info-circle mr-1']) . get_string('action_view', 'local_serviceschema'),
            ['class' => 'btn btn-sm btn-link ml-2']
        );

        echo html_writer::start_div('collapse mt-2', ['id' => $collapseid]);
        echo html_writer::tag('pre', html_writer::tag('code', s($record->yaml_content)), ['class' => 'bg-light p-3 rounded']);
        echo html_writer::end_div();
        echo html_writer::end_div();

        echo html_writer::end_div(); // version-item
    }
}

echo html_writer::end_div(); // serviceschema-history

echo $OUTPUT->footer();
