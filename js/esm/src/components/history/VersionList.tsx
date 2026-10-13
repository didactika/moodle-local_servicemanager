// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The versions of a schema, newest first: who made each, when and why, and the ways to read it, compare it or go back to it.
 *
 * The YAML of a version is asked for when it is opened, not before, so a long history costs nothing until it is read.
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

interface VersionListProps {
    rows: HistoryRow[];
    chosen: ReadonlySet<number>;
    onToggle: (id: number) => void;
    text: Text;
}

/** What opening a version leads to: its YAML, or the reason it could not be had. */
type Opened = {yaml: string} | {error: true} | 'loading';

const VersionList = ({rows, chosen, onToggle, text}: VersionListProps) => {
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

    return <ul className="list-group sm-versions" data-region="versions">
        {rows.map((row) => {
            const open = opened[row.id];
            return <li key={row.id} className={`list-group-item${chosen.has(row.id) ? ' active-version' : ''}`}>
                <div className="d-flex align-items-start sm-version-row">
                    <input
                        type="checkbox"
                        id={`compare-${row.id}`}
                        className="form-check-input mt-2"
                        checked={chosen.has(row.id)}
                        onChange={() => onToggle(row.id)}
                    />
                    <label htmlFor={`compare-${row.id}`} className="visually-hidden">{text('compare_select')} {row.version}</label>
                    <img src={row.userPicture} alt="" width={36} height={36} className="rounded-circle" loading="lazy" />
                    <div className="flex-grow-1 sm-version-body">
                        <div className="d-flex flex-wrap align-items-center sm-badges-row">
                            <strong>{text('version')} {row.version}</strong>
                            {row.isCurrent && <span className="badge text-bg-success">{text('current')}</span>}
                        </div>
                        <div className="small text-body-secondary">{row.userName} · {row.date}</div>
                        {row.reason && <div className="fst-italic mt-1">{row.reason}</div>}
                        {open === 'loading' && <div className="small text-body-secondary mt-2"><Icon name="spinner" gap />{text('loading')}</div>}
                        {open && typeof open === 'object' && 'error' in open && <div className="text-danger small mt-2" role="alert">
                            <Icon name="circle-exclamation" gap />{text('version_yaml_failed')}
                        </div>}
                        {open && typeof open === 'object' && 'yaml' in open && <div className="mt-2">
                            <pre className="sm-yaml p-2 rounded small mb-2"><code>{open.yaml}</code></pre>
                            <CopyButton value={open.yaml} text={text} tone="outline-secondary" />
                        </div>}
                    </div>
                    <div className="sm-group" role="group">
                        <button type="button" className="btn sm-pill" onClick={() => toggleYaml(row.id)} aria-expanded={Boolean(open)}>
                            <Icon name="code" gap />{text('view_yaml')}
                        </button>
                        <a href={row.viewUrl} className="btn sm-pill icon-only compact tone-primary" title={text('action_view')}>
                            <Icon name="eye" /><span className="visually-hidden">{text('action_view')}</span>
                        </a>
                        {row.rollbackUrl && <a href={row.rollbackUrl} className="btn sm-pill tone-warning" title={text('rollback')}>
                            <Icon name="rotate-left" gap />{text('rollback')}
                        </a>}
                    </div>
                </div>
            </li>;
        })}
    </ul>;
};

export default VersionList;
