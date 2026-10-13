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

use local_servicemanager\automation\role_settings;
use local_servicemanager\schema\schema_builder;
use local_servicemanager\schema\validator;
use local_servicemanager\schema\yaml_parser;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/formslib.php');

/**
 * The form to create a schema step by step, with the functions chosen from the ones this Moodle has.
 *
 * The fields become the YAML of the schema, which goes through the same validation and creation as one that is written by hand.
 * The person can also take the YAML and keep working on it in the editor.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class guided_schema_form extends \moodleform {
    /**
     * Form definition.
     */
    protected function definition() {
        global $DB;

        $mform = $this->_form;

        $mform->addElement('header', 'identityheader', get_string('guided_identity', 'local_servicemanager'));
        $mform->setExpanded('identityheader', true);

        $mform->addElement('text', 'schemaid', get_string('schema_id', 'local_servicemanager'), ['size' => 40, 'maxlength' => 50]);
        $mform->setType('schemaid', PARAM_RAW_TRIMMED);
        $mform->addRule('schemaid', null, 'required', null, 'client');
        $mform->addHelpButton('schemaid', 'guided_schemaid', 'local_servicemanager');

        $mform->addElement('text', 'name', get_string('schema_name', 'local_servicemanager'), ['size' => 60, 'maxlength' => 255]);
        $mform->setType('name', PARAM_TEXT);
        $mform->addRule('name', null, 'required', null, 'client');

        $mform->addElement(
            'text',
            'version',
            get_string('schema_version', 'local_servicemanager'),
            ['size' => 12, 'maxlength' => 50]
        );
        $mform->setType('version', PARAM_RAW_TRIMMED);
        $mform->setDefault('version', '1.0.0');
        $mform->addRule('version', null, 'required', null, 'client');

        $mform->addElement('text', 'maintainer', get_string('schema_maintainer', 'local_servicemanager'), ['size' => 40]);
        $mform->setType('maintainer', PARAM_TEXT);

        $mform->addElement('textarea', 'description', get_string('description'), ['rows' => 3, 'cols' => 60]);
        $mform->setType('description', PARAM_TEXT);

        $mform->addElement('header', 'functionsheader', get_string('guided_functions', 'local_servicemanager'));
        $mform->setExpanded('functionsheader', true);

        $suggest = 'local_servicemanager/suggest';
        $functions = [];
        $choice = [
            'multiple' => true,
            'ajax' => $suggest,
            'tags' => false,
            'noselectionstring' => get_string('guided_no_functions', 'local_servicemanager'),
        ];
        $mform->addElement(
            'autocomplete',
            'functions',
            get_string('guided_required_functions', 'local_servicemanager'),
            $functions,
            $choice
        );
        $mform->addHelpButton('functions', 'guided_required_functions', 'local_servicemanager');

        $mform->addElement(
            'autocomplete',
            'optionalfunctions',
            get_string('guided_optional_functions', 'local_servicemanager'),
            $functions,
            $choice
        );
        $mform->addHelpButton('optionalfunctions', 'guided_optional_functions', 'local_servicemanager');

        $mform->addElement('header', 'accessheader', get_string('guided_access', 'local_servicemanager'));
        $mform->setExpanded('accessheader', false);

        $free = [
            'multiple' => true,
            'ajax' => $suggest,
            'tags' => true,
            'noselectionstring' => get_string('guided_none', 'local_servicemanager'),
        ];
        $mform->addElement(
            'autocomplete',
            'extracapabilities',
            get_string('extra_capabilities', 'local_servicemanager'),
            [],
            $free
        );
        $mform->addHelpButton('extracapabilities', 'guided_extracapabilities', 'local_servicemanager');
        $mform->addElement(
            'autocomplete',
            'additionalusers',
            get_string('guided_additional_users', 'local_servicemanager'),
            [],
            $free
        );
        $mform->addHelpButton('additionalusers', 'guided_additional_users', 'local_servicemanager');
        $mform->addElement('autocomplete', 'plugins', get_string('req_plugins', 'local_servicemanager'), [], $free);
        $mform->addHelpButton('plugins', 'guided_plugins', 'local_servicemanager');

        $mform->addElement('advcheckbox', 'downloadfiles', get_string('req_file_access', 'local_servicemanager'), get_string(
            'req_download_files',
            'local_servicemanager'
        ));
        $mform->addElement('advcheckbox', 'uploadfiles', '', get_string('req_upload_files', 'local_servicemanager'));

        $mform->addElement('header', 'roleheader', get_string('guided_role', 'local_servicemanager'));
        $mform->setExpanded('roleheader', false);

        $levels = [];
        foreach (array_keys(role_settings::CONTEXT_LEVELS) as $level) {
            if ($level !== 'system') {
                $levels[$level] = get_string('role_level_' . $level, 'local_servicemanager');
            }
        }
        $mform->addElement(
            'autocomplete',
            'contextlevels',
            get_string('role_context_levels', 'local_servicemanager'),
            $levels,
            ['multiple' => true, 'noselectionstring' => get_string('guided_none', 'local_servicemanager')]
        );
        $mform->addHelpButton('contextlevels', 'guided_contextlevels', 'local_servicemanager');

        $roles = $DB->get_records('role', null, 'sortorder', 'shortname, name');
        $rolechoices = [];
        foreach ($roles as $role) {
            $rolechoices[$role->shortname] = role_get_name($role, null, ROLENAME_ORIGINAL) . ' (' . $role->shortname . ')';
        }
        foreach (role_settings::RELATIONS as $relation) {
            $mform->addElement(
                'autocomplete',
                $relation,
                get_string('role_' . $relation, 'local_servicemanager'),
                $rolechoices,
                ['multiple' => true, 'noselectionstring' => get_string('guided_none', 'local_servicemanager')]
            );
            $mform->addHelpButton($relation, 'guided_' . $relation, 'local_servicemanager');
        }
        foreach (['prevent', 'prohibit'] as $permission) {
            $mform->addElement(
                'autocomplete',
                $permission,
                get_string('role_permission_' . $permission, 'local_servicemanager'),
                [],
                $free
            );
            $mform->addHelpButton($permission, 'guided_' . $permission, 'local_servicemanager');
        }

        $mform->addElement('header', 'tokenheader', get_string('guided_token', 'local_servicemanager'));
        $mform->setExpanded('tokenheader', true);
        $mform->addElement('advcheckbox', 'generatetoken', get_string('generatetoken', 'local_servicemanager'), get_string(
            'generatetoken_desc',
            'local_servicemanager'
        ));
        $mform->setDefault('generatetoken', 1);

        $buttons = [
            $mform->createElement('submit', 'submitbutton', get_string('create_schema', 'local_servicemanager')),
            $mform->createElement('submit', 'reviewbutton', get_string('guided_review_yaml', 'local_servicemanager'), [], false),
            $mform->createElement('cancel'),
        ];
        $mform->addGroup($buttons, 'buttonar', '', ' ', false);
        $mform->closeHeaderBefore('buttonar');
    }

    /**
     * The fields of the form as the builder takes them.
     *
     * @param array|\stdClass $data Values of the form.
     * @return array The fields.
     */
    public static function fields($data): array {
        $data = (array) $data;
        return [
            'id' => $data['schemaid'] ?? '',
            'name' => $data['name'] ?? '',
            'version' => $data['version'] ?? '',
            'maintainer' => $data['maintainer'] ?? '',
            'description' => $data['description'] ?? '',
            'functions' => (array) ($data['functions'] ?? []),
            'optionalfunctions' => (array) ($data['optionalfunctions'] ?? []),
            'plugins' => (array) ($data['plugins'] ?? []),
            'extracapabilities' => (array) ($data['extracapabilities'] ?? []),
            'additionalusers' => (array) ($data['additionalusers'] ?? []),
            'downloadfiles' => !empty($data['downloadfiles']),
            'uploadfiles' => !empty($data['uploadfiles']),
            'contextlevels' => (array) ($data['contextlevels'] ?? []),
            'prevent' => (array) ($data['prevent'] ?? []),
            'prohibit' => (array) ($data['prohibit'] ?? []),
            'allow_assign' => (array) ($data['allow_assign'] ?? []),
            'allow_override' => (array) ($data['allow_override'] ?? []),
            'allow_switch' => (array) ($data['allow_switch'] ?? []),
            'allow_view' => (array) ($data['allow_view'] ?? []),
        ];
    }

    /**
     * The YAML that the values of the form make.
     *
     * @param array|\stdClass $data Values of the form.
     * @return string The YAML.
     */
    public static function yaml($data): string {
        return (new schema_builder())->to_yaml(self::fields($data));
    }

    /**
     * Validation: each mistake is told at the field that has it.
     *
     * @param array $data Values of the form.
     * @param array $files Files of the form.
     * @return array Errors by field.
     */
    public function validation($data, $files) {
        global $DB;

        $errors = parent::validation($data, $files);
        $fields = self::fields($data);

        if ($fields['id'] !== '' && !(new yaml_parser())->validate_schema_id($fields['id'])) {
            $errors['schemaid'] = get_string('error_invalid_schema_id', 'local_servicemanager', $fields['id']);
        } else if ($fields['id'] !== '' && $DB->record_exists('local_servicemanager_schemas', ['schema_id' => $fields['id']])) {
            $errors['schemaid'] = get_string('error_schema_id_exists', 'local_servicemanager', $fields['id']);
        }
        if ($fields['name'] !== '' && $DB->record_exists('local_servicemanager_schemas', ['name' => $fields['name']])) {
            $errors['name'] = get_string('error_schema_name_exists', 'local_servicemanager', $fields['name']);
        }
        if (!$fields['functions'] && !$fields['optionalfunctions']) {
            $errors['functions'] = get_string('guided_needs_function', 'local_servicemanager');
        }
        $both = array_intersect($fields['functions'], $fields['optionalfunctions']);
        if ($both) {
            $errors['optionalfunctions'] = get_string('error_duplicate_function', 'local_servicemanager', reset($both));
        }

        // What the form cannot tell at one field is told by the validator that every schema goes through.
        if (!$errors && !empty($fields['id'])) {
            $result = (new validator())->validate_content(self::yaml($data));
            if (!empty($result['errors'])) {
                $errors['functions'] = implode('<br>', array_map('s', $result['errors']));
            }
        }
        return $errors;
    }
}
