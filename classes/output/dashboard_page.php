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
 * The dashboard: the schemas, the state of the web services of the site and the tools to filter and act on them.
 *
 * The page is drawn by the React component local_servicemanager/Dashboard, which gets everything it shows here.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class dashboard_page implements react_component_renderable, \renderable {
    /** @var int[] The sizes of page that can be chosen. */
    public const PERPAGE_OPTIONS = [10, 25, 50, 100];

    /** @var int Most schemas that are sent; a site that has more is told so. */
    public const MAX_SCHEMAS = 1000;

    /**
     * The React component that draws the dashboard.
     *
     * @return string Name of the component inside the plugin.
     */
    #[\Override]
    public function get_react_component_name(): string {
        return 'local_servicemanager/Dashboard';
    }

    /**
     * What the dashboard shows and the places it links to.
     *
     * Every schema is sent, with only what the list shows (the YAML, which is the heavy part, stays out), so searching and
     * filtering is done in the page and costs the server nothing.
     *
     * @param \renderer_base $renderer Renderer.
     * @return \stdClass Properties of the component.
     */
    #[\Override]
    public function get_react_component_props(\renderer_base $renderer): \stdClass {
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

        return (object) [
            'strings' => page_text::strings(),
            'canManage' => $canmanage,
            'sesskey' => sesskey(),
            'urls' => [
                'create' => $this->url('create.php', ['mode' => 'guided']),
                'createYaml' => $this->url('create.php', ['mode' => 'yaml']),
                'import' => $this->url('import.php'),
                'exportAll' => $this->url('export.php', ['all' => 1]),
                'bulkAction' => $this->url('bulk_action.php'),
                'documentation' => $this->url('documentation.php'),
                'dashboard' => $this->url('dashboard.php'),
                'wiki' => 'https://github.com/didactika/moodle-local_servicemanager/wiki',
                'moodleDocs' => get_docs_url('Web_services'),
            ],
            'wsStatus' => $this->web_service_status($canmanage),
            'schemas' => array_map(fn(\stdClass $schema) => $this->schema_row($schema), array_values($records)),
            'truncated' => $total > self::MAX_SCHEMAS,
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
     * One schema of the list, with the places its actions lead to.
     *
     * @param \stdClass $schema Record of the schema.
     * @return array The row.
     */
    private function schema_row(\stdClass $schema): array {
        $params = ['id' => $schema->id];
        return [
            'id' => (int) $schema->id,
            'schemaId' => $schema->schema_id,
            'name' => $schema->name,
            'version' => $schema->version,
            'status' => $schema->status,
            'statusLabel' => get_string('status_' . $schema->status, 'local_servicemanager'),
            'enabled' => (bool) $schema->enabled,
            'modified' => userdate($schema->timemodified),
            'modifiedAt' => (int) $schema->timemodified,
            'viewUrl' => $this->url('view.php', $params),
            'editUrl' => $this->url('create.php', $params),
            'deleteUrl' => $this->url('delete.php', $params),
            'exportUrl' => $this->url('export.php', $params),
            'historyUrl' => $this->url('history.php', $params),
        ];
    }

    /**
     * The address of a page of the settings of Moodle.
     *
     * @param string $section Section of the settings.
     * @return string The address.
     */
    private function settings_url(string $section): string {
        return (new \moodle_url('/admin/settings.php', ['section' => $section]))->out(false);
    }

    /**
     * The state of the web services of the site and how healthy the schemas are.
     *
     * @param bool $canmanage Whether the person can open the settings of the web services.
     * @return array The state.
     */
    private function web_service_status(bool $canmanage): array {
        global $CFG, $DB;

        $enabled = !empty($CFG->enablewebservices);
        $active = ($enabled && !empty($CFG->webserviceprotocols))
            ? array_map('trim', explode(',', $CFG->webserviceprotocols))
            : [];

        $protocols = [];
        foreach (\core_plugin_manager::instance()->get_plugins_of_type('webservice') as $key => $plugin) {
            $protocols[] = ['name' => strtoupper($key), 'enabled' => in_array($key, $active)];
        }

        if (!$enabled) {
            $level = 'disabled';
        } else if (count($active) === 0) {
            $level = 'warning';
        } else {
            $level = 'operational';
        }

        $rows = $DB->get_records_sql('SELECT status, COUNT(*) AS cnt FROM {local_servicemanager_schemas} GROUP BY status');
        return [
            'enabled' => $enabled,
            'level' => $level,
            'protocols' => $protocols,
            'enabledProtocols' => count($active),
            'healthy' => (int) ($rows['healthy']->cnt ?? 0),
            'warning' => (int) ($rows['warning']->cnt ?? 0),
            'critical' => (int) ($rows['critical']->cnt ?? 0),
            'overviewUrl' => $canmanage ? $this->settings_url('webservicesoverview') : '',
            'protocolsUrl' => $canmanage ? $this->settings_url('webserviceprotocols') : '',
        ];
    }
}
