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
 * The text that the pages of the plugin send to their React components.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class page_text {
    /** @var string[] The strings of Moodle itself that the components also use. */
    private const CORE = [
        'actions' => 'moodle',
        'all' => 'moodle',
        'cancel' => 'moodle',
        'description' => 'moodle',
        'message' => 'moodle',
        'no' => 'moodle',
        'required' => 'moodle',
        'status' => 'moodle',
        'time' => 'moodle',
        'yes' => 'moodle',
    ];

    /**
     * Every string of the plugin, in the language of the person, with the places of the values written the way the script fills.
     *
     * A value that stands alone is written {n} and the fields of an object {name}, so the script has one way to put them in.
     * The few strings of Moodle itself that the components use go in under the same names, with a core_ prefix.
     *
     * @return string[] Texts by name.
     */
    public static function strings(): array {
        $manager = get_string_manager();
        $strings = $manager->load_component_strings('local_servicemanager', current_language());
        foreach ($strings as $name => $value) {
            $strings[$name] = preg_replace(['/\{\$a->([a-z_]+)\}/', '/\{\$a\}/'], ['{$1}', '{n}'], $value);
        }
        foreach (self::CORE as $name => $component) {
            $strings['core_' . $name] = get_string($name, $component);
        }
        return $strings;
    }
}
