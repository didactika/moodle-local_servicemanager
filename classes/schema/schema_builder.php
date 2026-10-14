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
 * Writes the YAML of a schema from the fields of a form, so a schema can be created without knowing the format.
 *
 * The YAML that comes out is the one a person would write by hand, and it goes through the same validation and creation as
 * one that was written or imported.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class schema_builder {
    /**
     * The YAML of a schema.
     *
     * @param array $fields What the person filled in:
     *     id, name, version, maintainer, description (text);
     *     functions (names of the functions that are required) and optionalfunctions (names that only warn when missing);
     *     plugins, extracapabilities and additionalusers (lists of text);
     *     downloadfiles and uploadfiles (booleans);
     *     contextlevels (names of the levels the role can be assigned in), prevent and prohibit (capabilities) and
     *     allow_assign, allow_override, allow_switch and allow_view (short names of roles).
     * @return string The YAML.
     */
    public function to_yaml(array $fields): string {
        $lines = array_merge(
            $this->meta_lines($fields),
            $this->requirement_lines($fields),
            $this->definition_lines($fields),
            $this->role_lines($fields)
        );
        return implode("\n", $lines) . "\n";
    }

    /**
     * The meta section: the id and the name, and what else the person said about the schema.
     *
     * @param array $fields What the person filled in.
     * @return string[] The lines.
     */
    private function meta_lines(array $fields): array {
        $lines = ['meta:'];
        $lines[] = '  id: ' . $this->quote($fields['id'] ?? '');
        $lines[] = '  name: ' . $this->quote($fields['name'] ?? '');
        foreach (['version', 'maintainer', 'description'] as $optional) {
            $value = trim((string) ($fields[$optional] ?? ''));
            if ($value !== '') {
                $lines[] = '  ' . $optional . ': ' . $this->quote($value);
            }
        }
        return $lines;
    }

    /**
     * The requirements section, or nothing when the schema requires nothing.
     *
     * @param array $fields What the person filled in.
     * @return string[] The lines.
     */
    private function requirement_lines(array $fields): array {
        $plugins = $this->clean($fields['plugins'] ?? []);
        $download = !empty($fields['downloadfiles']);
        $upload = !empty($fields['uploadfiles']);
        if (!$plugins && !$download && !$upload) {
            return [];
        }

        $lines = ['', 'requirements:'];
        if ($plugins) {
            $lines[] = '  plugins:';
            $lines = array_merge($lines, $this->items('    - ', $plugins));
        }
        if ($download) {
            $lines[] = '  download_files: true';
        }
        if ($upload) {
            $lines[] = '  upload_files: true';
        }
        return $lines;
    }

    /**
     * The definition section: the functions, with the optional ones marked, and the capabilities and users that go with them.
     *
     * @param array $fields What the person filled in.
     * @return string[] The lines.
     */
    private function definition_lines(array $fields): array {
        $lines = ['', 'definition:', '  functions:'];
        $lines = array_merge($lines, $this->items('    - ', $this->clean($fields['functions'] ?? [])));
        foreach ($this->clean($fields['optionalfunctions'] ?? []) as $function) {
            $lines[] = '    - name: ' . $this->quote($function);
            $lines[] = '      critical: false';
        }
        foreach (['extracapabilities' => 'extra_capabilities', 'additionalusers' => 'additional_users'] as $field => $key) {
            $values = $this->clean($fields[$field] ?? []);
            if ($values) {
                $lines = array_merge($lines, ['', '  ' . $key . ':'], $this->items('    - ', $values));
            }
        }
        return $lines;
    }

    /**
     * The role section, or nothing when the person did not ask anything of the role.
     *
     * @param array $fields What the person filled in.
     * @return string[] The lines.
     */
    private function role_lines(array $fields): array {
        $levels = array_values(array_diff($this->clean($fields['contextlevels'] ?? []), ['system']));
        $permissions = array_filter($this->grouped($fields, ['prevent', 'prohibit']));
        $relations = array_filter($this->grouped($fields, ['allow_assign', 'allow_override', 'allow_switch', 'allow_view']));
        if (!$levels && !$permissions && !$relations) {
            return [];
        }

        $lines = ['', 'role:'];
        if ($levels) {
            $lines[] = '  context_levels:';
            $lines = array_merge($lines, $this->items('    - ', $levels));
        }
        if ($permissions) {
            $lines[] = '  permissions:';
            foreach ($permissions as $permission => $capabilities) {
                $lines[] = '    ' . $permission . ':';
                $lines = array_merge($lines, $this->items('      - ', $capabilities));
            }
        }
        foreach ($relations as $relation => $roles) {
            $lines[] = '  ' . $relation . ':';
            $lines = array_merge($lines, $this->items('    - ', $roles));
        }
        return $lines;
    }

    /**
     * The lists of some fields, each cleaned, by the name of the field.
     *
     * @param array $fields What the person filled in.
     * @param string[] $names The fields to take.
     * @return array[] The list of each.
     */
    private function grouped(array $fields, array $names): array {
        $lists = [];
        foreach ($names as $name) {
            $lists[$name] = $this->clean($fields[$name] ?? []);
        }
        return $lists;
    }

    /**
     * The lines of a list, each one a quoted item after a prefix.
     *
     * @param string $prefix What comes before each item.
     * @param string[] $values The items.
     * @return string[] The lines.
     */
    private function items(string $prefix, array $values): array {
        return array_map(fn(string $value): string => $prefix . $this->quote($value), $values);
    }

    /**
     * A text as a YAML string between double quotes.
     *
     * @param string $value The text.
     * @return string The quoted text.
     */
    private function quote(string $value): string {
        $value = trim(preg_replace('/\s+/', ' ', $value));
        return '"' . str_replace(['\\', '"'], ['\\\\', '\\"'], $value) . '"';
    }

    /**
     * A list of texts without the empty ones and the repeated ones.
     *
     * @param array $values The texts.
     * @return string[] The texts, in order.
     */
    private function clean(array $values): array {
        $kept = [];
        foreach ($values as $value) {
            $value = trim((string) $value);
            if ($value !== '' && !in_array($value, $kept, true)) {
                $kept[] = $value;
            }
        }
        return $kept;
    }
}
