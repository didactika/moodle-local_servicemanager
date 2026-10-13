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
 * What an import did, schema by schema: which were created or updated, which were left alone and which failed and why.
 *
 * The page is drawn by the React component local_servicemanager/ImportResult.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class import_result_page implements react_component_renderable, \renderable {
    /** @var array The result of the import, as the importer gives it. */
    private array $result;

    /**
     * Create the page.
     *
     * @param array $result The result of the import: imported, skipped, errors, warnings and items.
     */
    public function __construct(array $result) {
        $this->result = $result;
    }

    /**
     * The React component that draws the result.
     *
     * @return string Name of the component inside the plugin.
     */
    #[\Override]
    public function get_react_component_name(): string {
        return 'local_servicemanager/ImportResult';
    }

    /**
     * The totals, the schemas and the places the person goes next.
     *
     * @param \renderer_base $renderer Renderer.
     * @return \stdClass Properties of the component.
     */
    #[\Override]
    public function get_react_component_props(\renderer_base $renderer): \stdClass {
        $items = $this->result['items'] ?? [];
        $failed = count(array_filter($items, fn(array $item) => $item['status'] === 'failed'));
        return (object) [
            'strings' => page_text::strings(),
            'totals' => [
                'imported' => (int) $this->result['imported'],
                'skipped' => (int) $this->result['skipped'],
                'failed' => $failed,
                'warnings' => count($this->result['warnings']),
            ],
            'items' => array_map(fn(array $item) => $item + ['viewUrl' => $this->view_url($item['id'])], $items),
            'urls' => [
                'dashboard' => (new \moodle_url('/local/servicemanager/pages/dashboard.php'))->out(false),
                'again' => (new \moodle_url('/local/servicemanager/pages/import.php'))->out(false),
            ],
        ];
    }

    /**
     * The address of the page of a schema that exists.
     *
     * @param string $schemaid Id of the schema.
     * @return string The address, or an empty text when there is no such schema.
     */
    private function view_url(string $schemaid): string {
        global $DB;

        $record = $schemaid === '' ? false : $DB->get_record('local_servicemanager_schemas', ['schema_id' => $schemaid], 'id');
        return $record ? (new \moodle_url('/local/servicemanager/pages/view.php', ['id' => $record->id]))->out(false) : '';
    }
}
