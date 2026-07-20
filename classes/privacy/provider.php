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

namespace local_servicemanager\privacy;

use core_privacy\local\metadata\collection;
use core_privacy\local\request\approved_contextlist;
use core_privacy\local\request\approved_userlist;
use core_privacy\local\request\contextlist;
use core_privacy\local\request\transform;
use core_privacy\local\request\userlist;
use core_privacy\local\request\writer;

/**
 * Privacy provider for local_servicemanager.
 *
 * The plugin keeps a version history of every service schema change. Each history
 * record stores the id of the user who made the change ("changedby"), which is the
 * only personal data held by the plugin. Everything else (schema definitions, health
 * logs, provisioned web service accounts) is site-level configuration data.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class provider implements
    \core_privacy\local\metadata\provider,
    \core_privacy\local\request\core_userlist_provider,
    \core_privacy\local\request\plugin\provider {
    /**
     * Returns metadata about the personal data stored by this plugin.
     *
     * @param collection $collection The initialised collection to add items to.
     * @return collection The updated collection of metadata items.
     */
    public static function get_metadata(collection $collection): collection {
        $collection->add_database_table(
            'local_servicemanager_history',
            [
                'changedby' => 'privacy:metadata:local_servicemanager_history:changedby',
                'version' => 'privacy:metadata:local_servicemanager_history:version',
                'change_reason' => 'privacy:metadata:local_servicemanager_history:change_reason',
                'timecreated' => 'privacy:metadata:local_servicemanager_history:timecreated',
            ],
            'privacy:metadata:local_servicemanager_history'
        );

        $collection->add_database_table(
            'local_servicemanager_schemas',
            [
                'userid' => 'privacy:metadata:local_servicemanager_schemas:userid',
            ],
            'privacy:metadata:local_servicemanager_schemas'
        );

        return $collection;
    }

    /**
     * Get the list of contexts that contain user information for the specified user.
     *
     * Schema history is stored against the system context.
     *
     * @param int $userid The user to search.
     * @return contextlist The list of contexts used in this plugin.
     */
    public static function get_contexts_for_userid(int $userid): contextlist {
        global $DB;

        $contextlist = new contextlist();

        if (
            $DB->record_exists('local_servicemanager_history', ['changedby' => $userid])
            || $DB->record_exists('local_servicemanager_schemas', ['userid' => $userid])
        ) {
            $contextlist->add_system_context();
        }

        return $contextlist;
    }

    /**
     * Get the list of users who have data within a context.
     *
     * @param userlist $userlist The userlist containing the list of users who have data in this context.
     */
    public static function get_users_in_context(userlist $userlist) {
        $context = $userlist->get_context();

        if ($context->contextlevel != CONTEXT_SYSTEM) {
            return;
        }

        $sql = "SELECT changedby
                  FROM {local_servicemanager_history}
                 WHERE changedby > 0";
        $userlist->add_from_sql('changedby', $sql, []);

        $sql = "SELECT userid
                  FROM {local_servicemanager_schemas}
                 WHERE userid IS NOT NULL";
        $userlist->add_from_sql('userid', $sql, []);
    }

    /**
     * Export all user data for the specified user, in the specified contexts.
     *
     * @param approved_contextlist $contextlist The approved contexts to export information for.
     */
    public static function export_user_data(approved_contextlist $contextlist) {
        global $DB;

        $user = $contextlist->get_user();

        foreach ($contextlist->get_contexts() as $context) {
            if ($context->contextlevel != CONTEXT_SYSTEM) {
                continue;
            }

            $records = $DB->get_records(
                'local_servicemanager_history',
                ['changedby' => $user->id],
                'timecreated ASC'
            );
            if (!empty($records)) {
                $data = [];
                foreach ($records as $record) {
                    $data[] = (object) [
                        'schemaid' => $record->schemaid,
                        'version' => $record->version,
                        'change_reason' => $record->change_reason,
                        'timecreated' => transform::datetime($record->timecreated),
                    ];
                }

                writer::with_context($context)->export_data(
                    [get_string('privacy:metadata:local_servicemanager_history', 'local_servicemanager')],
                    (object) ['changes' => $data]
                );
            }

            $schemas = $DB->get_records(
                'local_servicemanager_schemas',
                ['userid' => $user->id],
                'timecreated ASC'
            );
            if (!empty($schemas)) {
                $schemadata = [];
                foreach ($schemas as $schema) {
                    $schemadata[] = (object) [
                        'schema_id' => $schema->schema_id,
                        'name' => $schema->name,
                        'timecreated' => transform::datetime($schema->timecreated),
                    ];
                }

                writer::with_context($context)->export_data(
                    [get_string('privacy:metadata:local_servicemanager_schemas', 'local_servicemanager')],
                    (object) ['schemas' => $schemadata]
                );
            }
        }
    }

    /**
     * Delete all data for all users in the specified context.
     *
     * The version history snapshots themselves are site data about the schemas, so they
     * are retained; only the personal "changedby" author reference is anonymised.
     *
     * @param \context $context The specific context to delete data for.
     */
    public static function delete_data_for_all_users_in_context(\context $context) {
        global $DB;

        if ($context->contextlevel != CONTEXT_SYSTEM) {
            return;
        }

        $DB->set_field('local_servicemanager_history', 'changedby', 0);
        $DB->set_field('local_servicemanager_schemas', 'userid', null);
    }

    /**
     * Delete all user data for the specified user, in the specified contexts.
     *
     * @param approved_contextlist $contextlist The approved contexts and user information to delete information for.
     */
    public static function delete_data_for_user(approved_contextlist $contextlist) {
        global $DB;

        $user = $contextlist->get_user();

        foreach ($contextlist->get_contexts() as $context) {
            if ($context->contextlevel != CONTEXT_SYSTEM) {
                continue;
            }

            $DB->set_field('local_servicemanager_history', 'changedby', 0, ['changedby' => $user->id]);
            $DB->set_field('local_servicemanager_schemas', 'userid', null, ['userid' => $user->id]);
        }
    }

    /**
     * Delete multiple users within a single context.
     *
     * @param approved_userlist $userlist The approved context and user information to delete information for.
     */
    public static function delete_data_for_users(approved_userlist $userlist) {
        global $DB;

        $context = $userlist->get_context();
        if ($context->contextlevel != CONTEXT_SYSTEM) {
            return;
        }

        $userids = $userlist->get_userids();
        if (empty($userids)) {
            return;
        }

        [$insql, $inparams] = $DB->get_in_or_equal($userids, SQL_PARAMS_NAMED);
        $DB->set_field_select('local_servicemanager_history', 'changedby', 0, "changedby {$insql}", $inparams);

        [$insql, $inparams] = $DB->get_in_or_equal($userids, SQL_PARAMS_NAMED);
        $DB->set_field_select('local_servicemanager_schemas', 'userid', null, "userid {$insql}", $inparams);
    }
}
