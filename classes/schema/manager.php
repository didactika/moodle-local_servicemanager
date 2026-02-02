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

namespace local_serviceschema\schema;

use local_serviceschema\automation\user_manager;
use local_serviceschema\automation\role_manager;
use local_serviceschema\automation\service_manager;
use local_serviceschema\automation\token_manager;
use local_serviceschema\automation\capability_calculator;

/**
 * Manager for service schema CRUD operations
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class manager {

    /** @var yaml_parser */
    protected $parser;

    /** @var validator */
    protected $validator;

    /** @var user_manager */
    protected $usermanager;

    /** @var role_manager */
    protected $rolemanager;

    /** @var service_manager */
    protected $servicemanager;

    /** @var token_manager */
    protected $tokenmanager;

    /** @var capability_calculator */
    protected $capcalc;

    /**
     * Constructor
     */
    public function __construct() {
        $this->parser = new yaml_parser();
        $this->validator = new validator();
        $this->usermanager = new user_manager();
        $this->rolemanager = new role_manager();
        $this->servicemanager = new service_manager();
        $this->tokenmanager = new token_manager();
        $this->capcalc = new capability_calculator();
    }

    /**
     * Create a new schema from YAML content
     *
     * @param string $yamlcontent YAML content
     * @param bool $generatetoken Whether to generate a token
     * @return array ['id' => int, 'token' => string|null, 'warnings' => array]
     * @throws \moodle_exception If validation fails
     */
    public function create_schema(string $yamlcontent, bool $generatetoken = false): array {
        global $DB;

        // Validate.
        $validation = $this->validator->validate_content($yamlcontent);
        if (!empty($validation['errors'])) {
            throw new \moodle_exception('error_invalid_yaml', 'local_serviceschema',
                '', implode('; ', $validation['errors']));
        }

        $data = $validation['data'];
        $meta = $this->parser->extract_meta($data);
        $functions = $this->parser->extract_functions($data);
        $extracaps = $this->parser->extract_extra_capabilities($data);
        $additionalusers = $this->parser->extract_additional_users($data);

        // Create user.
        $userid = $this->usermanager->create_service_user($meta['id'], $meta['name']);

        // Create role.
        $roleid = $this->rolemanager->create_service_role($meta['id'], $meta['name'], $meta['description']);

        // Calculate and assign capabilities.
        $functioncaps = $this->capcalc->get_capabilities_for_functions($functions);
        $allcaps = array_unique(array_merge($functioncaps, $extracaps));
        $this->rolemanager->assign_capabilities($roleid, $allcaps);

        // Assign role to user.
        $this->rolemanager->assign_role_to_user($roleid, $userid);

        // Create service.
        $serviceid = $this->servicemanager->create_external_service($meta['id'], $meta['name']);

        // Add functions to service.
        $this->servicemanager->add_functions_to_service($serviceid, $functions);

        // Authorize primary user.
        $this->servicemanager->authorize_user($serviceid, $userid);

        // Authorize additional users.
        $warnings = $validation['warnings'];
        $additionalwarnings = $this->servicemanager->authorize_additional_users($serviceid, $additionalusers);
        $warnings = array_merge($warnings, $additionalwarnings);

        // Generate token if requested.
        $tokenid = null;
        $tokenvalue = null;
        if ($generatetoken) {
            $tokenresult = $this->tokenmanager->generate_token($userid, $serviceid, $meta['name']);
            $tokenid = $tokenresult['tokenid'];
            $tokenvalue = $tokenresult['token'];
        }

        // Save schema record.
        $now = time();
        $record = new \stdClass();
        $record->schema_id = $meta['id'];
        $record->name = $meta['name'];
        $record->description = $meta['description'];
        $record->version = $meta['version'];
        $record->maintainer = $meta['maintainer'];
        $record->yaml_content = $yamlcontent;
        $record->yaml_hash = $this->parser->get_hash($yamlcontent);
        $record->enabled = 1;
        $record->status = 'healthy';
        $record->userid = $userid;
        $record->roleid = $roleid;
        $record->serviceid = $serviceid;
        $record->tokenid = $tokenid;
        $record->timecreated = $now;
        $record->timemodified = $now;

        $id = $DB->insert_record('local_serviceschema_schemas', $record);

        return [
            'id' => $id,
            'token' => $tokenvalue,
            'warnings' => $warnings,
        ];
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
        global $DB;

        $existing = $this->get_schema($id);
        if (!$existing) {
            throw new \moodle_exception('Schema not found');
        }

        // Validate with exclusion of current ID.
        $validation = $this->validator->validate_content($yamlcontent, $id);
        if (!empty($validation['errors'])) {
            throw new \moodle_exception('error_invalid_yaml', 'local_serviceschema',
                '', implode('; ', $validation['errors']));
        }

        $data = $validation['data'];
        $meta = $this->parser->extract_meta($data);
        $newhash = $this->parser->get_hash($yamlcontent);

        // Enforce version change if content changed (definition, etc).
        // We compare hashes. If hash changed but version string is same, error.
        if ($newhash !== $existing->yaml_hash && $meta['version'] === $existing->version) {
            throw new \moodle_exception('error_version_change_required', 'local_serviceschema');
        }

        // Save history if definition or version changed.
        if($newhash !== $existing->yaml_hash || $meta['version'] !== $existing->version) {
            $historymanager = new history_manager();
            $historymanager->save_version(
                $existing->id,
                $existing->version,
                $existing->yaml_content,
                get_string('schema_updated_success', 'local_serviceschema', $meta['version'])
            );
        }

        $functions = $this->parser->extract_functions($data);
        $extracaps = $this->parser->extract_extra_capabilities($data);
        $additionalusers = $this->parser->extract_additional_users($data);

        // Update user if name changed.
        if ($meta['name'] !== $existing->name) {
            $this->usermanager->update_user_name($existing->userid, $meta['name']);
        }

        // Update role.
        $this->rolemanager->update_service_role($existing->roleid, $meta['name'], $meta['description']);

        // Recalculate and update capabilities.
        $functioncaps = $this->capcalc->get_capabilities_for_functions($functions);
        $allcaps = array_unique(array_merge($functioncaps, $extracaps));
        $this->rolemanager->reset_capabilities($existing->roleid);
        $this->rolemanager->assign_capabilities($existing->roleid, $allcaps);

        // Update service.
        $this->servicemanager->update_external_service($existing->serviceid, $meta['name']);
        $this->servicemanager->reset_functions($existing->serviceid);
        $this->servicemanager->add_functions_to_service($existing->serviceid, $functions);

        // Update additional users.
        $warnings = $validation['warnings'];
        $additionalwarnings = $this->servicemanager->authorize_additional_users($existing->serviceid, $additionalusers);
        $warnings = array_merge($warnings, $additionalwarnings);

        // Update schema record.
        $record = new \stdClass();
        $record->id = $id;
        $record->name = $meta['name'];
        $record->description = $meta['description'];
        $record->version = $meta['version'];
        $record->maintainer = $meta['maintainer'];
        $record->yaml_content = $yamlcontent;
        $record->yaml_hash = $newhash;
        $record->timemodified = time();

        $DB->update_record('local_serviceschema_schemas', $record);

        return ['warnings' => $warnings];
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

        // Delete token.
        if ($schema->tokenid) {
            $this->tokenmanager->delete_token($schema->tokenid);
        }

        // Delete service.
        if ($schema->serviceid) {
            $this->servicemanager->delete_service($schema->serviceid);
        }

        // Delete role.
        if ($schema->roleid) {
            $this->rolemanager->delete_role($schema->roleid);
        }

        // Delete user.
        if ($schema->userid) {
            $this->usermanager->delete_user($schema->userid);
        }

        // Delete health logs.
        $DB->delete_records('local_serviceschema_healthlog', ['schemaid' => $id]);

        // Delete schema record.
        $DB->delete_records('local_serviceschema_schemas', ['id' => $id]);

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
        return $DB->get_record('local_serviceschema_schemas', ['id' => $id]) ?: null;
    }

    /**
     * Get a schema by schema_id
     *
     * @param string $schemaid Schema ID (e.g., 'crm.integration')
     * @return \stdClass|null
     */
    public function get_schema_by_schema_id(string $schemaid): ?\stdClass {
        global $DB;
        return $DB->get_record('local_serviceschema_schemas', ['schema_id' => $schemaid]) ?: null;
    }

    /**
     * Get all schemas
     *
     * @return array
     */
    public function get_all_schemas(): array {
        global $DB;
        return $DB->get_records('local_serviceschema_schemas', null, 'name ASC');
    }

    /**
     * Get schemas by status
     *
     * @param string $status Status filter
     * @return array
     */
    public function get_schemas_by_status(string $status): array {
        global $DB;
        return $DB->get_records('local_serviceschema_schemas', ['status' => $status], 'name ASC');
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
        return $DB->set_field('local_serviceschema_schemas', 'status', $status, ['id' => $id]);
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

        // Also toggle the external service.
        if ($schema->serviceid) {
            $DB->set_field('external_services', 'enabled', $enabled ? 1 : 0, ['id' => $schema->serviceid]);
        }

        return $DB->set_field('local_serviceschema_schemas', 'enabled', $enabled ? 1 : 0, ['id' => $id]);
    }
}
