// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Two versions of a schema: what changed in terms of the schema, and the lines of both with the changes marked.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/Compare
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo, useState} from 'react';
import BackLink from './components/common/BackLink';
import ErrorBoundary from './components/common/ErrorBoundary';
import Icon from './components/common/Icon';
import PageHeader from './components/common/PageHeader';
import ChangeSummary from './components/compare/ChangeSummary';
import DiffTable, {type DiffView} from './components/compare/DiffTable';
import {createText} from './engine/text';
import {changeStarts} from './lib/diff';
import type {CompareProps} from './types';

const Compare = (props: CompareProps) => {
    const {first, second, counts, changes, rows} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const [view, setView] = useState<DiffView>('split');
    const [onlyChanges, setOnlyChanges] = useState(true);
    const [expanded, setExpanded] = useState<ReadonlySet<number>>(new Set());
    const [position, setPosition] = useState(-1);
    const starts = useMemo(() => changeStarts(rows), [rows]);
    const identical = counts.added + counts.removed + counts.changed === 0;

    const next = () => {
        const target = (position + 1) % starts.length;
        setPosition(target);
        document.getElementById(`diff-row-${starts[target]}`)?.scrollIntoView({block: 'center', behavior: 'smooth'});
    };

    return <ErrorBoundary strings={props.strings}>
        <div className="servicemanager-compare-page">
            <div className="mb-3"><BackLink href={props.backUrl} label={text('back')} /></div>

            <PageHeader
                title={props.title}
                subtitle={<>
                    <a href={first.viewUrl}>{text('version')} {first.version}</a> <Icon name="arrow-right" />{' '}
                    <a href={second.viewUrl}>{text('version')} {second.version}</a>
                    {' · '}{second.user}, {second.date}
                </>}
            />

            <div className="d-flex flex-wrap align-items-center mb-3 sm-badges-row" data-region="diff-counts">
                {identical
                    ? <span className="badge text-bg-secondary">{text('compare_no_changes')}</span>
                    : <>
                        {counts.added > 0 && <span className="badge text-bg-success">{text('compare_added', counts.added)}</span>}
                        {counts.removed > 0 && <span className="badge text-bg-danger">{text('compare_removed', counts.removed)}</span>}
                        {counts.changed > 0 && <span className="badge text-bg-warning">{text('compare_changed', counts.changed)}</span>}
                    </>}
            </div>

            {changes.length > 0 && <ChangeSummary changes={changes} text={text} />}

            <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 sm-actions-row" data-region="diff-tools">
                <div className="btn-group" role="group" aria-label={text('compare_view')}>
                    <button type="button" className={`btn btn-outline-secondary${view === 'split' ? ' active' : ''}`} aria-pressed={view === 'split'} onClick={() => setView('split')}>
                        <Icon name="table-columns" gap />{text('compare_view_split')}
                    </button>
                    <button type="button" className={`btn btn-outline-secondary${view === 'unified' ? ' active' : ''}`} aria-pressed={view === 'unified'} onClick={() => setView('unified')}>
                        <Icon name="bars" gap />{text('compare_view_unified')}
                    </button>
                </div>
                <div className="d-flex align-items-center sm-actions-row">
                    <div className="form-check form-switch mb-0">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="only-changes"
                            checked={onlyChanges}
                            onChange={(event) => setOnlyChanges(event.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="only-changes">{text('compare_only_changes')}</label>
                    </div>
                    {starts.length > 0 && <button type="button" className="btn btn-outline-primary" onClick={next}>
                        <Icon name="arrow-down" gap />{text('compare_next_change')}
                    </button>}
                </div>
            </div>

            <DiffTable
                first={first}
                second={second}
                rows={rows}
                view={view}
                onlyChanges={onlyChanges}
                expanded={expanded}
                onExpand={(from) => setExpanded(new Set(expanded).add(from))}
                text={text}
            />
        </div>
    </ErrorBoundary>;
};

export default Compare;
