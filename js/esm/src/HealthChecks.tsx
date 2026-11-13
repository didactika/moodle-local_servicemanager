/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The health checks of a schema, narrowed to one status and a page at a time. The server reads the page that is asked for, so
 * the choices of status, of page and of size of page are links to the page with them.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/HealthChecks
 * @copyright  2026 Didactika.org
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo} from 'react';
import BackLink from './components/common/BackLink';
import EmptyState from './components/common/EmptyState';
import ErrorBoundary from './components/common/ErrorBoundary';
import {Empty, TableBox} from './ds/ui';
import PageHeader from './components/common/PageHeader';
import HealthFindings from './components/schema/HealthFindings';
import {createText} from './engine/text';
import {pageUrl} from './lib/paging';
import Pager from './components/common/Pager';
import type {HealthChecksProps} from './types';

const HealthChecks = (props: HealthChecksProps) => {
    const {rows, filters, paging, urls} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);

    return <ErrorBoundary strings={props.strings}>
        <div className="lsm servicemanager-health-page d-grid gap-3" data-region="servicemanager-health">
            <div><BackLink href={urls.back} label={text('back')} /></div>
            <PageHeader title={text('health_checks')} subtitle={props.schemaName} />

            {!props.hasAny && <EmptyState icon="heart-pulse" title={text('health_checks')} text={text('health_none')} />}

            {props.hasAny && <>
                <div className="card">
                    <div className="table-toolbar">
                        <nav className="dd-chips" aria-label={text('core_status')} data-region="health-filters">
                            {filters.map((filter) => <a key={filter.status || 'all'} href={filter.url} className="dd-chip"
                                aria-pressed={filter.active} aria-current={filter.active ? 'true' : undefined}>
                                {filter.label} <span className="dd-chip-count">{filter.count}</span>
                            </a>)}
                        </nav>
                    </div>
                    <TableBox busy={false} empty={rows.length === 0 && <Empty icon="a/search" message={text('health_none_with_status')} text={text} />}>
                        <table className="table" data-region="health-table">
                            <caption className="visually-hidden">{text('health_checks')}</caption>
                            <thead>
                                <tr>
                                    <th scope="col">{text('core_time')}</th>
                                    <th scope="col">{text('core_status')}</th>
                                    <th scope="col">{text('core_message')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => <tr key={index} data-status={row.status}>
                                    <td>
                                        <span className="d-flex flex-column">
                                            {row.time}
                                            <small className="text-muted">{row.ago}</small>
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-soft badge-dot rounded-pill text-bg-${row.tone}`}>{row.statusLabel}</span>
                                    </td>
                                    <td><HealthFindings check={row} /></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </TableBox>
                    <Pager
                        page={paging.page}
                        perpage={paging.perpage}
                        total={paging.total}
                        text={text}
                        onChange={({page, perpage}) => {
                            // The checks are paged by the server: the page and its size go in the address.
                            const target = new URL(perpage === undefined ? pageUrl(urls.page, page ?? 0) : urls.perpage, window.location.href);
                            if (perpage !== undefined) {
                                target.searchParams.set('perpage', String(perpage));
                            }
                            window.location.assign(target.toString());
                        }}
                    />
                </div>

            </>}
        </div>
    </ErrorBoundary>;
};

export default HealthChecks;
