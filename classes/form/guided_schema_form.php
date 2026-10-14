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
use local_servicemanager\schema\schema_extractor;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/formslib.php');

/**
 * The form to create a schema step by step, with the functions chosen from the ones this Moodle has.
 *
 * The fields become the YAML of the schema, which goes through the same validation and creation as one that is written by hand.
 * The person can also take the YAML and keep working on it in the editor. The same form edits a schema that exists: it is given
 * the schema and the values of its fields, and then the id cannot change and no token is offered.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class guided_schema_form extends \moodleform {
    /**
     * The options that an autocomplete field starts with: the values it already has, which the ajax suggestions do not list.
     *
     * @param string $field Name of the field.
     * @return array The options, by value.
     */
    private function options(string $field): array {
        $values = array_values(array_filter((array) ($this->_customdata['values'][$field] ?? []), 'is_string'));
        return $values ? array_combine($values, $values) : [];
    }

    /**
     * Form definition.
     */
    protected function definition() {
        $mform = $this->_form;
        $editing = !empty($this->_customdata['schema']);

        $this->add_identity($mform, $editing);
        $this->add_functions($mform);
        $this->add_access($mform);
        $this->add_role($mform);
        if (!$editing) {
            $mform->addElement('header', 'tokenheader', get_string('guided_token', 'local_servicemanager'));
            $mform->setExpanded('tokenheader', true);
            $mform->addElement('advcheckbox', 'generatetoken', get_string('generatetoken', 'local_servicemanager'), get_string(
                'generatetoken_desc',
                'local_servicemanager'
            ));
            $mform->setDefault('generatetoken', 1);
        }
        $this->add_buttons($mform, $editing);
    }

    /**
     * The options of a field that searches while the person types.
     *
     * @param bool $free Whether what is typed is accepted when the search does not have it.
     * @param string $none What the field says while it has nothing.
     * @return array The options.
     */
    private function search_options(bool $free, string $none): array {
        return [
            'multiple' => true,
            'ajax' => 'local_servicemanager/suggest',
            'tags' => $free,
            'noselectionstring' => get_string($none, 'local_servicemanager'),
        ];
    }

    /**
     * A field of several values that searches while the person types, with its help.
     *
     * @param \MoodleQuickForm $mform The form.
     * @param string $field Name of the field.
     * @param string $label What it is called.
     * @param string $help The string of its help.
     * @param array $options The options of the search.
     */
    private function add_search_field(\MoodleQuickForm $mform, string $field, string $label, string $help, array $options): void {
        $mform->addElement('autocomplete', $field, $label, $this->options($field), $options);
        $mform->addHelpButton($field, $help, 'local_servicemanager');
    }

    /**
     * The part of the form that says what the schema is.
     *
     * @param \MoodleQuickForm $mform The form.
     * @param bool $editing Whether a schema is being changed, whose id is then fixed.
     */
    private function add_identity(\MoodleQuickForm $mform, bool $editing): void {
        $mform->addElement('header', 'identityheader', get_string('guided_identity', 'local_servicemanager'));
        $mform->setExpanded('identityheader', true);

        $mform->addElement(
            'text',
            'schemaid',
            get_string('schema_id', 'local_servicemanager'),
            ['size' => 40, 'maxlength' => 50] + ($editing ? ['readonly' => 'readonly'] : [])
        );
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
        $mform->addHelpButton('version', 'guided_version', 'local_servicemanager');

        $mform->addElement('text', 'maintainer', get_string('schema_maintainer', 'local_servicemanager'), ['size' => 40]);
        $mform->setType('maintainer', PARAM_TEXT);

        $mform->addElement('textarea', 'description', get_string('description'), ['rows' => 3, 'cols' => 60]);
        $mform->setType('description', PARAM_TEXT);
    }

    /**
     * The part of the form that says which functions the schema has.
     *
     * @param \MoodleQuickForm $mform The form.
     */
    private function add_functions(\MoodleQuickForm $mform): void {
        $mform->addElement('header', 'functionsheader', get_string('guided_functions', 'local_servicemanager'));
        $mform->setExpanded('functionsheader', true);

        $choice = $this->search_options(false, 'guided_no_functions');
        $this->add_search_field(
            $mform,
            'functions',
            get_string('guided_required_functions', 'local_servicemanager'),
            'guided_required_functions',
            $choice
        );
        $this->add_search_field(
            $mform,
            'optionalfunctions',
            get_string('guided_optional_functions', 'local_servicemanager'),
            'guided_optional_functions',
            $choice
        );
    }

    /**
     * The part of the form that says what whoever calls the service needs and may do.
     *
     * @param \MoodleQuickForm $mform The form.
     */
    private function add_access(\MoodleQuickForm $mform): void {
        $mform->addElement('header', 'accessheader', get_string('guided_access', 'local_servicemanager'));
        $mform->setExpanded('accessheader', false);

        $free = $this->search_options(true, 'guided_none');
        $this->add_search_field(
            $mform,
            'extracapabilities',
            get_string('extra_capabilities', 'local_servicemanager'),
            'guided_extracapabilities',
            $free
        );
        $this->add_search_field(
            $mform,
            'additionalusers',
            get_string('guided_additional_users', 'local_servicemanager'),
            'guided_additional_users',
            $free
        );
        $this->add_search_field($mform, 'plugins', get_string('req_plugins', 'local_servicemanager'), 'guided_plugins', $free);

        $mform->addElement('advcheckbox', 'downloadfiles', get_string('req_file_access', 'local_servicemanager'), get_string(
            'req_download_files',
            'local_servicemanager'
        ));
        $mform->addElement('advcheckbox', 'uploadfiles', '', get_string('req_upload_files', 'local_servicemanager'));
    }

    /**
     * The part of the form that says what the role of the schema is and what it may do with other roles.
     *
     * @param \MoodleQuickForm $mform The form.
     */
    private function add_role(\MoodleQuickForm $mform): void {
        global $DB;

        $mform->addElement('header', 'roleheader', get_string('guided_role', 'local_servicemanager'));
        $mform->setExpanded('roleheader', false);

        $levels = [];
        foreach (array_keys(role_settings::CONTEXT_LEVELS) as $level) {
            if ($level !== 'system') {
                $levels[$level] = get_string('role_level_' . $level, 'local_servicemanager');
            }
        }
        $none = get_string('guided_none', 'local_servicemanager');
        $mform->addElement(
            'autocomplete',
            'contextlevels',
            get_string('role_context_levels', 'local_servicemanager'),
            $levels,
            ['multiple' => true, 'noselectionstring' => $none]
        );
        $mform->addHelpButton('contextlevels', 'guided_contextlevels', 'local_servicemanager');

        $rolechoices = [];
        foreach ($DB->get_records('role', null, 'sortorder', 'shortname, name') as $role) {
            $rolechoices[$role->shortname] = role_get_name($role, null, ROLENAME_ORIGINAL) . ' (' . $role->shortname . ')';
        }
        foreach (role_settings::RELATIONS as $relation) {
            $mform->addElement(
                'autocomplete',
                $relation,
                get_string('role_' . $relation, 'local_servicemanager'),
                $rolechoices,
                ['multiple' => true, 'noselectionstring' => $none]
            );
            $mform->addHelpButton($relation, 'guided_' . $relation, 'local_servicemanager');
        }
        $free = $this->search_options(true, 'guided_none');
        foreach (['prevent', 'prohibit'] as $permission) {
            $this->add_search_field(
                $mform,
                $permission,
                get_string('role_permission_' . $permission, 'local_servicemanager'),
                'guided_' . $permission,
                $free
            );
        }
    }

    /**
     * The buttons that end the form.
     *
     * @param \MoodleQuickForm $mform The form.
     * @param bool $editing Whether a schema is being changed.
     */
    private function add_buttons(\MoodleQuickForm $mform, bool $editing): void {
        $buttons = [
            $mform->createElement(
                'submit',
                'submitbutton',
                $editing ? get_string('savechanges') : get_string('create_schema', 'local_servicemanager')
            ),
            $mform->createElement('submit', 'reviewbutton', get_string('guided_review_yaml', 'local_servicemanager'), [], false),
            $mform->createElement('cancel'),
        ];
        $mform->addGroup($buttons, 'buttonar', '', ' ', false);
        $mform->closeHeaderBefore('buttonar');
    }

    /**
     * The values that the fields of the form have for the YAML of a schema that exists.
     *
     * What the YAML says in more than one place that the form has in one, such as the capabilities that the role is allowed, is
     * joined.
     *
     * @param string $yaml The YAML of the schema.
     * @return array The values, by field.
     */
    public static function values_from_yaml(string $yaml): array {
        $parser = new yaml_parser();
        $data = $parser->parse_stored($yaml);
        $meta = schema_extractor::meta($data);
        $role = schema_extractor::role_settings($data);
        $service = schema_extractor::service_settings($data);

        $required = [];
        $optional = [];
        foreach (schema_extractor::functions($data) as $function) {
            if ($function['critical']) {
                $required[] = $function['name'];
            } else {
                $optional[] = $function['name'];
            }
        }
        $values = [
            'schemaid' => $meta['id'],
            'name' => $meta['name'],
            'version' => $meta['version'],
            'maintainer' => $meta['maintainer'],
            'description' => $meta['description'],
            'functions' => $required,
            'optionalfunctions' => $optional,
            'plugins' => array_values(schema_extractor::required_plugins($data)),
            'extracapabilities' => array_values(array_unique(array_merge(
                schema_extractor::extra_capabilities($data),
                $role->capabilities('allow')
            ))),
            'additionalusers' => array_values(schema_extractor::additional_users($data)),
            'downloadfiles' => (int) $service['download_files'],
            'uploadfiles' => (int) $service['upload_files'],
            'contextlevels' => array_values(array_diff($role->context_levels(), ['system'])),
            'prevent' => $role->capabilities('prevent'),
            'prohibit' => $role->capabilities('prohibit'),
        ];
        foreach (role_settings::RELATIONS as $relation) {
            $values[$relation] = $role->roles($relation);
        }
        return $values;
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
        $errors = parent::validation($data, $files);
        $fields = self::fields($data);
        $schema = $this->_customdata['schema'] ?? null;
        $ownid = $schema ? (int) $schema->id : 0;

        $errors += $this->identity_errors($fields, $schema, $ownid);
        $errors += $this->function_errors($fields);

        // What the form cannot tell at one field is told by the validator that every schema goes through.
        if (!$errors && !empty($fields['id'])) {
            $result = (new validator())->validate_content(self::yaml($data), $ownid ?: null);
            if (!empty($result['errors'])) {
                $errors['functions'] = implode('<br>', array_map('s', $result['errors']));
            }
        }
        return $errors;
    }

    /**
     * What is wrong with the id and the name of the schema.
     *
     * @param array $fields The fields of the form.
     * @param \stdClass|null $schema The schema that is being changed, or null for a new one.
     * @param int $ownid Id in the database of that schema, or zero.
     * @return array Errors by field.
     */
    private function identity_errors(array $fields, ?\stdClass $schema, int $ownid): array {
        global $DB;

        $errors = [];
        $id = $fields['id'];
        if ($schema && $id !== $schema->schema_id) {
            $errors['schemaid'] = get_string('error_id_change_forbidden', 'local_servicemanager');
        } else if ($id !== '' && !(new yaml_parser())->validate_schema_id($id)) {
            $errors['schemaid'] = get_string('error_invalid_schema_id', 'local_servicemanager', $id);
        } else if (
            $id !== ''
            && $DB->record_exists_select('local_servicemanager_schemas', 'schema_id = ? AND id <> ?', [$id, $ownid])
        ) {
            $errors['schemaid'] = get_string('error_schema_id_exists', 'local_servicemanager', $id);
        }
        $name = $fields['name'];
        if ($name !== '' && $DB->record_exists_select('local_servicemanager_schemas', 'name = ? AND id <> ?', [$name, $ownid])) {
            $errors['name'] = get_string('error_schema_name_exists', 'local_servicemanager', $name);
        }
        return $errors;
    }

    /**
     * What is wrong with the functions: there are none, or one is both required and optional.
     *
     * @param array $fields The fields of the form.
     * @return array Errors by field.
     */
    private function function_errors(array $fields): array {
        $errors = [];
        if (!$fields['functions'] && !$fields['optionalfunctions']) {
            $errors['functions'] = get_string('guided_needs_function', 'local_servicemanager');
        }
        $both = array_intersect($fields['functions'], $fields['optionalfunctions']);
        if ($both) {
            $errors['optionalfunctions'] = get_string('error_duplicate_function', 'local_servicemanager', reset($both));
        }
        return $errors;
    }
}
