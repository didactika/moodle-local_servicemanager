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
 * What a parsed schema says in each of its sections, in the shape the rest of the plugin takes it.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class schema_extractor {
    /**
     * Extract meta information from parsed YAML
     *
     * @param array $data Parsed YAML data
     * @return array Meta information with defaults
     */
    public static function meta(array $data): array {
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
    public static function functions(array $data): array {
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
    public static function extra_capabilities(array $data): array {
        return $data['definition']['extra_capabilities'] ?? [];
    }

    /**
     * Extract additional user emails from parsed YAML
     *
     * @param array $data Parsed YAML data
     * @return array Email addresses
     */
    public static function additional_users(array $data): array {
        return $data['definition']['additional_users'] ?? [];
    }

    /**
     * Extract required plugins from parsed YAML
     *
     * @param array $data Parsed YAML data
     * @return array Plugin names
     */
    public static function required_plugins(array $data): array {
        return $data['requirements']['plugins'] ?? [];
    }

    /**
     * Extract what the schema says about its role: where it can be assigned, which capabilities it has explicitly and which other
     * roles it may assign, override, switch to and see.
     *
     * @param array $data Parsed YAML data
     * @return role_settings The settings; empty when the schema has no role section.
     */
    public static function role_settings(array $data): role_settings {
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
    public static function service_settings(array $data): array {
        $requirements = $data['requirements'] ?? [];
        return [
            'download_files' => !empty($requirements['download_files']),
            'upload_files'   => !empty($requirements['upload_files']),
        ];
    }
}
