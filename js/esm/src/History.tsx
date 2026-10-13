// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
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
import Chips from './components/common/Chips';
import FilterMenu from './components/common/FilterMenu';
import Icon from './components/common/Icon';
import PageHeader from './components/common/PageHeader';
import Pagination from './components/common/Pagination';
import SearchBox from './components/common/SearchBox';
import CompareBar from './components/history/CompareBar';
import VersionList from './components/history/VersionList';
import {createText} from './engine/text';
import {useListState} from './hooks/useListState';
import {matches, paginate} from './lib/listing';
import type {HistoryProps, HistoryRow} from './types';

/** How many versions are compared at once. */
const TO_COMPARE = 2;

/** What a version gives the filters to look at. */
const findable = (row: HistoryRow) => ({texts: [row.version, row.userName, row.reason], at: row.at});

const History = (props: HistoryProps) => {
    const {urls, rows, perPageOptions} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const list = useListState(perPageOptions[0], perPageOptions);
    const [chosen, setChosen] = useState<ReadonlySet<number>>(new Set());
    const [tooMany, setTooMany] = useState(false);

    const found = useMemo(() => rows.filter((row) => matches(findable(row), list.state)), [rows, list.state.query, list.state.from, list.state.to]);
    const page = paginate(found, list.state.page, list.state.perpage);

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

    const clear = useCallback(() => {
        setChosen(new Set());
        setTooMany(false);
    }, []);

    return <ErrorBoundary strings={props.strings}>
        <div className="servicemanager-history-page">
            <div className="mb-3"><BackLink href={urls.back} label={text('back')} /></div>

            <PageHeader
                title={text('version_history')}
                subtitle={<>{props.schemaName} · {text('history_current', props.currentVersion)}</>}
            />

            {rows.length === 0
                ? <EmptyState icon="clock-rotate-left" title={text('history_empty_title')} text={text('no_history')} />
                : <>
                    <div className="sm-toolbar">
                        <SearchBox
                            value={list.state.query}
                            onChange={(query) => list.set({query})}
                            placeholder={text('filter_version')}
                            clearLabel={text('filter_clear')}
                        />
                        <FilterMenu text={text} count={list.extras} onReset={() => list.set({from: '', to: '', perpage: perPageOptions[0]})}>
                            <div className="mb-3">
                                <label htmlFor="sm-from" className="form-label">{text('filter_date_from')}</label>
                                <input type="date" id="sm-from" className="form-control" value={list.state.from} onChange={(event) => list.set({from: event.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sm-to" className="form-label">{text('filter_date_to')}</label>
                                <input type="date" id="sm-to" className="form-control" value={list.state.to} onChange={(event) => list.set({to: event.target.value})} />
                            </div>
                            <div className="sm-filter-title">{text('filter_per_page')}</div>
                            <Chips
                                label={text('filter_per_page')}
                                value={String(list.state.perpage)}
                                onChange={(value) => list.set({perpage: Number(value)})}
                                chips={perPageOptions.map((option) => ({value: String(option), label: String(option)}))}
                            />
                        </FilterMenu>
                    </div>

                    {page.rows.length === 0
                        ? <EmptyState
                            icon="filter-circle-xmark"
                            title={text('empty_filtered_title')}
                            text={text('no_schemas_filtered')}
                            actions={<button type="button" className="btn btn-secondary" onClick={list.reset}><Icon name="xmark" gap />{text('filter_clear')}</button>}
                        />
                        : <form action={urls.compare} method="get" className="servicemanager-history">
                            <input type="hidden" name="id" value={props.schemaId} />
                            <p className="text-body-secondary small mb-2">{text('history_count', found.length)} {text('compare_hint')}</p>
                            <VersionList rows={page.rows} chosen={chosen} onToggle={toggle} text={text} />
                            {chosen.size > 0 && <CompareBar chosen={chosen} needed={TO_COMPARE} tooMany={tooMany} onClear={clear} text={text} />}
                        </form>}

                    <Pagination page={page.page} perpage={list.state.perpage} total={page.total} onPage={(next) => list.set({page: next})} text={text} />
                </>}
        </div>
    </ErrorBoundary>;
};

export default History;
