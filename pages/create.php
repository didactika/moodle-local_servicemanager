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
 * Create a schema, with a guided form or by writing its YAML.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

use local_servicemanager\form\create_schema_form;
use local_servicemanager\form\guided_schema_form;

require_login();
$context = context_system::instance();
require_capability('local/servicemanager:manage', $context);

$mode = optional_param('mode', 'guided', PARAM_ALPHA) === 'yaml' ? 'yaml' : 'guided';

$dashboardurl = new moodle_url('/local/servicemanager/pages/dashboard.php');
$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/servicemanager/pages/create.php', ['mode' => $mode]));
$PAGE->set_title(get_string('new_schema', 'local_servicemanager'));
$PAGE->set_heading(get_string('new_schema', 'local_servicemanager'));
$PAGE->set_pagelayout('admin');
$PAGE->navbar->add(get_string('pluginname', 'local_servicemanager'), $dashboardurl);
$PAGE->navbar->add(get_string('new_schema', 'local_servicemanager'));

$guided = new guided_schema_form(new moodle_url('/local/servicemanager/pages/create.php', ['mode' => 'guided']));
$yaml = new create_schema_form(new moodle_url('/local/servicemanager/pages/create.php', ['mode' => 'yaml']));

// What the person filled in at the guided form goes to the editor as YAML, so they can keep working on it there.
if ($mode === 'guided' && ($data = $guided->get_data()) && !empty($data->reviewbutton)) {
    $mode = 'yaml';
    $yaml->set_data(['yamlcontent' => guided_schema_form::yaml($data), 'generatetoken' => (int) !empty($data->generatetoken)]);
    $PAGE->set_url(new moodle_url('/local/servicemanager/pages/create.php', ['mode' => 'yaml']));
    $guided = null;
}

$form = $mode === 'yaml' ? $yaml : $guided;
if ($form !== null && $form->is_cancelled()) {
    redirect($dashboardurl);
}

$content = null;
$generatetoken = false;
if ($mode === 'yaml' && ($data = $yaml->get_data())) {
    $content = $data->yamlcontent;
    $generatetoken = !empty($data->generatetoken);
} else if ($mode === 'guided' && $guided !== null && ($data = $guided->get_data())) {
    $content = guided_schema_form::yaml($data);
    $generatetoken = !empty($data->generatetoken);
}

if ($content !== null) {
    try {
        $manager = new \local_servicemanager\schema\manager();
        $result = $generatetoken ? $manager->create_schema_with_token($content) : $manager->create_schema($content);

        // A token that was just generated is kept for the next page, which shows it once.
        if (!empty($result['token'])) {
            \local_servicemanager\cache_provider::newtoken()->set($result['id'], $result['token']);
        }
        foreach ($result['warnings'] ?? [] as $warning) {
            \core\notification::warning($warning);
        }
        $created = $manager->get_schema($result['id']);
        \core\notification::success(get_string('schema_created_success', 'local_servicemanager', $created->name));
        redirect(new moodle_url('/local/servicemanager/pages/view.php', ['id' => $result['id'], 'newtoken' => 1]));
    } catch (\moodle_exception $e) {
        \core\notification::error($e->getMessage());
    }
}

$tabs = [];
foreach (['guided', 'yaml'] as $name) {
    $tabs[] = new tabobject(
        $name,
        new moodle_url('/local/servicemanager/pages/create.php', ['mode' => $name]),
        get_string('create_mode_' . $name, 'local_servicemanager')
    );
}

echo $OUTPUT->header();
echo $OUTPUT->tabtree($tabs, $mode);
echo $OUTPUT->notification(
    get_string('create_intro_' . $mode, 'local_servicemanager'),
    \core\output\notification::NOTIFY_INFO,
    false
);
$form->display();
echo $OUTPUT->footer();
