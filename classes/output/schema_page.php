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
use local_servicemanager\schema\manager;
use local_servicemanager\schema\yaml_parser;
use local_servicemanager\schema\schema_extractor;

/**
 * One schema: what it declares, what it provisioned and how healthy it is, or one past version of it.
 *
 * The page is drawn by the React component local_servicemanager/SchemaDetail. A past version has the same parts as the schema
 * but nothing to change in it, so it is the same page with the actions left out.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class schema_page implements react_component_renderable, \renderable {
    /** @var \stdClass|null The schema record, when the page shows the schema as it is now. */
    private ?\stdClass $schema;

    /** @var \stdClass|null The history record, when the page shows a past version. */
    private ?\stdClass $history;

    /** @var string|null A token that was just generated and is shown once. */
    private ?string $newtoken;

    /**
     * Create the page.
     *
     * @param \stdClass|null $schema The schema record, or null for a past version.
     * @param \stdClass|null $history The history record of a past version, or null.
     * @param string|null $newtoken A token that was just generated and is shown once.
     */
    private function __construct(?\stdClass $schema, ?\stdClass $history, ?string $newtoken) {
        $this->schema = $schema;
        $this->history = $history;
        $this->newtoken = $newtoken;
    }

    /**
     * The page of a schema as it is now.
     *
     * @param \stdClass $schema The schema record.
     * @param string|null $newtoken A token that was just generated and is shown once.
     * @return self The page.
     */
    public static function for_schema(\stdClass $schema, ?string $newtoken = null): self {
        return new self($schema, null, $newtoken);
    }

    /**
     * The page of one past version of a schema.
     *
     * @param \stdClass $history The history record.
     * @return self The page.
     */
    public static function for_history(\stdClass $history): self {
        return new self(null, $history, null);
    }

    /**
     * The React component that draws the schema.
     *
     * @return string Name of the component inside the plugin.
     */
    #[\Override]
    public function get_react_component_name(): string {
        return 'local_servicemanager/SchemaDetail';
    }

    /**
     * What the page shows and the places it links to.
     *
     * @param \renderer_base $renderer Renderer.
     * @return \stdClass Properties of the component.
     */
    #[\Override]
    public function get_react_component_props(\renderer_base $renderer): \stdClass {
        unset($renderer);
        return $this->history ? $this->history_props() : $this->schema_props();
    }

    /**
     * The properties of the page of a schema as it is now.
     *
     * @return \stdClass Properties of the component.
     */
    private function schema_props(): \stdClass {
        global $DB;

        $schema = $this->schema;
        $id = (int) $schema->id;
        $parser = new yaml_parser();
        $data = $parser->parse_stored($schema->yaml_content);

        $logs = [];
        $records = $DB->get_records('local_servicemanager_logs', ['schemaid' => $id], 'timecreated DESC', '*', 0, 100);
        foreach ($records as $log) {
            $logs[] = ['time' => userdate($log->timecreated), 'status' => $log->status, 'message' => $log->message];
        }

        $service = $this->service($schema);
        $params = ['id' => $id];
        $canmanage = has_capability('local/servicemanager:manage', \context_system::instance());
        return (object) [
            'strings' => page_text::strings(),
            'canManage' => $canmanage,
            'isHistory' => false,
            'sesskey' => sesskey(),
            'schema' => [
                'id' => $id,
                'schemaId' => $schema->schema_id,
                'name' => $schema->name,
                'version' => $schema->version,
                'description' => (string) $schema->description,
                'maintainer' => (string) $schema->maintainer,
                'status' => $schema->status,
                'statusLabel' => get_string('status_' . $schema->status, 'local_servicemanager'),
                // Whether the service can be called, which Moodle decides, and not what the plugin stored.
                'enabled' => (new manager())->is_enabled($schema),
                'created' => userdate($schema->timecreated),
                'modified' => userdate($schema->timemodified),
                'hasToken' => !empty($schema->tokenid),
            ],
            'wsStatus' => ws_status::describe($canmanage) + ['healthy' => 0, 'warning' => 0, 'critical' => 0],
            'newToken' => $this->newtoken,
            'functions' => $this->functions(schema_extractor::functions($data)),
            'resources' => [
                'user' => $this->user($schema),
                'role' => $this->role($schema),
                'service' => $service['resource'],
            ],
            'requirements' => [
                'downloadFiles' => $service['downloadfiles'],
                'uploadFiles' => $service['uploadfiles'],
                'plugins' => $this->plugins(schema_extractor::required_plugins($data)),
            ],
            'extraCapabilities' => array_values(schema_extractor::extra_capabilities($data)),
            'role' => schema_extractor::role_settings($data)->to_array(),
            'healthLogs' => $logs,
            'urls' => [
                'dashboard' => $this->url('dashboard.php'),
                'back' => $this->url('dashboard.php'),
                'edit' => $this->url('create.php', $params),
                'delete' => $this->url('delete.php', $params),
                'history' => $this->url('history.php', $params),
                'regenerate' => $this->url('regenerate_token.php', $params),
                'export' => $this->url('export.php', $params),
                'bulkAction' => $this->url('bulk_action.php'),
            ],
        ];
    }

    /**
     * The properties of the page of a past version.
     *
     * @return \stdClass Properties of the component.
     */
    private function history_props(): \stdClass {
        $history = $this->history;
        $parser = new yaml_parser();
        $data = $parser->parse_stored($history->yaml_content);
        $meta = schema_extractor::meta($data);

        return (object) [
            'strings' => page_text::strings(),
            'canManage' => false,
            'isHistory' => true,
            'sesskey' => '',
            'schema' => [
                'id' => (int) $history->schemaid,
                'schemaId' => $meta['id'],
                'name' => $meta['name'],
                'version' => $meta['version'],
                'description' => (string) $meta['description'],
                'maintainer' => (string) $meta['maintainer'],
                'status' => 'history',
                'statusLabel' => get_string('version', 'local_servicemanager') . ' ' . $history->version,
                'enabled' => false,
                'created' => userdate($history->timecreated),
                'modified' => userdate($history->timecreated),
                'hasToken' => false,
            ],
            'wsStatus' => null,
            'newToken' => null,
            'functions' => $this->functions(schema_extractor::functions($data)),
            'resources' => ['user' => null, 'role' => null, 'service' => null],
            'requirements' => ['downloadFiles' => false, 'uploadFiles' => false, 'plugins' => []],
            'extraCapabilities' => array_values(schema_extractor::extra_capabilities($data)),
            'role' => schema_extractor::role_settings($data)->to_array(),
            'healthLogs' => [],
            'urls' => [
                'dashboard' => $this->url('dashboard.php'),
                'back' => $this->url('history.php', ['id' => $history->schemaid]),
                'edit' => '',
                'delete' => '',
                'history' => '',
                'regenerate' => '',
                'export' => '',
                'bulkAction' => '',
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
     * The functions of the schema, each with whether this Moodle has it and what it does.
     *
     * What a function does and what it asks for is what Moodle itself says about it, so a person can read what a schema gives
     * access to without looking each function up.
     *
     * @param array $functions The functions the schema declares.
     * @return array The functions as the page lists them.
     */
    private function functions(array $functions): array {
        global $DB;

        if (!$functions) {
            return [];
        }
        $records = $DB->get_records_list('external_functions', 'name', array_column($functions, 'name'));
        $byname = [];
        foreach ($records as $record) {
            $byname[$record->name] = $record;
        }

        $rows = [];
        foreach ($functions as $function) {
            $record = $byname[$function['name']] ?? null;
            $description = '';
            $type = '';
            if ($record) {
                try {
                    $info = \core_external\external_api::external_function_info($record);
                    $description = (string) $info->description;
                    $type = (string) $info->type;
                } catch (\Throwable $e) {
                    // A function whose class cannot be read is still listed, without what it says about itself.
                    debugging($e->getMessage(), DEBUG_DEVELOPER);
                }
            }
            $rows[] = [
                'name' => $function['name'],
                'critical' => (bool) $function['critical'],
                'exists' => $record !== null,
                'description' => $description,
                'type' => $type,
                'component' => $record ? (string) $record->component : '',
                'capabilities' => $record && !empty($record->capabilities)
                    ? array_values(array_filter(array_map('trim', explode(',', $record->capabilities))))
                    : [],
            ];
        }
        return $rows;
    }

    /**
     * The plugins that the schema requires, each with whether it is installed.
     *
     * @param array $names The names of the plugins.
     * @return array The plugins as the page lists them.
     */
    private function plugins(array $names): array {
        $manager = \core_plugin_manager::instance();
        return array_map(fn(string $name) => ['name' => $name, 'installed' => $manager->get_plugin_info($name) !== null], $names);
    }

    /**
     * The service user of the schema.
     *
     * @param \stdClass $schema The schema record.
     * @return array|null Name, username and address of the user, or null when there is none.
     */
    private function user(\stdClass $schema): ?array {
        global $DB;

        if (empty($schema->userid)) {
            return null;
        }
        $fields = 'id, username, firstname, lastname, firstnamephonetic, lastnamephonetic, middlename, alternatename';
        $user = $DB->get_record('user', ['id' => $schema->userid], $fields);
        if (!$user) {
            return null;
        }
        return [
            'name' => fullname($user),
            'username' => $user->username,
            'url' => (new \moodle_url('/user/profile.php', ['id' => $user->id]))->out(false),
        ];
    }

    /**
     * The service role of the schema.
     *
     * @param \stdClass $schema The schema record.
     * @return array|null Name, short name and address of the role, or null when there is none.
     */
    private function role(\stdClass $schema): ?array {
        global $DB;

        if (empty($schema->roleid)) {
            return null;
        }
        $role = $DB->get_record('role', ['id' => $schema->roleid], 'id, name, shortname');
        if (!$role) {
            return null;
        }
        return [
            'name' => !empty($role->name) ? $role->name : $role->shortname,
            'shortname' => $role->shortname,
            'url' => (new \moodle_url('/admin/roles/define.php', ['action' => 'view', 'roleid' => $role->id]))->out(false),
        ];
    }

    /**
     * The external service of the schema and what it allows for files.
     *
     * @param \stdClass $schema The schema record.
     * @return array The resource, or null, and whether the service downloads and uploads files.
     */
    private function service(\stdClass $schema): array {
        global $DB;

        $none = ['resource' => null, 'downloadfiles' => false, 'uploadfiles' => false];
        if (empty($schema->serviceid)) {
            return $none;
        }
        $fields = 'id, name, shortname, downloadfiles, uploadfiles';
        $service = $DB->get_record('external_services', ['id' => $schema->serviceid], $fields);
        if (!$service) {
            return $none;
        }
        return [
            'resource' => [
                'name' => $service->name,
                'shortname' => $service->shortname,
                'url' => (new \moodle_url('/admin/webservice/service.php', ['id' => $service->id]))->out(false),
            ],
            'downloadfiles' => (bool) $service->downloadfiles,
            'uploadfiles' => (bool) $service->uploadfiles,
        ];
    }
}
