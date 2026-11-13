// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * The dashboard: searches, filters (status and date) and pages the schemas without asking the server again, keeps the choice of
 * schemas and sends the actions on them; turns the web services and their protocols on or off.
 *
 * What the person asked is kept in the address, so a refresh or a shared link shows the same list.
 *
 * @module     local_servicemanager/dashboard
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import {confirm} from 'local_servicemanager/dialogue';
import {init as initMenus, close as closeMenus} from 'local_servicemanager/menu';
import {init as initFilters, orderedDays, presets} from 'local_servicemanager/filters';
import {init as fitTables} from 'local_servicemanager/fit_tables';
import {addressKeeper, drawPager, hasWords, inDates, loadPagerStrings, postForm, readState, PAGE_SIZES, pageOf} from
    'local_servicemanager/listing';

/** The statuses, in the order of the menu. */
const STATUSES = ['healthy', 'warning', 'critical'];

/**
 * Keeps the columns of a table still: the width the browser gives each column is measured and kept, so a filter never moves them.
 * They are measured again only when the box of the table changes width.
 *
 * @param {HTMLTableElement} table The table.
 */
const keepColumns = (table) => {
    const box = table?.parentElement;
    if (!table || !box) {
        return;
    }
    const freeze = () => {
        const heads = Array.from(table.tHead?.rows[0]?.cells ?? []);
        table.style.tableLayout = '';
        heads.forEach((head) => {
            head.style.width = '';
        });
        const widths = heads.map((head) => head.getBoundingClientRect().width);
        heads.forEach((head, index) => {
            head.style.width = `${widths[index]}px`;
        });
        table.style.tableLayout = 'fixed';
    };
    freeze();
    let width = box.clientWidth;
    new ResizeObserver(() => {
        if (Math.abs(box.clientWidth - width) > 1) {
            width = box.clientWidth;
            freeze();
        }
    }).observe(box);
};

/**
 * The switches of the protocols and the button that turns the web services off, which asks first.
 *
 * @param {HTMLElement} root The dashboard.
 * @param {Object} strings The texts of the confirmation.
 */
const initWebServices = (root, strings) => {
    root.querySelectorAll('[data-action="protocol"]').forEach((box) => {
        box.addEventListener('change', () => box.form.submit());
    });
    const off = root.querySelector('[data-action="ws-off"]');
    if (off) {
        off.addEventListener('click', (event) => {
            event.preventDefault();
            confirm(strings.wsOff, strings.wsOffBody, strings.wsOff, () => off.form.submit()).catch(() => null);
        });
    }
};

/**
 * What the menu of the date says: the period chosen, the two days, or one of them.
 *
 * @param {HTMLElement} menu The menu of the date.
 * @param {Object} state What was asked.
 * @param {Object} strings The texts of a range.
 * @returns {string} The label.
 */
const dateLabel = (menu, state, strings) => {
    const found = Object.entries(presets()).find(([, days]) => days[0] === state.from && days[1] === state.to);
    if (found) {
        return menu.querySelector(`[data-preset="${found[0]}"]`).textContent.trim();
    }
    if (state.from && state.to) {
        return strings.range.replace('{$a->from}', state.from).replace('{$a->to}', state.to);
    }
    if (state.from) {
        return strings.since.replace('{$a}', state.from);
    }
    if (state.to) {
        return strings.until.replace('{$a}', state.to);
    }
    return '';
};

