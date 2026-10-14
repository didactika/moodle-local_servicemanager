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

namespace local_servicemanager\schema;

/**
 * What the fields of the guided form suggest while the person types: the functions, capabilities, plugins and people that match.
 *
 * It answers with a good number of matches (twenty), so a person who has typed two letters already sees what there is.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class suggester {
    /** @var int Most suggestions that are given. */
    public const LIMIT = 20;

    /** @var string[] What can be suggested. */
    public const KINDS = ['function', 'capability', 'plugin', 'user'];

    /**
     * The suggestions for what has been typed.
     *
     * @param string $kind One of function, capability, plugin and user.
     * @param string $query What the person has typed; nothing typed gives the first ones of the list.
     * @return array The suggestions, each with the value that is written in the schema and the label that is shown.
     */
    public function suggest(string $kind, string $query): array {
        $query = trim($query);
        switch ($kind) {
            case 'function':
                return $this->from_table('external_functions', 'name', $query);
            case 'capability':
                return $this->from_table('capabilities', 'name', $query);
            case 'plugin':
                return $this->plugins($query);
            case 'user':
                return $this->users($query);
        }
        return [];
    }

    /**
     * The names of a table that contain what was typed.
     *
     * @param string $table Table.
     * @param string $field Field that holds the name.
     * @param string $query What was typed.
     * @return array The suggestions.
     */
    private function from_table(string $table, string $field, string $query): array {
        global $DB;

        $where = '';
        $params = [];
        if ($query !== '') {
            $where = $DB->sql_like($field, ':query', false, false);
            $params['query'] = '%' . $DB->sql_like_escape($query) . '%';
        }
        $records = $DB->get_records_select($table, $where, $params, $field . ' ASC', 'id, ' . $field, 0, self::LIMIT);
        $names = array_column($records, $field);
        return array_map(fn(string $name) => ['value' => $name, 'label' => $name], $names);
    }

    /**
     * The installed plugins that contain what was typed.
     *
     * @param string $query What was typed.
     * @return array The suggestions.
     */
    private function plugins(string $query): array {
        $found = [];
        foreach (\core_plugin_manager::instance()->get_plugins() as $type => $plugins) {
            foreach (array_keys($plugins) as $name) {
                $component = $type . '_' . $name;
                if ($query === '' || stripos($component, $query) !== false) {
                    $found[] = $component;
                }
            }
        }
        sort($found);
        return array_map(fn(string $name) => ['value' => $name, 'label' => $name], array_slice($found, 0, self::LIMIT));
    }

    /**
     * The people whose name or email contain what was typed. The value is the email, which is what a schema names a person by.
     *
     * @param string $query What was typed.
     * @return array The suggestions.
     */
    private function users(string $query): array {
        global $DB;

        $params = [];
        $where = 'deleted = 0 AND suspended = 0 AND email <> :empty';
        $params['empty'] = '';
        if ($query !== '') {
            $like = '%' . $DB->sql_like_escape($query) . '%';
            $fullname = $DB->sql_concat('firstname', "' '", 'lastname');
            $where .= ' AND (' . $DB->sql_like('email', ':email', false, false) . ' OR ' .
                $DB->sql_like($fullname, ':name', false, false) . ')';
            $params['email'] = $like;
            $params['name'] = $like;
        }
        $fields = 'id, email, ' . implode(', ', \core_user\fields::get_name_fields());
        $records = $DB->get_records_select('user', $where, $params, 'lastname, firstname', $fields, 0, self::LIMIT);
        return array_map(fn(\stdClass $user) => [
            'value' => $user->email,
            'label' => fullname($user) . ' <' . $user->email . '>',
        ], array_values($records));
    }
}
