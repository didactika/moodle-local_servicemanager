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
use local_servicemanager\schema\history_manager;
use local_servicemanager\schema\line_diff;
use local_servicemanager\schema\version_summary;

/**
 * Two versions of a schema: what changed said in terms of the schema, and the lines of both side by side.
 *
 * The page is drawn by the React component local_servicemanager/Compare.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class compare_page implements react_component_renderable, \renderable {
    /** @var int Id of the schema. */
    private int $schemaid;

    /** @var int Id of the history record of the first version. */
    private int $first;

    /** @var int Id of the history record of the second version. */
    private int $second;

    /**
     * Create the page.
     *
     * @param int $schemaid Id of the schema.
     * @param int $first Id of the history record of the first version.
     * @param int $second Id of the history record of the second version.
     */
    public function __construct(int $schemaid, int $first, int $second) {
        $this->schemaid = $schemaid;
        $this->first = $first;
        $this->second = $second;
    }

    /**
     * The React component that draws the comparison.
     *
     * @return string Name of the component inside the plugin.
     */
    #[\Override]
    public function get_react_component_name(): string {
        return 'local_servicemanager/Compare';
    }

    /**
     * The two versions and their lines.
     *
     * @param \renderer_base $renderer Renderer.
     * @return \stdClass Properties of the component.
     * @throws \moodle_exception When one of the versions does not exist.
     */
    #[\Override]
    public function get_react_component_props(\renderer_base $renderer): \stdClass {
        $manager = new history_manager();
        $first = $manager->get_version($this->first);
        $second = $manager->get_version($this->second);
        if (!$first || !$second) {
            throw new \moodle_exception('historynotfound', 'local_servicemanager');
        }
        $diff = new line_diff();
        $rows = $diff->rows($first->yaml_content, $second->yaml_content);

        return (object) [
            'strings' => page_text::strings(),
            'title' => get_string('compare_versions', 'local_servicemanager'),
            'backUrl' => (new \moodle_url('/local/servicemanager/pages/history.php', ['id' => $this->schemaid]))->out(false),
            'first' => $this->version($first),
            'second' => $this->version($second),
            'counts' => $diff->counts($rows),
            'changes' => (new version_summary())->changes($first->yaml_content, $second->yaml_content),
            'rows' => $rows,
        ];
    }

    /**
     * What the page says about one version.
     *
     * @param \stdClass $version Record of the version.
     * @return array The version, its date and who made it.
     */
    private function version(\stdClass $version): array {
        return [
            'version' => $version->version,
            'date' => userdate($version->timecreated),
            'user' => fullname(\core_user::get_user($version->changedby)),
            'viewUrl' => (new \moodle_url(
                '/local/servicemanager/pages/view_history.php',
                ['historyid' => $version->id]
            ))->out(false),
        ];
    }
}