export const init = () => {
    // The box of the table takes the height the window leaves it.
    fitTables();
    const root = document.querySelector('[data-region="servicemanager-dashboard"]');
    if (!root) {
        return;
    }
    initMenus(root);
    const table = root.querySelector('[data-region="schema-table"]');
    if (!table) {
        return;
    }

    const toolbar = root.querySelector('[data-region="filters"]');
    const filters = initFilters(toolbar);
    const rows = [...root.querySelectorAll('[data-region="schema-row"]')];
    const search = root.querySelector('#lsm-search');
    const statusMenu = filters.menu('status');
    const dateMenu = filters.menu('date');
    const from = dateMenu.querySelector('[data-date="from"]');
    const to = dateMenu.querySelector('[data-date="to"]');
    const empty = root.querySelector('[data-region="empty-state"]');
    const pagination = root.querySelector('[data-region="pagination"]');
    const bar = root.querySelector('[data-region="bulk-actions"]');
    const selectAll = root.querySelector('#lsm-select-all');
    const chosen = new Set();
    const state = readState(PAGE_SIZES);
    state.status = (state.status || '').split(',').filter((key) => STATUSES.includes(key)).join(',');
    [state.from, state.to] = [state.from, state.to].sort((a, b) => (a && b ? a.localeCompare(b) : 0));
    const keepAddress = addressKeeper(PAGE_SIZES[0]);
    let strings = {range: '', since: '', until: '', selected: '', deleteTitle: '', deleteBody: '', wsOff: '', wsOffBody: ''};
    let pager = {};

    const statuses = () => (state.status ? state.status.split(',') : []);

    const drawSelection = () => {
        if (!bar) {
            return;
        }
        const picked = rows.filter((row) => chosen.has(Number(row.dataset.id)));
        bar.hidden = picked.length === 0;
        bar.querySelector('[data-region="selected-count"]').textContent = strings.selected.replace('{$a}', picked.length);
        bar.querySelector('[data-bulk="enable"]').hidden = !picked.some((row) => row.dataset.enabled === '0');
        bar.querySelector('[data-bulk="disable"]').hidden = !picked.some((row) => row.dataset.enabled === '1');
        root.style.paddingBottom = picked.length ? '5.5rem' : '';
    };

    const drawFilters = () => {
        const chosenStatuses = statuses();
        statusMenu.querySelectorAll('input[type="checkbox"]').forEach((box) => {
            box.checked = chosenStatuses.includes(box.value);
        });
        let label = '';
        if (chosenStatuses.length === 1) {
            label = statusMenu.querySelector(`input[value="${chosenStatuses[0]}"]`).dataset.label;
        } else if (chosenStatuses.length > 1) {
            label = `${statusMenu.querySelector('[data-region="menu-label"]').dataset.label}: ${chosenStatuses.length}`;
        }
        filters.paint('status', label || statusMenu.querySelector('[data-region="menu-label"]').dataset.label, label !== '');
        const dates = dateLabel(dateMenu, state, strings);
        filters.paint('date', dates || dateMenu.querySelector('[data-region="menu-label"]').dataset.label, dates !== '');
        from.value = state.from;
        to.value = state.to;
        from.max = state.to;
        to.min = state.from;
        const applied = (chosenStatuses.length ? 1 : 0) + (state.from || state.to ? 1 : 0);
        toolbar.dataset.applied = String(applied);
        filters.fit(applied);
        root.querySelector('.table-toolbar-end [data-action="reset-all"]').disabled = applied === 0 && state.query === '';
    };

    const render = () => {
        const counts = {healthy: 0, warning: 0, critical: 0};
        const found = [];
        const chosenStatuses = statuses();
        rows.forEach((row) => {
            if (inDates(Number(row.dataset.modified), state) && hasWords(row.dataset.text.toLowerCase(), state.query)) {
                counts[row.dataset.status] = (counts[row.dataset.status] || 0) + 1;
                if (!chosenStatuses.length || chosenStatuses.includes(row.dataset.status)) {
                    found.push(row);
                }
            }
        });

        const range = pageOf(state.page, state.perpage, found.length);
        state.page = range.page;
        const shown = new Set(found.slice(range.from - 1, range.to));
        rows.forEach((row) => {
            row.hidden = !shown.has(row);
        });
        STATUSES.forEach((status) => {
            statusMenu.querySelector(`[data-status-count="${status}"]`).textContent = String(counts[status]);
        });
        table.hidden = found.length === 0;
        empty.hidden = found.length !== 0;
        drawPager(pagination, state.page, state.perpage, found.length, pager);
        if (selectAll) {
            const visible = rows.filter((row) => !row.hidden);
            selectAll.checked = visible.length > 0 && visible.every((row) => chosen.has(Number(row.dataset.id)));
        }
        rows.forEach((row) => {
            const box = row.querySelector('[data-region="schema-check"]');
            if (box) {
                box.checked = chosen.has(Number(row.dataset.id));
            }
            row.classList.toggle('table-active', chosen.has(Number(row.dataset.id)));
        });
        drawFilters();
        drawSelection();
        keepAddress(state);
    };

    const set = (changes) => {
        Object.assign(state, {page: 0}, changes);
        render();
    };

    const send = (action, ids) => {
        postForm(root.dataset.bulkUrl, {sesskey: root.dataset.sesskey, action, ids});
    };

    search.value = state.query;
    search.addEventListener('input', () => set({query: search.value}));
    search.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && search.value !== '') {
            search.value = '';
            set({query: ''});
        }
    });

    statusMenu.addEventListener('change', () => {
        set({status: [...statusMenu.querySelectorAll('input[type="checkbox"]:checked')].map((box) => box.value).join(',')});
    });
    statusMenu.querySelector('[data-menu-clear]').addEventListener('click', () => set({status: ''}));
    dateMenu.addEventListener('click', (event) => {
        const preset = event.target.closest('[data-preset]');
        if (preset) {
            const [first, last] = presets()[preset.dataset.preset];
            filters.open(null, false);
            set({from: first, to: last});
        }
    });
    from.addEventListener('change', () => {
        const [first, last] = orderedDays(from.value, state.to, 'from');
        set({from: first, to: last});
    });
    to.addEventListener('change', () => {
        const [first, last] = orderedDays(state.from, to.value, 'to');
        set({from: first, to: last});
    });
    dateMenu.querySelector('[data-menu-clear]').addEventListener('click', () => set({from: '', to: ''}));

    root.addEventListener('change', (event) => {
        if (event.target.matches('[data-region="perpage"]')) {
            set({perpage: Number(event.target.value)});
        } else if (event.target === selectAll) {
            rows.filter((row) => !row.hidden).forEach((row) => {
                const id = Number(row.dataset.id);
                if (selectAll.checked) {
                    chosen.add(id);
                } else {
                    chosen.delete(id);
                }
            });
            render();
        } else if (event.target.matches('[data-region="schema-check"]')) {
            const id = Number(event.target.value);
            if (event.target.checked) {
                chosen.add(id);
            } else {
                chosen.delete(id);
            }
            render();
        }
    });

    root.addEventListener('click', (event) => {
        const page = event.target.closest('[data-page]');
        const action = event.target.closest('[data-action]');
        const bulk = event.target.closest('[data-bulk]');
        if (page) {
            state.page = Number(page.dataset.page);
            render();
        } else if (action?.dataset.action === 'reset-all') {
            search.value = '';
            set({query: '', status: '', from: '', to: ''});
        } else if (action?.dataset.action === 'clear-selection') {
            chosen.clear();
            render();
        } else if (action?.dataset.action === 'toggle-one') {
            const row = action.closest('[data-region="schema-row"]');
            closeMenus(root);
            send(row.dataset.enabled === '1' ? 'disable' : 'enable', [Number(row.dataset.id)]);
        } else if (bulk) {
            const ids = [...chosen];
            if (bulk.dataset.bulk === 'delete') {
                confirm(strings.deleteTitle, strings.deleteBody, strings.deleteTitle, () => send('delete', ids)).catch(() => null);
            } else {
                send(bulk.dataset.bulk, ids);
            }
        }
    });

    const keys = ['filter_date_range', 'filter_date_since', 'filter_date_until', 'selected_count', 'bulk_delete',
        'bulk_delete_confirm', 'ws_disable_services', 'ws_disable_confirm'];
    Promise.all([
        loadPagerStrings(),
        getStrings(keys.map((key) => ({key, component: 'local_servicemanager'}))),
    ]).then(([loadedPager, loaded]) => {
        pager = loadedPager;
        [strings.range, strings.since, strings.until, strings.selected, strings.deleteTitle, strings.deleteBody, strings.wsOff,
            strings.wsOffBody] = loaded;
        initWebServices(root, strings);
        render();
        keepColumns(table);
        return null;
    }).catch(() => {
        render();
        keepColumns(table);
    });
};
