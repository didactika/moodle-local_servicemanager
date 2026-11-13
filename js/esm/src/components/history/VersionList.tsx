/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The versions of a schema, as every table of the design system: a check to choose the two to compare, the version, who made it
 * and when, why, and at the end the round icon buttons of the row; the YAML of a version opens in a dialog.
 *
 * @module     local_servicemanager/components/history/VersionList
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useRef, useState} from 'react';
import {Dialog, useStableColumns} from '../../ds/ui';
import {getVersionYaml} from '../../services/api';
import type {HistoryRow, Text} from '../../types';
import CopyButton from '../common/CopyButton';
import Icon from '../common/Icon';
import IconButton from '../common/IconButton';

interface VersionListProps {
    rows: HistoryRow[];
    chosen: ReadonlySet<number>;
    onToggle: (id: number) => void;
    onRollback: (row: HistoryRow) => void;
    text: Text;
}

/** What opening the YAML of a version leads to: the YAML, or the reason it could not be had. */
type Opened = {row: HistoryRow; yaml?: string; error?: boolean};

const VersionList = ({rows, chosen, onToggle, onRollback, text}: VersionListProps) => {
    const [opened, setOpened] = useState<Opened | null>(null);
    const table = useRef<HTMLTableElement>(null);
    useStableColumns(table, rows.length > 0);

    const openYaml = (row: HistoryRow) => {
        setOpened({row});
        getVersionYaml(row.id).then((yaml) => {
            setOpened({row, yaml});
            return yaml;
        }).catch(() => setOpened({row, error: true}));
    };

    return <>
        <table ref={table} className="table" data-region="versions">
            <caption className="visually-hidden">{text('version_history')}</caption>
            <thead>
                <tr>
                    <th scope="col" className="table-select"><span className="visually-hidden">{text('compare_select')}</span></th>
                    <th scope="col">{text('version')}</th>
                    <th scope="col">{text('history_by')}</th>
                    <th scope="col" className="d-none d-md-table-cell">{text('history_reason')}</th>
                    <th scope="col" className="table-actions"><span className="visually-hidden">{text('core_actions')}</span></th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => <tr key={row.id} className={chosen.has(row.id) ? 'table-active' : undefined} data-region="version">
                    <td className="table-select">
                        <input type="checkbox" className="form-check-input" checked={chosen.has(row.id)} onChange={() => onToggle(row.id)}
                            aria-label={`${text('compare_select')} ${row.version}`} />
                    </td>
                    <td>
                        <span className="fw-semibold"><Icon name="code-branch" gap />{row.version}</span>
                        {row.isCurrent && <span className="badge badge-soft rounded-pill text-bg-success ms-2">{text('current')}</span>}
                    </td>
                    <td>
                        <span className="d-flex align-items-center gap-2">
                            <img src={row.userPicture} alt="" width={24} height={24} className="rounded-circle" loading="lazy" />
                            <span className="d-flex flex-column">
                                {row.userName}
                                <small className="text-muted">{row.date}</small>
                            </span>
                        </span>
                    </td>
                    <td className="d-none d-md-table-cell"><span className="text-truncate d-block" title={row.reason}>{row.reason}</span></td>
                    <td className="table-actions">
                        <IconButton icon="code" label={text('view_yaml')} onClick={() => openYaml(row)} />
                        <IconButton icon="eye" label={text('action_view')} href={row.viewUrl} tone="primary" />
                        {row.canRollback && <IconButton icon="rotate-left" label={text('rollback')} onClick={() => onRollback(row)} tone="warning" />}
                    </td>
                </tr>)}
            </tbody>
        </table>
        {opened && <Dialog title={`${text('view_yaml')} · ${opened.row.version}`} onClose={() => setOpened(null)} text={text}
            footer={<>
                {opened.yaml !== undefined && <CopyButton value={opened.yaml} text={text} />}
                <button type="button" className="btn btn-secondary" onClick={() => setOpened(null)}>{text('core_closebuttontitle')}</button>
            </>}>
            {opened.error && <p className="text-danger mb-0" role="alert"><Icon name="circle-exclamation" gap />{text('version_yaml_failed')}</p>}
            {!opened.error && opened.yaml === undefined && <p className="text-muted mb-0"><Icon name="spinner" gap />{text('loading')}</p>}
            {opened.yaml !== undefined && <pre className="bg-body-tertiary border rounded p-3 small mb-0"><code>{opened.yaml}</code></pre>}
        </Dialog>}
    </>;
};

export default VersionList;
