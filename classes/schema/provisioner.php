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

use local_servicemanager\automation\user_manager;
use local_servicemanager\automation\role_manager;
use local_servicemanager\automation\service_manager;
use local_servicemanager\automation\token_manager;
use local_servicemanager\automation\capability_calculator;

/**
 * Owns the four Moodle objects a schema needs: service user, role, external
 * service and token.
 *
 * A schema record is only a description. These are the things that have to
 * exist for it to answer a request, and they can be deleted from Moodle's own
 * admin screens behind the plugin's back, so they need creating, repairing and
 * tearing down as a set.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class provisioner {
    /** Capabilities every provisioned role needs whatever its functions are. */
    const BASE_CAPABILITIES = ['webservice/rest:use', 'webservice/soap:use'];

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
        $this->usermanager = new user_manager();
        $this->rolemanager = new role_manager();
        $this->servicemanager = new service_manager();
        $this->tokenmanager = new token_manager();
        $this->capcalc = new capability_calculator();
    }

    /**
     * Build everything a new schema needs.
     *
     * Anything already created is removed before the exception is rethrown, so
     * a failure halfway through leaves no orphaned user, role or service.
     *
     * @param schema_definition $definition Parsed schema
     * @param bool $generatetoken Whether to issue a token for the service user
     * @return array ['userid', 'roleid', 'serviceid', 'tokenid', 'token', 'warnings']
     * @throws \Exception Whatever failed, after cleaning up
     */
    public function provision(schema_definition $definition, bool $generatetoken): array {
        $created = ['userid' => null, 'roleid' => null, 'serviceid' => null];

        try {
            $created['userid'] = $this->usermanager->create_service_user(
                $definition->get_schema_id(),
                $definition->get_name()
            );

            $created['roleid'] = $this->rolemanager->create_service_role(
                $definition->get_schema_id(),
                $definition->get_name(),
                $definition->get_description()
            );
            $this->rolemanager->assign_capabilities($created['roleid'], $this->capabilities_for($definition));
            $this->rolemanager->assign_role_to_user($created['roleid'], $created['userid']);

            $created['serviceid'] = $this->servicemanager->create_external_service(
                $definition->get_schema_id(),
                $definition->get_name(),
                $definition->get_settings()
            );
            $this->servicemanager->add_functions_to_service($created['serviceid'], $definition->get_functions());
            $this->servicemanager->authorize_user($created['serviceid'], $created['userid']);

            $warnings = $this->servicemanager->authorize_additional_users(
                $created['serviceid'],
                $definition->get_additional_users()
            );

            return array_merge(
                $created,
                $this->issue_token($created, $definition, $generatetoken),
                ['warnings' => $warnings]
            );
        } catch (\Exception $e) {
            $this->discard($created);
            throw $e;
        }
    }

    /**
     * Bring an existing schema's objects back in line with its definition,
     * recreating anything that was deleted behind the plugin's back.
     *
     * Each repair is written to the schema record as it happens, so if a later
     * step fails the record still points at what actually exists.
     *
     * @param \stdClass $existing Stored schema record
     * @param schema_definition $definition Parsed schema
     * @return array Warnings raised while authorizing additional users
     */
    public function reconcile(\stdClass $existing, schema_definition $definition): array {
        $userid = $this->reconcile_user($existing, $definition);
        $roleid = $this->reconcile_role($existing, $definition, $userid);

        $this->rolemanager->reset_capabilities($roleid);
        $this->rolemanager->assign_capabilities($roleid, $this->capabilities_for($definition));

        $serviceid = $this->reconcile_service($existing, $definition, $userid);

        $this->servicemanager->reset_functions($serviceid);
        $this->servicemanager->add_functions_to_service($serviceid, $definition->get_functions());

        return $this->servicemanager->authorize_additional_users(
            $serviceid,
            $definition->get_additional_users()
        );
    }

    /**
     * Remove every object a schema owns, token included.
     *
     * @param \stdClass $schema Stored schema record
     */
    public function deprovision(\stdClass $schema): void {
        if ($schema->tokenid) {
            $this->tokenmanager->delete_token($schema->tokenid);
        }

        $this->discard([
            'userid' => $schema->userid,
            'roleid' => $schema->roleid,
            'serviceid' => $schema->serviceid,
        ]);
    }

    /**
     * Remove provisioned objects, service first so nothing references a role or
     * user that has already gone.
     *
     * @param array $provisioned ['userid', 'roleid', 'serviceid'], any of them empty
     */
    public function discard(array $provisioned): void {
        if (!empty($provisioned['serviceid'])) {
            $this->servicemanager->delete_service($provisioned['serviceid']);
        }

        if (!empty($provisioned['roleid'])) {
            $this->rolemanager->delete_role($provisioned['roleid']);
        }

        if (!empty($provisioned['userid'])) {
            $this->usermanager->delete_user($provisioned['userid']);
        }
    }

    /**
     * Mirror a schema's enabled state onto the service and its user.
     *
     * @param \stdClass $schema Stored schema record
     * @param bool $enabled New state
     */
    public function set_enabled(\stdClass $schema, bool $enabled): void {
        global $DB;

        if ($schema->serviceid) {
            $DB->set_field('external_services', 'enabled', $enabled ? 1 : 0, ['id' => $schema->serviceid]);
        }

        if (!$schema->userid) {
            return;
        }

        if ($enabled) {
            $this->usermanager->unsuspend_user($schema->userid);
        } else {
            $this->usermanager->suspend_user($schema->userid);
        }
    }

    /**
     * Issue a token for a freshly provisioned service, if one was asked for.
     *
     * @param array $created Ids produced so far
     * @param schema_definition $definition Parsed schema
     * @param bool $generatetoken Whether to issue a token
     * @return array ['tokenid' => int|null, 'token' => string|null]
     */
    protected function issue_token(array $created, schema_definition $definition, bool $generatetoken): array {
        if (!$generatetoken) {
            return ['tokenid' => null, 'token' => null];
        }

        $result = $this->tokenmanager->generate_token(
            $created['userid'],
            $created['serviceid'],
            $definition->get_name()
        );

        return ['tokenid' => $result['tokenid'], 'token' => $result['token']];
    }

    /**
     * Rename the service user, or build a new one if it is gone.
     *
     * @param \stdClass $existing Stored schema record
     * @param schema_definition $definition Parsed schema
     * @return int User ID
     */
    protected function reconcile_user(\stdClass $existing, schema_definition $definition): int {
        global $DB;

        $userid = $existing->userid;
        if ($userid && $this->usermanager->user_exists($userid)) {
            $this->usermanager->update_user_name($userid, $definition->get_name());
            return $userid;
        }

        $userid = $this->usermanager->create_service_user(
            $definition->get_schema_id(),
            $definition->get_name()
        );
        $DB->set_field('local_servicemanager_schemas', 'userid', $userid, ['id' => $existing->id]);

        return $userid;
    }

    /**
     * Update the service role, or build a new one if it is gone.
     *
     * @param \stdClass $existing Stored schema record
     * @param schema_definition $definition Parsed schema
     * @param int $userid User the role belongs to
     * @return int Role ID
     */
    protected function reconcile_role(\stdClass $existing, schema_definition $definition, int $userid): int {
        global $DB;

        $roleid = $existing->roleid;
        if ($roleid && $this->rolemanager->role_exists($roleid)) {
            $this->rolemanager->update_service_role(
                $roleid,
                $definition->get_name(),
                $definition->get_description()
            );
            return $roleid;
        }

        $roleid = $this->rolemanager->create_service_role(
            $definition->get_schema_id(),
            $definition->get_name(),
            $definition->get_description()
        );
        $DB->set_field('local_servicemanager_schemas', 'roleid', $roleid, ['id' => $existing->id]);
        $this->rolemanager->assign_role_to_user($roleid, $userid);

        return $roleid;
    }

    /**
     * Update the external service, or build a new one if it is gone.
     *
     * @param \stdClass $existing Stored schema record
     * @param schema_definition $definition Parsed schema
     * @param int $userid User to authorize on a rebuilt service
     * @return int Service ID
     */
    protected function reconcile_service(\stdClass $existing, schema_definition $definition, int $userid): int {
        global $DB;

        $serviceid = $existing->serviceid;
        if ($serviceid && $this->servicemanager->service_exists($serviceid)) {
            $this->servicemanager->update_external_service(
                $serviceid,
                $definition->get_name(),
                $definition->get_settings()
            );
            return $serviceid;
        }

        $serviceid = $this->servicemanager->create_external_service(
            $definition->get_schema_id(),
            $definition->get_name(),
            $definition->get_settings()
        );
        $DB->set_field('local_servicemanager_schemas', 'serviceid', $serviceid, ['id' => $existing->id]);
        $this->servicemanager->authorize_user($serviceid, $userid);
        $this->reattach_token($existing, $serviceid);

        return $serviceid;
    }

    /**
     * Move a surviving token onto a rebuilt service, or clear the pointer if
     * the token went with the old one.
     *
     * @param \stdClass $existing Stored schema record
     * @param int $serviceid Rebuilt service ID
     */
    protected function reattach_token(\stdClass $existing, int $serviceid): void {
        global $DB;

        if (!$existing->tokenid) {
            return;
        }

        if ($this->tokenmanager->token_exists($existing->tokenid)) {
            $this->tokenmanager->reattach_token($existing->tokenid, $serviceid);
        } else {
            $DB->set_field('local_servicemanager_schemas', 'tokenid', 0, ['id' => $existing->id]);
        }
    }

    /**
     * Every capability the role needs: the ones its functions imply, the ones
     * the schema asks for on top, and the transport capabilities.
     *
     * @param schema_definition $definition Parsed schema
     * @return array Capability names
     */
    protected function capabilities_for(schema_definition $definition): array {
        $functioncaps = $this->capcalc->get_capabilities_for_functions($definition->get_functions());

        return array_unique(array_merge(
            $functioncaps,
            $definition->get_extra_capabilities(),
            self::BASE_CAPABILITIES
        ));
    }
}
