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
 * Import schema(s) page.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

require_login();
require_capability('local/servicemanager:manage', context_system::instance());

$PAGE->set_url(new moodle_url('/local/servicemanager/pages/import.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('pluginname', 'local_servicemanager') . ' - ' . get_string('import_schemas', 'local_servicemanager'));
$PAGE->set_heading(get_string('import_schemas', 'local_servicemanager'));
$PAGE->set_pagelayout('admin');

// Navigation.
$PAGE->navbar->add(get_string('pluginname', 'local_servicemanager'), new moodle_url('/local/servicemanager/pages/dashboard.php'));
$PAGE->navbar->add(get_string('import_schemas', 'local_servicemanager'));

$form = new \local_servicemanager\form\import_schema_form();

if ($form->is_cancelled()) {
    redirect(new moodle_url('/local/servicemanager/pages/dashboard.php'));
} else if ($data = $form->get_data()) {
    // Process the import.
    $importer = new \local_servicemanager\schema\importer();

    $results = \local_servicemanager\schema\importer::empty_result();

    // Get uploaded file.
    $fs = get_file_storage();
    $context = context_user::instance($USER->id);
    $files = $fs->get_area_files($context->id, 'user', 'draft', $data->importfile, '', false);

    if (empty($files)) {
        redirect(
            $PAGE->url,
            get_string('no_file_uploaded', 'local_servicemanager'),
            null,
            \core\output\notification::NOTIFY_ERROR
        );
    }

    $file = reset($files);
    $filename = $file->get_filename();
    $content = $file->get_content();

    // Process based on file type.
    if (pathinfo($filename, PATHINFO_EXTENSION) === 'zip') {
        // Process ZIP file.
        $tempdir = make_temp_directory('servicemanager_import');
        $zippath = $tempdir . '/' . $filename;
        $file->copy_content_to($zippath);

        $zip = new ZipArchive();
        if ($zip->open($zippath) === true) {
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $entryname = $zip->getNameIndex($i);

                // Skip non-YAML files and manifest.
                $ext = pathinfo($entryname, PATHINFO_EXTENSION);
                if (!in_array($ext, ['yaml', 'yml']) || $entryname === 'manifest.json') {
                    continue;
                }

                $yamlcontent = $zip->getFromIndex($i);
                $importresult = $importer->import_single($yamlcontent, $data->conflict_action);
                $importer->merge_result($results, $importresult);
            }
            $zip->close();
        }
        unlink($zippath);
    } else {
        // Process single YAML file.
        $importresult = $importer->import_single($content, $data->conflict_action);
        $importer->merge_result($results, $importresult);
    }

    // Show each error as a separate notification so the user knows what went wrong.
    foreach ($results['errors'] as $error) {
        \core\notification::error($error);
    }

    // Show warnings (e.g. non-critical functions not installed in this Moodle instance).
    foreach ($results['warnings'] as $warning) {
        \core\notification::warning($warning);
    }

    // Generate result message.
    $results['errors_count'] = count($results['errors']);
    $message = get_string('import_complete', 'local_servicemanager', $results);
    $notifytype = empty($results['errors']) ? \core\output\notification::NOTIFY_SUCCESS : \core\output\notification::NOTIFY_WARNING;

    redirect(
        new moodle_url('/local/servicemanager/pages/dashboard.php'),
        $message,
        null,
        $notifytype
    );
}

echo $OUTPUT->header();

// Capture form HTML.
ob_start();
$form->display();
$formhtml = ob_get_clean();

$context = [
    'backurl' => (new moodle_url('/local/servicemanager/pages/dashboard.php'))->out(false),
    'docurl' => (new moodle_url('/local/servicemanager/pages/documentation.php'))->out(false),
    'formhtml' => $formhtml,
];

echo $OUTPUT->render_from_template('local_servicemanager/import_page', $context);

echo $OUTPUT->footer();
