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
 * Create a schema, or change one that exists, with a guided form or by writing its YAML.
 *
 * With an id the forms come filled in with the schema, and what is sent updates it instead of creating another.
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

$id = optional_param('id', 0, PARAM_INT);
$mode = optional_param('mode', 'guided', PARAM_ALPHA) === 'yaml' ? 'yaml' : 'guided';

$dashboardurl = new moodle_url('/local/servicemanager/pages/dashboard.php');
$manager = new \local_servicemanager\schema\manager();
$schema = null;
if ($id) {
    $schema = $manager->get_schema($id);
    if (!$schema) {
        redirect(
            $dashboardurl,
            get_string('schema_not_found', 'local_servicemanager'),
            null,
            \core\output\notification::NOTIFY_WARNING
        );
    }
}
$editing = $schema !== null;
$cancelurl = $editing ? new moodle_url('/local/servicemanager/pages/view.php', ['id' => $id]) : $dashboardurl;
$idparams = $editing ? ['id' => $id] : [];
$title = get_string($editing ? 'edit_schema' : 'new_schema', 'local_servicemanager');

$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/servicemanager/pages/create.php', $idparams + ['mode' => $mode]));
$PAGE->set_title($title);
$PAGE->set_heading($title);
$PAGE->set_pagelayout('admin');
$PAGE->navbar->add(get_string('pluginname', 'local_servicemanager'), $dashboardurl);
if ($editing) {
    $PAGE->navbar->add($schema->name, $cancelurl);
}
$PAGE->navbar->add($title);

$values = $editing ? guided_schema_form::values_from_yaml($schema->yaml_content) : [];
$customdata = ['schema' => $schema, 'values' => $values];
$formurl = fn(string $name) => new moodle_url('/local/servicemanager/pages/create.php', $idparams + ['mode' => $name]);
$guided = new guided_schema_form($formurl('guided'), $customdata);
$yaml = new create_schema_form($formurl('yaml'), $customdata);
if ($editing) {
    $guided->set_data($values);
    $yaml->set_data(['yamlcontent' => $schema->yaml_content]);
}

// What the person filled in at the guided form goes to the editor as YAML, so they can keep working on it there.
if ($mode === 'guided' && ($data = $guided->get_data()) && !empty($data->reviewbutton)) {
    $mode = 'yaml';
    $reviewed = guided_schema_form::yaml($data);
    $yaml->set_data(['yamlcontent' => $reviewed, 'generatetoken' => (int) !empty($data->generatetoken)]);
    // That YAML is saved nowhere yet, so leaving the page warns as it does for a change, unless it says what is stored.
    $yaml->set_initial_dirty_state(!$editing || !$manager->says_the_same($schema, $reviewed));
    $PAGE->set_url(new moodle_url('/local/servicemanager/pages/create.php', $idparams + ['mode' => 'yaml']));
    $guided = null;
}

$form = $mode === 'yaml' ? $yaml : $guided;
if ($form !== null && $form->is_cancelled()) {
    redirect($cancelurl);
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

// The guided form writes the YAML again from its fields; when it says what is stored, the stored YAML, comments included, stays.
if ($content !== null && $editing && $mode === 'guided' && $manager->says_the_same($schema, $content)) {
    \core\notification::info(get_string('schema_unchanged', 'local_servicemanager', $schema->name));
    redirect($cancelurl);
}

if ($content !== null) {
    try {
        if ($editing) {
            $result = $manager->update_schema($id, $content);
            foreach ($result['warnings'] ?? [] as $warning) {
                \core\notification::warning($warning);
            }
            $updated = $manager->get_schema($id);
            \core\notification::success(get_string('schema_updated_success', 'local_servicemanager', $updated->name));
            if (!empty($result['adjusted'])) {
                \core\notification::info(get_string('version_adjusted', 'local_servicemanager', $result['version']));
            }
            redirect($cancelurl);
        }

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
        new moodle_url('/local/servicemanager/pages/create.php', $idparams + ['mode' => $name]),
        get_string('create_mode_' . $name, 'local_servicemanager')
    );
}

// A form that comes back, with errors or refused, holds what was filled in and is not saved: leaving it warns as well.
if ($form->is_submitted()) {
    $form->set_initial_dirty_state(true);
}

echo $OUTPUT->header();
echo $OUTPUT->tabtree($tabs, $mode);
echo $OUTPUT->notification(
    get_string(($editing ? 'edit_intro_' : 'create_intro_') . $mode, 'local_servicemanager'),
    \core\output\notification::NOTIFY_INFO,
    false
);
$form->display();
echo $OUTPUT->footer();
