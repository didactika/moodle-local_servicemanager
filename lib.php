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

/**
 * Library functions for local_servicemanager
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Get the domain from Moodle's wwwroot.
 *
 * @return string The domain name
 */
function local_servicemanager_get_domain(): string {
    global $CFG;
    $parsed = parse_url($CFG->wwwroot);
    return $parsed['host'] ?? 'localhost';
}

/**
 * Convert schema ID to shortname format (dots to underscores).
 *
 * @param string $schemaid The schema ID
 * @return string The shortname format
 */
function local_servicemanager_id_to_shortname(string $schemaid): string {
    return str_replace('.', '_', $schemaid);
}

/**
 * Validate that a schema ID only contains allowed characters.
 *
 * @param string $schemaid The schema ID to validate
 * @return bool True if valid
 */
function local_servicemanager_validate_schema_id(string $schemaid): bool {
    return preg_match('/^[a-zA-Z0-9.]+$/', $schemaid) === 1;
}

/**
 * The icons of the plugin, for what Moodle has no icon of its own, mapped to Font Awesome as Moodle maps its icons, so they are
 * asked for by id and a theme can change them. Moodle 4.0 and 4.1 have Font Awesome 4, and the later releases Font Awesome 6, so
 * each icon has the name it has in the font of the release.
 *
 * @return string[] Font Awesome class of each icon.
 */
function local_servicemanager_get_fontawesome_icon_map(): array {
    global $CFG;

    $fa4 = (int) ($CFG->branch ?? 0) < 402;
    $icons = [
        'branch' => ['fa-code-fork', 'fa-code-branch'],
        'code' => ['fa-code', 'fa-code'],
        'columns' => ['fa-columns', 'fa-table-columns'],
        'compare' => ['fa-exchange', 'fa-code-compare'],
        'fingerprint' => ['fa-id-badge', 'fa-fingerprint'],
        'health' => ['fa-heartbeat', 'fa-heart-pulse'],
        'history' => ['fa-history', 'fa-clock-rotate-left'],
        'key' => ['fa-key', 'fa-key'],
        'list' => ['fa-list', 'fa-table-list'],
        'plug' => ['fa-plug', 'fa-plug'],
        'plugin' => ['fa-puzzle-piece', 'fa-puzzle-piece'],
        'power' => ['fa-power-off', 'fa-power-off'],
        'server' => ['fa-server', 'fa-server'],
        'view' => ['fa-eye', 'fa-eye'],
    ];
    $map = [];
    foreach ($icons as $name => [$old, $new]) {
        $map['local_servicemanager:' . $name] = $fa4 ? $old : $new;
    }
    return $map;
}
