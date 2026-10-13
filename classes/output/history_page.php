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
 * The versions of a schema: who changed it, when and why, with the way to see one, go back to it or compare two.
 *
 * Every version is listed without its YAML, which is the heavy part, and the script of the page asks for the one that is opened.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class history_page implements \renderable, \templatable {
    /** @var int[] The sizes of page that can be chosen. */
    public const PERPAGE_OPTIONS = [10, 25, 50, 100];

    /** @var \stdClass The schema record. */
    private $schema;

    /**
     * Create the page.
     *
     * @param \stdClass $schema The schema record.
     */
    public function __construct(\stdClass $schema) {
        $this->schema = $schema;
    }

    /**
     * The versions and the places the page links to.
     *
     * @param \renderer_base $output Renderer.
     * @return array The context of the template.
     */
    public function export_for_template(\renderer_base $output): array {
        unset($output);
        global $PAGE;

        $id = (int) $this->schema->id;
        $rows = $this->rows($PAGE);

        return [
            'schemaid' => $id,
            'schemaname' => $this->schema->name,
            'currentlabel' => get_string('history_current', 'local_servicemanager', $this->schema->version),
            'hasrows' => !empty($rows),
            'rows' => $rows,
            'count' => count($rows),
            'perpage' => array_map(
                static fn(int $size) => ['size' => $size, 'first' => $size === self::PERPAGE_OPTIONS[0]],
                self::PERPAGE_OPTIONS
            ),
            'backurl' => $this->url('view.php', ['id' => $id]),
            'compareurl' => $this->url('compare.php'),
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
     * The versions of the list, in the shape the template takes.
     *
     * @param \moodle_page $page The page, to draw the picture of the person who made each version.
     * @return array[] One entry for each version.
     */
    private function rows(\moodle_page $page): array {
        $rows = version_rows::describe($this->schema, $page);
        foreach (array_keys($rows) as $index) {
            // Only the first page is shown until the script takes over.
            $rows[$index]['hidden'] = $index >= self::PERPAGE_OPTIONS[0];
        }
        return $rows;
    }
}
