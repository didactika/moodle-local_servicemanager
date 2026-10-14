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

namespace local_servicemanager\output;

/**
 * The changes between two versions of a schema, grouped by what they are about and ready for a page to show.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class change_areas {
    /** @var string[][] The areas that a change can be about: the string that names them and their icon. */
    private const AREAS = [
        'field' => ['area_field', 'id-card'],
        'function' => ['area_function', 'code'],
        'capability' => ['area_capability', 'shield-halved'],
        'user' => ['area_user', 'user'],
        'plugin' => ['area_plugin', 'puzzle-piece'],
        'files' => ['area_files', 'file-arrow-down'],
        'role' => ['area_role', 'user-shield'],
    ];

    /** @var string[][] How each kind of change looks. */
    private const KINDS = [
        'added' => ['icon' => 'plus', 'tone' => 'success'],
        'removed' => ['icon' => 'minus', 'tone' => 'danger'],
        'changed' => ['icon' => 'pen', 'tone' => 'warning'],
    ];

    /**
     * The changes of the schema, grouped by what they are about and ready to show.
     *
     * @param array $changes The changes, as the summary gives them.
     * @return array The areas that have changes.
     */
    public static function describe(array $changes): array {
        $result = [];
        foreach (self::AREAS as $area => [$title, $icon]) {
            $items = [];
            foreach ($changes as $change) {
                if ($change['area'] !== $area) {
                    continue;
                }
                $kind = self::KINDS[$change['kind']];
                $items[] = [
                    'label' => self::label($change),
                    'code' => in_array($area, ['function', 'capability', 'plugin', 'role'], true),
                    'icon' => $kind['icon'],
                    'tone' => $kind['tone'],
                    'kindlabel' => get_string('change_' . $change['kind'], 'local_servicemanager'),
                    'iskindchanged' => $change['kind'] === 'changed',
                    'from' => self::named($area, $change['from'] ?? null),
                    'to' => self::named($area, $change['to'] ?? null),
                ];
            }
            if ($items) {
                $result[] = ['title' => get_string($title, 'local_servicemanager'), 'icon' => $icon, 'items' => $items];
            }
        }
        return $result;
    }

    /**
     * What a change is called.
     *
     * @param array $change The change.
     * @return string The name.
     */
    private static function label(array $change): string {
        if ($change['area'] === 'field') {
            $names = [
                'name' => ['schema_name', 'local_servicemanager'],
                'version' => ['schema_version', 'local_servicemanager'],
                'maintainer' => ['schema_maintainer', 'local_servicemanager'],
                'description' => ['description', 'moodle'],
            ];
            if (!isset($names[$change['name']])) {
                return $change['name'];
            }
            return get_string($names[$change['name']][0], $names[$change['name']][1]);
        }
        if ($change['area'] === 'files') {
            $key = $change['name'] === 'download_files' ? 'req_download_files' : 'req_upload_files';
            return get_string($key, 'local_servicemanager');
        }
        return $change['name'];
    }

    /**
     * What a value is called, for the values that are words of the plugin rather than of the person.
     *
     * @param string $area What the change is about.
     * @param string|null $value The value.
     * @return string The text.
     */
    private static function named(string $area, ?string $value): string {
        if ($value === null) {
            return '';
        }
        if ($area === 'function' || $area === 'files') {
            return get_string('state_' . $value, 'local_servicemanager');
        }
        return $value === '' ? get_string('change_empty', 'local_servicemanager') : $value;
    }
}
