// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The dashboard: the schemas of the site, found by typing, filtered by status and acted on one by one or together.
 *
 * It gets every schema at once and filters them in the page, so searching never waits for the server and never reloads.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/Dashboard
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo, useState} from 'react';
import HealthSummary from './components/dashboard/HealthSummary';
import SchemaTable from './components/dashboard/SchemaTable';
import SelectionBar from './components/dashboard/SelectionBar';
import Toolbar from './components/dashboard/Toolbar';
import WsPill from './components/dashboard/WsPill';
import ConfirmModal from './components/common/ConfirmModal';
import EmptyState from './components/common/EmptyState';
import ErrorBoundary from './components/common/ErrorBoundary';
import Icon from './components/common/Icon';
import PageHeader from './components/common/PageHeader';
import Pagination from './components/common/Pagination';
import ActionMenu from './components/common/ActionMenu';
import IconButton from './components/common/IconButton';
import {createText} from './engine/text';
import {postForm} from './engine/post';
import {useBulkSelection} from './hooks/useBulkSelection';
import {useListState} from './hooks/useListState';
import {countBy, matches, paginate, type ListState} from './lib/listing';
import type {DashboardProps, SchemaRow} from './types';

type BulkAction = 'enable' | 'disable' | 'export' | 'delete';

/** What a row gives the filters to look at. */
const findable = (row: SchemaRow) => ({texts: [row.name, row.schemaId, row.version], status: row.status, at: row.modifiedAt});

const Dashboard = (props: DashboardProps) => {
    const {canManage, urls, wsStatus, schemas, perPageOptions} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const list = useListState(perPageOptions[0], perPageOptions);
    const [deleting, setDeleting] = useState(false);

    // The counts of the status choice are those of the search and the dates, so each button says what it would leave.
    const withoutStatus = useMemo(() => {
        const state: ListState = {...list.state, status: ''};
        return schemas.filter((row) => matches(findable(row), state));
    }, [schemas, list.state.query, list.state.from, list.state.to]);
    const counts = useMemo(() => countBy(withoutStatus), [withoutStatus]);
    const found = useMemo(
        () => (list.state.status ? withoutStatus.filter((row) => row.status === list.state.status) : withoutStatus),
        [withoutStatus, list.state.status]
    );
    const page = paginate(found, list.state.page, list.state.perpage);
    const selection = useBulkSelection(page.rows, schemas);
    const asking = list.state.query !== '' || list.state.status !== '' || list.extras > 0;

    const send = (action: BulkAction, ids: number[]) => postForm(urls.bulkAction, {sesskey: props.sesskey, action, ids});
    const act = (action: BulkAction) => (action === 'delete' ? setDeleting(true) : send(action, [...selection.chosen]));

    return <ErrorBoundary strings={props.strings}>
        <div className="servicemanager-dashboard">
            <PageHeader
                title={text('dashboard')}
                subtitle={<WsPill status={wsStatus} canManage={canManage} text={text} />}
            />

            {schemas.length === 0
                ? <EmptyState
                    icon="plug"
                    title={text('empty_title')}
                    text={text('no_schemas')}
                    actions={<>
                        {canManage && <a href={urls.create} className="btn btn-primary"><Icon name="plus" gap />{text('new_schema')}</a>}
                        {canManage && <a href={urls.import} className="btn btn-outline-primary"><Icon name="file-import" gap />{text('import_schemas')}</a>}
                        <a href={urls.documentation} className="btn btn-outline-secondary"><Icon name="book" gap />{text('view_documentation')}</a>
                    </>}
                />
                : <>
                    <HealthSummary counts={counts} status={list.state.status} onStatus={(status) => list.set({status})} text={text} />
                    <Toolbar
                        list={list}
                        options={perPageOptions}
                        text={text}
                        actions={<div className="sm-group" role="group" aria-label={text('core_actions')}>
                            {canManage && <IconButton large solid tone="primary" icon="plus" label={text('new_schema')} href={urls.create} />}
                            {canManage && <IconButton large tone="success" icon="file-import" label={text('import_schemas')} href={urls.import} />}
                            <IconButton large tone="info" icon="file-zipper" label={text('export_all')} href={urls.exportAll} />
                            <ActionMenu
                                size="md"
                                caret
                                icon="book"
                                label={text('docs_menu')}
                                actions={[
                                    {label: text('docs_schema_reference'), icon: 'file-lines', href: urls.documentation},
                                    {label: text('docs_plugin_wiki'), icon: 'book-open', href: urls.wiki},
                                    {label: text('docs_moodle'), icon: 'life-ring', href: urls.moodleDocs},
                                ]}
                            />
                        </div>}
                    />

                    {page.rows.length > 0
                        ? <SchemaTable
                            rows={page.rows}
                            canManage={canManage}
                            selection={selection}
                            onToggle={(row) => send(row.enabled ? 'disable' : 'enable', [row.id])}
                            text={text}
                        />
                        : <EmptyState
                            icon="filter-circle-xmark"
                            title={text('empty_filtered_title')}
                            text={text('no_schemas_filtered')}
                            actions={asking
                                ? <button type="button" className="btn btn-secondary" onClick={list.reset}>
                                    <Icon name="xmark" gap />{text('filter_clear')}
                                </button>
                                : undefined}
                        />}

                    <Pagination page={page.page} perpage={list.state.perpage} total={page.total} onPage={(next) => list.set({page: next})} text={text} />
                    {props.truncated && <p className="text-body-secondary small text-center">{text('list_truncated', schemas.length)}</p>}
                </>}

            {canManage && selection.chosen.size > 0 && <SelectionBar
                count={selection.chosen.size}
                actions={selection.actions}
                onAction={act}
                onClear={selection.clear}
                text={text}
            />}

            <ConfirmModal
                open={deleting}
                title={text('bulk_delete')}
                message={text('bulk_delete_confirm')}
                confirmLabel={text('bulk_delete')}
                cancelLabel={text('core_cancel')}
                onCancel={() => setDeleting(false)}
                onConfirm={() => send('delete', [...selection.chosen])}
            />
        </div>
    </ErrorBoundary>;
};

export default Dashboard;
