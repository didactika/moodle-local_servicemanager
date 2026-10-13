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

namespace local_servicemanager\automation;

/**
 * Manager for service roles at system level
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class role_manager {
    /**
     * Create a service role at system level
     *
     * shortname: ws_{id} (dots converted to underscores)
     * name: Servicio {meta.name}
     * description: {meta.description}
     *
     * @param string $schemaid Schema ID (e.g., "crm.integration")
     * @param string $metaname Display name from meta.name
     * @param string $metadescription Description from meta.description
     * @return int Role ID
     */
    public function create_service_role(string $schemaid, string $metaname, string $metadescription): int {
        global $CFG;
        require_once($CFG->dirroot . '/lib/accesslib.php');

        // Convert dots to underscores for shortname.
        $shortname = 'ws_' . str_replace('.', '_', $schemaid);
        $name = 'Role for ' . $metaname;

        // Create role with no archetype.
        $roleid = create_role($name, $shortname, $metadescription, '');
        if (class_exists('core\\event\\role_created') && !$this->core_announces_new_roles()) {
            $this->announce_new_role($roleid);
        }

        // Set role context to system level only.
        set_role_contextlevels($roleid, [CONTEXT_SYSTEM]);

        return $roleid;
    }

    /**
     * Whether create_role() of this Moodle triggers the role_created event itself.
     *
     * Releases that have the event class but do not trigger it from create_role() leave it to the role editor, so it would never
     * exist for a role that a schema creates. Reading the function is how this is told, because no version number says it for
     * every release in the range the plugin supports. Releases without the event class have nothing to trigger.
     *
     * @return bool True when core triggers the event.
     */
    private function core_announces_new_roles(): bool {
        static $announces = null;
        if ($announces === null) {
            $function = new \ReflectionFunction('create_role');
            $lines = file($function->getFileName());
            $first = $function->getStartLine() - 1;
            $source = implode('', array_slice($lines, $first, $function->getEndLine() - $first));
            $announces = strpos($source, 'role_created') !== false;
        }
        return $announces;
    }

    /**
     * Trigger the role_created event of a role that was just created, as Moodle does where create_role() does not.
     *
     * @param int $roleid Role ID
     */
    private function announce_new_role(int $roleid): void {
        global $DB;

        $role = $DB->get_record('role', ['id' => $roleid], '*', MUST_EXIST);
        $event = \core\event\role_created::create([
            'objectid' => $role->id,
            'context' => \context_system::instance(),
            'other' => [
                'name' => $role->name,
                'shortname' => $role->shortname,
                'archetype' => $role->archetype,
            ],
        ]);
        $event->add_record_snapshot('role', $role);
        $event->trigger();
    }

    /**
     * Update service role name and description
     *
     * @param int $roleid Role ID
     * @param string $metaname New display name
     * @param string $metadescription New description
     * @return bool
     */
    public function update_service_role(int $roleid, string $metaname, string $metadescription): bool {
        global $DB;

        $role = new \stdClass();
        $role->id = $roleid;
        $role->name = 'Role for ' . $metaname;
        $role->description = $metadescription;

        return $DB->update_record('role', $role);
    }

    /**
     * Assign role to user at system level
     *
     * @param int $roleid Role ID
     * @param int $userid User ID
     * @return int Role assignment ID
     */
    public function assign_role_to_user(int $roleid, int $userid): int {
        $systemcontext = \context_system::instance();
        return role_assign($roleid, $userid, $systemcontext->id, 'local_servicemanager');
    }

    /**
     * Unassign role from user
     *
     * @param int $roleid Role ID
     * @param int $userid User ID
     * @return bool
     */
    public function unassign_role_from_user(int $roleid, int $userid): bool {
        $systemcontext = \context_system::instance();
        role_unassign($roleid, $userid, $systemcontext->id, 'local_servicemanager');
        return true;
    }

    /**
     * Assign capabilities to role at system level
     *
     * @param int $roleid Role ID
     * @param array $capabilities List of capability names
     * @return void
     */
    public function assign_capabilities(int $roleid, array $capabilities): void {
        $systemcontext = \context_system::instance();
        foreach ($capabilities as $cap) {
            assign_capability($cap, CAP_ALLOW, $roleid, $systemcontext->id, true);
        }
    }

    /**
     * Apply what a schema says about its role: where it can be assigned, the permissions it is given explicitly and the roles it
     * may assign, override, switch to and see.
     *
     * Whatever the role had of these before is replaced, so a schema that no longer says something stops giving it.
     *
     * @param int $roleid Role ID
     * @param role_settings $settings What the schema says
     */
    public function apply_settings(int $roleid, role_settings $settings): void {
        global $CFG;
        require_once($CFG->dirroot . '/lib/accesslib.php');

        $this->reset_settings($roleid);

        set_role_contextlevels($roleid, $settings->context_level_numbers());

        $context = \context_system::instance();
        $permissions = ['allow' => CAP_ALLOW, 'prevent' => CAP_PREVENT, 'prohibit' => CAP_PROHIBIT];
        foreach ($permissions as $name => $value) {
            foreach ($settings->capabilities($name) as $capability) {
                assign_capability($capability, $value, $roleid, $context->id, true);
            }
        }

        $setters = [
            'allow_assign' => 'core_role_set_assign_allowed',
            'allow_override' => 'core_role_set_override_allowed',
            'allow_switch' => 'core_role_set_switch_allowed',
            'allow_view' => 'core_role_set_view_allowed',
        ];
        foreach ($setters as $relation => $setter) {
            foreach ($settings->roles($relation) as $shortname) {
                $target = $this->role_id_by_shortname($shortname);
                if ($target !== null) {
                    $setter($roleid, $target);
                }
            }
        }
    }

    /**
     * Take away the roles that a role may assign, override, switch to and see, which are the part of its settings that is not a
     * capability.
     *
     * @param int $roleid Role ID
     */
    public function reset_settings(int $roleid): void {
        global $DB;

        foreach (['role_allow_assign', 'role_allow_override', 'role_allow_switch', 'role_allow_view'] as $table) {
            $DB->delete_records($table, ['roleid' => $roleid]);
        }
    }

    /**
     * The id of the role that has a short name.
     *
     * @param string $shortname Short name, such as student.
     * @return int|null The id, or null when there is no such role.
     */
    private function role_id_by_shortname(string $shortname): ?int {
        global $DB;

        $id = $DB->get_field('role', 'id', ['shortname' => $shortname]);
        return $id === false ? null : (int) $id;
    }

    /**
     * Remove all capabilities from role (for updates)
     *
     * @param int $roleid Role ID
     * @return void
     */
    public function reset_capabilities(int $roleid): void {
        global $DB;
        $systemcontext = \context_system::instance();
        $DB->delete_records('role_capabilities', ['roleid' => $roleid, 'contextid' => $systemcontext->id]);
    }

    /**
     * Get role by ID
     *
     * @param int $roleid Role ID
     * @return \stdClass|null
     */
    public function get_role(int $roleid): ?\stdClass {
        global $DB;
        return $DB->get_record('role', ['id' => $roleid]) ?: null;
    }

    /**
     * Delete a role
     *
     * @param int $roleid Role ID
     * @return bool
     */
    public function delete_role(int $roleid): bool {
        delete_role($roleid);
        return true;
    }

    /**
     * Check if role exists
     *
     * @param int $roleid Role ID
     * @return bool
     */
    public function role_exists(int $roleid): bool {
        global $DB;
        return $DB->record_exists('role', ['id' => $roleid]);
    }

    /**
     * Get capabilities assigned to a role
     *
     * @param int $roleid Role ID
     * @return array Capability names
     */
    public function get_role_capabilities(int $roleid): array {
        global $DB;
        $systemcontext = \context_system::instance();
        $records = $DB->get_records('role_capabilities', [
            'roleid' => $roleid,
            'contextid' => $systemcontext->id,
            'permission' => CAP_ALLOW,
        ]);

        return array_column($records, 'capability');
    }
}
