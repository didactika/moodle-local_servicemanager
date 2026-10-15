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

namespace local_servicemanager\schema;

/**
 * Manager for service schema CRUD operations
 *
 * Decides what gets stored. The Moodle objects behind a schema belong to
 * provisioner, and the rules about version numbers belong to version_policy.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class manager {
    /** @var yaml_parser */
    protected $parser;

    /** @var validator */
    protected $validator;

    /** @var provisioner */
    protected $provisioner;

    /** @var version_policy */
    protected $versionpolicy;

    /** @var version_resolver */
    protected $versionresolver;

    /**
     * Constructor
     */
    public function __construct() {
        $this->parser = new yaml_parser();
        $this->validator = new validator();
        $this->provisioner = new provisioner();
        $this->versionpolicy = new version_policy();
        $this->versionresolver = new version_resolver($this->parser);
    }

    /**
     * Create a new schema from YAML content
     *
     * @param string $yamlcontent YAML content
     * @return array ['id' => int, 'token' => null, 'warnings' => array]
     * @throws \moodle_exception If validation fails
     */
    public function create_schema(string $yamlcontent): array {
        return $this->store_new_schema($yamlcontent, false);
    }

    /**
     * Create a new schema and issue a web service token for it
     *
     * @param string $yamlcontent YAML content
     * @return array ['id' => int, 'token' => string, 'warnings' => array]
     * @throws \moodle_exception If validation fails
     */
    public function create_schema_with_token(string $yamlcontent): array {
        return $this->store_new_schema($yamlcontent, true);
    }

    /**
     * Update an existing schema
     *
     * @param int $id Schema record ID
     * @param string $yamlcontent New YAML content
     * @return array ['warnings' => array]
     * @throws \moodle_exception If validation fails
     */
    public function update_schema(int $id, string $yamlcontent): array {
        return $this->apply_update($id, $yamlcontent, false);
    }

    /**
     * Restore a schema to a previous version
     *
     * Same work as an update, except the version is allowed to move backwards.
     *
     * @param int $id Schema record ID
     * @param string $yamlcontent YAML content of the version being restored
     * @return array ['warnings' => array]
     * @throws \moodle_exception If validation fails
     */
    public function restore_schema(int $id, string $yamlcontent): array {
        return $this->apply_update($id, $yamlcontent, true);
    }

    /**
     * Delete a schema and all associated resources
     *
     * @param int $id Schema record ID
     * @return bool
     */
    public function delete_schema(int $id): bool {
        global $DB;

        $schema = $this->get_schema($id);
        if (!$schema) {
            return false;
        }

        $this->provisioner->deprovision($schema);

        $DB->delete_records('local_servicemanager_logs', ['schemaid' => $id]);
        $DB->delete_records('local_servicemanager_history', ['schemaid' => $id]);
        $DB->delete_records('local_servicemanager_schemas', ['id' => $id]);

        return true;
    }

    /**
     * Get a schema by ID
     *
     * @param int $id Schema record ID
     * @return \stdClass|null
     */
    public function get_schema(int $id): ?\stdClass {
        global $DB;
        return $DB->get_record('local_servicemanager_schemas', ['id' => $id]) ?: null;
    }

    /**
     * Get a schema by schema_id
     *
     * @param string $schemaid Schema ID (e.g., 'crm.integration')
     * @return \stdClass|null
     */
    public function get_schema_by_schema_id(string $schemaid): ?\stdClass {
        global $DB;
        return $DB->get_record('local_servicemanager_schemas', ['schema_id' => $schemaid]) ?: null;
    }

    /**
     * Get all schemas
     *
     * @return array
     */
    public function get_all_schemas(): array {
        global $DB;
        return $DB->get_records('local_servicemanager_schemas', null, 'name ASC');
    }

    /**
     * Get schemas by status
     *
     * @param string $status Status filter
     * @return array
     */
    public function get_schemas_by_status(string $status): array {
        global $DB;
        return $DB->get_records('local_servicemanager_schemas', ['status' => $status], 'name ASC');
    }

    /**
     * Update schema status
     *
     * @param int $id Schema ID
     * @param string $status New status
     * @return bool
     */
    public function update_status(int $id, string $status): bool {
        global $DB;
        return $DB->set_field('local_servicemanager_schemas', 'status', $status, ['id' => $id]);
    }

    /**
     * Toggle schema enabled state
     *
     * @param int $id Schema ID
     * @param bool $enabled New enabled state
     * @return bool
     */
    public function set_enabled(int $id, bool $enabled): bool {
        global $DB;

        $schema = $this->get_schema($id);
        if (!$schema) {
            return false;
        }

        $this->provisioner->set_enabled($schema, $enabled);

        return $DB->set_field('local_servicemanager_schemas', 'enabled', $enabled ? 1 : 0, ['id' => $id]);
    }

    /**
     * The state that the web service of each schema has in Moodle, which is what decides whether it can be called.
     *
     * @param int|null $id Id of one schema record, or null for all of them.
     * @return bool[] Whether each service is enabled, by the id of its schema record; a schema whose service no longer exists
     *     is not there.
     */
    public function service_states(?int $id = null): array {
        global $DB;

        $sql = "SELECT s.id, es.enabled
                  FROM {local_servicemanager_schemas} s
                  JOIN {external_services} es ON es.id = s.serviceid";
        $params = [];
        if ($id !== null) {
            $sql .= " WHERE s.id = :id";
            $params['id'] = $id;
        }
        return array_map('boolval', $DB->get_records_sql_menu($sql, $params));
    }

    /**
     * Whether a schema is enabled: the state of its web service in Moodle, or the one the schema stored when the service is
     * gone.
     *
     * @param \stdClass $schema Schema record
     * @return bool
     */
    public function is_enabled(\stdClass $schema): bool {
        return $this->service_states((int) $schema->id)[$schema->id] ?? (bool) $schema->enabled;
    }

    /**
     * Take the state that the web service of a schema was given in Moodle, when it differs from the one the schema stored.
     *
     * Moodle decides whether a service can be called, so its state is the one that counts: a service enabled or disabled in the
     * administration of Moodle enables or disables the schema, with its user, as doing it in the plugin does.
     *
     * @param \stdClass $schema Schema record
     * @return bool True when the schema took the state of its service.
     */
    public function adopt_service_state(\stdClass $schema): bool {
        $enabled = $this->is_enabled($schema);
        if ($enabled === (bool) $schema->enabled) {
            return false;
        }
        $this->set_enabled((int) $schema->id, $enabled);
        return true;
    }

    /**
     * Provision a schema and store it.
     *
     * If storing fails the provisioned objects are removed again, so a schema
     * that is not in the table never leaves a user, role or service behind.
     *
     * @param string $yamlcontent YAML content
     * @param bool $generatetoken Whether to issue a token
     * @return array ['id' => int, 'token' => string|null, 'warnings' => array]
     * @throws \moodle_exception If validation fails
     */
    protected function store_new_schema(string $yamlcontent, bool $generatetoken): array {
        global $DB;

        // A schema that says no version starts at the first one.
        $yamlcontent = $this->versionresolver->resolve($yamlcontent, null, true);
        $validation = $this->validate_or_fail($yamlcontent);
        $definition = schema_definition::from_data($validation['data']);

        $provisioned = $this->provisioner->provision($definition, $generatetoken);
        $warnings = array_merge($validation['warnings'], $provisioned['warnings']);

        $now = time();
        $record = $this->build_record($definition, $yamlcontent, $warnings);
        $record->enabled = 1;
        $record->userid = $provisioned['userid'];
        $record->roleid = $provisioned['roleid'];
        $record->serviceid = $provisioned['serviceid'];
        $record->tokenid = $provisioned['tokenid'];
        $record->timecreated = $now;
        $record->timemodified = $now;

        try {
            $id = $DB->insert_record('local_servicemanager_schemas', $record);
            $this->record_version($id, $definition->get_version(), $yamlcontent, 'schema_created_success');
        } catch (\Exception $e) {
            $this->provisioner->discard($provisioned);
            throw $e;
        }

        return [
            'id' => $id,
            'token' => $provisioned['token'],
            'warnings' => $warnings,
        ];
    }

    /**
     * Re-validate a schema, bring its Moodle objects in line and store it.
     *
     * @param int $id Schema record ID
     * @param string $yamlcontent New YAML content
     * @param bool $isrollback Whether the version may move backwards
     * @return array ['warnings' => array]
     * @throws \moodle_exception If validation fails
     */
    protected function apply_update(int $id, string $yamlcontent, bool $isrollback): array {
        global $DB;

        $existing = $this->get_schema($id);
        if (!$existing) {
            throw new \moodle_exception('Schema not found');
        }

        $declared = $this->declared_version($yamlcontent);
        if (!$isrollback) {
            // The version is worked out, so that forgetting to change it is not an error.
            $changes = $this->content_will_change($existing, $yamlcontent);
            $yamlcontent = $this->versionresolver->resolve($yamlcontent, $existing, $changes);
        }
        $validation = $this->validate_or_fail($yamlcontent, $id);
        $definition = schema_definition::from_data($validation['data']);

        if ($definition->get_schema_id() !== $existing->schema_id) {
            throw new \moodle_exception('error_id_change_forbidden', 'local_servicemanager');
        }

        $contentchanged = $this->content_changed($existing, $validation['data']);
        if ($isrollback) {
            $this->versionpolicy->check_rollback($existing, $definition->get_version(), $contentchanged);
        } else {
            $this->versionpolicy->check_update($existing, $definition->get_version(), $contentchanged);
        }

        // Record the version being installed, so history reflects the timeline.
        $newhash = $this->parser->get_hash($yamlcontent);
        if ($newhash !== $existing->yaml_hash || $definition->get_version() !== $existing->version) {
            $this->record_version($id, $definition->get_version(), $yamlcontent, 'schema_updated_success');
        }

        $warnings = array_merge(
            $validation['warnings'],
            $this->provisioner->reconcile($existing, $definition)
        );

        $record = $this->build_record($definition, $yamlcontent, $warnings);
        $record->id = $id;
        $record->timemodified = time();
        $DB->update_record('local_servicemanager_schemas', $record);

        return [
            'warnings' => $warnings,
            'version' => $definition->get_version(),
            'adjusted' => !$isrollback && $declared !== $definition->get_version(),
        ];
    }

    /**
     * The version a YAML declares, or nothing when it declares none or cannot be read.
     *
     * @param string $yamlcontent YAML content
     * @return string The version.
     */
    protected function declared_version(string $yamlcontent): string {
        try {
            $data = $this->parser->parse($yamlcontent);
        } catch (\moodle_exception $e) {
            return '';
        }
        return is_array($data) && isset($data['meta']['version']) ? trim((string) $data['meta']['version']) : '';
    }

    /**
     * Whether a YAML that has not been validated yet changes what the schema does.
     *
     * @param \stdClass $existing Stored schema record
     * @param string $yamlcontent YAML content
     * @return bool True when it does, and also when it cannot be read, which the validation tells afterwards.
     */
    protected function content_will_change(\stdClass $existing, string $yamlcontent): bool {
        try {
            $data = $this->parser->parse($yamlcontent);
        } catch (\moodle_exception $e) {
            return true;
        }
        // Only a YAML that has the structure of a schema can be compared; the validation tells what is wrong with another.
        return !is_array($data) || $this->parser->validate_structure($data) || $this->content_changed($existing, $data);
    }

    /**
     * Whether a YAML says what a schema has stored, however it is written: the same identity and the same content. Comments,
     * the order of the lists and the way each entry is written do not count.
     *
     * The guided form writes the YAML again from its fields, so saving it untouched gives a text that differs from the stored
     * one and says the same.
     *
     * @param \stdClass $existing Stored schema record
     * @param string $yamlcontent YAML content
     * @return bool True when saving it would change nothing.
     */
    public function says_the_same(\stdClass $existing, string $yamlcontent): bool {
        try {
            $data = $this->parser->parse($yamlcontent);
            $stored = $this->parser->parse_stored($existing->yaml_content) ?? [];
        } catch (\moodle_exception $e) {
            return false;
        }
        if (!is_array($data) || $this->parser->validate_structure($data)) {
            return false;
        }
        return schema_extractor::identity($data) === schema_extractor::identity($stored)
            && !$this->content_changed($existing, $data);
    }

    /**
     * Validate YAML, turning any error into the exception callers expect.
     *
     * @param string $yamlcontent YAML content
     * @param int|null $excludeschemaid Schema to exclude from uniqueness checks
     * @return array Validation result, with 'data' and 'warnings'
     * @throws \moodle_exception If validation fails
     */
    protected function validate_or_fail(string $yamlcontent, ?int $excludeschemaid = null): array {
        $validation = $this->validator->validate_content($yamlcontent, $excludeschemaid);

        if (!empty($validation['errors'])) {
            throw new \moodle_exception(
                'error_invalid_yaml',
                'local_servicemanager',
                '',
                implode('; ', $validation['errors'])
            );
        }

        return $validation;
    }

    /**
     * Whether what the schema does, anything outside the meta section, differs from what is stored.
     *
     * Both sides are compared in the form of schema_extractor::content(), so the same schema written another way, as the
     * guided form writes it, is not a change.
     *
     * @param \stdClass $existing Stored schema record
     * @param array $data Newly parsed YAML data, with the structure of a schema
     * @return bool
     */
    protected function content_changed(\stdClass $existing, array $data): bool {
        $olddata = $this->parser->parse_stored($existing->yaml_content) ?? [];

        return schema_extractor::content($data) !== schema_extractor::content($olddata);
    }

    /**
     * Build the stored columns that come straight from the YAML.
     *
     * @param schema_definition $definition Parsed schema
     * @param string $yamlcontent YAML content
     * @param array $warnings Warnings raised while provisioning
     * @return \stdClass
     */
    protected function build_record(schema_definition $definition, string $yamlcontent, array $warnings): \stdClass {
        $record = new \stdClass();
        $record->schema_id = $definition->get_schema_id();
        $record->name = $definition->get_name();
        $record->description = $definition->get_description();
        $record->version = $definition->get_version();
        $record->maintainer = $definition->get_maintainer();
        $record->yaml_content = $yamlcontent;
        $record->yaml_hash = $this->parser->get_hash($yamlcontent);
        $record->status = empty($warnings) ? 'healthy' : 'warning';

        return $record;
    }

    /**
     * Add a history entry unless this version is already recorded.
     *
     * @param int $id Schema record ID
     * @param string $version Version being recorded
     * @param string $yamlcontent YAML content of that version
     * @param string $stringkey Language string describing the change
     */
    protected function record_version(int $id, string $version, string $yamlcontent, string $stringkey): void {
        $historymanager = new history_manager();

        if ($historymanager->version_exists($id, $version)) {
            return;
        }

        $historymanager->save_version(
            $id,
            $version,
            $yamlcontent,
            get_string($stringkey, 'local_servicemanager', $version)
        );
    }
}
