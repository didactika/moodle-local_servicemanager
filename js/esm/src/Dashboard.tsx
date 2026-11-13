/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The dashboard, drawn with the Didactika design system as the lists of Delegate account: the head of the page with its actions,
 * the summary of the schemas and of the web services, and the list of the schemas with its search, its filters (status and date),
 * its pager and the floating bar of what is chosen. Everything is filtered and paged here, without asking the server again.
 *
 * @module     local_servicemanager/Dashboard
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo, useState} from 'react';
import SchemaTable from './components/dashboard/SchemaTable';
import Summary, {HEALTH} from './components/dashboard/Summary';
import ErrorBoundary from './components/common/ErrorBoundary';
import {Dialog, Empty, FloatBar, Icon, Pager, SearchBox, TableBox} from './ds/ui';
import {DateMenu, FilterGroup, StatusMenu} from './ds/Filters';
import {createText} from './engine/text';
import {postForm} from './engine/post';
import {useBulkSelection} from './hooks/useBulkSelection';
import {useDropdown} from './hooks/useDropdown';
import {useListState} from './hooks/useListState';
import {countBy, matches, paginate, type ListState} from './lib/listing';
import type {DashboardProps, SchemaRow, Text} from './types';

type BulkAction = 'enable' | 'disable' | 'export' | 'delete';

/** What a row gives the filters to look at. */
const findable = (row: SchemaRow) => ({texts: [row.name, row.schemaId, row.version], status: row.status, at: row.modifiedAt});

/**
 * The menu of the documentation: the reference of the format, the user manual and the documentation of Moodle.
 *
 * @param props The addresses and the texts.
 * @returns The menu.
 */
const DocsMenu = ({urls, text}: {urls: DashboardProps['urls']; text: Text}) => {
    const menu = useDropdown();
    return <div className="dropdown" ref={menu.ref}>
        <button type="button" className="btn btn-outline-secondary dropdown-toggle" aria-haspopup="true" aria-expanded={menu.open}
            onClick={menu.toggle}>
            <Icon name="docs" text={text} /> {text('docs_menu')}
        </button>
        <ul className={`dropdown-menu dropdown-menu-end${menu.open ? ' show' : ''}`}>
            <li><a className="dropdown-item" href={urls.documentation}>{text('docs_schema_reference')}</a></li>
            <li><a className="dropdown-item" href={urls.manual} target="_blank" rel="noreferrer">
                {text('docs_plugin_manual')} <Icon name="i/externallink" text={text} />
            </a></li>
            <li><a className="dropdown-item" href={urls.moodleDocs} target="_blank" rel="noreferrer">
                {text('docs_moodle')} <Icon name="i/externallink" text={text} />
            </a></li>
        </ul>
    </div>;
};

