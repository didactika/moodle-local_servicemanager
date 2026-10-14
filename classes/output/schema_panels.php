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
 * The panels and lists of the page of a schema: what each says is read from the schema and from what Moodle has made of it.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class schema_panels {
    /** @var int How many chips of a list are shown before the button that opens all of them. */
    private const CHIPS_SHOWN = 8;

    /** @var string[] The relations between roles, in the order the page lists them. */
    private const RELATIONS = ['allow_assign', 'allow_override', 'allow_switch', 'allow_view'];

    /**
     * The panel of access and requirements.
     *
     * @param array|null $service What the service allows for files, or null for a past version, which does not show it.
     * @param array $plugins The plugins the schema requires.
     * @param string[] $capabilities The extra capabilities of the schema.
     * @return array The panel.
     */
    public static function access(?array $service, array $plugins, array $capabilities): array {
        $download = !empty($service['downloadfiles']);
        $upload = !empty($service['uploadfiles']);
        $files = [
            ['icon' => 'download', 'on' => $download, 'tone' => $download ? 'success' : 'secondary',
                'label' => get_string('req_download_files', 'local_servicemanager'),
                'title' => get_string(
                    $download ? 'req_download_files_enabled' : 'req_download_files_disabled',
                    'local_servicemanager'
                )],
            ['icon' => 'upload', 'on' => $upload, 'tone' => $upload ? 'success' : 'secondary',
                'label' => get_string('req_upload_files', 'local_servicemanager'),
                'title' => get_string($upload ? 'req_upload_files_enabled' : 'req_upload_files_disabled', 'local_servicemanager')],
        ];
        return [
            'showfiles' => $service !== null,
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
                    'hiddenattr' => $index >= self::CHIPS_SHOWN ? 'hidden' : '',
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
    public static function role_panel(array $role): array {
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
            $rows[] = self::role_row(get_string('role_context_levels', 'local_servicemanager'), $names);
        }
        foreach (self::RELATIONS as $relation) {
            if (!empty($role[$relation])) {
                $rows[] = self::role_row(
                    get_string('role_' . $relation, 'local_servicemanager'),
                    array_map(static fn(string $name) => ['name' => $name, 'tone' => 'primary'], $role[$relation])
                );
            }
        }
        foreach (['prevent' => 'warning', 'prohibit' => 'danger'] as $permission => $tone) {
            if (!empty($role['permissions'][$permission])) {
                $rows[] = self::role_row(
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
    private static function role_row(string $label, array $names): array {
        foreach (array_keys($names) as $index) {
            $names[$index]['folded'] = $index >= self::CHIPS_SHOWN;
            $names[$index]['hiddenattr'] = $index >= self::CHIPS_SHOWN ? 'hidden' : '';
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
     * The functions of the schema, each with whether this Moodle has it and what it does.
     *
     * What a function does and what it asks for is what Moodle itself says about it, so a person can read what a schema gives
     * access to without looking each function up.
     *
     * @param array $functions The functions the schema declares.
     * @return array The functions as the page lists them.
     */
    public static function functions(array $functions): array {
        global $DB;

        if (!$functions) {
            return [];
        }
        $byname = [];
        foreach ($DB->get_records_list('external_functions', 'name', array_column($functions, 'name')) as $record) {
            $byname[$record->name] = $record;
        }

        return array_map(
            fn(array $function): array => self::function_row($function, $byname[$function['name']] ?? null),
            $functions
        );
    }

    /**
     * One function of the schema, as the page lists it.
     *
     * @param array $function What the schema says of it: its name and whether it is critical.
     * @param \stdClass|null $record What Moodle has of it, or null when this Moodle does not have it.
     * @return array The row.
     */
    private static function function_row(array $function, ?\stdClass $record): array {
        $about = self::what_it_says($record);
        $capabilities = self::capabilities_of($record);
        $exists = $record !== null;
        $write = $about['type'] === 'write';
        return [
            'name' => $function['name'],
            'critical' => (bool) $function['critical'],
            'exists' => $exists,
            'description' => $about['description'],
            'type' => $about['type'],
            'typelabel' => $about['type'] !== '' ? get_string('function_' . $about['type'], 'local_servicemanager') : '',
            'tone' => $exists ? ($write ? 'warning' : 'success') : 'danger',
            'icon' => $exists ? ($write ? 'pen' : 'eye') : 'circle-xmark',
            'hascapabilities' => !empty($capabilities),
            'capabilitiescount' => get_string('function_capabilities', 'local_servicemanager', count($capabilities)),
            'capabilitiesjson' => json_encode($capabilities),
            'search' => strtolower($function['name'] . ' ' . $about['description']),
        ];
    }

    /**
     * What Moodle says a function does and whether it reads or writes.
     *
     * @param \stdClass|null $record What Moodle has of the function.
     * @return string[] Its description and its type, empty when they cannot be read.
     */
    private static function what_it_says(?\stdClass $record): array {
        if (!$record) {
            return ['description' => '', 'type' => ''];
        }
        try {
            $info = \core_external\external_api::external_function_info($record);
            return ['description' => (string) $info->description, 'type' => (string) $info->type];
        } catch (\Throwable $e) {
            // A function whose class cannot be read is still listed, without what it says about itself.
            debugging($e->getMessage(), DEBUG_DEVELOPER);
            return ['description' => '', 'type' => ''];
        }
    }

    /**
     * The capabilities that whoever calls a function must have.
     *
     * @param \stdClass|null $record What Moodle has of the function.
     * @return string[] The capabilities.
     */
    private static function capabilities_of(?\stdClass $record): array {
        if (!$record || empty($record->capabilities)) {
            return [];
        }
        return array_values(array_filter(array_map('trim', explode(',', $record->capabilities))));
    }

    /**
     * The plugins that the schema requires, each with whether it is installed.
     *
     * @param array $names The names of the plugins.
     * @return array The plugins as the page lists them.
     */
    public static function plugins(array $names): array {
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
    public static function user(\stdClass $schema): ?array {
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
    public static function role(\stdClass $schema): ?array {
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
    public static function service(\stdClass $schema): array {
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
