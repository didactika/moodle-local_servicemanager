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
 * The dashboard: the schemas, the state of the web services of the site and the tools to filter and act on them.
 *
 * Every schema is drawn, with only what the list shows, and the script of the page searches and pages them without asking the
 * server again. The first page is the only one that is visible before the script runs.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class dashboard_page implements \renderable, \templatable {
    /** @var int[] The sizes of page that can be chosen. */
    public const PERPAGE_OPTIONS = [10, 25, 50, 100];

    /** @var int Most schemas that are drawn; a site that has more is told so. */
    public const MAX_SCHEMAS = 1000;

    /**
     * What the dashboard shows and the places it links to.
     *
     * @param \renderer_base $output Renderer.
     * @return array The context of the template.
     */
    public function export_for_template(\renderer_base $output): array {
        global $DB;

        $context = \context_system::instance();
        $canmanage = has_capability('local/servicemanager:manage', $context);
        $total = $DB->count_records('local_servicemanager_schemas');
        $records = $DB->get_records(
            'local_servicemanager_schemas',
            null,
            'name ASC',
            'id, schema_id, name, version, status, enabled, timemodified',
            0,
            self::MAX_SCHEMAS
        );

        $status = $this->web_service_status($canmanage);
        $count = $status['healthy'] + $status['warning'] + $status['critical'];
        $rows = [];
        foreach (array_values($records) as $index => $record) {
            $rows[] = $this->schema_row($record, $index >= self::PERPAGE_OPTIONS[0], $canmanage);
        }

        return [
            'canmanage' => $canmanage,
            'sesskey' => sesskey(),
            'hasschemas' => !empty($rows),
            'schemas' => $rows,
            'truncated' => $total > self::MAX_SCHEMAS,
            'truncatedtext' => get_string('list_truncated', 'local_servicemanager', count($rows)),
            'ws' => $status,
            'total' => $count,
            'totallabel' => get_string($count === 1 ? 'tile_schema' : 'tile_schemas', 'local_servicemanager'),
            'perpage' => array_map(
                static fn(int $size) => ['size' => $size, 'first' => $size === self::PERPAGE_OPTIONS[0]],
                self::PERPAGE_OPTIONS
            ),
            'urls' => [
                'create' => $this->url('create.php', ['mode' => 'guided']),
                'import' => $this->url('import.php'),
                'exportall' => $this->url('export.php', ['all' => 1]),
                'bulk' => $this->url('bulk_action.php'),
                'documentation' => $this->url('documentation.php'),
                'wiki' => 'https://github.com/didactika/moodle-local_servicemanager/wiki',
                'moodledocs' => get_docs_url('Web_services'),
            ],
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
     * One schema of the list, with the places its actions lead to.
     *
     * @param \stdClass $schema Record of the schema.
     * @param bool $hidden Whether the row is out of the first page.
     * @param bool $canmanage Whether the person can change schemas.
     * @return array The row.
     */
    private function schema_row(\stdClass $schema, bool $hidden, bool $canmanage): array {
        $params = ['id' => $schema->id];
        return [
            'id' => (int) $schema->id,
            'schemaid' => $schema->schema_id,
            'name' => $schema->name,
            'version' => $schema->version,
            'status' => $schema->status,
            'tone' => ['healthy' => 'success', 'warning' => 'warning', 'critical' => 'danger'][$schema->status] ?? 'secondary',
            'statuslabel' => get_string('status_' . $schema->status, 'local_servicemanager'),
            'enabled' => (bool) $schema->enabled,
            'enabledvalue' => $schema->enabled ? '1' : '0',
            'toggleicon' => $schema->enabled ? 'toggle-off' : 'toggle-on',
            'togglekey' => $schema->enabled ? 'bulk_disable' : 'bulk_enable',
            'modified' => userdate($schema->timemodified),
            'modifiedat' => (int) $schema->timemodified,
            'hidden' => $hidden,
            'canmanage' => $canmanage,
            'viewurl' => $this->url('view.php', $params),
            'editurl' => $this->url('create.php', $params),
            'deleteurl' => $this->url('delete.php', $params),
            'exporturl' => $this->url('export.php', $params),
            'historyurl' => $this->url('history.php', $params),
        ];
    }

    /**
     * The state of the web services of the site and how healthy the schemas are.
     *
     * @param bool $canmanage Whether the person can open the settings of the web services.
     * @return array The state.
     */
    private function web_service_status(bool $canmanage): array {
        global $DB;

        $rows = $DB->get_records_sql('SELECT status, COUNT(*) AS cnt FROM {local_servicemanager_schemas} GROUP BY status');
        return ws_status::describe($canmanage) + [
            'healthy' => (int) (isset($rows['healthy']) ? $rows['healthy']->cnt : 0),
            'warning' => (int) (isset($rows['warning']) ? $rows['warning']->cnt : 0),
            'critical' => (int) (isset($rows['critical']) ? $rows['critical']->cnt : 0),
        ];
    }
}
