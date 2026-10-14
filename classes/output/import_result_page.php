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
 * What an import did, schema by schema: which were created or updated, which were left alone and which failed and why.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class import_result_page implements \renderable, \templatable {
    /** @var string[][] How each status looks: its icon and its colour. */
    private const LOOKS = [
        'imported' => ['icon' => 'circle-check', 'tone' => 'success'],
        'updated' => ['icon' => 'arrows-rotate', 'tone' => 'success'],
        'skipped' => ['icon' => 'forward', 'tone' => 'secondary'],
        'failed' => ['icon' => 'circle-xmark', 'tone' => 'danger'],
    ];

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
     * The totals, the schemas and the places the person goes next.
     *
     * @param \renderer_base $output Renderer.
     * @return array The context of the template.
     */
    public function export_for_template(\renderer_base $output): array {
        unset($output);
        $items = isset($this->result['items']) ? $this->result['items'] : [];
        $failed = count(array_filter($items, static fn(array $item) => $item['status'] === 'failed'));
        $warnings = count($this->result['warnings']);

        $urls = $this->view_urls(array_column($items, 'id'));
        $rows = [];
        foreach ($items as $item) {
            $look = self::LOOKS[$item['status']];
            $url = $urls[$item['id']] ?? '';
            $rows[] = [
                'label' => $item['name'] !== '' ? $item['name']
                    : ($item['id'] !== '' ? $item['id'] : get_string('import_unknown', 'local_servicemanager')),
                'id' => $item['id'],
                'showid' => $item['id'] !== '' && $item['name'] !== '',
                'viewurl' => $url,
                'icon' => $look['icon'],
                'tone' => $look['tone'],
                'failed' => $item['status'] === 'failed',
                'statuslabel' => get_string('import_status_' . $item['status'], 'local_servicemanager'),
                'hasmessages' => !empty($item['messages']),
                'messages' => array_map(static fn(string $message) => ['text' => $message], $item['messages']),
            ];
        }

        return [
            'subtitle' => get_string($failed > 0 ? 'import_result_with_errors' : 'import_result_ok', 'local_servicemanager'),
            'imported' => (int) $this->result['imported'],
            'skipped' => (int) $this->result['skipped'],
            'failed' => $failed,
            'failedtone' => $failed > 0 ? 'danger' : 'secondary',
            'warnings' => $warnings,
            'warningstone' => $warnings > 0 ? 'warning' : 'secondary',
            'hasitems' => !empty($rows),
            'items' => $rows,
            'dashboardurl' => (new \moodle_url('/local/servicemanager/pages/dashboard.php'))->out(false),
            'againurl' => (new \moodle_url('/local/servicemanager/pages/import.php'))->out(false),
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
