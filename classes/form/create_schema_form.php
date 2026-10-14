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

namespace local_servicemanager\form;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/formslib.php');

/**
 * The form to create a schema by writing or pasting its YAML, or to change the YAML of one that exists.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class create_schema_form extends \moodleform {
    /**
     * Form definition.
     */
    protected function definition() {
        $mform = $this->_form;
        $editing = !empty($this->_customdata['schema']);

        $mform->addElement(
            'textarea',
            'yamlcontent',
            get_string('yamlcontent', 'local_servicemanager'),
            ['rows' => 24, 'cols' => 100, 'class' => 'font-monospace w-100', 'spellcheck' => 'false']
        );
        $mform->setType('yamlcontent', PARAM_RAW);
        $mform->addRule('yamlcontent', null, 'required', null, 'client');
        $mform->addHelpButton('yamlcontent', 'yamlcontent', 'local_servicemanager');

        if (!$editing) {
            $mform->addElement('advcheckbox', 'generatetoken', get_string('generatetoken', 'local_servicemanager'), get_string(
                'generatetoken_desc',
                'local_servicemanager'
            ));
            $mform->setDefault('generatetoken', 1);
        }

        $this->add_action_buttons(true, $editing ? get_string('savechanges') : get_string('create_schema', 'local_servicemanager'));
    }

    /**
     * Validation: the YAML must be a schema that can be created, or one that the schema can be changed into.
     *
     * @param array $data Values of the form.
     * @param array $files Files of the form.
     * @return array Errors by field.
     */
    public function validation($data, $files) {
        $errors = parent::validation($data, $files);

        if (trim($data['yamlcontent'] ?? '') !== '') {
            $schema = $this->_customdata['schema'] ?? null;
            $result = (new \local_servicemanager\schema\validator())->validate_content(
                $data['yamlcontent'],
                $schema ? (int) $schema->id : null
            );
            if (!empty($result['errors'])) {
                $errors['yamlcontent'] = implode('<br>', array_map('s', $result['errors']));
            }
        }
        return $errors;
    }
}