const Dashboard = (props: DashboardProps) => {
    const {canManage, urls, wsStatus, schemas, perPageOptions} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const list = useListState(perPageOptions[0], perPageOptions);
    const [deleting, setDeleting] = useState(false);

    // The statuses count the rows of the search and the dates, so each one says what it would leave.
    const withoutStatus = useMemo(() => {
        const state: ListState = {...list.state, status: ''};
        return schemas.filter((row) => matches(findable(row), state));
    }, [schemas, list.state.query, list.state.from, list.state.to]);
    const counts = useMemo(() => countBy(withoutStatus), [withoutStatus]);
    const chosen = list.state.status ? list.state.status.split(',') : [];
    const found = useMemo(
        () => (list.state.status ? withoutStatus.filter((row) => list.state.status.split(',').includes(row.status)) : withoutStatus),
        [withoutStatus, list.state.status]
    );
    const allCounts = useMemo(() => countBy(schemas), [schemas]);
    const page = paginate(found, list.state.page, list.state.perpage);
    const selection = useBulkSelection(page.rows, schemas);
    const narrowed = list.state.query !== '' || chosen.length > 0 || list.extras > 0;
    const applied = (chosen.length > 0 ? 1 : 0) + (list.state.from || list.state.to ? 1 : 0);

    const send = (action: BulkAction, ids: number[]) => postForm(urls.bulkAction, {sesskey: props.sesskey, action, ids});
    const act = (action: BulkAction) => (action === 'delete' ? setDeleting(true) : send(action, [...selection.chosen]));

    return <ErrorBoundary strings={props.strings}>
        <div className="lsm servicemanager-dashboard d-grid gap-3" style={selection.chosen.size ? {paddingBottom: '5.5rem'} : undefined}>
            <header className="dd-page-header">
                <div className="dd-page-header-row">
                    <div className="dd-page-header-main">
                        <span className="dd-tile dd-tile-lg"><Icon name="plug" text={text} /></span>
                        <p className="dd-page-subtitle">{text('dashboard_subtitle')}</p>
                    </div>
                    <div className="dd-page-actions">
                        <DocsMenu urls={urls} text={text} />
                        <a className="btn btn-outline-secondary" href={urls.exportAll}>
                            <Icon name="t/download" text={text} /> {text('export_all')}
                        </a>
                        {canManage && <a className="btn btn-outline-secondary" href={urls.import}>
                            <Icon name="i/import" text={text} /> {text('import_schemas')}
                        </a>}
                        {canManage && <a className="btn btn-primary" href={urls.create}>
                            <Icon name="t/add" text={text} /> {text('new_schema')}
                        </a>}
                    </div>
                </div>
            </header>

            <Summary counts={allCounts} ws={wsStatus} sesskey={props.sesskey} text={text} />

            <div className="card">
                <div className="table-toolbar" data-region="filters">
                    <div className="table-toolbar-start">
                        <SearchBox value={list.state.query} onChange={(query) => list.set({query})} label={text('filter_name')} text={text} />
                        <FilterGroup count={applied} text={text}>
                            <StatusMenu
                                label={text('filter_status')}
                                statuses={HEALTH.map((part) => ({key: part.key, label: text(`status_${part.key}`), count: counts[part.key] ?? 0}))}
                                chosen={chosen}
                                text={text}
                                onChange={(statuses) => list.set({status: statuses.join(',')})}
                            />
                            <DateMenu
                                label={text('schema_modified')}
                                from={list.state.from}
                                to={list.state.to}
                                text={text}
                                onChange={(from, to) => list.set({from, to})}
                            />
                        </FilterGroup>
                    </div>
                    <div className="table-toolbar-end">
                        <button type="button" className="btn btn-link btn-icon" disabled={!narrowed} title={text('filters_reset')}
                            aria-label={text('filters_reset')} onClick={list.reset}>
                            <Icon name="i/reload" text={text} />
                        </button>
                    </div>
                </div>
                <TableBox busy={false} empty={page.total === 0 && <Empty
                    icon={narrowed ? 'a/search' : 'plug'}
                    message={text(narrowed ? 'no_schemas_filtered' : 'no_schemas')}
                    action={narrowed ? text('filters_reset') : undefined}
                    onAction={narrowed ? list.reset : undefined}
                    text={text}
                />}>
                    <SchemaTable rows={page.rows} canManage={canManage} selection={selection}
                        onToggle={(row) => send(row.enabled ? 'disable' : 'enable', [row.id])} text={text} />
                </TableBox>
                <Pager page={page.page} perpage={list.state.perpage} total={page.total} text={text}
                    onChange={(changes) => list.set({...changes, page: changes.page ?? 0})} />
            </div>
            {props.truncated && <p className="text-muted small text-center">{text('list_truncated', schemas.length)}</p>}

            {canManage && <FloatBar count={selection.chosen.size} label={text('core_actions')} onClear={selection.clear} text={text}>
                {selection.actions.enable && <button type="button" className="btn btn-secondary btn-tonal btn-sm" onClick={() => act('enable')}>
                    <Icon name="t/show" text={text} /> {text('bulk_enable')}
                </button>}
                {selection.actions.disable && <button type="button" className="btn btn-secondary btn-tonal btn-sm" onClick={() => act('disable')}>
                    <Icon name="t/hide" text={text} /> {text('bulk_disable')}
                </button>}
                <button type="button" className="btn btn-secondary btn-tonal btn-sm" onClick={() => act('export')}>
                    <Icon name="t/download" text={text} /> {text('bulk_export')}
                </button>
                <button type="button" className="btn btn-danger btn-tonal btn-sm" onClick={() => act('delete')}>
                    <Icon name="t/delete" text={text} /> {text('bulk_delete')}
                </button>
            </FloatBar>}

            {deleting && <Dialog title={text('bulk_delete')} onClose={() => setDeleting(false)} text={text} footer={<>
                <button type="button" className="btn btn-secondary" onClick={() => setDeleting(false)}>{text('core_cancel')}</button>
                <button type="button" className="btn btn-danger" onClick={() => send('delete', [...selection.chosen])}>{text('bulk_delete')}</button>
            </>}>
                <p className="mb-0">{text('bulk_delete_confirm')}</p>
            </Dialog>}
        </div>
    </ErrorBoundary>;
};

export default Dashboard;
