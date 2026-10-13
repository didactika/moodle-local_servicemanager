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

use local_servicemanager\schema\yaml_parser;

/**
 * One schema: what it declares, what it provisioned and how healthy it is, or one past version of it.
 *
 * A past version has the same parts as the schema but nothing to change in it, so it is the same page with the actions left out.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class schema_page implements \renderable, \templatable {
    /** @var string[][] How each status looks: its colour and its icon. */
    private const LOOKS = [
        'healthy' => ['tone' => 'success', 'icon' => 'circle-check'],
        'warning' => ['tone' => 'warning', 'icon' => 'triangle-exclamation'],
        'critical' => ['tone' => 'danger', 'icon' => 'circle-xmark'],
        'history' => ['tone' => 'secondary', 'icon' => 'clock'],
    ];

    /** @var int How many chips of a list are shown before the button that opens all of them. */
    private const CHIPS_SHOWN = 8;

    /** @var string[] The relations between roles, in the order the page lists them. */
    private const RELATIONS = ['allow_assign', 'allow_override', 'allow_switch', 'allow_view'];

    /** @var \stdClass|null The schema record, when the page shows the schema as it is now. */
    private $schema;

    /** @var \stdClass|null The history record, when the page shows a past version. */
    private $history;

    /** @var string|null A token that was just generated and is shown once. */
    private $newtoken;

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
     * What the page shows and the places it links to.
     *
     * @param \renderer_base $output Renderer.
     * @return array The context of the template.
     */
    public function export_for_template(\renderer_base $output): array {
        \local_servicemanager\compat\external_aliases::register();
        return $this->history ? $this->history_context() : $this->schema_context();
    }

    /**
     * The context of the page of a schema as it is now.
     *
     * @return array The context.
     */
    private function schema_context(): array {
        global $DB;

        $schema = $this->schema;
        $id = (int) $schema->id;
        $parser = new yaml_parser();
        $data = $parser->parse_stored($schema->yaml_content);
        $canmanage = has_capability('local/servicemanager:manage', \context_system::instance());

        $logs = [];
        $records = $DB->get_records('local_servicemanager_logs', ['schemaid' => $id], 'timecreated DESC', '*', 0, 100);
        foreach ($records as $log) {
            $logs[] = [
                'time' => userdate($log->timecreated),
                'status' => $log->status,
                'tone' => $this->look($log->status)['tone'],
                'message' => $log->message,
            ];
        }

        $service = $this->service($schema);
        $params = ['id' => $id];
        $resources = array_values(array_filter([
            $this->resource('service_user', 'user', $this->user($schema)),
            $this->resource('service_role', 'shield-halved', $this->role($schema)),
            $this->resource('external_service', 'plug', $service['resource']),
        ]));
        $functions = $this->functions($parser->extract_functions($data));
        $missing = count(array_filter($functions, static fn(array $function) => !$function['exists']));

        return [
            'ishistory' => false,
            'canmanage' => $canmanage,
            'sesskey' => sesskey(),
            'hasws' => true,
            'ws' => ws_status::describe($canmanage),
            'backurl' => $this->url('dashboard.php'),
            'backlabel' => get_string('dashboard', 'local_servicemanager'),
            'schema' => $this->schema_summary(
                $schema->schema_id,
                $schema->name,
                $schema->version,
                (string) $schema->description,
                (string) $schema->maintainer,
                $schema->status,
                get_string('status_' . $schema->status, 'local_servicemanager'),
                (bool) $schema->enabled,
                userdate($schema->timecreated),
                userdate($schema->timemodified)
            ),
            'newtoken' => $this->newtoken,
            'hasnewtoken' => $this->newtoken !== null,
            'hastoken' => !empty($schema->tokenid),
            'hasfunctions' => !empty($functions),
            'functions' => $functions,
            'functionstitle' => get_string(count($functions) === 1 ? 'tile_function' : 'functions', 'local_servicemanager'),
            'functionscount' => count($functions),
            'searchable' => count($functions) >= 8,
            'missing' => $missing,
            'missinglabel' => get_string('tile_functions_missing', 'local_servicemanager', $missing),
            'hasresources' => !empty($resources),
            'resources' => $resources,
            'access' => $this->access(
                $service['downloadfiles'],
                $service['uploadfiles'],
                $this->plugins($parser->extract_required_plugins($data)),
                array_values($parser->extract_extra_capabilities($data))
            ),
            'role' => $this->role_panel($parser->extract_role_settings($data)->to_array()),
            'haslogs' => !empty($logs),
            'logs' => $logs,
            'logscount' => count($logs),
            'urls' => [
                'edit' => $this->url('create.php', $params),
                'delete' => $this->url('delete.php', $params),
                'history' => $this->url('history.php', $params),
                'regenerate' => $this->url('regenerate_token.php', $params),
                'export' => $this->url('export.php', $params),
                'bulk' => $this->url('bulk_action.php'),
            ],
            'schemarowid' => $id,
        ];
    }

    /**
     * The context of the page of a past version.
     *
     * @return array The context.
     */
    private function history_context(): array {
        $history = $this->history;
        $parser = new yaml_parser();
        $data = $parser->parse_stored($history->yaml_content);
        $meta = $parser->extract_meta($data);
        $functions = $this->functions($parser->extract_functions($data));
        $missing = count(array_filter($functions, static fn(array $function) => !$function['exists']));

        return [
            'ishistory' => true,
            'canmanage' => false,
            'sesskey' => '',
            'hasws' => false,
            'backurl' => $this->url('history.php', ['id' => $history->schemaid]),
            'backlabel' => get_string('back', 'local_servicemanager'),
            'schema' => $this->schema_summary(
                $meta['id'],
                $meta['name'],
                $meta['version'],
                (string) $meta['description'],
                (string) $meta['maintainer'],
                'history',
                get_string('version', 'local_servicemanager') . ' ' . $history->version,
                false,
                userdate($history->timecreated),
                userdate($history->timecreated)
            ),
            'newtoken' => null,
            'hasnewtoken' => false,
            'hastoken' => false,
            'hasfunctions' => !empty($functions),
            'functions' => $functions,
            'functionstitle' => get_string(count($functions) === 1 ? 'tile_function' : 'functions', 'local_servicemanager'),
            'functionscount' => count($functions),
            'searchable' => count($functions) >= 8,
            'missing' => $missing,
            'missinglabel' => get_string('tile_functions_missing', 'local_servicemanager', $missing),
            'hasresources' => false,
            'resources' => [],
            'access' => $this->access(
                false,
                false,
                [],
                array_values($parser->extract_extra_capabilities($data))
            ),
            'role' => $this->role_panel($parser->extract_role_settings($data)->to_array()),
            'haslogs' => false,
            'logs' => [],
            'logscount' => 0,
            'urls' => [],
        ];
    }

    /**
     * The part of the context that says what the schema is.
     *
     * @param string $schemaid Id of the schema.
     * @param string $name Name.
     * @param string $version Version.
     * @param string $description Description.
     * @param string $maintainer Maintainer.
     * @param string $status Status, or history for a past version.
     * @param string $statuslabel What the status says.
     * @param bool $enabled Whether the schema is enabled.
     * @param string $created When it was created.
     * @param string $modified When it was last modified.
     * @return array The summary.
     */
    private function schema_summary(
        string $schemaid,
        string $name,
        string $version,
        string $description,
        string $maintainer,
        string $status,
        string $statuslabel,
        bool $enabled,
        string $created,
        string $modified
    ): array {
        $look = $this->look($status);
        return [
            'schemaid' => $schemaid,
            'name' => $name,
            'version' => $version,
            'description' => $description,
            'maintainer' => $maintainer,
            'statuslabel' => $statuslabel,
            'tone' => $look['tone'],
            'icon' => $look['icon'],
            'enabled' => $enabled,
            'created' => $created,
            'modified' => $modified,
        ];
    }

    /**
     * How a status looks.
     *
     * @param string $status Status of a schema or of a health check.
     * @return string[] Its colour and its icon.
     */
    private function look(string $status): array {
        return self::LOOKS[$status] ?? self::LOOKS['healthy'];
    }

    /**
     * The panel of access and requirements.
     *
     * @param bool $download Whether the service downloads files.
     * @param bool $upload Whether the service uploads files.
     * @param array $plugins The plugins the schema requires.
     * @param string[] $capabilities The extra capabilities of the schema.
     * @return array The panel.
     */
    private function access(bool $download, bool $upload, array $plugins, array $capabilities): array {
        $ishistory = $this->history !== null;
        $files = [
            ['icon' => 'download', 'on' => $download, 'label' => get_string('req_download_files', 'local_servicemanager'),
                'title' => get_string(
                    $download ? 'req_download_files_enabled' : 'req_download_files_disabled',
                    'local_servicemanager'
                )],
            ['icon' => 'upload', 'on' => $upload, 'label' => get_string('req_upload_files', 'local_servicemanager'),
                'title' => get_string($upload ? 'req_upload_files_enabled' : 'req_upload_files_disabled', 'local_servicemanager')],
        ];
        return [
            'showfiles' => !$ishistory,
            'files' => $files,
            'hasplugins' => !empty($plugins),
            'plugins' => $plugins,
            'hascapabilities' => !empty($capabilities),
            'capabilities' => array_map(static function (string $capability, int $index): array {
                $parts = explode(':', $capability, 2);
                return [
                    'name' => $capability,
                    'plugin' => $parts[0],
                    'capability' => isset($parts[1]) ? $parts[1] : '',
                    'folded' => $index >= self::CHIPS_SHOWN,
                ];
            }, $capabilities, array_keys($capabilities)),
            'hasmorecapabilities' => count($capabilities) > self::CHIPS_SHOWN,
            'morecapabilities' => get_string('chips_all', 'local_servicemanager', count($capabilities)),
            'morecapabilitiescount' => max(0, count($capabilities) - self::CHIPS_SHOWN),
        ];
    }

    /**
     * The panel of what the role may do, or an empty one when the schema says nothing about it.
     *
     * @param array $role The role section of the schema.
     * @return array The panel; its visible flag is false when there is nothing to show.
     */
    private function role_panel(array $role): array {
        $rows = [];
        $levels = isset($role['context_levels']) ? $role['context_levels'] : [];
        $levels = array_values(array_filter($levels, static fn($level) => $level !== 'system'));
        if ($levels) {
            $names = [];
            foreach (array_merge(['system'], $levels) as $level) {
                $key = 'role_level_' . $level;
                $names[] = ['name' => get_string_manager()->string_exists($key, 'local_servicemanager')
                    ? get_string($key, 'local_servicemanager') : $level, 'tone' => 'secondary'];
            }
            $rows[] = $this->role_row(get_string('role_context_levels', 'local_servicemanager'), $names);
        }
        foreach (self::RELATIONS as $relation) {
            if (!empty($role[$relation])) {
                $rows[] = $this->role_row(
                    get_string('role_' . $relation, 'local_servicemanager'),
                    array_map(static fn(string $name) => ['name' => $name, 'tone' => 'primary'], $role[$relation])
                );
            }
        }
        foreach (['prevent' => 'warning', 'prohibit' => 'danger'] as $permission => $tone) {
            if (!empty($role['permissions'][$permission])) {
                $rows[] = $this->role_row(
                    get_string('role_permission_' . $permission, 'local_servicemanager'),
                    array_map(
                        static fn(string $name) => ['name' => $name, 'tone' => $tone],
                        $role['permissions'][$permission]
                    )
                );
            }
        }
        return ['visible' => !empty($rows), 'rows' => $rows];
    }

    /**
     * One block of the role: its name over its list, with the names past the first few folded behind a button.
     *
     * @param string $label What the list is.
     * @param array $names The names, each with its tone.
     * @return array The block.
     */
    private function role_row(string $label, array $names): array {
        foreach ($names as $index => $name) {
            $names[$index]['folded'] = $index >= self::CHIPS_SHOWN;
        }
        $more = count($names) - self::CHIPS_SHOWN;
        return [
            'label' => $label,
            'count' => count($names),
            'names' => array_values($names),
            'hasmore' => $more > 0,
            'morecount' => max(0, $more),
            'morelabel' => $more > 0 ? get_string('chips_all', 'local_servicemanager', count($names)) : '',
        ];
    }

    /**
     * One resource of the schema, as the page lists it.
     *
     * @param string $stringkey String that names the kind of resource.
     * @param string $icon Icon of the kind.
     * @param array|null $resource Name, detail and address, or null when there is none.
     * @return array|null The entry, or null.
     */
    private function resource(string $stringkey, string $icon, ?array $resource): ?array {
        if (!$resource) {
            return null;
        }
        return [
            'label' => get_string($stringkey, 'local_servicemanager'),
            'icon' => $icon,
            'name' => $resource['name'],
            'detail' => $resource['detail'],
            'url' => $resource['url'],
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
            $record = isset($byname[$function['name']]) ? $byname[$function['name']] : null;
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
            $capabilities = $record && !empty($record->capabilities)
                ? array_values(array_filter(array_map('trim', explode(',', $record->capabilities))))
                : [];
            $exists = $record !== null;
            $write = $type === 'write';
            $rows[] = [
                'name' => $function['name'],
                'critical' => (bool) $function['critical'],
                'exists' => $exists,
                'description' => $description,
                'type' => $type,
                'typelabel' => $type !== '' ? get_string('function_' . $type, 'local_servicemanager') : '',
                'tone' => $exists ? ($write ? 'warning' : 'success') : 'danger',
                'icon' => $exists ? ($write ? 'pen' : 'eye') : 'circle-xmark',
                'hascapabilities' => !empty($capabilities),
                'capabilitiescount' => get_string('function_capabilities', 'local_servicemanager', count($capabilities)),
                'capabilitiesjson' => json_encode($capabilities),
                'search' => strtolower($function['name'] . ' ' . $description),
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
        return array_map(static fn(string $name) => [
            'name' => $name,
            'installed' => $manager->get_plugin_info($name) !== null,
        ], $names);
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
            'detail' => $user->username,
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
            'detail' => $role->shortname,
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
                'detail' => $service->shortname,
                'url' => (new \moodle_url('/admin/webservice/service.php', ['id' => $service->id]))->out(false),
            ],
            'downloadfiles' => (bool) $service->downloadfiles,
            'uploadfiles' => (bool) $service->uploadfiles,
        ];
    }
}
