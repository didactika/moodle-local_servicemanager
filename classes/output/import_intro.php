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

use core\output\react_component_renderable;

/**
 * What the person reads above the form that imports schemas, or uploads one.
 *
 * It is drawn by the React component local_servicemanager/ImportIntro. The form below it is a Moodle form and stays one, so the
 * file picker and the checks of Moodle work as everywhere else.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class import_intro implements react_component_renderable, \renderable {
    /**
     * The React component that draws the introduction.
     *
     * @return string Name of the component inside the plugin.
     */
    #[\Override]
    public function get_react_component_name(): string {
        return 'local_servicemanager/ImportIntro';
    }

    /**
     * The text of the introduction and the places it links to.
     *
     * @param \renderer_base $renderer Renderer.
     * @return \stdClass Properties of the component.
     */
    #[\Override]
    public function get_react_component_props(\renderer_base $renderer): \stdClass {
        unset($renderer);
        return (object) [
            'strings' => page_text::strings(),
            'backUrl' => (new \moodle_url('/local/servicemanager/pages/dashboard.php'))->out(false),
            'documentationUrl' => (new \moodle_url('/local/servicemanager/pages/documentation.php'))->out(false),
        ];
    }
}
