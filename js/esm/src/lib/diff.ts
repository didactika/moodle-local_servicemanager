/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * How the rows of a comparison are shown: which are marked, which are folded away and where the changes are.
 *
 * @module     local_servicemanager/lib/diff
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {Change, DiffRow} from '../types';

/** A part of the comparison: rows that are shown, or a run of unchanged rows that is folded. */
export type Segment =
    | {type: 'rows'; rows: Array<{row: DiffRow; index: number}>}
    | {type: 'folded'; from: number; count: number};

/**
 * Whether a row is a difference.
 *
 * @param row Row of the comparison.
 * @returns True when the two sides are not the same.
 */
export const isChange = (row: DiffRow): boolean => row.kind !== 'same';

/**
 * The positions of the rows that are differences, which are where the person goes with Next change.
 *
 * @param rows Rows of the comparison.
 * @returns The position of the first row of each run of differences.
 */
export const changeStarts = (rows: DiffRow[]): number[] => {
    const starts: number[] = [];
    rows.forEach((row, index) => {
        if (isChange(row) && (index === 0 || !isChange(rows[index - 1]))) {
            starts.push(index);
        }
    });
    return starts;
};

/** A run of rows that differ, which is one change for the person who goes through them. */
export interface ChangeRun {
    /** Position of its first row. */
    start: number;
    /** What the run is: all rows added, all removed, or a mix. */
    kind: 'added' | 'removed' | 'changed';
    /** Line where it starts, in the new version when it has one. */
    line: number;
}

/**
 * The runs of differences, in order.
 *
 * @param rows Rows of the comparison.
 * @returns One entry for each run.
 */
export const changeRuns = (rows: DiffRow[]): ChangeRun[] => changeStarts(rows).map((start) => {
    let end = start;
    const kinds = new Set<DiffRow['kind']>();
    while (end < rows.length && isChange(rows[end])) {
        kinds.add(rows[end].kind);
        end++;
    }
    const only = kinds.size === 1 ? [...kinds][0] : 'changed';
    return {start, kind: only === 'added' || only === 'removed' ? only : 'changed', line: rows[start].right?.no ?? rows[start].left?.no ?? 0};
});

/**
 * Cut the comparison into the rows to show and the runs of unchanged rows to fold, keeping some rows of context around each
 * difference.
 *
 * @param rows Rows of the comparison.
 * @param context Unchanged rows kept before and after each difference.
 * @param expanded Positions of the folded runs that the person opened, by the position of their first row.
 * @returns The segments, in order.
 */
export const segments = (rows: DiffRow[], context: number, expanded: ReadonlySet<number> = new Set()): Segment[] => {
    const keep = new Array<boolean>(rows.length).fill(false);
    rows.forEach((row, index) => {
        if (isChange(row)) {
            for (let near = Math.max(0, index - context); near <= Math.min(rows.length - 1, index + context); near++) {
                keep[near] = true;
            }
        }
    });

    const result: Segment[] = [];
    let index = 0;
    while (index < rows.length) {
        const start = index;
        const shows = keep[index];
        while (index < rows.length && keep[index] === shows) {
            index++;
        }
        if (shows || expanded.has(start)) {
            result.push({type: 'rows', rows: rows.slice(start, index).map((row, offset) => ({row, index: start + offset}))});
        } else {
            result.push({type: 'folded', from: start, count: index - start});
        }
    }
    return result;
};

/**
 * The changes of one area, in the order they are told.
 *
 * @param changes All the changes.
 * @param area What they are about.
 * @returns The changes of that area.
 */
export const ofArea = (changes: Change[], area: Change['area']): Change[] => changes.filter((change) => change.area === area);
