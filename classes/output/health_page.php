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
 * The results of the health checks of a schema on a page of their own: narrowed to one status and shown a page at a time, read
 * from the database a page at a time too.
 *
 * The page of the schema shows a summary of them, which this class also gives.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class health_page implements \renderable, \templatable {
    /** @var int[] The sizes of page that can be chosen. */
    public const PERPAGE_OPTIONS = [10, 25, 50, 100];

    /** @var int The size of page when none is chosen. */
    public const PERPAGE_DEFAULT = 25;

    /** @var string[] The colour of each status a check can have. */
    public const TONES = ['healthy' => 'success', 'warning' => 'warning', 'critical' => 'danger'];

    /** @var string[] The icon of each status a check can have. */
    public const ICONS = ['healthy' => 'circle-check', 'warning' => 'triangle-exclamation', 'critical' => 'circle-xmark'];

    /** @var \stdClass The schema record. */
    private $schema;

    /** @var string The status the checks are narrowed to, or nothing for all of them. */
    private $status;

    /** @var int The page, from 0. */
    private $page;

    /** @var int How many checks a page has. */
    private $perpage;

    /**
     * Create the page.
     *
     * @param \stdClass $schema The schema record.
     * @param string $status The status to narrow the checks to; anything that is not a status shows all of them.
     * @param int $page The page, from 0.
     * @param int $perpage How many checks a page has; a size that cannot be chosen gives the default one.
     */
    public function __construct(\stdClass $schema, string $status = '', int $page = 0, int $perpage = self::PERPAGE_DEFAULT) {
        $this->schema = $schema;
        $this->status = isset(self::TONES[$status]) ? $status : '';
        $this->page = max(0, $page);
        $this->perpage = in_array($perpage, self::PERPAGE_OPTIONS, true) ? $perpage : self::PERPAGE_DEFAULT;
    }

    /**
     * What the page shows and the places it links to.
     *
     * @param \renderer_base $output The renderer, which draws the paging bar and the choice of the size of page.
     * @return array The context of the template.
     */
    public function export_for_template(\renderer_base $output): array {
        global $DB;

        $id = (int) $this->schema->id;
        $counts = self::counts($id);
        $all = $DB->count_records('local_servicemanager_logs', ['schemaid' => $id]);
        $total = $this->status === '' ? $all : $counts[$this->status];
        // A page after the last one, as an old link may ask for, shows the last one.
        $page = min($this->page, max(0, (int) ceil($total / $this->perpage) - 1));

        $conditions = ['schemaid' => $id] + ($this->status === '' ? [] : ['status' => $this->status]);
        $records = $DB->get_records(
            'local_servicemanager_logs',
            $conditions,
            'timecreated DESC, id DESC',
            'id, status, message, timecreated',
            $page * $this->perpage,
            $this->perpage
        );
        $rows = array_map([self::class, 'row'], array_values($records));

        $perpage = new \single_select(
            $this->url(['status' => $this->status]),
            'perpage',
            array_combine(self::PERPAGE_OPTIONS, self::PERPAGE_OPTIONS),
            $this->perpage,
            false
        );
        $perpage->set_label(get_string('perpage', 'moodle'));

        return [
            'backurl' => (new \moodle_url('/local/servicemanager/pages/view.php', ['id' => $id]))->out(false),
            'schemaname' => $this->schema->name,
            'hasany' => $all > 0,
            'hasrows' => !empty($rows),
            'rows' => $rows,
            'filters' => $this->filters($counts, $all),
            'showing' => get_string('health_showing', 'local_servicemanager', (object) [
                'from' => $rows ? $page * $this->perpage + 1 : 0,
                'to' => $page * $this->perpage + count($rows),
                'total' => $total,
            ]),
            'pagingbar' => $output->paging_bar(
                $total,
                $page,
                $this->perpage,
                $this->url(['status' => $this->status, 'perpage' => $this->perpage])
            ),
            'perpageselect' => $output->render($perpage),
        ];
    }

    /**
     * A summary of the checks of a schema for its page: the latest one, how many of each status there are and where all of them
     * are.
     *
     * @param \stdClass $schema The schema record.
     * @return array The summary; hasany is false when the schema was never checked.
     */
    public static function summary(\stdClass $schema): array {
        global $DB;

        $id = (int) $schema->id;
        $latest = $DB->get_records(
            'local_servicemanager_logs',
            ['schemaid' => $id],
            'timecreated DESC, id DESC',
            'id, status, message, timecreated',
            0,
            1
        );
        $counts = [];
        foreach (self::counts($id) as $status => $count) {
            if ($count > 0) {
                $counts[] = [
                    'label' => get_string('status_' . $status, 'local_servicemanager'),
                    'count' => $count,
                    'tone' => self::TONES[$status],
                ];
            }
        }
        $total = $DB->count_records('local_servicemanager_logs', ['schemaid' => $id]);
        return [
            'hasany' => !empty($latest),
            'latest' => $latest ? self::row(reset($latest)) : null,
            'counts' => $counts,
            'total' => $total,
            'url' => (new \moodle_url('/local/servicemanager/pages/health.php', ['id' => $id]))->out(false),
        ];
    }

    /**
     * How many checks of each status a schema has.
     *
     * @param int $schemaid Id of the schema record.
     * @return int[] The count of each status, by status.
     */
    public static function counts(int $schemaid): array {
        global $DB;

        $counts = array_fill_keys(array_keys(self::TONES), 0);
        $sql = "SELECT status, COUNT(1)
                  FROM {local_servicemanager_logs}
                 WHERE schemaid = :schemaid
              GROUP BY status";
        foreach ($DB->get_records_sql_menu($sql, ['schemaid' => $schemaid]) as $status => $count) {
            if (isset($counts[$status])) {
                $counts[$status] = (int) $count;
            }
        }
        return $counts;
    }

    /**
     * One check as the tables show it: when, and how long ago, its status in words, colour and icon, and each thing it found apart.
     *
     * @param \stdClass $log The log record.
     * @return array The row.
     */
    private static function row(\stdClass $log): array {
        $known = isset(self::TONES[$log->status]);
        $messages = array_filter(array_map('trim', explode('; ', (string) $log->message)), 'strlen');
        return [
            'time' => userdate($log->timecreated, get_string('strftimedatetimeshort', 'core_langconfig')),
            'ago' => get_string('ago', 'message', format_time(max(0, time() - (int) $log->timecreated))),
            'status' => $log->status,
            'statuslabel' => $known ? get_string('status_' . $log->status, 'local_servicemanager') : $log->status,
            'tone' => $known ? self::TONES[$log->status] : 'secondary',
            'icon' => $known ? self::ICONS[$log->status] : 'circle-info',
            'findings' => array_map([self::class, 'finding'], array_values($messages)),
        ];
    }

    /**
     * One thing a check found, with the part that names what it is about apart, so it can stand out: "Token:" of "Token:
     * expired". The two parts together are the text as it was found.
     *
     * @param string $message What the check found.
     * @return array The label, which is empty when the text names nothing, and the rest of the text.
     */
    private static function finding(string $message): array {
        if (preg_match('/^([^:]{1,40}:)\s+(.+)$/u', $message, $parts)) {
            return ['label' => $parts[1], 'text' => $parts[2]];
        }
        return ['label' => '', 'text' => $message];
    }

    /**
     * The choices of status, each with how many checks it has and the address that narrows the list to it.
     *
     * @param int[] $counts The count of each status.
     * @param int $all How many checks there are.
     * @return array The choices, all of them first.
     */
    private function filters(array $counts, int $all): array {
        $filters = [[
            'label' => get_string('all', 'moodle'),
            'count' => $all,
            'tone' => 'primary',
            'active' => $this->status === '',
            'url' => $this->url(['perpage' => $this->perpage])->out(false),
        ]];
        foreach ($counts as $status => $count) {
            $filters[] = [
                'label' => get_string('status_' . $status, 'local_servicemanager'),
                'count' => $count,
                'tone' => self::TONES[$status],
                'active' => $this->status === $status,
                'url' => $this->url(['status' => $status, 'perpage' => $this->perpage])->out(false),
            ];
        }
        return $filters;
    }

    /**
     * The address of the page with some parameters; an empty status is left out.
     *
     * @param array $params The parameters besides the id of the schema.
     * @return \moodle_url The address.
     */
    private function url(array $params = []): \moodle_url {
        $params = array_filter($params, static fn($value): bool => $value !== '' && $value !== null);
        return new \moodle_url('/local/servicemanager/pages/health.php', ['id' => (int) $this->schema->id] + $params);
    }
}
