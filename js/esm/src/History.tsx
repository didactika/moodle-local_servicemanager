/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The versions a schema has had, to find by typing, read, compare two of them and roll back to one.
 *
 * It gets the versions without their YAML and filters them in the page, so searching never waits for the server.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/History
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useCallback, useMemo, useState} from 'react';
import BackLink from './components/common/BackLink';
import EmptyState from './components/common/EmptyState';
import ErrorBoundary from './components/common/ErrorBoundary';
import ConfirmModal from './components/common/ConfirmModal';
import Icon from './components/common/Icon';
import PageHeader from './components/common/PageHeader';
import {Empty, Pager as DsPager, SearchBox as DsSearch, TableBox} from './ds/ui';
import {DateMenu, FilterGroup} from './ds/Filters';
import CompareBar from './components/history/CompareBar';
import VersionList from './components/history/VersionList';
import {createText} from './engine/text';
import {addToast} from './engine/toast';
import {useListState} from './hooks/useListState';
import {matches, paginate} from './lib/listing';
import {rollbackSchema} from './services/api';
import type {HistoryProps, HistoryRow} from './types';

/** How many versions are compared at once. */
const TO_COMPARE = 2;

/** What a version gives the filters to look at. */
const findable = (row: HistoryRow) => ({texts: [row.version, row.userName, row.reason], at: row.at});

const History = (props: HistoryProps) => {
    const {urls, perPageOptions} = props;
    const [rows, setRows] = useState<HistoryRow[]>(props.rows);
    const [currentVersion, setCurrentVersion] = useState(props.currentVersion);
    const [rollingBack, setRollingBack] = useState<HistoryRow | null>(null);
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const list = useListState(perPageOptions[0], perPageOptions);
    const [chosen, setChosen] = useState<ReadonlySet<number>>(new Set());
    const [tooMany, setTooMany] = useState(false);

    const found = useMemo(() => rows.filter((row) => matches(findable(row), list.state)), [rows, list.state.query, list.state.from, list.state.to]);
    const page = paginate(found, list.state.page, list.state.perpage);
    const asking = list.state.query !== '' || list.state.from !== '' || list.state.to !== '';

    const toggle = useCallback((id: number) => {
        if (!chosen.has(id) && chosen.size >= TO_COMPARE) {
            setTooMany(true);
            return;
        }
        const next = new Set(chosen);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setChosen(next);
        setTooMany(false);
    }, [chosen]);

    const confirmRollback = () => {
        const target = rollingBack;
        setRollingBack(null);
        if (!target) {
            return;
        }
        rollbackSchema(props.schemaId, target.id).then((result) => {
            setRows(result.rows);
            setCurrentVersion(result.version);
            setChosen(new Set());
            return addToast(text('rollback_success'), {type: 'success'});
        }).catch(() => addToast(text('rollback_error'), {type: 'danger'})).catch(() => undefined);
    };

    const clear = useCallback(() => {
        setChosen(new Set());
        setTooMany(false);
    }, []);

    return <ErrorBoundary strings={props.strings}>
        <div className="lsm servicemanager-history-page d-grid gap-3">
            <div><BackLink href={urls.back} label={text('back')} /></div>

            <PageHeader
                title={text('version_history')}
                subtitle={<>{props.schemaName} · {text('history_current', currentVersion)}</>}
            />

            {rows.length === 0
                ? <EmptyState icon="clock-rotate-left" title={text('history_empty_title')} text={text('no_history')} />
                : <>
                    <div className="card">
                        <div className="table-toolbar" data-region="filters">
                            <div className="table-toolbar-start">
                                <DsSearch value={list.state.query} onChange={(query) => list.set({query})} label={text('filter_version')} text={text} />
                                <FilterGroup count={list.state.from || list.state.to ? 1 : 0} text={text}>
                                    <DateMenu label={text('history_date')} from={list.state.from} to={list.state.to} text={text}
                                        onChange={(from, to) => list.set({from, to})} />
                                </FilterGroup>
                            </div>
                            <div className="table-toolbar-end">
                                <button type="button" className="btn btn-link btn-icon" disabled={!asking} title={text('filters_reset')}
                                    aria-label={text('filters_reset')} onClick={list.reset}>
                                    <Icon name="rotate" />
                                </button>
                            </div>
                        </div>
                        <form action={urls.compare} method="get" className="servicemanager-history">
                            <input type="hidden" name="id" value={props.schemaId} />
                            <TableBox busy={false} empty={page.rows.length === 0 && <Empty icon="a/search" message={text('no_schemas_filtered')}
                                action={text('filters_reset')} onAction={list.reset} text={text} />}>
                                <VersionList rows={page.rows} chosen={chosen} onToggle={toggle} onRollback={setRollingBack} text={text} />
                            </TableBox>
                            {chosen.size > 0 && <CompareBar chosen={chosen} needed={TO_COMPARE} tooMany={tooMany} onClear={clear} text={text} />}
                        </form>
                        <DsPager page={page.page} perpage={list.state.perpage} total={page.total} text={text}
                            onChange={(changes) => list.set({...changes, page: changes.page ?? 0})} />
                    </div>
                    <p className="text-muted small mb-0">{text('history_count', found.length)} {text('compare_hint')}</p>
                </>}

            <ConfirmModal
                open={rollingBack !== null}
                title={text('rollback_title', rollingBack?.version ?? '')}
                message={text('rollback_confirm')}
                confirmLabel={text('rollback')}
                cancelLabel={text('core_cancel')}
                tone="warning"
                onConfirm={confirmRollback}
                onCancel={() => setRollingBack(null)}
            />
        </div>
    </ErrorBoundary>;
};

export default History;
