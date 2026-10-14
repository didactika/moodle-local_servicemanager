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

namespace local_servicemanager\automation;

/**
 * What a schema says about the role that is created for it, beyond the capabilities its functions need: where the role can be
 * assigned, which capabilities it is explicitly given, kept from or forbidden, and which other roles it may assign, override,
 * switch to and see.
 *
 * Roles are named by their short name (student, editingteacher, manager), which is how Moodle itself names them in code.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class role_settings {
    /** @var int[] The context levels a role can be assigned in, by the name the YAML uses. */
    public const CONTEXT_LEVELS = [
        'system' => CONTEXT_SYSTEM,
        'user' => CONTEXT_USER,
        'category' => CONTEXT_COURSECAT,
        'course' => CONTEXT_COURSE,
        'module' => CONTEXT_MODULE,
        'block' => CONTEXT_BLOCK,
    ];

    /** @var string[] The permissions that can be written for a capability. */
    public const PERMISSIONS = ['allow', 'prevent', 'prohibit'];

    /** @var string[] The relations between roles, by the key the YAML uses. */
    public const RELATIONS = ['allow_assign', 'allow_override', 'allow_switch', 'allow_view'];

    /** @var string[] Context levels, by name. */
    private array $contextlevels;

    /** @var array Capabilities by permission. */
    private array $permissions;

    /** @var array Short names of roles, by relation. */
    private array $relations;

    /**
     * Create the settings.
     *
     * @param string[] $contextlevels Names of the context levels; the system level is always there.
     * @param array $permissions Capabilities by permission (allow, prevent, prohibit).
     * @param array $relations Short names of roles by relation (allow_assign, allow_override, allow_switch, allow_view).
     */
    public function __construct(array $contextlevels = [], array $permissions = [], array $relations = []) {
        $this->contextlevels = array_values(array_unique(array_merge(['system'], array_map('strval', $contextlevels))));
        $this->permissions = [];
        foreach (self::PERMISSIONS as $permission) {
            $this->permissions[$permission] = array_values(array_unique(array_map('strval', $permissions[$permission] ?? [])));
        }
        $this->relations = [];
        foreach (self::RELATIONS as $relation) {
            $this->relations[$relation] = array_values(array_unique(array_map('strval', $relations[$relation] ?? [])));
        }
    }

    /**
     * Read the settings out of the role section of parsed YAML.
     *
     * @param array $section The role section, or an empty array when the schema has none.
     * @return self The settings.
     */
    public static function from_array(array $section): self {
        $permissions = (array) ($section['permissions'] ?? []);
        $relations = [];
        foreach (self::RELATIONS as $relation) {
            $relations[$relation] = (array) ($section[$relation] ?? []);
        }
        return new self((array) ($section['context_levels'] ?? []), $permissions, $relations);
    }

    /**
     * The settings the way the role section writes them, with what is empty left out.
     *
     * @return array The section.
     */
    public function to_array(): array {
        $section = [];
        if (count($this->contextlevels) > 1) {
            $section['context_levels'] = $this->contextlevels;
        }
        $permissions = array_filter($this->permissions);
        if ($permissions) {
            $section['permissions'] = $permissions;
        }
        foreach (array_filter($this->relations) as $relation => $roles) {
            $section[$relation] = $roles;
        }
        return $section;
    }

    /**
     * Whether the schema asks for nothing of the role beyond the default.
     *
     * @return bool True when the section is empty.
     */
    public function is_empty(): bool {
        return $this->to_array() === [];
    }

    /**
     * The context levels, by name.
     *
     * @return string[] The names, with the system level first.
     */
    public function context_levels(): array {
        return $this->contextlevels;
    }

    /**
     * The context levels as Moodle numbers them.
     *
     * @return int[] The levels that exist; a name that is not a level is left out.
     */
    public function context_level_numbers(): array {
        $numbers = [];
        foreach ($this->contextlevels as $name) {
            if (isset(self::CONTEXT_LEVELS[$name])) {
                $numbers[] = self::CONTEXT_LEVELS[$name];
            }
        }
        return $numbers;
    }

    /**
     * The capabilities that have one permission.
     *
     * @param string $permission One of allow, prevent and prohibit.
     * @return string[] The capabilities.
     */
    public function capabilities(string $permission): array {
        return $this->permissions[$permission] ?? [];
    }

    /**
     * The roles of one relation.
     *
     * @param string $relation One of allow_assign, allow_override, allow_switch and allow_view.
     * @return string[] Short names of roles.
     */
    public function roles(string $relation): array {
        return $this->relations[$relation] ?? [];
    }

    /**
     * Every role the settings name, whatever the relation.
     *
     * @return string[] Short names of roles, without repeats.
     */
    public function all_roles(): array {
        return array_values(array_unique(array_merge(...array_values($this->relations))));
    }

    /**
     * Every capability the settings name, whatever the permission.
     *
     * @return string[] Capabilities, without repeats.
     */
    public function all_capabilities(): array {
        return array_values(array_unique(array_merge(...array_values($this->permissions))));
    }
}
