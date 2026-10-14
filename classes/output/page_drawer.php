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
 * Draws the pages of the plugin from their templates.
 *
 * It adds to every page what depends on the release of Moodle that runs it: the earlier releases have the icon font of Font
 * Awesome 4 and the templates are written with the names of the later one, so the styles map the names when they are told that.
 * The font that is installed says which one it is, because the release that changed it is not the same for every distribution.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class page_drawer {
    /**
     * Draw a page.
     *
     * @param string $template Name of the template inside the plugin.
     * @param \templatable $page The page.
     * @return string The HTML.
     */
    public static function render(string $template, \templatable $page): string {
        global $CFG, $OUTPUT;

        $context = $page->export_for_template($OUTPUT);
        $context['legacyicons'] = !file_exists($CFG->dirroot . '/lib/fonts/fa-solid-900.woff2');
        return $OUTPUT->render_from_template('local_servicemanager/' . $template, $context);
    }
}
