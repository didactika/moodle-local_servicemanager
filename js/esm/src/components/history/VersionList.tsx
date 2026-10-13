// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The versions of a schema, one row each: who made it and when, what the change was for and what can be done with it. The YAML of a
 * version opens under its row when it is asked for.
 *
 * @module     local_servicemanager/components/history/VersionList
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useState} from 'react';
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

/** What opening a version leads to: its YAML, or the reason it could not be had. */
type Opened = {yaml: string} | {error: true} | 'loading';

const VersionList = ({rows, chosen, onToggle, onRollback, text}: VersionListProps) => {
    const [opened, setOpened] = useState<Record<number, Opened | undefined>>({});

    const toggleYaml = (id: number) => {
        if (opened[id]) {
            setOpened({...opened, [id]: undefined});
            return;
        }
        setOpened({...opened, [id]: 'loading'});
        getVersionYaml(id).then((yaml) => {
            setOpened((before) => ({...before, [id]: {yaml}}));
            return yaml;
        }).catch(() => setOpened((before) => ({...before, [id]: {error: true}})));
    };

    return <ul className="card sm-versions" data-region="versions">
        {rows.map((row) => {
            const open = opened[row.id];
            return <li key={row.id} className={`sm-version${chosen.has(row.id) ? ' active-version' : ''}`} data-region="version">
                <div className="sm-version-main">
                    <input
                        type="checkbox"
                        id={`compare-${row.id}`}
                        className="form-check-input"
                        checked={chosen.has(row.id)}
                        onChange={() => onToggle(row.id)}
                    />
                    <label htmlFor={`compare-${row.id}`} className="visually-hidden">{text('compare_select')} {row.version}</label>
                    <span className="sm-version-number">
                        <Icon name="code-branch" gap /><span className="visually-hidden">{text('version')} </span>{row.version}
                    </span>
                    {row.isCurrent ? <span className="sm-badge tone-success">{text('current')}</span> : <span />}
                    <span className="sm-version-who">
                        <img src={row.userPicture} alt="" width={24} height={24} className="rounded-circle" loading="lazy" />
                        <span className="sm-version-name">{row.userName}</span>
                        <span className="sm-version-date">{row.date}</span>
                    </span>
                    <span className="sm-version-reason" title={row.reason}>{row.reason}</span>
                    <div className="sm-group" role="group">
                        <IconButton
                            icon={open && open !== 'loading' ? 'chevron-up' : 'code'}
                            label={text('view_yaml')}
                            onClick={() => toggleYaml(row.id)}
                        />
                        <IconButton icon="eye" label={text('action_view')} href={row.viewUrl} tone="primary" />
                        {row.canRollback
                            ? <IconButton icon="rotate-left" label={text('rollback')} onClick={() => onRollback(row)} tone="warning" />
                            : <span className="sm-slot" aria-hidden="true" />}
                    </div>
                </div>
                {open === 'loading' && <div className="sm-version-yaml small text-body-secondary"><Icon name="spinner" gap />{text('loading')}</div>}
                {open && typeof open === 'object' && 'error' in open && <div className="sm-version-yaml text-danger small" role="alert">
                    <Icon name="circle-exclamation" gap />{text('version_yaml_failed')}
                </div>}
                {open && typeof open === 'object' && 'yaml' in open && <div className="sm-version-yaml">
                    <pre className="sm-yaml p-2 rounded small mb-2"><code>{open.yaml}</code></pre>
                    <CopyButton value={open.yaml} text={text} compact />
                </div>}
            </li>;
        })}
    </ul>;
};

export default VersionList;
