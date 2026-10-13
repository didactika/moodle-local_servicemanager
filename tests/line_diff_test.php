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

namespace local_servicemanager;

use local_servicemanager\schema\line_diff;

/**
 * Tests for the comparison of two texts line by line.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\schema\line_diff
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class line_diff_test extends \advanced_testcase {
    /**
     * A line added in the middle does not make the lines after it look changed.
     */
    public function test_an_added_line_does_not_shift_the_rest(): void {
        $rows = (new line_diff())->rows("a\nb\nc\nd", "a\nb\nNEW\nc\nd");

        $this->assertSame(['same', 'same', 'added', 'same', 'same'], array_column($rows, 'kind'));
        $this->assertNull($rows[2]['left']);
        $this->assertSame(3, $rows[2]['right']['no']);
        $this->assertSame(['no' => 3, 'text' => 'c'], $rows[3]['left']);
        $this->assertSame(['no' => 4, 'text' => 'c'], $rows[3]['right']);
    }

    /**
     * A line that was taken out and one that was put in its place are one change, and the ones that do not pair are not.
     */
    public function test_removed_and_added_lines_pair_into_changes(): void {
        $diff = new line_diff();
        $rows = $diff->rows("keep\nold1\nold2\nold3\nend", "keep\nnew1\nnew2\nend");

        $this->assertSame(['same', 'changed', 'changed', 'removed', 'same'], array_column($rows, 'kind'));
        $this->assertSame(['added' => 0, 'removed' => 1, 'changed' => 2], $diff->counts($rows));
        $this->assertSame('old1', $rows[1]['left']['text']);
        $this->assertSame('new1', $rows[1]['right']['text']);
    }

    /**
     * Two equal texts have no change, and an empty text is all additions.
     */
    public function test_equal_and_empty_texts(): void {
        $diff = new line_diff();

        $this->assertSame(['same', 'same'], array_column($diff->rows("a\r\nb\n", "a\nb"), 'kind'));
        $this->assertSame(['added', 'added'], array_column($diff->rows('', "a\nb"), 'kind'));
        $this->assertSame([], $diff->rows('', ''));
    }
}
