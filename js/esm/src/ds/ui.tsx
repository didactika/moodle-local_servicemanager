/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The pieces the screens of the plugin are made of, drawn with the classes of Bootstrap, Moodle and the Didactika design system, as
 * the plugin Delegate account draws its lists: the icon, the search, the menu with the shape of a select, the sortable header, the
 * pager, the explanation that opens on a button and what a list says when it has nothing.
 *
 * @module     local_servicemanager/ds/ui
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useEffect, useId, useLayoutEffect, useRef, useState} from 'react';
import type {ReactNode, RefObject} from 'react';
import {createPortal} from 'react-dom';
import {fitPageSizes, pageRange} from '../lib/paging';
import type {Text} from '../types';

/**
 * A Moodle icon, drawn by the server with the icon map of the theme.
 *
 * @param props The icon id and the texts of the page, where the server put the icon.
 * @returns The icon.
 */
export function Icon({name, text}: {name: string; text: Text}) {
    return <span className="d-inline-flex" aria-hidden="true" dangerouslySetInnerHTML={{__html: text(`pix:${name}`)}} />;
}

/**
 * The search of a list: the magnifier inside the field.
 *
 * @param props The text, what to do when it changes and the labels.
 * @returns The search.
 */
export function SearchBox({value, onChange, label, text}: {value: string; onChange: (value: string) => void; label: string; text: Text}) {
    const id = useId();
    return <div className="dd-searchbox" role="search">
        <Icon name="a/search" text={text} />
        <label className="visually-hidden" htmlFor={id}>{label}</label>
        <input
            className="form-control"
            type="search"
            id={id}
            value={value}
            placeholder={label}
            autoComplete="off"
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
        />
    </div>;
}

/**
 * A menu with the shape of a select: a button that says what is chosen and, under it, whatever the menu holds.
 *
 * A menu that filters the list does not offer its base state as one more choice: the button says it while nothing is chosen, and
 * once something is, the arrow of the button becomes a cross (onClear) that takes the filter back to it.
 *
 * @param props What the button says, whether something is chosen, how to clear it, how the menu lines up and what it holds.
 * @returns The button and, while it is open, the menu.
 */
export function Menu({button, label, name, active = false, small = false, place = '', icon = false, onClear, text, children}: {
    button: ReactNode;
    /** The menu opens from a round icon button, as the menu of a row, instead of a select. */
    icon?: boolean;
    name?: string;
    label: string;
    active?: boolean;
    small?: boolean;
    place?: '' | 'end' | 'up';
    onClear?: () => void;
    text?: Text;
    children: (close: () => void) => ReactNode;
}) {
    const clearable = active && onClear !== undefined;
    const clear = text ? `${text('filter_clear')}: ${label}` : label;
    const [open, setOpen] = useState(false);
    const root = useRef<HTMLSpanElement>(null);
    const toggle = useRef<HTMLButtonElement>(null);
    const id = useId();

    useEffect(() => {
        if (!open) {
            return undefined;
        }
        const outside = (event: PointerEvent): void => {
            if (!root.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const keys = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                setOpen(false);
                toggle.current?.focus();
            }
        };
        document.addEventListener('pointerdown', outside, true);
        document.addEventListener('keydown', keys, true);
        return () => {
            document.removeEventListener('pointerdown', outside, true);
            document.removeEventListener('keydown', keys, true);
        };
    }, [open]);

    return <span className={`dd-menu${place ? ` dd-menu-${place}` : ''}${onClear ? ' dd-select-filter' : ''}`} data-menu={name} ref={root}>
        <button
            ref={toggle}
            type="button"
            className={icon ? 'btn btn-link btn-icon btn-sm'
                : `form-select dd-select${small ? ' form-select-sm' : ''}${active ? ' border-primary' : ''}${clearable ? ' dd-select-set' : ''}`}
            title={icon ? label : undefined}
            aria-label={label}
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls={open ? id : undefined}
            onClick={() => setOpen(!open)}
        >{button}</button>
        {clearable && <button
            type="button"
            className="dd-select-clear"
            title={clear}
            aria-label={clear}
            onClick={() => {
                setOpen(false);
                onClear();
                toggle.current?.focus();
            }}
        >{text && <Icon name="e/cancel" text={text} />}</button>}
        {open && <div id={id} className="dd-select-menu" role="group" aria-label={label}>
            {children(() => {
                setOpen(false);
                toggle.current?.focus();
            })}
        </div>}
    </span>;
}

/**
 * A menu that chooses one option among a few. When it filters a list, its base option (base) is not offered: the button says it
 * while it is chosen, and the cross of the button goes back to it.
 *
 * @param props The options, the one chosen, the base one and what to do when another is.
 * @returns The menu.
 */
