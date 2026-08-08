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

use local_servicemanager\schema\manager;
use local_servicemanager\health\inspector;
use local_servicemanager\notification\manager as notification_manager;

/**
 * Scheduled task for health checks
 *
 * Runs every enabled schema past the inspector, stores what it found and mails
 * a report. Deciding whether a schema is healthy belongs to the inspector.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class health_check extends \core\task\scheduled_task {
    /**
     * Get task name
     *
     * @return string
     */
    public function get_name(): string {
        return get_string('healthcheck_task', 'local_servicemanager');
    }

    /**
     * Execute the task
     */
    public function execute(): void {
        $schemamanager = new manager();
        $inspector = new inspector();
        $schemas = $schemamanager->get_all_schemas();

        $issues = [];
        $healthyschemas = [];

        foreach ($schemas as $schema) {
            if (!$schema->enabled) {
                continue;
            }

            $result = $inspector->inspect($schema);

            $schemamanager->update_status($schema->id, $result['status']);
            $this->log_check($schema->id, $result);

            if ($result['status'] !== 'healthy') {
                $issues[] = ['schema' => $schema, 'result' => $result];
            } else {
                $healthyschemas[] = $schema;
            }
        }

        $this->report($issues, $healthyschemas);

        mtrace('Service Schema Health Check completed. Checked ' . count($schemas) .
            ' schemas, found ' . count($issues) . ' with issues.');
    }

    /**
     * Mail the report, if the configured notification level asks for one.
     *
     * Anything found is always reported; a clean run is only reported when the
     * level is set to 'all'.
     *
     * @param array $issues Schemas that failed a check
     * @param array $healthyschemas Schemas that passed
     */
    protected function report(array $issues, array $healthyschemas): void {
        $notifylevel = get_config('local_servicemanager', 'notification_level');

        if (empty($issues) && $notifylevel !== 'all') {
            return;
        }

        $notifier = new notification_manager();
        $notifier->send_daily_report($issues, $healthyschemas);
    }

    /**
     * Log health check result
     *
     * @param int $schemaid Schema ID
     * @param array $result Check result
     */
    protected function log_check(int $schemaid, array $result): void {
        global $DB;

        $record = new \stdClass();
        $record->schemaid = $schemaid;
        $record->status = $result['status'];
        $record->message = $result['message'];
        $record->details = json_encode($result['details']);
        $record->timecreated = time();

        $DB->insert_record('local_servicemanager_logs', $record);

        // Clean old logs (keep last 30 days).
        $cutoff = time() - (30 * 24 * 60 * 60);
        $DB->delete_records_select(
            'local_servicemanager_logs',
            'schemaid = :schemaid AND timecreated < :cutoff',
            ['schemaid' => $schemaid, 'cutoff' => $cutoff]
        );
    }
}
