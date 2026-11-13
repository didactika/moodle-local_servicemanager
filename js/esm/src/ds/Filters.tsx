/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The filters of a list, as the design system draws them: each one is a menu with the shape of a select, in one row beside the
 * search. The status lists every status with its rows; the date offers the usual periods and two days of choice. A menu that narrows
 * the list is tinted and says only what it is narrowed to; when the menus do not fit beside the search they are grouped in one menu,
 * Filters, with its funnel.
 *
 * @module     local_servicemanager/ds/Filters
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useId, useLayoutEffect, useRef, useState} from 'react';
import type {ReactNode} from 'react';
import {Icon, Menu} from './ui';
import {datePresets} from './dates';
import type {Text} from '../types';

/** A status that a list can be narrowed to, with its rows (-1 while they are not known). */
export interface StatusCount {
    key: string;
    label: string;
    count: number;
}

/**
 * The statuses, with the students of each: several can be chosen.
 *
 * @param props The statuses, their counts, the ones chosen and what to do when they change.
 * @returns The menu.
 */
export function StatusMenu({label, statuses, chosen, text, onChange}: {
    label: string;
    statuses: StatusCount[];
    chosen: string[];
    text: Text;
    onChange: (chosen: string[]) => void;
}) {
    const id = useId();
    const options = statuses;
    let button = label;
    if (chosen.length === 1) {
        button = statuses.find((status) => status.key === chosen[0])?.label ?? chosen[0];
    } else if (chosen.length > 1) {
        button = `${label}: ${chosen.length}`;
    }

    return <Menu button={button} label={label} name="status" active={chosen.length > 0} text={text} onClear={() => onChange([])}>
        {() => options.map((option) => <label key={option.key} className="dropdown-item" htmlFor={`${id}-${option.key}`}>
            <input
                type="checkbox"
                className="form-check-input"
                id={`${id}-${option.key}`}
                checked={chosen.includes(option.key)}
                onChange={() => onChange(chosen.includes(option.key)
                    ? chosen.filter((key) => key !== option.key)
                    : [...chosen, option.key])}
            />
            <span>{option.label}</span>
            {option.count >= 0 && <span className="dd-chip-count">{option.count}</span>}
        </label>)}
    </Menu>;
}

/**
 * Two days that bound a period, never the wrong way round: when the day just chosen passes the other one, the other one moves to
 * it, so the first day is never after the last one, however the day was written.
 *
 * @param from The first day, or empty.
 * @param to The last day, or empty.
 * @param changed Which of the two was just chosen.
 * @returns The two days, in order.
 */
export const orderedDays = (from: string, to: string, changed: 'from' | 'to'): [string, string] => {
    if (from === '' || to === '' || from <= to) {
        return [from, to];
    }
    return changed === 'from' ? [from, from] : [to, to];
};

/**
 * A date: a period among the usual ones, or the two days that bound it.
 *
 * @param props The period chosen and what to do when it changes.
 * @returns The menu.
 */
export function DateMenu({label, from, to, text, onChange}: {
    label: string;
    from: string;
    to: string;
    text: Text;
    onChange: (from: string, to: string) => void;
}) {
    const fromId = useId();
    const toId = useId();
    const presets = datePresets(new Date());
    const preset = presets.find((item) => item.from === from && item.to === to);
    let button = label;
    if (preset) {
        button = text(`filter_date_${preset.key}`);
    } else if (from !== '' && to !== '') {
        button = text('filter_date_range', {from, to});
    } else if (from !== '') {
        button = text('filter_date_since', from);
    } else if (to !== '') {
        button = text('filter_date_until', to);
    }

    return <Menu button={button} label={label} name="date" active={from !== '' || to !== ''} text={text} onClear={() => onChange('', '')}>
        {(close) => <>
            {presets.map((item) => <button
                key={item.key}
                type="button"
                role="option"
                className="dropdown-item"
                aria-selected={preset?.key === item.key}
                onClick={() => {
                    close();
                    onChange(item.from, item.to);
                }}
            >{text(`filter_date_${item.key}`)}</button>)}
            <hr />
            <div className="dd-menu-form">
                <div className="dd-menu-dates">
                    <div>
                        <label className="form-label small mb-1" htmlFor={fromId}>{text('filter_date_from')}</label>
                        <input id={fromId} type="date" className="form-control form-control-sm" value={from} max={to || undefined}
                            onChange={(event) => onChange(...orderedDays(event.target.value, to, 'from'))} />
                    </div>
                    <div>
                        <label className="form-label small mb-1" htmlFor={toId}>{text('filter_date_to')}</label>
                        <input id={toId} type="date" className="form-control form-control-sm" value={to} min={from || undefined}
                            onChange={(event) => onChange(...orderedDays(from, event.target.value, 'to'))} />
                    </div>
                </div>
            </div>
        </>}
    </Menu>;
}

/** The width the search keeps beside the filters before they are grouped, in pixels (10rem). */
const SEARCH_ROOM = 160;

/**
 * The filters of the toolbar, in one row beside the search. When they do not fit, on a narrow screen or when the values chosen are
 * long, they are grouped in one menu, Filters, which says how many narrow the report and holds them; they come back to the row when
 * there is room again.
 *
 * @param props How many filters narrow the report, the texts and the filters.
 * @returns The filters, in the row or grouped.
 */
export function FilterGroup({count, text, children}: {count: number; text: Text; children: ReactNode}) {
    const [grouped, setGrouped] = useState(false);
    const box = useRef<HTMLDivElement>(null);
    const needed = useRef(0);

    useLayoutEffect(() => {
        const row = box.current?.parentElement;
        if (!box.current || !row) {
            return undefined;
        }
        const measure = (): void => {
            const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
            const room = row.clientWidth - SEARCH_ROOM - gap;
            if (!grouped) {
                const menus = Array.from(box.current?.children ?? []) as HTMLElement[];
                const width = menus.reduce((sum, menu) => sum + menu.offsetWidth, 0) + gap * Math.max(0, menus.length - 1);
                if (width > room) {
                    needed.current = width;
                    setGrouped(true);
                }
            } else if (room >= needed.current) {
                setGrouped(false);
            }
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(row);
        return () => observer.disconnect();
    });

    return <div ref={box} data-region="filter-menus">
        {grouped ? <Menu
            button={<><Icon name="i/filter" text={text} /> {count > 0 ? `${text('filters')} (${count})` : text('filters')}</>}
            label={text('filters')}
            name="filters"
            active={count > 0}
            place="end"
        >
            {() => <div data-region="filter-panel">{children}</div>}
        </Menu> : children}
    </div>;
}