export function SelectMenu({options: all, value, label, small = false, place = '', base, text, onChange}: {
    options: {value: string; label: string}[];
    value: string;
    label: string;
    small?: boolean;
    place?: '' | 'end' | 'up';
    base?: string;
    text?: Text;
    onChange: (value: string) => void;
}) {
    const chosen = all.find((option) => option.value === value);
    const options = base === undefined ? all : all.filter((option) => option.value !== base);
    const set = base !== undefined && value !== base;
    return <Menu
        button={chosen?.label ?? label}
        label={label}
        small={small}
        place={place}
        active={set}
        text={text}
        onClear={base === undefined ? undefined : () => onChange(base)}
    >
        {(close) => options.map((option) => <button
            key={option.value}
            type="button"
            role="option"
            className="dropdown-item"
            aria-selected={option.value === value}
            onClick={() => {
                close();
                if (option.value !== value) {
                    onChange(option.value);
                }
            }}
        >{option.label}</button>)}
    </Menu>;
}

/**
 * The header of a column that can be sorted.
 *
 * @param props The label, the sort now and what to do when it is pressed.
 * @returns The header.
 */
export function SortHeader({label, help, active, direction, onSort, col}: {
    label: string;
    help: string;
    active: boolean;
    direction: 'asc' | 'desc';
    onSort: () => void;
    col?: string;
}) {
    let ariaSort: 'ascending' | 'descending' | undefined;
    if (active) {
        ariaSort = direction === 'asc' ? 'ascending' : 'descending';
    }
    return <th scope="col" aria-sort={ariaSort} data-col={col}>
        <button type="button" className="table-sort" title={help} onClick={onSort}>{label}</button>
    </th>;
}

/**
 * The foot of a list: the size of the page, the rows shown and the arrows.
 *
 * @param props The page, how many per page, the total and what to do.
 * @returns The foot.
 */
export function Pager({page, perpage, total, disabled, text, onChange}: {
    page: number;
    perpage: number;
    total: number;
    disabled?: boolean;
    text: Text;
    onChange: (changes: {page?: number; perpage?: number}) => void;
}) {
    if (total === 0) {
        // An empty list has no pages: its empty state says so.
        return null;
    }
    const {from, to} = pageRange(page, perpage, total);
    // Only the sizes smaller than the list are offered, besides all of it, and the select always shows one of them.
    const {sizes, shown} = fitPageSizes(perpage, total);
    return <div className="table-foot">
        <div className="dd-pager">
            <div className="dd-pager-size">
                <span>{text('pagination_per_page')}</span>
                <SelectMenu
                    small
                    place="up"
                    label={text('pagination_per_page')}
                    value={String(shown)}
                    options={sizes.map((size) => ({value: String(size), label: size ? String(size) : text('pagination_all')}))}
                    onChange={(size) => onChange({perpage: Number(size), page: 0})}
                />
            </div>
            <div className="dd-pager-end">
                <span className="dd-pager-range" role="status">{text('pagination_range', {from, to, total})}</span>
                <div className="dd-pager-arrows">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm btn-icon"
                        disabled={disabled || page === 0}
                        title={text('pagination_previous')}
                        aria-label={text('pagination_previous')}
                        onClick={() => onChange({page: page - 1})}
                    >
                        <Icon name="i/previous" text={text} />
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm btn-icon"
                        disabled={disabled || to >= total}
                        title={text('pagination_next')}
                        aria-label={text('pagination_next')}
                        onClick={() => onChange({page: page + 1})}
                    >
                        <Icon name="i/next" text={text} />
                    </button>
                </div>
            </div>
        </div>
    </div>;
}

/** The least height of the box of a table, in pixels (18rem), however short the window is. */
const TABLE_MIN = 288;

/** The room left under the box of a table, in pixels, for the margin of the page. */
const TABLE_ROOM = 24;

/**
 * The height of the box of a table: what is left of the window from where the box starts, less what comes under it in its card
 * (the pager), so on a computer the filters, the table and the pager fit the window without scrolling the page. It is one height
 * whatever the table holds, measured again when the window changes size or what is above it moves it.
 *
 * @param box The box of the table.
 */
export function useFitHeight(box: RefObject<HTMLElement | null>): void {
    useLayoutEffect(() => {
        const fit = (): void => {
            const element = box.current;
            if (!element) {
                return;
            }
            const rect = element.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            // What comes under the box inside its card, such as the pager, wherever it sits.
            const card = element.closest('.card')?.getBoundingClientRect();
            const below = card ? Math.max(0, card.bottom - rect.bottom) : 0;
            const height = Math.max(TABLE_MIN, window.innerHeight - top - below - TABLE_ROOM);
            // On the card, so the empty state that may take the place of the table has the same height.
            ((element.closest('.card') as HTMLElement | null) ?? element).style.setProperty('--dd-table-h', height + 'px');
        };
        fit();
        // Measured again when the window changes size, or when what is above the box finishes drawing and moves it.
        const observer = new ResizeObserver(() => fit());
        observer.observe(document.body);
        const card = box.current?.closest('.card');
        if (card) {
            observer.observe(card);
        }
        window.addEventListener('resize', fit);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', fit);
        };
    }, []);
}

