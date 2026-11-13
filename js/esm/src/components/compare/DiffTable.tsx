/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The two versions line by line, side by side or one over the other, with the numbers of the lines and what changed marked.
 *
 * Runs of lines that did not change are folded, and a person opens them when they want them.
 *
 * @module     local_servicemanager/components/compare/DiffTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {segments} from '../../lib/diff';
import type {CompareProps, DiffRow, Text} from '../../types';
import Icon from '../common/Icon';

/** How the rows are laid out. */
export type DiffView = 'split' | 'unified';

interface DiffTableProps {
    first: CompareProps['first'];
    second: CompareProps['second'];
    rows: DiffRow[];
    view: DiffView;
    onlyChanges: boolean;
    expanded: ReadonlySet<number>;
    onExpand: (from: number) => void;
    text: Text;
}

/** Unchanged rows kept around each difference when the rest is folded. */
const CONTEXT = 2;

const SIGNS = {same: ' ', removed: '-', added: '+', changed: '~'} as const;

const LineNo = ({value}: {value: number | undefined}) => <td className="text-muted text-end small user-select-none" aria-hidden="true">{value ?? ''}</td>;

/** The rows of the side by side view: the line of each version on its own side. */
/** The colour of a line by what happened to it, from the rows of the tables of Bootstrap. */
const TONES: Record<string, string> = {added: 'table-success', removed: 'table-danger', changed: 'table-warning', empty: 'table-light'};

/**
 * A cell of text of the comparison: the line as it is written, with its indentation, in the colour of what happened to it.
 *
 * @param props What happened to the line and its text.
 * @returns The cell.
 */
const Line = ({kind, value}: {kind: string; value?: string}) => <td className={TONES[kind] ?? ''}>
    <pre className="mb-0 small">{value ?? ''}</pre>
</td>;

const splitRow = (row: DiffRow, index: number) => <tr key={index} id={`diff-row-${index}`}>
    <LineNo value={row.left?.no} />
    <Line kind={row.kind === 'added' ? 'empty' : row.kind} value={row.left?.text} />
    <LineNo value={row.right?.no} />
    <Line kind={row.kind === 'removed' ? 'empty' : row.kind} value={row.right?.text} />
</tr>;

/** The rows of the unified view: a line that changed is the old line and then the new one. */
const unifiedRows = (row: DiffRow, index: number) => {
    const rows = [];
    if (row.kind === 'same') {
        rows.push(<tr key={index} id={`diff-row-${index}`}>
            <LineNo value={row.left?.no} /><LineNo value={row.right?.no} />
            <td className="text-muted font-monospace">{SIGNS.same}</td><Line kind="same" value={row.left?.text} />
        </tr>);
        return rows;
    }
    if (row.left) {
        rows.push(<tr key={`${index}-l`} id={`diff-row-${index}`}>
            <LineNo value={row.left.no} /><LineNo value={undefined} />
            <td className="text-muted font-monospace">{SIGNS.removed}</td><Line kind="removed" value={row.left.text} />
        </tr>);
    }
    if (row.right) {
        rows.push(<tr key={`${index}-r`} id={row.left ? undefined : `diff-row-${index}`}>
            <LineNo value={undefined} /><LineNo value={row.right.no} />
            <td className="text-muted font-monospace">{SIGNS.added}</td><Line kind="added" value={row.right.text} />
        </tr>);
    }
    return rows;
};

const DiffTable = ({first, second, rows, view, onlyChanges, expanded, onExpand, text}: DiffTableProps) => {
    const parts = onlyChanges ? segments(rows, CONTEXT, expanded) : [{type: 'rows' as const, rows: rows.map((row, index) => ({row, index}))}];
    const columns = 4;

    return <div className="card">
        <div className="table-responsive">
            <table className="table table-sm mb-0 comparison-table" data-view={view}>
                <thead>
                    {view === 'split'
                        ? <tr>
                            <th colSpan={2}>{text('version')} {first.version} <small className="text-body-secondary">{first.date}</small></th>
                            <th colSpan={2}>{text('version')} {second.version} <small className="text-body-secondary">{second.date}</small></th>
                        </tr>
                        : <tr>
                            <th colSpan={columns}>
                                {text('version')} {first.version} <Icon name="arrow-right" /> {text('version')} {second.version}
                            </th>
                        </tr>}
                </thead>
                <tbody>
                    {parts.map((part) => {
                        if (part.type === 'folded') {
                            return <tr key={`fold-${part.from}`} className="table-light">
                                <td colSpan={columns}>
                                    <button type="button" className="btn btn-sm btn-link" onClick={() => onExpand(part.from)}>
                                        <Icon name="ellipsis" gap />{text('compare_unchanged_lines', part.count)}
                                    </button>
                                </td>
                            </tr>;
                        }
                        return part.rows.flatMap(({row, index}) => (view === 'split' ? [splitRow(row, index)] : unifiedRows(row, index)));
                    })}
                </tbody>
            </table>
        </div>
    </div>;
};

export default DiffTable;
