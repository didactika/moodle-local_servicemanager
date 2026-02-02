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
 * @package    local_serviceschema
 * @copyright  2026 Your Organization
 * @license    http://www.opensource.org/licenses/MIT MIT License
 */

require_once(__DIR__ . '/../../../config.php');

require_login();
require_capability('local/serviceschema:manage', context_system::instance());

$PAGE->set_url(new moodle_url('/local/serviceschema/pages/import.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('pluginname', 'local_serviceschema') . ' - ' . get_string('import_schemas', 'local_serviceschema'));
$PAGE->set_heading(get_string('import_schemas', 'local_serviceschema'));
$PAGE->set_pagelayout('admin');

// Navigation.
$PAGE->navbar->add(get_string('pluginname', 'local_serviceschema'), new moodle_url('/local/serviceschema/pages/dashboard.php'));
$PAGE->navbar->add(get_string('import_schemas', 'local_serviceschema'));

$form = new \local_serviceschema\form\import_schema_form();

if ($form->is_cancelled()) {
    redirect(new moodle_url('/local/serviceschema/pages/dashboard.php'));
} else if ($data = $form->get_data()) {
    // Process the import.
    $manager = new \local_serviceschema\schema\manager();
    $validator = new \local_serviceschema\schema\validator();

    $results = [
        'imported' => 0,
        'skipped' => 0,
        'errors' => [],
        'tokens' => [],
    ];

    // Get uploaded file.
    $fs = get_file_storage();
    $context = context_user::instance($USER->id);
    $files = $fs->get_area_files($context->id, 'user', 'draft', $data->importfile, '', false);

    if (empty($files)) {
        redirect(
            $PAGE->url,
            get_string('no_file_uploaded', 'local_serviceschema'),
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
        $tempdir = make_temp_directory('serviceschema_import');
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
                $importresult = import_single_schema($manager, $validator, $yamlcontent, $data->conflict_action, $data->generatetokens);
                merge_import_result($results, $importresult);
            }
            $zip->close();
        }
        unlink($zippath);
    } else {
        // Process single YAML file.
        $importresult = import_single_schema($manager, $validator, $content, $data->conflict_action, $data->generatetokens);
        merge_import_result($results, $importresult);
    }

    // Generate result message.
    $message = get_string('import_complete', 'local_serviceschema', $results);
    $notifytype = empty($results['errors']) ? \core\output\notification::NOTIFY_SUCCESS : \core\output\notification::NOTIFY_WARNING;

    redirect(
        new moodle_url('/local/serviceschema/pages/dashboard.php'),
        $message,
        null,
        $notifytype
    );
}

/**
 * Import a single schema.
 *
 * @param \local_serviceschema\schema\manager $manager Schema manager.
 * @param \local_serviceschema\schema\validator $validator Validator.
 * @param string $yamlcontent YAML content.
 * @param string $conflictaction Conflict action: skip, overwrite, rename.
 * @param bool $generatetoken Whether to generate token.
 * @return array Result with imported, skipped, errors, tokens.
 */
function import_single_schema($manager, $validator, $yamlcontent, $conflictaction, $generatetoken) {
    global $DB;

    $result = ['imported' => 0, 'skipped' => 0, 'errors' => [], 'tokens' => []];

    try {
        // Parse YAML first to get ID.
        $parser = new \local_serviceschema\schema\yaml_parser();
        $data = $parser->parse($yamlcontent);
        $meta = $parser->extract_meta($data);
        $schemaid = $meta['id'] ?? null;

        if (!$schemaid) {
            $result['errors'][] = get_string('import_error_no_id', 'local_serviceschema');
            return $result;
        }

        // Check for conflicts.
        $existing = $DB->get_record('local_serviceschema_schemas', ['schema_id' => $schemaid]);

        if ($existing) {
            switch ($conflictaction) {
                case 'skip':
                    $result['skipped']++;
                    return $result;

                case 'overwrite':
                    // Update existing schema.
                    $manager->update_schema($existing->id, $yamlcontent);
                    $result['imported']++;
                    return $result;

                case 'rename':
                    // Generate new ID.
                    $counter = 1;
                    $newidbase = $schemaid . '.imported';
                    $newid = $newidbase;
                    while ($DB->record_exists('local_serviceschema_schemas', ['schema_id' => $newid])) {
                        $newid = $newidbase . $counter;
                        $counter++;
                    }

                    // Update YAML content with new ID.
                    $yamlcontent = preg_replace(
                        '/^(\s*id:\s*["\']?)' . preg_quote($schemaid, '/') . '(["\']?\s*)$/m',
                        '${1}' . $newid . '${2}',
                        $yamlcontent
                    );
                    break;
            }
        }

        // Validate content.
        $validation = $validator->validate_content($yamlcontent, true); // Skip duplicate check since we handled it.
        if (!empty($validation['errors'])) {
            $result['errors'] = array_merge($result['errors'], $validation['errors']);
            return $result;
        }

        // Create schema.
        $createresult = $manager->create_schema($yamlcontent, $generatetoken);
        $result['imported']++;

        if (!empty($createresult['token'])) {
            $result['tokens'][$schemaid] = $createresult['token'];
        }

    } catch (Exception $e) {
        $result['errors'][] = $e->getMessage();
    }

    return $result;
}

/**
 * Merge import result into totals.
 *
 * @param array $totals Total results (modified in place).
 * @param array $result Single import result.
 */
function merge_import_result(&$totals, $result) {
    $totals['imported'] += $result['imported'];
    $totals['skipped'] += $result['skipped'];
    $totals['errors'] = array_merge($totals['errors'], $result['errors']);
    $totals['tokens'] = array_merge($totals['tokens'], $result['tokens']);
}

echo $OUTPUT->header();

// Back button.
echo html_writer::start_div('mb-4');
echo html_writer::link(
    new moodle_url('/local/serviceschema/pages/dashboard.php'),
    html_writer::tag('i', '', ['class' => 'fa fa-arrow-left mr-2']) . get_string('back'),
    ['class' => 'btn btn-secondary']
);
echo html_writer::end_div();

echo html_writer::start_div('serviceschema-import');

// Instructions.
echo html_writer::start_div('alert alert-info');
echo html_writer::tag('h5', html_writer::tag('i', '', ['class' => 'fa fa-info-circle mr-2']) . get_string('import_info_title', 'local_serviceschema'));
echo html_writer::tag('p', get_string('import_info_text', 'local_serviceschema'));
echo html_writer::start_tag('ul');
echo html_writer::tag('li', get_string('import_info_yaml', 'local_serviceschema'));
echo html_writer::tag('li', get_string('import_info_zip', 'local_serviceschema'));
echo html_writer::end_tag('ul');
echo html_writer::end_div();

$form->display();

echo html_writer::end_div();

echo $OUTPUT->footer();