/**
 * The box a table lives in: it keeps one height whatever the table holds, the room the window leaves it, and scrolls inside it; with
 * nothing to show it holds the empty state instead of the table.
 *
 * @param props Whether it is loading, the empty state when there is nothing to show, and the table.
 * @returns The box.
 */
export function TableBox({busy, empty, children}: {busy: boolean; empty: ReactNode; children: ReactNode}) {
    const box = useRef<HTMLDivElement>(null);
    useFitHeight(box);
    return <div ref={box} className="table-responsive" data-region="tablewrap" aria-busy={busy}>
        {empty || children}
    </div>;
}

/**
 * What a list says when it has nothing to show or could not load: its icon, the message and, when something can be done, its
 * button.
 *
 * @param props The icon, the message and the action.
 * @returns The state.
 */
export function Empty({icon, message, action, onAction, text}: {
    icon: string;
    message: string;
    action?: string;
    onAction?: () => void;
    text: Text;
}) {
    return <div className="dd-empty" data-region="empty" role="status">
        <span className="dd-tile dd-tile-lg"><Icon name={icon} text={text} /></span>
        <p className="dd-empty-text">{message}</p>
        {action && onAction && <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onAction}>{action}</button>}
    </div>;
}

/**
 * A dialog as Moodle and Bootstrap draw it: the focus enters on its close button and goes back where it was when it closes, and
 * Escape or a click outside it closes it.
 *
 * @param props The title, the body, the buttons of its foot (a Close button when none), what to do on closing and the texts.
 * @returns The dialog.
 */
export function Dialog({title, children, footer, onClose, text}: {
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    onClose: () => void;
    text: Text;
}) {
    const root = useRef<HTMLDivElement>(null);
    const titleId = useId();
    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        document.body.classList.add('modal-open');
        root.current?.querySelector<HTMLElement>('.modal-footer .btn')?.focus();
        return () => {
            document.body.classList.remove('modal-open');
            previous?.focus();
        };
    }, []);
    return createPortal(<>
        <div
            ref={root}
            className="modal show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onKeyDown={(event) => event.key === 'Escape' && onClose()}
            onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={titleId}>{title}</h5>
                        <button type="button" className="btn-close" aria-label={text('core_closebuttontitle')} onClick={onClose} />
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        {footer ?? <button type="button" className="btn btn-secondary" onClick={onClose}>{text('core_closebuttontitle')}</button>}
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop show" />
    </>, document.body);
}

/**
 * Keeps the columns of a table still: once the table has rows, the width the browser gives each column is measured and kept, so a
 * filter, a sort or another page never moves them. They are measured again only when the box of the table changes width.
 *
 * @param table The table.
 * @param ready Whether the table has its first rows.
 */
export function useStableColumns(table: RefObject<HTMLTableElement | null>, ready: boolean): void {
    useLayoutEffect(() => {
        const element = table.current;
        const box = element?.parentElement;
        if (!element || !box || !ready) {
            return undefined;
        }
        const freeze = (): void => {
            const heads = Array.from(element.tHead?.rows[0]?.cells ?? []);
            element.style.tableLayout = '';
            heads.forEach((head) => {
                head.style.width = '';
            });
            const widths = heads.map((head) => head.getBoundingClientRect().width);
            heads.forEach((head, index) => {
                head.style.width = `${widths[index]}px`;
            });
            element.style.tableLayout = 'fixed';
        };
        freeze();
        let width = box.clientWidth;
        const observer = new ResizeObserver(() => {
            if (Math.abs(box.clientWidth - width) > 1) {
                width = box.clientWidth;
                freeze();
            }
        });
        observer.observe(box);
        return () => observer.disconnect();
    }, [ready]);
}

/**
 * The floating bar of a selection: how many rows are chosen, what to do with them and a button that clears the choice.
 *
 * @param props The count, the label of the region, the actions and the texts.
 * @returns The bar, or nothing when nothing is chosen.
 */
export function FloatBar({count, label, onClear, children, text}: {
    count: number;
    label: string;
    onClear: () => void;
    children: ReactNode;
    text: Text;
}) {
    if (count === 0) {
        return null;
    }
    return <div className="dd-floatbar" role="region" aria-label={label} data-region="bulk-actions">
        <span className="dd-floatbar-count" role="status">{text('selected_count', count)}</span>
        <div className="dd-floatbar-actions">{children}</div>
        <button type="button" className="dd-floatbar-clear" title={text('clear_selection')} aria-label={text('clear_selection')}
            onClick={onClear} />
    </div>;
}
