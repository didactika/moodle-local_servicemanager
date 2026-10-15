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

use local_servicemanager\schema\manager;
use local_servicemanager\schema\yaml_parser;
use local_servicemanager\schema\schema_extractor;

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
        unset($output);
        \local_servicemanager\compat\external_aliases::register();
        return $this->history ? $this->history_context() : $this->schema_context();
    }

    /**
     * The context of the page of a schema as it is now.
     *
     * @return array The context.
     */
    private function schema_context(): array {
        $schema = $this->schema;
        $id = (int) $schema->id;
        $parser = new yaml_parser();
        $data = $parser->parse_stored($schema->yaml_content);
        $canmanage = has_capability('local/servicemanager:manage', \context_system::instance());
        // Whether the service can be called, which Moodle decides, and not what the plugin stored.
        $enabled = (new manager())->is_enabled($schema);

        $service = schema_panels::service($schema);
        $params = ['id' => $id];
        $resources = array_values(array_filter([
            $this->resource('service_user', 'user', schema_panels::user($schema)),
            $this->resource('service_role', 'shield-halved', schema_panels::role($schema)),
            $this->resource('external_service', 'plug', $service['resource']),
        ]));
        $functions = schema_panels::functions(schema_extractor::functions($data));
        $missing = count(array_filter($functions, static fn(array $function) => !$function['exists']));

        return [
            'ishistory' => false,
            'canmanage' => $canmanage,
            'sesskey' => sesskey(),
            'hasws' => true,
            'ws' => ws_status::describe($canmanage),
            'backurl' => $this->url('dashboard.php'),
            'backlabel' => get_string('dashboard', 'local_servicemanager'),
            'schema' => $this->schema_summary([
                'schemaid' => $schema->schema_id,
                'name' => $schema->name,
                'version' => $schema->version,
                'description' => (string) $schema->description,
                'maintainer' => (string) $schema->maintainer,
                'status' => $schema->status,
                'statuslabel' => get_string('status_' . $schema->status, 'local_servicemanager'),
                'enabled' => $enabled,
                'created' => userdate($schema->timecreated),
                'modified' => userdate($schema->timemodified),
            ]),
            'newtoken' => $this->newtoken,
            'hasnewtoken' => $this->newtoken !== null,
            'hastoken' => !empty($schema->tokenid),
            'tokenbutton' => $this->token_button(!empty($schema->tokenid)),
            'tokenbadge' => [
                'tone' => !empty($schema->tokenid) ? 'success' : 'secondary',
                'label' => get_string(!empty($schema->tokenid) ? 'token_active' : 'token_none', 'local_servicemanager'),
            ],
            'toggle' => $this->toggle_button($enabled),
            'hasfunctions' => !empty($functions),
            'functions' => $functions,
            'functionstitle' => get_string(count($functions) === 1 ? 'tile_function' : 'functions', 'local_servicemanager'),
            'functionscount' => count($functions),
            'searchable' => count($functions) >= 8,
            'missing' => $missing,
            'missinglabel' => get_string('tile_functions_missing', 'local_servicemanager', $missing),
            'hasresources' => !empty($resources),
            'resources' => $resources,
            'access' => schema_panels::access(
                $service,
                schema_panels::plugins(schema_extractor::required_plugins($data)),
                array_values(schema_extractor::extra_capabilities($data))
            ),
            'role' => schema_panels::role_panel(schema_extractor::role_settings($data)->to_array()),
            // The checks have a page of their own; this one sums them up.
            'health' => health_page::summary($schema),
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
        $meta = schema_extractor::meta($data);
        $functions = schema_panels::functions(schema_extractor::functions($data));
        $missing = count(array_filter($functions, static fn(array $function) => !$function['exists']));

        return [
            'ishistory' => true,
            'canmanage' => false,
            'sesskey' => '',
            'hasws' => false,
            'backurl' => $this->url('history.php', ['id' => $history->schemaid]),
            'backlabel' => get_string('back', 'local_servicemanager'),
            'schema' => $this->schema_summary([
                'schemaid' => $meta['id'],
                'name' => $meta['name'],
                'version' => $meta['version'],
                'description' => (string) $meta['description'],
                'maintainer' => (string) $meta['maintainer'],
                'status' => 'history',
                'statuslabel' => get_string('version', 'local_servicemanager') . ' ' . $history->version,
                'enabled' => false,
                'created' => userdate($history->timecreated),
                'modified' => userdate($history->timecreated),
            ]),
            'newtoken' => null,
            'hasnewtoken' => false,
            'hastoken' => false,
            'tokenbutton' => $this->token_button(false),
            'tokenbadge' => ['tone' => 'secondary', 'label' => get_string('token_none', 'local_servicemanager')],
            'toggle' => $this->toggle_button(false),
            'hasfunctions' => !empty($functions),
            'functions' => $functions,
            'functionstitle' => get_string(count($functions) === 1 ? 'tile_function' : 'functions', 'local_servicemanager'),
            'functionscount' => count($functions),
            'searchable' => count($functions) >= 8,
            'missing' => $missing,
            'missinglabel' => get_string('tile_functions_missing', 'local_servicemanager', $missing),
            'hasresources' => false,
            'resources' => [],
            'access' => schema_panels::access(null, [], array_values(schema_extractor::extra_capabilities($data))),
            'role' => schema_panels::role_panel(schema_extractor::role_settings($data)->to_array()),
            'health' => ['hasany' => false],
            'urls' => [],
        ];
    }

    /**
     * The part of the context that says what the schema is.
     *
     * @param array $fields What it is: schemaid, name, version, description, maintainer, status (history for a past version),
     *     statuslabel (what the status says), enabled, created and modified (when).
     * @return array The summary.
     */
    private function schema_summary(array $fields): array {
        $look = $this->look($fields['status']);
        return [
            'schemaid' => $fields['schemaid'],
            'name' => $fields['name'],
            'version' => $fields['version'],
            'description' => $fields['description'],
            'maintainer' => $fields['maintainer'],
            'statuslabel' => $fields['statuslabel'],
            'tone' => $look['tone'],
            'icon' => $look['icon'],
            'enabled' => $fields['enabled'],
            'created' => $fields['created'],
            'modified' => $fields['modified'],
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
     * The button that enables or disables the schema: what it looks like and what it says is what pressing it will do.
     *
     * @param bool $enabled Whether the schema is enabled.
     * @return array The icon, the colour and the label.
     */
    private function toggle_button(bool $enabled): array {
        return [
            'icon' => $enabled ? 'toggle-on' : 'toggle-off',
            'tone' => $enabled ? 'tone-success' : '',
            'label' => get_string($enabled ? 'bulk_disable' : 'bulk_enable', 'local_servicemanager'),
        ];
    }

    /**
     * The button that makes the token, or a new one when there is one.
     *
     * @param bool $hastoken Whether the schema has a token.
     * @return array The icon and the label.
     */
    private function token_button(bool $hastoken): array {
        return [
            'icon' => $hastoken ? 'rotate' : 'key',
            'label' => get_string($hastoken ? 'action_regenerate_token' : 'action_generate_token', 'local_servicemanager'),
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
}
