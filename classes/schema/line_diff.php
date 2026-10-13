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
 * The lines of two texts side by side, with what was taken out, put in or changed marked.
 *
 * It finds the longest run of lines that both texts have, so a line that is added in the middle does not make every line after it
 * look changed, which is what comparing line number against line number does.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class line_diff {
    /** @var int Most lines of a text that are compared line by line; a longer one is compared by position. */
    private const MAX_LINES = 2000;

    /**
     * Compare two texts.
     *
     * @param string $before The first text.
     * @param string $after The second text.
     * @return array The rows: each has kind (same, removed, added or changed) and left and right, which are null or have the
     *     line number and the text of that side.
     */
    public function rows(string $before, string $after): array {
        $left = $this->lines($before);
        $right = $this->lines($after);
        if (count($left) > self::MAX_LINES || count($right) > self::MAX_LINES) {
            return $this->by_position($left, $right);
        }

        $steps = $this->steps($left, $right);

        // A block of lines taken out followed by a block put in is a change of those lines, as far as they pair up.
        $rows = [];
        $removed = [];
        $added = [];
        $flush = function () use (&$rows, &$removed, &$added): void {
            $paired = min(count($removed), count($added));
            for ($i = 0; $i < $paired; $i++) {
                $rows[] = ['kind' => 'changed', 'left' => $removed[$i], 'right' => $added[$i]];
            }
            foreach (array_slice($removed, $paired) as $side) {
                $rows[] = ['kind' => 'removed', 'left' => $side, 'right' => null];
            }
            foreach (array_slice($added, $paired) as $side) {
                $rows[] = ['kind' => 'added', 'left' => null, 'right' => $side];
            }
            $removed = [];
            $added = [];
        };

        foreach ($steps as [$kind, $number, $text, $othernumber]) {
            if ($kind === 'same') {
                $flush();
                $rows[] = [
                    'kind' => 'same',
                    'left' => ['no' => $number, 'text' => $text],
                    'right' => ['no' => $othernumber, 'text' => $text],
                ];
            } else if ($kind === 'removed') {
                $removed[] = ['no' => $number, 'text' => $text];
            } else {
                $added[] = ['no' => $number, 'text' => $text];
            }
        }
        $flush();
        return $rows;
    }

    /**
     * How many rows of each kind there are.
     *
     * @param array $rows The rows of rows().
     * @return array The counts of added, removed and changed rows.
     */
    public function counts(array $rows): array {
        $counts = ['added' => 0, 'removed' => 0, 'changed' => 0];
        foreach ($rows as $row) {
            if (isset($counts[$row['kind']])) {
                $counts[$row['kind']]++;
            }
        }
        return $counts;
    }

    /**
     * The lines of a text.
     *
     * @param string $text The text.
     * @return string[] The lines, without their line endings.
     */
    private function lines(string $text): array {
        $text = str_replace("\r\n", "\n", $text);
        return $text === '' ? [] : explode("\n", rtrim($text, "\n"));
    }

    /**
     * The steps that turn the first list of lines into the second, from the longest common run of lines.
     *
     * @param string[] $left Lines of the first text.
     * @param string[] $right Lines of the second text.
     * @return array Steps of kind, line number, text and, for a line both have, its number in the second text.
     */
    private function steps(array $left, array $right): array {
        $n = count($left);
        $m = count($right);

        // The length of the longest common run of the lines from each position on.
        $length = array_fill(0, $n + 1, array_fill(0, $m + 1, 0));
        for ($i = $n - 1; $i >= 0; $i--) {
            for ($j = $m - 1; $j >= 0; $j--) {
                $length[$i][$j] = $left[$i] === $right[$j]
                    ? $length[$i + 1][$j + 1] + 1
                    : max($length[$i + 1][$j], $length[$i][$j + 1]);
            }
        }

        $steps = [];
        $i = 0;
        $j = 0;
        while ($i < $n && $j < $m) {
            if ($left[$i] === $right[$j]) {
                $steps[] = ['same', $i + 1, $left[$i], $j + 1];
                $i++;
                $j++;
            } else if ($length[$i + 1][$j] >= $length[$i][$j + 1]) {
                $steps[] = ['removed', $i + 1, $left[$i], 0];
                $i++;
            } else {
                $steps[] = ['added', $j + 1, $right[$j], 0];
                $j++;
            }
        }
        for (; $i < $n; $i++) {
            $steps[] = ['removed', $i + 1, $left[$i], 0];
        }
        for (; $j < $m; $j++) {
            $steps[] = ['added', $j + 1, $right[$j], 0];
        }
        return $steps;
    }

    /**
     * The rows of two long texts, which are compared by position because looking for common runs would take too long.
     *
     * @param string[] $left Lines of the first text.
     * @param string[] $right Lines of the second text.
     * @return array The rows.
     */
    private function by_position(array $left, array $right): array {
        $rows = [];
        $count = max(count($left), count($right));
        for ($i = 0; $i < $count; $i++) {
            $a = isset($left[$i]) ? ['no' => $i + 1, 'text' => $left[$i]] : null;
            $b = isset($right[$i]) ? ['no' => $i + 1, 'text' => $right[$i]] : null;
            if ($a && $b) {
                $kind = $a['text'] === $b['text'] ? 'same' : 'changed';
            } else {
                $kind = $a ? 'removed' : 'added';
            }
            $rows[] = ['kind' => $kind, 'left' => $a, 'right' => $b];
        }
        return $rows;
    }
}
