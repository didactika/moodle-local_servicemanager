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
 * What changed between two versions of a schema, said in terms of the schema and not of its lines: which functions came and went,
 * which capabilities and users, which fields of its identity.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class version_summary {
    /** @var string[] The fields of the identity of a schema that are compared. */
    private const FIELDS = ['name', 'version', 'maintainer', 'description'];

    /**
     * The changes between two versions.
     *
     * @param string $before The YAML of the first version.
     * @param string $after The YAML of the second version.
     * @return array The changes. Each has an area (field, function, capability, user, plugin or files), a kind (added, removed or
     *     changed), the name of what changed and, for a change, what it was and what it is now.
     */
    public function changes(string $before, string $after): array {
        $parser = new yaml_parser();
        $old = $parser->parse_stored($before) ?? [];
        $new = $parser->parse_stored($after) ?? [];

        $changes = [];
        $oldmeta = schema_extractor::meta($old);
        $newmeta = schema_extractor::meta($new);
        foreach (self::FIELDS as $field) {
            $from = (string) ($oldmeta[$field] ?? '');
            $to = (string) ($newmeta[$field] ?? '');
            if ($from !== $to) {
                $changes[] = ['area' => 'field', 'kind' => 'changed', 'name' => $field, 'from' => $from, 'to' => $to];
            }
        }

        $changes = array_merge(
            $changes,
            $this->functions(schema_extractor::functions($old), schema_extractor::functions($new)),
            $this->lists('capability', schema_extractor::extra_capabilities($old), schema_extractor::extra_capabilities($new)),
            $this->lists('user', schema_extractor::additional_users($old), schema_extractor::additional_users($new)),
            $this->lists('plugin', schema_extractor::required_plugins($old), schema_extractor::required_plugins($new)),
            $this->files(schema_extractor::service_settings($old), schema_extractor::service_settings($new)),
            $this->role(schema_extractor::role_settings($old), schema_extractor::role_settings($new))
        );
        return $changes;
    }

    /**
     * The functions that were added, removed or made critical or optional.
     *
     * @param array $old The functions of the first version.
     * @param array $new The functions of the second version.
     * @return array The changes.
     */
    private function functions(array $old, array $new): array {
        $before = array_column($old, 'critical', 'name');
        $after = array_column($new, 'critical', 'name');

        $changes = [];
        foreach ($after as $name => $critical) {
            if (!array_key_exists($name, $before)) {
                $changes[] = ['area' => 'function', 'kind' => 'added', 'name' => $name];
            } else if ((bool) $before[$name] !== (bool) $critical) {
                $changes[] = [
                    'area' => 'function', 'kind' => 'changed', 'name' => $name,
                    'from' => $before[$name] ? 'critical' : 'optional', 'to' => $critical ? 'critical' : 'optional',
                ];
            }
        }
        foreach (array_keys($before) as $name) {
            if (!array_key_exists($name, $after)) {
                $changes[] = ['area' => 'function', 'kind' => 'removed', 'name' => $name];
            }
        }
        return $changes;
    }

    /**
     * The items of a list that were added or removed.
     *
     * @param string $area What the list is: capability, user or plugin.
     * @param array $old The list of the first version.
     * @param array $new The list of the second version.
     * @return array The changes.
     */
    private function lists(string $area, array $old, array $new): array {
        $changes = [];
        foreach (array_diff($new, $old) as $name) {
            $changes[] = ['area' => $area, 'kind' => 'added', 'name' => (string) $name];
        }
        foreach (array_diff($old, $new) as $name) {
            $changes[] = ['area' => $area, 'kind' => 'removed', 'name' => (string) $name];
        }
        return $changes;
    }

    /**
     * What the role gained and lost: the contexts it can be assigned in, the capabilities it is given explicitly and the roles it
     * may assign, override, switch to and see.
     *
     * @param \local_servicemanager\automation\role_settings $old The settings of the first version.
     * @param \local_servicemanager\automation\role_settings $new The settings of the second version.
     * @return array The changes; the name of each says what it is about, such as allow_assign: student.
     */
    private function role($old, $new): array {
        $changes = [];
        $compare = function (string $label, array $before, array $after) use (&$changes): void {
            foreach (array_diff($after, $before) as $name) {
                $changes[] = ['area' => 'role', 'kind' => 'added', 'name' => $label . ': ' . $name];
            }
            foreach (array_diff($before, $after) as $name) {
                $changes[] = ['area' => 'role', 'kind' => 'removed', 'name' => $label . ': ' . $name];
            }
        };
        $compare('context_levels', $old->context_levels(), $new->context_levels());
        foreach ($new::PERMISSIONS as $permission) {
            $compare('permissions.' . $permission, $old->capabilities($permission), $new->capabilities($permission));
        }
        foreach ($new::RELATIONS as $relation) {
            $compare($relation, $old->roles($relation), $new->roles($relation));
        }
        return $changes;
    }

    /**
     * Whether the service may download or upload files now and did not, or the other way round.
     *
     * @param array $old The settings of the first version.
     * @param array $new The settings of the second version.
     * @return array The changes.
     */
    private function files(array $old, array $new): array {
        $changes = [];
        foreach (['download_files', 'upload_files'] as $setting) {
            $from = !empty($old[$setting]);
            $to = !empty($new[$setting]);
            if ($from !== $to) {
                $changes[] = [
                    'area' => 'files', 'kind' => 'changed', 'name' => $setting,
                    'from' => $from ? 'on' : 'off', 'to' => $to ? 'on' : 'off',
                ];
            }
        }
        return $changes;
    }
}
