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
import Icon from './components/common/Icon';
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
        <div className="servicemanager-health-page" data-region="servicemanager-health">
            <div className="mb-3"><BackLink href={urls.back} label={text('back')} /></div>
            <PageHeader title={text('health_checks')} subtitle={props.schemaName} />

            {!props.hasAny && <EmptyState icon="heart-pulse" title={text('health_checks')} text={text('health_none')} />}

            {props.hasAny && <>
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 sm-actions-row">
                    <nav className="d-flex align-items-center sm-health-filters" aria-label={text('core_status')}
                        data-region="health-filters">
                        {filters.map((filter) => <a
                            key={filter.status || 'all'}
                            href={filter.url}
                            className={`btn sm-pill compact tone-${filter.tone}${filter.active ? ' active' : ''}`}
                            aria-current={filter.active ? 'true' : undefined}
                        >{filter.label}<span className="sm-count-badge">{filter.count}</span></a>)}
                    </nav>
                </div>

                <div className="card sm-list">
                    {rows.length > 0 && <div className="table-responsive" data-region="tablewrap">
                        <table className="table mb-0 sm-health-table" data-region="health-table">
                            <thead>
                                <tr>
                                    <th className="sm-time-column">{text('core_time')}</th>
                                    <th className="sm-status-column">{text('core_status')}</th>
                                    <th>{text('core_message')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => <tr
                                    key={index}
                                    className={`sm-health-row tone-${row.tone}`}
                                    data-status={row.status}
                                >
                                    <td className="sm-time-column">
                                        <span className="sm-health-time">{row.time}</span>
                                        <span className="sm-health-ago">{row.ago}</span>
                                    </td>
                                    <td className="sm-status-column">
                                        <span className={`sm-badge tone-${row.tone}`}>
                                            <Icon name={row.icon} gap />{row.statusLabel}
                                        </span>
                                    </td>
                                    <td><HealthFindings check={row} /></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>}
                    {rows.length === 0 && <div data-region="tablewrap">
                        <EmptyState bare icon="filter-circle-xmark" title={text('empty_filtered_title')} text={text('health_none_with_status')} />
                    </div>}
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
