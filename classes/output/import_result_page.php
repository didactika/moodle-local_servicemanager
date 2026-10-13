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
        $urls = $this->view_urls(array_column($items, 'id'));
        return (object) [
            'strings' => page_text::strings(),
            'totals' => [
                'imported' => (int) $this->result['imported'],
                'skipped' => (int) $this->result['skipped'],
                'failed' => $failed,
                'warnings' => count($this->result['warnings']),
            ],
            'items' => array_map(fn(array $item) => $item + ['viewUrl' => $urls[$item['id']] ?? ''], $items),
            'urls' => [
                'dashboard' => (new \moodle_url('/local/servicemanager/pages/dashboard.php'))->out(false),
                'again' => (new \moodle_url('/local/servicemanager/pages/import.php'))->out(false),
            ],
        ];
    }

    /**
     * The addresses of the pages of the schemas that exist, by the id of each schema.
     *
     * @param string[] $schemaids Ids of the schemas.
     * @return string[] The address of each one that exists.
     */
    private function view_urls(array $schemaids): array {
        global $DB;

        $schemaids = array_values(array_filter(array_unique($schemaids), static fn(string $id): bool => $id !== ''));
        if (!$schemaids) {
            return [];
        }
        $urls = [];
        foreach ($DB->get_records_list('local_servicemanager_schemas', 'schema_id', $schemaids, '', 'id, schema_id') as $record) {
            $view = new \moodle_url('/local/servicemanager/pages/view.php', ['id' => $record->id]);
            $urls[$record->schema_id] = $view->out(false);
        }
        return $urls;
    }
}
