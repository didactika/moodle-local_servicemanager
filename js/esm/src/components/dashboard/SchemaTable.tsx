/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The table of the schemas, as every list of the design system: a check to choose the row, the name with its id, the version, the
 * status, the last change and, at the end, the round icon buttons of the row with a menu for the rest.
 *
 * @module     local_servicemanager/components/dashboard/SchemaTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useRef} from 'react';
import type {BulkSelection} from '../../hooks/useBulkSelection';
import {Icon, Menu, useStableColumns} from '../../ds/ui';
import type {SchemaRow, Text} from '../../types';
import {HEALTH} from './Summary';

/** The colour of each status of a schema. */
const TONES: Record<string, string> = Object.fromEntries(HEALTH.map((part) => [part.key, part.tone]));

/**
 * The table of the schemas of a page.
 *
 * @param props The rows, whether the person manages schemas, the choice of rows, what to do to turn one on or off and the texts.
 * @returns The table.
 */
const SchemaTable = ({rows, canManage, selection, onToggle, text}: {
    rows: SchemaRow[];
    canManage: boolean;
    selection: BulkSelection;
    onToggle: (row: SchemaRow) => void;
    text: Text;
}) => {
    const table = useRef<HTMLTableElement>(null);
    useStableColumns(table, rows.length > 0);

    return <table ref={table} className="table">
        <caption className="visually-hidden">{text('dashboard')}</caption>
        <thead>
            <tr>
                {canManage && <th scope="col" className="table-select">
                    <input type="checkbox" id="lsm-select-all" className="form-check-input" checked={selection.allChosen}
                        onChange={selection.toggleAll} />
                    <label htmlFor="lsm-select-all" className="visually-hidden">{text('select_all')}</label>
                </th>}
                <th scope="col">{text('schema_name')}</th>
                <th scope="col">{text('schema_version')}</th>
                <th scope="col">{text('schema_status')}</th>
                <th scope="col" className="d-none d-md-table-cell">{text('schema_modified')}</th>
                <th scope="col" className="table-actions"><span className="visually-hidden">{text('core_actions')}</span></th>
            </tr>
        </thead>
        <tbody>
            {rows.map((row) => <tr key={row.id} className={selection.chosen.has(row.id) ? 'table-active' : undefined}>
                {canManage && <td className="table-select">
                    <input type="checkbox" className="form-check-input" checked={selection.chosen.has(row.id)}
                        onChange={() => selection.toggle(row.id)} aria-label={row.name} />
                </td>}
                <td>
                    <span className="d-flex flex-column">
                        <span>
                            <a href={row.viewUrl} className="fw-bold">{row.name}</a>
                            {!row.enabled && <span className="badge badge-soft rounded-pill text-bg-secondary ms-2">{text('disabled')}</span>}
                        </span>
                        <small className="text-muted"><Icon name="fingerprint" text={text} /> {row.schemaId}</small>
                    </span>
                </td>
                <td>{row.version}</td>
                <td>
                    <span className={`badge badge-soft badge-dot rounded-pill text-bg-${TONES[row.status] ?? 'secondary'}`}>
                        {row.statusLabel}
                    </span>
                </td>
                <td className="d-none d-md-table-cell"><small className="text-muted">{row.modified}</small></td>
                <td className="table-actions">
                    <a className="btn btn-link btn-icon btn-sm text-primary" href={row.viewUrl} title={text('action_view')}
                        aria-label={`${text('action_view')}: ${row.name}`}><Icon name="view" text={text} /></a>
                    {canManage && <a className="btn btn-link btn-icon btn-sm text-primary" href={row.editUrl} title={text('action_edit')}
                        aria-label={`${text('action_edit')}: ${row.name}`}><Icon name="t/edit" text={text} /></a>}
                    {canManage && <a className="btn btn-link btn-icon btn-sm text-info" href={row.historyUrl}
                        title={text('version_history')} aria-label={`${text('version_history')}: ${row.name}`}>
                        <Icon name="history" text={text} />
                    </a>}
                    <RowMenu row={row} canManage={canManage} onToggle={onToggle} text={text} />
                </td>
            </tr>)}
        </tbody>
    </table>;
};

/**
 * The menu of the less frequent actions of a row: export it and, for whoever manages schemas, turn it on or off and delete it.
 *
 * @param props The row, whether the person manages schemas, what to do to turn it on or off and the texts.
 * @returns The menu.
 */
const RowMenu = ({row, canManage, onToggle, text}: {row: SchemaRow; canManage: boolean; onToggle: (row: SchemaRow) => void; text: Text}) =>
    <Menu button={<Icon name="i/moremenu" text={text} />} label={`${text('row_more')}: ${row.name}`} place="end" icon>
        {(close) => <>
            <a className="dropdown-item" href={row.exportUrl}><Icon name="t/download" text={text} /> {text('action_export')}</a>
            {canManage && <button type="button" className="dropdown-item" onClick={() => {
                close();
                onToggle(row);
            }}>
                <Icon name={row.enabled ? 't/hide' : 't/show'} text={text} /> {text(row.enabled ? 'bulk_disable' : 'bulk_enable')}
            </button>}
            {canManage && <>
                <hr className="dropdown-divider" />
                <a className="dropdown-item text-danger" href={row.deleteUrl}><Icon name="t/delete" text={text} /> {text('action_delete')}</a>
            </>}
        </>}
    </Menu>;

export default SchemaTable;
