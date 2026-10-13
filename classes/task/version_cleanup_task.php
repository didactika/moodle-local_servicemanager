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

namespace local_servicemanager\task;

/**
 * Task to clean up old schema versions.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class version_cleanup_task extends \core\task\scheduled_task {
    /**
     * Get the name of the task.
     *
     * @return string
     */
    public function get_name() {
        return get_string('task_version_cleanup', 'local_servicemanager');
    }

    /**
     * Execute the task.
     */
    public function execute() {
        global $DB;

        // Check if enabled.
        if (!get_config('local_servicemanager', 'version_retention_enabled')) {
            mtrace('Version retention is disabled.');
            return;
        }

        $maxversions = (int)get_config('local_servicemanager', 'version_retention_max');
        if ($maxversions <= 0) {
            mtrace('Invalid max versions setting. Skipping.');
            return;
        }

        mtrace("Running version cleanup. Maintaining max $maxversions versions per schema.");

        // The schemas and the history of all of them are read once; each version is looked at in order, newest first.
        $schemas = $DB->get_records('local_servicemanager_schemas', null, '', 'id, name');
        $kept = [];
        $todelete = [];
        $versions = $DB->get_recordset(
            'local_servicemanager_history',
            null,
            'schemaid, timecreated DESC',
            'id, schemaid, timecreated'
        );
        foreach ($versions as $version) {
            $kept[$version->schemaid] = ($kept[$version->schemaid] ?? 0) + 1;
            if ($kept[$version->schemaid] > $maxversions) {
                $todelete[$version->schemaid][] = (int) $version->id;
            }
        }
        $versions->close();

        foreach ($schemas as $schema) {
            mtrace("Processing schema: {$schema->name} (ID: {$schema->id})");

            $count = $kept[$schema->id] ?? 0;
            if ($count <= $maxversions) {
                mtrace("  - Has $count versions. No cleanup needed.");
                continue;
            }

            $ids = $todelete[$schema->id];
            mtrace("  - Has $count versions. Deleting " . count($ids) . ' old versions.');

            foreach (array_chunk($ids, 500) as $chunk) {
                $DB->delete_records_list('local_servicemanager_history', 'id', $chunk);
            }

            mtrace("  - Deleted IDs: " . implode(', ', $ids));
        }

        mtrace('Version cleanup completed.');
    }
}
