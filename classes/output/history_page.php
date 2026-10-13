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
 * The versions a schema has had, to filter, read, compare and roll back to.
 *
 * The page is drawn by the React component local_servicemanager/History.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class history_page implements react_component_renderable, \renderable {
    /** @var int[] The sizes of page that can be chosen. */
    public const PERPAGE_OPTIONS = [10, 25, 50, 100];

    /** @var \stdClass The schema record. */
    private \stdClass $schema;

    /**
     * Create the page.
     *
     * @param \stdClass $schema The schema record.
     */
    public function __construct(\stdClass $schema) {
        $this->schema = $schema;
    }

    /**
     * The React component that draws the history.
     *
     * @return string Name of the component inside the plugin.
     */
    #[\Override]
    public function get_react_component_name(): string {
        return 'local_servicemanager/History';
    }

    /**
     * What the history shows and the places it links to.
     *
     * The versions are sent without their YAML, which is the heavy part of each and is asked for when one is opened, so the page
     * searches, filters and pages them without going back to the server.
     *
     * @param \renderer_base $renderer Renderer.
     * @return \stdClass Properties of the component.
     */
    #[\Override]
    public function get_react_component_props(\renderer_base $renderer): \stdClass {
        unset($renderer);
        global $PAGE;

        $id = (int) $this->schema->id;
        $rows = $this->rows($PAGE);

        return (object) [
            'strings' => page_text::strings(),
            'schemaId' => $id,
            'schemaName' => $this->schema->name,
            'currentVersion' => $this->schema->version,
            'urls' => [
                'back' => $this->url('view.php', ['id' => $id]),
                'compare' => $this->url('compare.php'),
                'history' => $this->url('history.php', ['id' => $id]),
            ],
            'rows' => $rows,
            'perPageOptions' => self::PERPAGE_OPTIONS,
        ];
    }

    /**
     * The address of a page of the plugin.
     *
     * @param string $page File of the page.
     * @param array $params Parameters of the address.
     * @return string The address.
     */
    private function url(string $page, array $params = []): string {
        return (new \moodle_url('/local/servicemanager/pages/' . $page, $params))->out(false);
    }

    /**
     * The versions of the list, in the shape the component takes.
     *
     * @param \moodle_page $page The page, to find the picture of the person who made each version.
     * @return array[] One entry for each version.
     */
    private function rows(\moodle_page $page): array {
        return array_map(static fn(array $row): array => [
            'id' => $row['id'],
            'version' => $row['version'],
            'userName' => $row['username'],
            'userPicture' => $row['userpicture'],
            'date' => $row['date'],
            'at' => $row['at'],
            'reason' => $row['reason'],
            'isCurrent' => $row['iscurrent'],
            'viewUrl' => $row['viewurl'],
            'canRollback' => $row['canrollback'],
        ], version_rows::describe($this->schema, $page));
    }
}
