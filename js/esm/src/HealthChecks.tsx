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
import {useMemo, type ReactNode} from 'react';
import BackLink from './components/common/BackLink';
import EmptyState from './components/common/EmptyState';
import ErrorBoundary from './components/common/ErrorBoundary';
import Icon from './components/common/Icon';
import PageHeader from './components/common/PageHeader';
import {createText} from './engine/text';
import {pageUrl, pageWindow} from './lib/paging';
import {statusLook} from './lib/status';
import type {HealthChecksProps} from './types';

const HealthChecks = (props: HealthChecksProps) => {
    const {rows, filters, paging, urls} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const bar = pageWindow(paging.page, paging.perpage, paging.total);
    const link = (page: number, label: string, content: ReactNode) => <li className="page-item">
        <a className="page-link" href={pageUrl(urls.page, page)} title={label} aria-label={label}>{content}</a>
    </li>;

    return <ErrorBoundary strings={props.strings}>
        <div className="servicemanager-health-page" data-region="servicemanager-health">
            <div className="mb-3"><BackLink href={urls.back} label={text('back')} /></div>
            <PageHeader title={text('health_checks')} subtitle={props.schemaName} />

            {!props.hasAny && <EmptyState icon="heart-pulse" title={text('health_checks')} text={text('health_none')} />}

            {props.hasAny && <>
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 sm-actions-row">
                    <nav className="d-flex flex-wrap align-items-center sm-health-filters" aria-label={text('core_status')}
                        data-region="health-filters">
                        {filters.map((filter) => <a
                            key={filter.status || 'all'}
                            href={filter.url}
                            className={`btn sm-pill compact tone-${filter.tone}${filter.active ? ' active' : ''}`}
                            aria-current={filter.active ? 'true' : undefined}
                        >{filter.label}<span className="sm-count-badge">{filter.count}</span></a>)}
                    </nav>
                    <label className="d-flex align-items-center mb-0 sm-perpage">
                        <span className="text-nowrap">{text('filter_per_page')}</span>
                        <select
                            className="form-select form-select-sm"
                            value={paging.perpage}
                            onChange={(event) => {
                                window.location.href = urls.perpage + '&perpage=' + event.target.value;
                            }}
                        >
                            {paging.options.map((size) => <option key={size} value={size}>{size}</option>)}
                        </select>
                    </label>
                </div>

                <div className="card sm-panel mb-3">
                    {rows.length > 0 && <div className="table-responsive">
                        <table className="table table-sm align-middle mb-0 sm-health-table" data-region="health-table">
                            <thead>
                                <tr>
                                    <th className="sm-time-column">{text('core_time')}</th>
                                    <th className="sm-status-column">{text('core_status')}</th>
                                    <th>{text('core_message')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => <tr key={index} data-status={row.status}>
                                    <td className="sm-time-column">{row.time}</td>
                                    <td>
                                        <span className={`sm-badge tone-${statusLook(row.status).tone}`}>{row.statusLabel}</span>
                                    </td>
                                    <td>
                                        <ul className="sm-health-messages">
                                            {row.messages.map((message, at) => <li key={at}>{message}</li>)}
                                        </ul>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>}
                    {rows.length === 0 && <div className="card-body text-body-secondary">{text('health_none_with_status')}</div>}
                </div>

                <div className="sm-pager">
                    <span className="text-body-secondary" data-region="health-showing">{props.showing}</span>
                    {bar.pages > 1 && <nav aria-label={text('pagination_aria_label')}>
                        <ul className="pagination mb-0">
                            {bar.first && link(0, text('pagination_first'), <Icon name="angles-left" />)}
                            {bar.previous && link(paging.page - 1, text('pagination_previous'), <Icon name="angle-left" />)}
                            {bar.startDots && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            {bar.shown.map((index) => <li
                                key={index}
                                className={`page-item${index === paging.page ? ' active' : ''}`}
                            >
                                <a className="page-link" href={pageUrl(urls.page, index)}
                                    aria-current={index === paging.page ? 'page' : undefined}>{index + 1}</a>
                            </li>)}
                            {bar.endDots && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            {bar.last && link(bar.pages - 1, text('pagination_last'), bar.pages)}
                            {bar.next && link(paging.page + 1, text('pagination_next'), <Icon name="angle-right" />)}
                        </ul>
                    </nav>}
                </div>
            </>}
        </div>
    </ErrorBoundary>;
};

export default HealthChecks;
