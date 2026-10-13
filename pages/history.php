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
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

$id = required_param('id', PARAM_INT);
$action = optional_param('action', '', PARAM_ALPHA);
$historyid = optional_param('historyid', 0, PARAM_INT);

require_login();
require_capability('local/servicemanager:manage', context_system::instance());

$manager = new \local_servicemanager\schema\manager();
$historymanager = new \local_servicemanager\schema\history_manager();

$schema = $manager->get_schema($id);
if (!$schema) {
    redirect(
        new moodle_url('/local/servicemanager/pages/dashboard.php'),
        get_string('schema_not_found', 'local_servicemanager'),
        null,
        \core\output\notification::NOTIFY_WARNING
    );
}

$PAGE->set_url(new moodle_url('/local/servicemanager/pages/history.php', ['id' => $id]));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('pluginname', 'local_servicemanager') . ' - ' . get_string('version_history', 'local_servicemanager'));
$PAGE->set_heading($schema->name);
$PAGE->set_pagelayout('admin');

// Navigation.
$PAGE->navbar->add(get_string('pluginname', 'local_servicemanager'), new moodle_url('/local/servicemanager/pages/dashboard.php'));
$PAGE->navbar->add($schema->name, new moodle_url('/local/servicemanager/pages/view.php', ['id' => $id]));
$PAGE->navbar->add(get_string('version_history', 'local_servicemanager'));

// Handle rollback action.
$confirm = optional_param('confirm', 0, PARAM_INT);

if ($action === 'rollback' && $historyid && confirm_sesskey()) {
    if ($confirm) {
        // Confirmed - perform rollback.
        try {
            $historymanager->rollback($id, $historyid);
            redirect(
                new moodle_url('/local/servicemanager/pages/view.php', ['id' => $id]),
                get_string('rollback_success', 'local_servicemanager'),
                null,
                \core\output\notification::NOTIFY_SUCCESS
            );
        } catch (Exception $e) {
            redirect(
                $PAGE->url,
                get_string('rollback_error', 'local_servicemanager') . ': ' . $e->getMessage(),
                null,
                \core\output\notification::NOTIFY_ERROR
            );
        }
    } else {
        // Show confirmation page.
        echo $OUTPUT->header();

        $confirmurl = new moodle_url('/local/servicemanager/pages/history.php', [
            'id' => $id,
            'action' => 'rollback',
            'historyid' => $historyid,
            'confirm' => 1,
            'sesskey' => sesskey(),
        ]);
        $cancelurl = new moodle_url('/local/servicemanager/pages/history.php', ['id' => $id]);

        echo $OUTPUT->confirm(
            get_string('rollback_confirm', 'local_servicemanager'),
            $confirmurl,
            $cancelurl
        );

        echo $OUTPUT->footer();
        exit;
    }
}

echo $OUTPUT->header();

echo $OUTPUT->render(new \local_servicemanager\output\history_page($schema));

echo $OUTPUT->footer();
