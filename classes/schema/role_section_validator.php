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

use local_servicemanager\automation\role_settings;

/**
 * Checks the role section of a schema, which is optional: it must be a map that only has the keys that mean something, and each
 * of those must have the shape it needs.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class role_section_validator {
    /**
     * What is wrong with the role section.
     *
     * @param mixed $role The role section, or null when the schema has none.
     * @return array Array of error strings (empty if valid)
     */
    public function errors($role): array {
        if ($role === null) {
            return [];
        }
        if (!is_array($role) || ($role && self::is_list($role))) {
            return [get_string('error_role_section', 'local_servicemanager')];
        }

        return array_merge(
            $this->unknown_role_keys($role),
            $this->role_list_errors($role),
            $this->role_level_errors($role),
            $this->role_permission_errors($role['permissions'] ?? null)
        );
    }

    /**
     * The keys of the role section that mean nothing.
     *
     * @param array $role The role section.
     * @return array Array of error strings
     */
    private function unknown_role_keys(array $role): array {
        $known = array_merge(['context_levels', 'permissions'], role_settings::RELATIONS);
        $errors = [];
        foreach (array_diff(array_keys($role), $known) as $key) {
            $errors[] = get_string('error_role_unknown_key', 'local_servicemanager', $key);
        }
        return $errors;
    }

    /**
     * The keys of the role section that have to be lists of text and are not.
     *
     * @param array $role The role section.
     * @return array Array of error strings
     */
    private function role_list_errors(array $role): array {
        $errors = [];
        foreach (array_merge(['context_levels'], role_settings::RELATIONS) as $key) {
            if (isset($role[$key]) && !$this->is_list_of_text($role[$key])) {
                $errors[] = get_string('error_role_list', 'local_servicemanager', $key);
            }
        }
        return $errors;
    }

    /**
     * The levels of context of the role section that Moodle has no name for.
     *
     * @param array $role The role section.
     * @return array Array of error strings
     */
    private function role_level_errors(array $role): array {
        $errors = [];
        foreach ((array) ($role['context_levels'] ?? []) as $level) {
            if (is_string($level) && !isset(role_settings::CONTEXT_LEVELS[$level])) {
                $errors[] = get_string('error_role_context_level', 'local_servicemanager', $level);
            }
        }
        return $errors;
    }

    /**
     * What is wrong with the permissions of the role section, which is a map from a kind of permission to a list of capabilities.
     *
     * @param mixed $permissions The permissions, or null when the section has none.
     * @return array Array of error strings
     */
    private function role_permission_errors($permissions): array {
        if ($permissions === null) {
            return [];
        }
        if (!is_array($permissions) || self::is_list($permissions)) {
            return [get_string('error_role_permissions', 'local_servicemanager')];
        }
        $errors = [];
        foreach ($permissions as $permission => $capabilities) {
            if (!in_array($permission, role_settings::PERMISSIONS, true)) {
                $errors[] = get_string('error_role_permission_name', 'local_servicemanager', $permission);
            } else if (!$this->is_list_of_text($capabilities)) {
                $errors[] = get_string('error_role_list', 'local_servicemanager', 'permissions.' . $permission);
            }
        }
        return $errors;
    }

    /**
     * Whether an array is a list, with the keys 0, 1, 2 and so on in order, as array_is_list() of PHP 8.1 tells.
     *
     * @param array $value The array.
     * @return bool True when it is a list; an empty array is one.
     */
    private static function is_list(array $value): bool {
        return $value === [] || array_keys($value) === range(0, count($value) - 1);
    }

    /**
     * Whether a value is a list of texts.
     *
     * @param mixed $value The value.
     * @return bool True when it is an array whose items are all text.
     */
    private function is_list_of_text($value): bool {
        if (!is_array($value)) {
            return false;
        }
        foreach ($value as $item) {
            if (!is_string($item) || $item === '') {
                return false;
            }
        }
        return true;
    }
}
