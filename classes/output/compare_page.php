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

use local_servicemanager\schema\history_manager;
use local_servicemanager\schema\line_diff;
use local_servicemanager\schema\version_summary;

/**
 * The comparison of two versions of a schema: what changed said in terms of the schema, and the lines that changed, side by side or
 * together.
 *
 * Both layouts are drawn, and the script of the page shows one of them and folds the lines that did not change.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class compare_page implements \renderable, \templatable {
    /** @var int Unchanged lines kept around each difference when the rest is folded. */
    private const CONTEXT = 2;

    /** @var string[][] The areas that a change can be about: the string that names them and their icon. */
    private const AREAS = [
        'field' => ['area_field', 'id-card'],
        'function' => ['area_function', 'code'],
        'capability' => ['area_capability', 'shield-halved'],
        'user' => ['area_user', 'user'],
        'plugin' => ['area_plugin', 'puzzle-piece'],
        'files' => ['area_files', 'file-arrow-down'],
        'role' => ['area_role', 'user-shield'],
    ];

    /** @var string[][] How each kind of change looks. */
    private const KINDS = [
        'added' => ['icon' => 'plus', 'tone' => 'success'],
        'removed' => ['icon' => 'minus', 'tone' => 'danger'],
        'changed' => ['icon' => 'pen', 'tone' => 'warning'],
    ];

    /** @var int Id of the schema. */
    private $schemaid;

    /** @var int Id in the history of the first version. */
    private $first;

    /** @var int Id in the history of the second version. */
    private $second;

    /**
     * Create the page.
     *
     * @param int $schemaid Id of the schema.
     * @param int $first Id in the history of the first version.
     * @param int $second Id in the history of the second version.
     */
    public function __construct(int $schemaid, int $first, int $second) {
        $this->schemaid = $schemaid;
        $this->first = $first;
        $this->second = $second;
    }

    /**
     * What the page shows and the places it links to.
     *
     * @param \renderer_base $output Renderer.
     * @return array The context of the template.
     * @throws \moodle_exception When a version does not exist.
     */
    public function export_for_template(\renderer_base $output): array {
        $manager = new history_manager();
        $first = $manager->get_version($this->first);
        $second = $manager->get_version($this->second);
        if (!$first || !$second) {
            throw new \moodle_exception('historynotfound', 'local_servicemanager');
        }
        $diff = new line_diff();
        $rows = $diff->rows($first->yaml_content, $second->yaml_content);
        $counts = $diff->counts($rows);
        $identical = $counts['added'] + $counts['removed'] + $counts['changed'] === 0;
        $folded = $this->folded($rows);

        $areas = $this->areas((new version_summary())->changes($first->yaml_content, $second->yaml_content));
        $firstversion = $this->version($first);
        $secondversion = $this->version($second);
        return [
            'backurl' => (new \moodle_url('/local/servicemanager/pages/history.php', ['id' => $this->schemaid]))->out(false),
            'first' => $firstversion,
            'second' => $secondversion,
            'identical' => $identical,
            'added' => $counts['added'],
            'removed' => $counts['removed'],
            'changed' => $counts['changed'],
            'addedlabel' => get_string('compare_added', 'local_servicemanager', $counts['added']),
            'removedlabel' => get_string('compare_removed', 'local_servicemanager', $counts['removed']),
            'changedlabel' => get_string('compare_changed', 'local_servicemanager', $counts['changed']),
            'areas' => $areas,
            'hasareas' => !empty($areas),
            'hasstarts' => !empty($this->starts($rows)),
            'split' => $this->split_rows($rows, $folded),
            'unified' => $this->unified_rows($rows, $folded),
        ];
    }

    /**
     * The positions of the first row of each run of differences, which is where Next change goes.
     *
     * @param array $rows The rows of the comparison.
     * @return int[] The positions.
     */
    private function starts(array $rows): array {
        $starts = [];
        foreach ($rows as $index => $row) {
            if ($row['kind'] !== 'same' && ($index === 0 || $rows[$index - 1]['kind'] === 'same')) {
                $starts[] = $index;
            }
        }
        return $starts;
    }

    /**
     * Which rows are folded when only the changes are shown: the runs of unchanged rows that are not near a difference.
     *
     * @param array $rows The rows of the comparison.
     * @return int[] For each folded row, the position of the first row of its run; rows that are shown are not in it.
     */
    private function folded(array $rows): array {
        $count = count($rows);
        $keep = array_fill(0, $count, false);
        foreach ($rows as $index => $row) {
            if ($row['kind'] === 'same') {
                continue;
            }
            for ($near = max(0, $index - self::CONTEXT); $near <= min($count - 1, $index + self::CONTEXT); $near++) {
                $keep[$near] = true;
            }
        }
        $runs = [];
        $index = 0;
        while ($index < $count) {
            $start = $index;
            while ($index < $count && $keep[$index] === $keep[$start]) {
                $index++;
            }
            if (!$keep[$start]) {
                for ($at = $start; $at < $index; $at++) {
                    $runs[$at] = ['from' => $start, 'count' => $index - $start];
                }
            }
        }
        return $runs;
    }

    /**
     * The rows of the side by side layout, with the button that opens each run of folded rows before its first row.
     *
     * @param array $rows The rows of the comparison.
     * @param array $folded The folded rows.
     * @return array The rows.
     */
    private function split_rows(array $rows, array $folded): array {
        $result = [];
        foreach ($rows as $index => $row) {
            $left = $row['left'] ?? null;
            $right = $row['right'] ?? null;
            $result[] = $this->fold_marker($index, $folded) + [
                'index' => $index,
                'folded' => isset($folded[$index]), 'foldfrom' => isset($folded[$index]) ? $folded[$index]['from'] : '',
                'leftno' => $left ? $left['no'] : '',
                'lefttext' => $left ? $left['text'] : '',
                'leftkind' => $row['kind'] === 'added' ? 'empty' : $row['kind'],
                'rightno' => $right ? $right['no'] : '',
                'righttext' => $right ? $right['text'] : '',
                'rightkind' => $row['kind'] === 'removed' ? 'empty' : $row['kind'],
            ];
        }
        return $result;
    }

    /**
     * The rows of the unified layout: a line that changed is the old line and then the new one.
     *
     * @param array $rows The rows of the comparison.
     * @param array $folded The folded rows.
     * @return array The rows.
     */
    private function unified_rows(array $rows, array $folded): array {
        $result = [];
        foreach ($rows as $index => $row) {
            $marker = $this->fold_marker($index, $folded);
            $isfolded = isset($folded[$index]);
            $foldfrom = $isfolded ? $folded[$index]['from'] : '';
            if ($row['kind'] === 'same') {
                $result[] = $marker + [
                    'index' => $index, 'folded' => $isfolded, 'foldfrom' => $foldfrom,
                    'leftno' => $row['left']['no'], 'rightno' => '', 'sign' => ' ', 'kind' => 'same',
                    'text' => $row['left']['text'],
                ];
                continue;
            }
            if (!empty($row['left'])) {
                $result[] = $marker + [
                    'index' => $index, 'folded' => $isfolded, 'foldfrom' => $foldfrom,
                    'leftno' => $row['left']['no'], 'rightno' => '', 'sign' => '-', 'kind' => 'removed',
                    'text' => $row['left']['text'],
                ];
                $marker = [];
            }
            if (!empty($row['right'])) {
                $result[] = $marker + [
                    'index' => $index, 'folded' => $isfolded, 'foldfrom' => $foldfrom,
                    'leftno' => '', 'rightno' => $row['right']['no'], 'sign' => '+', 'kind' => 'added',
                    'text' => $row['right']['text'],
                ];
            }
        }
        return $result;
    }

    /**
     * The mark that tells a row opens a run of folded rows, with how many there are.
     *
     * @param int $index Position of the row.
     * @param array $folded The folded rows.
     * @return array The mark, or nothing when the row does not open a run.
     */
    private function fold_marker(int $index, array $folded): array {
        if (!isset($folded[$index]) || $folded[$index]['from'] !== $index) {
            return [];
        }
        return [
            'opensfold' => true,
            'foldlabel' => get_string('compare_unchanged_lines', 'local_servicemanager', $folded[$index]['count']),
        ];
    }

    /**
     * The changes of the schema, grouped by what they are about and ready to show.
     *
     * @param array $changes The changes, as the summary gives them.
     * @return array The areas that have changes.
     */
    private function areas(array $changes): array {
        $result = [];
        foreach (self::AREAS as $area => [$title, $icon]) {
            $items = [];
            foreach ($changes as $change) {
                if ($change['area'] !== $area) {
                    continue;
                }
                $kind = self::KINDS[$change['kind']];
                $items[] = [
                    'label' => $this->label($change),
                    'code' => in_array($area, ['function', 'capability', 'plugin', 'role'], true),
                    'icon' => $kind['icon'],
                    'tone' => $kind['tone'],
                    'kindlabel' => get_string('change_' . $change['kind'], 'local_servicemanager'),
                    'iskindchanged' => $change['kind'] === 'changed',
                    'from' => $this->named($area, $change['from'] ?? null),
                    'to' => $this->named($area, $change['to'] ?? null),
                ];
            }
            if ($items) {
                $result[] = ['title' => get_string($title, 'local_servicemanager'), 'icon' => $icon, 'items' => $items];
            }
        }
        return $result;
    }

    /**
     * What a change is called.
     *
     * @param array $change The change.
     * @return string The name.
     */
    private function label(array $change): string {
        if ($change['area'] === 'field') {
            $names = [
                'name' => ['schema_name', 'local_servicemanager'],
                'version' => ['schema_version', 'local_servicemanager'],
                'maintainer' => ['schema_maintainer', 'local_servicemanager'],
                'description' => ['description', 'moodle'],
            ];
            if (!isset($names[$change['name']])) {
                return $change['name'];
            }
            return get_string($names[$change['name']][0], $names[$change['name']][1]);
        }
        if ($change['area'] === 'files') {
            $key = $change['name'] === 'download_files' ? 'req_download_files' : 'req_upload_files';
            return get_string($key, 'local_servicemanager');
        }
        return $change['name'];
    }

    /**
     * What a value is called, for the values that are words of the plugin rather than of the person.
     *
     * @param string $area What the change is about.
     * @param string|null $value The value.
     * @return string The text.
     */
    private function named(string $area, ?string $value): string {
        if ($value === null) {
            return '';
        }
        if ($area === 'function' || $area === 'files') {
            return get_string('state_' . $value, 'local_servicemanager');
        }
        return $value === '' ? get_string('change_empty', 'local_servicemanager') : $value;
    }

    /**
     * One version as the page shows it.
     *
     * @param \stdClass $version The version record.
     * @return array The version.
     */
    private function version(\stdClass $version): array {
        return [
            'version' => $version->version,
            'date' => userdate($version->timecreated),
            'user' => fullname(\core_user::get_user($version->changedby)),
            'viewurl' => (new \moodle_url(
                '/local/servicemanager/pages/view_history.php',
                ['historyid' => $version->id]
            ))->out(false),
        ];
    }
}
