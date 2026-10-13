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
 * YAML parser for service schema definitions
 *
 * Uses PHP's native yaml_parse if available, otherwise falls back to
 * a simple custom parser for the supported YAML subset.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class yaml_parser {
    /**
     * Parse YAML content string
     *
     * @param string $content YAML content
     * @return array|null Parsed data or null on failure
     * @throws \moodle_exception If YAML is invalid
     */
    public function parse(string $content): ?array {
        return $this->read($content, true);
    }

    /**
     * Parse YAML that the plugin has already stored.
     *
     * Without the yaml extension, releases before 1.0.3 accepted inconsistent
     * indentation, so a stored schema or history entry may hold YAML that parse()
     * now rejects. It is read the way it was read when it was saved, so it can
     * still be displayed, health-checked and replaced.
     *
     * @param string $content Stored YAML content
     * @return array|null Parsed data or null on failure
     * @throws \moodle_exception If YAML is invalid
     */
    public function parse_stored(string $content): ?array {
        return $this->read($content, false);
    }

    /**
     * Parse YAML with the yaml extension, or the fallback reader without it.
     *
     * @param string $content YAML content
     * @param bool $strict Whether the fallback reader rejects inconsistent indentation
     * @return array|null Parsed data or null on failure
     * @throws \moodle_exception If YAML is invalid
     */
    protected function read(string $content, bool $strict): ?array {
        // Try native PHP yaml extension first.
        if (function_exists('yaml_parse')) {
            $data = @yaml_parse($content);
            if ($data === false) {
                throw new \moodle_exception('error_invalid_yaml', 'local_servicemanager', '', 'Unable to parse YAML');
            }
            return is_array($data) ? $data : null;
        }

        // Fallback to simple parser.
        try {
            $data = (new simple_yaml($strict))->parse($content);
            return is_array($data) ? $data : null;
        } catch (\Exception $e) {
            throw new \moodle_exception('error_invalid_yaml', 'local_servicemanager', '', $e->getMessage());
        }
    }

    /**
     * Validate schema ID format (only letters, numbers, dots)
     *
     * @param string $id Schema ID
     * @return bool True if valid
     */
    public function validate_schema_id(string $id): bool {
        return preg_match('/^[a-zA-Z0-9.]+$/', $id) === 1;
    }

    /**
     * Convert schema_id to shortname format (dots to underscores)
     *
     * @param string $id Schema ID
     * @return string Shortname format
     */
    public function id_to_shortname(string $id): string {
        return str_replace('.', '_', $id);
    }

    /**
     * Validate the structure of parsed YAML data
     *
     * @param array $data Parsed YAML data
     * @return array Array of error strings (empty if valid)
     */
    public function validate_structure(array $data): array {
        // Can't continue without meta.
        if (!isset($data['meta']) || !is_array($data['meta'])) {
            return [get_string('error_missing_meta', 'local_servicemanager')];
        }

        $errors = $this->validate_meta($data['meta']);

        if (!isset($data['definition']) || !is_array($data['definition'])) {
            $errors[] = get_string('error_missing_definition', 'local_servicemanager');
            return $errors;
        }

        return array_merge($errors, $this->validate_definition($data['definition']), $this->validate_role($data['role'] ?? null));
    }

    /**
     * Check the role section, which is optional: it must be a map that only has the keys that mean something, and each of those
     * must have the shape it needs.
     *
     * @param mixed $role The role section, or null when the schema has none.
     * @return array Array of error strings (empty if valid)
     */
    protected function validate_role($role): array {
        if ($role === null) {
            return [];
        }
        if (!is_array($role) || ($role && array_is_list($role))) {
            return [get_string('error_role_section', 'local_servicemanager')];
        }

        $errors = [];
        $known = array_merge(['context_levels', 'permissions'], role_settings::RELATIONS);
        foreach (array_diff(array_keys($role), $known) as $key) {
            $errors[] = get_string('error_role_unknown_key', 'local_servicemanager', $key);
        }

        $lists = array_merge(['context_levels'], role_settings::RELATIONS);
        foreach ($lists as $key) {
            if (isset($role[$key]) && !$this->is_list_of_text($role[$key])) {
                $errors[] = get_string('error_role_list', 'local_servicemanager', $key);
            }
        }
        foreach ((array) ($role['context_levels'] ?? []) as $level) {
            if (is_string($level) && !isset(role_settings::CONTEXT_LEVELS[$level])) {
                $errors[] = get_string('error_role_context_level', 'local_servicemanager', $level);
            }
        }

        if (isset($role['permissions'])) {
            if (!is_array($role['permissions']) || array_is_list($role['permissions'])) {
                $errors[] = get_string('error_role_permissions', 'local_servicemanager');
            } else {
                foreach ($role['permissions'] as $permission => $capabilities) {
                    if (!in_array($permission, role_settings::PERMISSIONS, true)) {
                        $errors[] = get_string('error_role_permission_name', 'local_servicemanager', $permission);
                    } else if (!$this->is_list_of_text($capabilities)) {
                        $errors[] = get_string('error_role_list', 'local_servicemanager', 'permissions.' . $permission);
                    }
                }
            }
        }
        return $errors;
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

    /**
     * Check the required fields of the meta section
     *
     * @param array $meta Meta section
     * @return array Array of error strings (empty if valid)
     */
    protected function validate_meta(array $meta): array {
        $errors = [];

        if (empty($meta['id'])) {
            $errors[] = get_string('error_missing_meta_id', 'local_servicemanager');
        } else if (!$this->validate_schema_id($meta['id'])) {
            $errors[] = get_string('error_invalid_schema_id', 'local_servicemanager', $meta['id']);
        } else if (\strlen($meta['id']) > 50) {
            $errors[] = get_string('error_schema_id_too_long', 'local_servicemanager', \strlen($meta['id']));
        }

        if (empty($meta['name'])) {
            $errors[] = get_string('error_missing_meta_name', 'local_servicemanager');
        }

        if (empty($meta['version'])) {
            $errors[] = get_string('error_missing_meta_version', 'local_servicemanager');
        }

        return $errors;
    }

    /**
     * Check the definition section, which has to declare at least one function
     *
     * @param array $definition Definition section
     * @return array Array of error strings (empty if valid)
     */
    protected function validate_definition(array $definition): array {
        if (empty($definition['functions']) || !is_array($definition['functions'])) {
            return [get_string('error_missing_functions', 'local_servicemanager')];
        }

        return [];
    }

    /**
     * Get SHA256 hash of content for change detection
     *
     * @param string $content YAML content
     * @return string Hash
     */
    public function get_hash(string $content): string {
        return hash('sha256', $content);
    }

    /**
     * Extract meta information from parsed YAML
     *
     * @param array $data Parsed YAML data
     * @return array Meta information with defaults
     */
    public function extract_meta(array $data): array {
        $meta = $data['meta'] ?? [];
        return [
            'id' => $meta['id'] ?? '',
            'name' => $meta['name'] ?? '',
            'version' => $meta['version'] ?? '1.0.0',
            'maintainer' => $meta['maintainer'] ?? '',
            'description' => $meta['description'] ?? '',
        ];
    }

    /**
     * Extract functions from parsed YAML
     *
     * @param array $data Parsed YAML data
     * @return array Functions with name and critical flag
     */
    public function extract_functions(array $data): array {
        $functions = $data['definition']['functions'] ?? [];
        $result = [];

        foreach ($functions as $func) {
            if (is_string($func)) {
                $result[] = [
                    'name' => $func,
                    'critical' => true,
                ];
            } else if (is_array($func) && isset($func['name'])) {
                $result[] = [
                    'name' => $func['name'],
                    'critical' => $func['critical'] ?? true,
                ];
            }
        }

        return $result;
    }

    /**
     * Extract extra capabilities from parsed YAML
     *
     * @param array $data Parsed YAML data
     * @return array Extra capabilities
     */
    public function extract_extra_capabilities(array $data): array {
        return $data['definition']['extra_capabilities'] ?? [];
    }

    /**
     * Extract additional user emails from parsed YAML
     *
     * @param array $data Parsed YAML data
     * @return array Email addresses
     */
    public function extract_additional_users(array $data): array {
        return $data['definition']['additional_users'] ?? [];
    }

    /**
     * Extract required plugins from parsed YAML
     *
     * @param array $data Parsed YAML data
     * @return array Plugin names
     */
    public function extract_required_plugins(array $data): array {
        return $data['requirements']['plugins'] ?? [];
    }

    /**
     * Extract what the schema says about its role: where it can be assigned, which capabilities it has explicitly and which other
     * roles it may assign, override, switch to and see.
     *
     * @param array $data Parsed YAML data
     * @return role_settings The settings; empty when the schema has no role section.
     */
    public function extract_role_settings(array $data): role_settings {
        $section = $data['role'] ?? [];
        return role_settings::from_array(is_array($section) ? $section : []);
    }

    /**
     * Extract file transfer flags from the requirements section.
     * Defaults to false for any flag not explicitly set.
     *
     * @param array $data Parsed YAML data
     * @return array ['download_files' => bool, 'upload_files' => bool]
     */
    public function extract_service_settings(array $data): array {
        $requirements = $data['requirements'] ?? [];
        return [
            'download_files' => !empty($requirements['download_files']),
            'upload_files'   => !empty($requirements['upload_files']),
        ];
    }
}
