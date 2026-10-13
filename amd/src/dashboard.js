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
 * The dashboard: searches, filters and pages the schemas without asking the server, keeps the choice of schemas and sends the
 * actions on them.
 *
 * What the person asked is kept in the address, so a refresh or a shared link shows the same list.
 *
 * @module     local_servicemanager/dashboard
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import ModalSaveCancel from 'core/modal_save_cancel';
import ModalEvents from 'core/modal_events';
import {init as initMenus, close as closeMenus} from 'local_servicemanager/menu';
import {
    addressKeeper, drawPager, hasWords, inDates, loadPagerStrings, postForm, readState
} from 'local_servicemanager/listing';

/** The statuses, in the order of the bar. */
const STATUSES = ['healthy', 'warning', 'critical'];

/** The colour each status has in the bar. */
const TONES = {healthy: 'success', warning: 'warning', critical: 'danger'};

/**
 * Start the dashboard.
 */
export const init = () => {
    const root = document.querySelector('[data-region="servicemanager-dashboard"]');
    if (!root) {
        return;
    }
    initMenus(root);
    const table = root.querySelector('[data-region="schema-table"]');
    if (!table) {
        return;
    }

    const rows = [...root.querySelectorAll('[data-region="schema-row"]')];
    const search = root.querySelector('#sm-search');
    const from = root.querySelector('#sm-from');
    const to = root.querySelector('#sm-to');
    const sizes = [...root.querySelectorAll('[data-perpage]')];
    const firstSize = Number(sizes[0].dataset.perpage);
    const filtersCount = root.querySelector('[data-region="filters-count"]');
    const chips = [...root.querySelectorAll('.sm-health-chip')];
    const empty = root.querySelector('[data-region="empty-state"]');
    const pagination = root.querySelector('[data-region="pagination"]');
    const bar = root.querySelector('[data-region="bulk-actions"]');
    const selectAll = root.querySelector('#sm-select-all');
    const chosen = new Set();
    const state = readState(sizes.map((size) => Number(size.dataset.perpage)));
    state.status = STATUSES.includes(state.status) ? state.status : '';
    const keepAddress = addressKeeper(firstSize);
    let strings = {};
    let pager = {};

    const drawBar = (counts) => {
        const holder = root.querySelector('[data-region="health-bar"]');
        holder.replaceChildren();
        STATUSES.forEach((status) => {
            if (counts[status] > 0) {
                const part = document.createElement('span');
                part.className = 'sm-health-part tone-' + TONES[status];
                part.style.flexGrow = counts[status];
                holder.appendChild(part);
            }
        });
    };

    const drawSelection = () => {
        if (!bar) {
            return;
        }
        const picked = rows.filter((row) => chosen.has(Number(row.dataset.id)));
        bar.hidden = picked.length === 0;
        bar.querySelector('[data-region="selected-count"]').textContent = String(picked.length);
        bar.querySelector('[data-bulk="enable"]').hidden = !picked.some((row) => row.dataset.enabled === '0');
        bar.querySelector('[data-bulk="disable"]').hidden = !picked.some((row) => row.dataset.enabled === '1');
    };

    const render = () => {
        const counts = {healthy: 0, warning: 0, critical: 0};
        const found = [];
        rows.forEach((row) => {
            if (inDates(Number(row.dataset.modified), state) && hasWords(row.dataset.text.toLowerCase(), state.query)) {
                counts[row.dataset.status] = (counts[row.dataset.status] || 0) + 1;
                if (!state.status || row.dataset.status === state.status) {
                    found.push(row);
                }
            }
        });

        const pages = Math.max(1, Math.ceil(found.length / state.perpage));
        state.page = Math.min(Math.max(0, state.page), pages - 1);
        const shown = new Set(found.slice(state.page * state.perpage, (state.page + 1) * state.perpage));
        rows.forEach((row) => {
            row.hidden = !shown.has(row);
        });

        const total = STATUSES.reduce((sum, status) => sum + counts[status], 0);
        root.querySelector('[data-region="total"]').textContent = String(total);
        const label = root.querySelector('[data-region="total-label"]');
        label.textContent = total === 1 ? label.dataset.one : label.dataset.many;
        STATUSES.forEach((status) => {
            root.querySelector(`[data-region="count-${status}"]`).textContent = String(counts[status]);
        });
        chips.forEach((chip) => {
            const on = chip.dataset.status === state.status;
            chip.classList.toggle('active', on);
            chip.setAttribute('aria-pressed', on ? 'true' : 'false');
            chip.disabled = counts[chip.dataset.status] === 0 && !on;
        });
        drawBar(counts);

        const extras = (state.from ? 1 : 0) + (state.to ? 1 : 0) + (state.perpage !== firstSize ? 1 : 0);
        filtersCount.textContent = String(extras);
        filtersCount.hidden = extras === 0;
        root.querySelector('[data-action="reset-filters"]').disabled = extras === 0;
        sizes.forEach((size) => {
            const on = Number(size.dataset.perpage) === state.perpage;
            size.classList.toggle('active', on);
            size.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        root.querySelector('[data-action="clear-search"]').hidden = state.query === '';

        table.hidden = found.length === 0;
        empty.hidden = found.length !== 0;
        drawPager(pagination, state.page, pages, pager);
        if (selectAll) {
            const visible = rows.filter((row) => !row.hidden);
            selectAll.checked = visible.length > 0 && visible.every((row) => chosen.has(Number(row.dataset.id)));
        }
        rows.forEach((row) => {
            const box = row.querySelector('[data-region="schema-check"]');
            if (box) {
                box.checked = chosen.has(Number(row.dataset.id));
            }
        });
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

    const confirmDelete = (ids) => {
        ModalSaveCancel.create({
            title: strings.deleteTitle,
            body: strings.deleteBody,
            buttons: {save: strings.deleteTitle},
            show: true,
            removeOnClose: true,
        }).then((modal) => {
            modal.getRoot().on(ModalEvents.save, () => send('delete', ids));
            return modal;
        }).catch(() => send('delete', ids));
    };

    search.value = state.query;
    from.value = state.from;
    to.value = state.to;

    search.addEventListener('input', () => set({query: search.value}));
    search.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && search.value !== '') {
            search.value = '';
            set({query: ''});
        }
    });
    from.addEventListener('change', () => set({from: from.value}));
    to.addEventListener('change', () => set({to: to.value}));

    const actions = {
        'clear-search': () => {
            search.value = '';
            set({query: ''});
        },
        'reset-filters': () => {
            from.value = '';
            to.value = '';
            set({from: '', to: '', perpage: firstSize});
        },
        'reset-all': () => {
            search.value = '';
            from.value = '';
            to.value = '';
            set({query: '', status: '', from: '', to: '', perpage: firstSize});
        },
        'clear-selection': () => {
            chosen.clear();
            render();
        },
        'toggle-one': (target) => {
            const row = target.closest('[data-region="schema-row"]');
            closeMenus(root);
            send(row.dataset.enabled === '1' ? 'disable' : 'enable', [Number(row.dataset.id)]);
        },
    };

    root.addEventListener('click', (event) => {
        const target = event.target;
        const chip = target.closest('.sm-health-chip');
        const size = target.closest('[data-perpage]');
        const page = target.closest('[data-page]');
        const action = target.closest('[data-action]');
        const bulk = target.closest('[data-bulk]');
        if (chip) {
            set({status: chip.dataset.status === state.status ? '' : chip.dataset.status});
        } else if (size) {
            set({perpage: Number(size.dataset.perpage)});
        } else if (page) {
            state.page = Number(page.dataset.page);
            render();
        } else if (action && actions[action.dataset.action]) {
            actions[action.dataset.action](action);
        } else if (bulk) {
            const ids = [...chosen];
            if (bulk.dataset.bulk === 'delete') {
                confirmDelete(ids);
            } else {
                send(bulk.dataset.bulk, ids);
            }
        }
    });

    root.addEventListener('change', (event) => {
        const box = event.target;
        if (box === selectAll) {
            rows.filter((row) => !row.hidden).forEach((row) => {
                const id = Number(row.dataset.id);
                if (selectAll.checked) {
                    chosen.add(id);
                } else {
                    chosen.delete(id);
                }
            });
            render();
        } else if (box.matches('[data-region="schema-check"]')) {
            const id = Number(box.value);
            if (box.checked) {
                chosen.add(id);
            } else {
                chosen.delete(id);
            }
            render();
        }
    });

    Promise.all([
        loadPagerStrings(),
        getStrings([
            {key: 'bulk_delete', component: 'local_servicemanager'},
            {key: 'bulk_delete_confirm', component: 'local_servicemanager'},
        ]).catch(() => ['', '']),
    ]).then(([loadedPager, loaded]) => {
        pager = loadedPager;
        strings = {deleteTitle: loaded[0], deleteBody: loaded[1]};
        return render();
    }).catch(() => render());
};
