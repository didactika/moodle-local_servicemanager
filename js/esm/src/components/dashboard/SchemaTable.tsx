// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The list of schemas of the page: what each is, how it is, when it changed and what can be done with it.
 *
 * The actions of a row are one group of buttons: look at it, edit it and, in the caret at the end of the group, the rest.
 *
 * @module     local_servicemanager/components/dashboard/SchemaTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {BulkSelection} from '../../hooks/useBulkSelection';
import type {SchemaRow, Text} from '../../types';
import ActionMenu from '../common/ActionMenu';
import IconButton from '../common/IconButton';
import Icon from '../common/Icon';
import StatusBadge from '../common/StatusBadge';

interface SchemaTableProps {
    rows: SchemaRow[];
    canManage: boolean;
    selection: BulkSelection;
    /** Enable or disable one schema. */
    onToggle: (row: SchemaRow) => void;
    text: Text;
}

const SchemaTable = ({rows, canManage, selection, onToggle, text}: SchemaTableProps) => <div className="card sm-list">
    <div>
        <table className="table table-hover align-middle mb-0">
            <thead>
                <tr>
                    {canManage && <th className="text-center sm-check-column">
                        <input type="checkbox" id="select-all" className="form-check-input" checked={selection.allChosen} onChange={selection.toggleAll} />
                        <label htmlFor="select-all" className="visually-hidden">{text('select_all')}</label>
                    </th>}
                    <th>{text('schema_name')}</th>
                    <th>{text('schema_version')}</th>
                    <th>{text('schema_status')}</th>
                    <th className="d-none d-md-table-cell">{text('schema_modified')}</th>
                    <th className="text-end"><span className="visually-hidden">{text('core_actions')}</span></th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => <tr key={row.id} className={selection.chosen.has(row.id) ? 'table-active' : undefined}>
                    {canManage && <td className="text-center">
                        <input
                            type="checkbox"
                            id={`schema-${row.id}`}
                            className="form-check-input"
                            checked={selection.chosen.has(row.id)}
                            onChange={() => selection.toggle(row.id)}
                        />
                        <label htmlFor={`schema-${row.id}`} className="visually-hidden">{row.name}</label>
                    </td>}
                    <td>
                        <a href={row.viewUrl} className="fw-bold">{row.name}</a>
                        {!row.enabled && <span className="badge text-bg-secondary ms-2">{text('disabled')}</span>}
                        <div><span className="sm-id-chip compact"><Icon name="fingerprint" gap />{row.schemaId}</span></div>
                    </td>
                    <td>{row.version}</td>
                    <td><StatusBadge status={row.status} label={row.statusLabel} /></td>
                    <td className="d-none d-md-table-cell text-body-secondary">{row.modified}</td>
                    <td className="text-end text-nowrap">
                        <div className="sm-group" role="group">
                            <IconButton icon="eye" label={text('action_view')} href={row.viewUrl} tone="primary" />
                            {canManage && <IconButton icon="pen-to-square" label={text('action_edit')} href={row.editUrl} />}
                            {canManage && <IconButton icon="clock-rotate-left" label={text('version_history')} href={row.historyUrl} tone="warning" />}
                            <ActionMenu label={text('row_more')} actions={[
                                {label: text('action_export'), icon: 'download', href: row.exportUrl},
                                ...(canManage ? [
                                    {
                                        label: text(row.enabled ? 'bulk_disable' : 'bulk_enable'),
                                        icon: row.enabled ? 'toggle-off' : 'toggle-on',
                                        onSelect: () => onToggle(row),
                                    },
                                    {label: text('action_delete'), icon: 'trash', href: row.deleteUrl, danger: true},
                                ] : []),
                            ]} />
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
</div>;

export default SchemaTable;
