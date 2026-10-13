/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What an import did, schema by schema, with the reason for each one that failed.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/ImportResult
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo} from 'react';
import ErrorBoundary from './components/common/ErrorBoundary';
import Icon from './components/common/Icon';
import PageHeader from './components/common/PageHeader';
import StatTile from './components/common/StatTile';
import {createText} from './engine/text';
import type {ImportItem, ImportResultProps} from './types';

const STATUS: Record<ImportItem['status'], {icon: string; tone: string}> = {
    imported: {icon: 'circle-check', tone: 'success'},
    updated: {icon: 'arrows-rotate', tone: 'success'},
    skipped: {icon: 'forward', tone: 'secondary'},
    failed: {icon: 'circle-xmark', tone: 'danger'},
};

const ImportResult = (props: ImportResultProps) => {
    const {totals, items, urls} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const failed = totals.failed > 0;

    return <ErrorBoundary strings={props.strings}>
        <div className="servicemanager-import-result">
            <PageHeader
                title={text('import_result_title')}
                subtitle={text(failed ? 'import_result_with_errors' : 'import_result_ok')}
                actions={<>
                    <a href={urls.dashboard} className="btn btn-primary"><Icon name="table-list" gap />{text('dashboard')}</a>
                    <a href={urls.again} className="btn btn-outline-secondary"><Icon name="file-import" gap />{text('import_again')}</a>
                </>}
            />

            <div className="sm-tiles sm-tiles-four" data-region="summary">
                <StatTile label={text('import_imported')} value={totals.imported} tone="success" icon="circle-check" />
                <StatTile label={text('import_skipped')} value={totals.skipped} tone="secondary" icon="forward" />
                <StatTile label={text('import_failed')} value={totals.failed} tone={failed ? 'danger' : 'secondary'} icon="circle-xmark" />
                <StatTile label={text('import_warnings')} value={totals.warnings} tone={totals.warnings > 0 ? 'warning' : 'secondary'} icon="triangle-exclamation" />
            </div>

            {items.length > 0 && <div className="card">
                <ul className="list-group list-group-flush" data-region="import-items">
                    {items.map((item, index) => {
                        const look = STATUS[item.status];
                        return <li key={index} className="list-group-item">
                            <div className="d-flex align-items-start">
                                <span className={`text-${look.tone} sm-icon-gap`}><Icon name={look.icon} /></span>
                                <div className="flex-grow-1">
                                    <div>
                                        {item.viewUrl ? <a href={item.viewUrl} className="fw-bold">{item.name || item.id}</a> : <strong>{item.name || item.id || text('import_unknown')}</strong>}
                                        {item.id && item.name && <span className="sm-id-chip compact ms-2"><Icon name="fingerprint" gap />{item.id}</span>}
                                        <span className={`sm-badge tone-${look.tone} ms-2`}>{text('import_status_' + item.status)}</span>
                                    </div>
                                    {item.messages.length > 0 && <ul className={`small mb-0 mt-1 ${item.status === 'failed' ? 'text-danger' : 'text-body-secondary'}`}>
                                        {item.messages.map((message, at) => <li key={at}>{message}</li>)}
                                    </ul>}
                                </div>
                            </div>
                        </li>;
                    })}
                </ul>
            </div>}
        </div>
    </ErrorBoundary>;
};

export default ImportResult;
