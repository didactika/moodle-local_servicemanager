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
 * The icons of the pages, asked for by id and drawn by the theme, so a theme (or Icon Restyle) changes them like every other icon
 * of the site. The pages name an icon by what it shows; each name is the icon of Moodle that shows it or, where Moodle has none,
 * an icon of the plugin that lib.php maps to Font Awesome.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class icons {
    /** @var string[] The icon of Moodle (an id of core) or of the plugin (a name without a slash) that each name shows. */
    private const IDS = [
        'angle-left' => 'i/previous',
        'angle-right' => 'i/next',
        'arrow-left' => 't/left',
        'arrow-right' => 't/right',
        'arrows-rotate' => 'i/reload',
        'bars' => 'i/menubars',
        'book' => 'docs',
        'check' => 'i/checked',
        'chevron-down' => 't/expanded',
        'chevron-right' => 't/collapsed',
        'chevron-up' => 't/up',
        'circle-check' => 'i/valid',
        'circle-exclamation' => 'i/warning',
        'circle-info' => 'i/info',
        'circle-minus' => 't/less',
        'circle-xmark' => 'i/invalid',
        'clock' => 'i/scheduled',
        'clock-rotate-left' => 'history',
        'code' => 'code',
        'code-branch' => 'branch',
        'code-compare' => 'compare',
        'copy' => 't/copy',
        'download' => 't/download',
        'ellipsis' => 'i/moremenu',
        'eye' => 'view',
        'file-import' => 'i/import',
        'filter' => 'i/filter',
        'filter-circle-xmark' => 'i/filter',
        'fingerprint' => 'fingerprint',
        'forward' => 't/right',
        'gear' => 'i/settings',
        'heart-pulse' => 'health',
        'key' => 'key',
        'magnifying-glass' => 'a/search',
        'minus' => 't/less',
        'pen' => 't/edit',
        'pen-to-square' => 't/edit',
        'plug' => 'plug',
        'plug-circle-check' => 'plug',
        'plug-circle-exclamation' => 'plug',
        'plug-circle-xmark' => 'plug',
        'plus' => 't/add',
        'power-off' => 'power',
        'puzzle-piece' => 'plugin',
        'rotate' => 'i/reload',
        'rotate-left' => 't/reset',
        'rotate-right' => 'i/reload',
        'server' => 'server',
        'shield-halved' => 'i/permissions',
        'table-columns' => 'columns',
        'table-list' => 'list',
        'toggle-off' => 't/hide',
        'toggle-on' => 't/show',
        'trash' => 't/delete',
        'triangle-exclamation' => 'i/warning',
        'upload' => 'i/upload',
        'user' => 'i/user',
        'user-shield' => 'i/permissions',
        'xmark' => 'e/cancel',
    ];

    /**
     * The icon of a name, drawn by the theme.
     *
     * @param string $name What the icon shows.
     * @return string The HTML of the icon.
     */
    public static function draw(string $name): string {
        global $OUTPUT;

        $id = self::IDS[$name] ?? $name;
        $component = (strpos($id, '/') !== false || $id === 'docs') ? 'core' : 'local_servicemanager';
        return $OUTPUT->pix_icon($id, '', $component);
    }

    /**
     * Give every icon named in the context of a page its HTML, beside it as iconhtml, so the templates draw it as it is.
     *
     * @param array $context The context of a page.
     * @return array The context, with the icons drawn.
     */
    public static function drawn(array $context): array {
        foreach ($context as $key => $value) {
            if (is_array($value)) {
                $context[$key] = self::drawn($value);
            } else if ($key === 'icon' && is_string($value) && $value !== '') {
                $context['iconhtml'] = self::draw($value);
            }
        }
        return $context;
    }
}
