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
 * The history of a schema: searches and pages its versions, opens the YAML of one when it is asked for and keeps the choice of the
 * two versions that are compared.
 *
 * @module     local_servicemanager/history
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Ajax from 'core/ajax';
import {get_strings as getStrings} from 'core/str';
import {init as initMenus} from 'local_servicemanager/menu';
import {init as initCopy} from 'local_servicemanager/copy';
import {
    addressKeeper, drawPager, hasWords, inDates, loadPagerStrings, readState
} from 'local_servicemanager/listing';

/** How many versions are compared at once. */
const TO_COMPARE = 2;

/**
 * Ask for the YAML of a version.
 *
 * @param {Number} historyid Id of the version in the history.
 * @returns {Promise} Resolves with the YAML.
 */
const loadYaml = (historyid) => Ajax.call([{
    methodname: 'local_servicemanager_get_version',
    args: {historyid},
}])[0].then((version) => version.yaml);

/**
 * Start the page.
 */
export const init = () => {
    const root = document.querySelector('[data-region="servicemanager-history"]');
    if (!root) {
        return;
    }
    initMenus(root);
    initCopy();
    const rows = [...root.querySelectorAll('[data-region="version"]')];
    if (rows.length === 0) {
        return;
    }
    const search = root.querySelector('#sm-search');
    const from = root.querySelector('#sm-from');
    const to = root.querySelector('#sm-to');
    const sizes = [...root.querySelectorAll('[data-perpage]')];
    const firstSize = Number(sizes[0].dataset.perpage);
    const filtersCount = root.querySelector('[data-region="filters-count"]');
    const empty = root.querySelector('[data-region="empty-state"]');
    const list = root.querySelector('[data-region="versions"]');
    const pagination = root.querySelector('[data-region="pagination"]');
    const compare = root.querySelector('#compare-btn');
    const bar = root.querySelector('[data-region="compare-bar"]');
    const clear = bar.querySelector('[data-action="clear-selection"]');
    const chosenText = root.querySelector('[data-region="compare-chosen"]');
    const tooMany = root.querySelector('[data-region="compare-too-many"]');
    const state = readState(sizes.map((size) => Number(size.dataset.perpage)));
    const keepAddress = addressKeeper(firstSize);
    const chosen = new Set();
    let strings = {chosen: '{n}/{total}', count: '{n}', loading: '', copy: '', failed: root.dataset.yamlFailed};
    let pager = {};

    const drawChoice = () => {
        chosenText.textContent = strings.chosen.replace('{n}', chosen.size).replace('{total}', TO_COMPARE);
        compare.disabled = chosen.size !== TO_COMPARE;
        clear.hidden = chosen.size === 0;
        bar.hidden = chosen.size === 0;
        rows.forEach((row) => {
            row.classList.toggle('active-version', chosen.has(Number(row.dataset.id)));
        });
    };

    const render = () => {
        const found = rows.filter((row) => inDates(Number(row.dataset.at), state) &&
            hasWords(row.dataset.text.toLowerCase(), state.query));
        const pages = Math.max(1, Math.ceil(found.length / state.perpage));
        state.page = Math.min(Math.max(0, state.page), pages - 1);
        const shown = new Set(found.slice(state.page * state.perpage, (state.page + 1) * state.perpage));
        rows.forEach((row) => {
            row.hidden = !shown.has(row);
        });
        root.querySelector('[data-region="history-count-text"]').textContent = strings.count.replace('{n}', found.length);

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
        list.hidden = found.length === 0;
        empty.hidden = found.length !== 0;
        drawPager(pagination, state.page, pages, pager);
        drawChoice();
        keepAddress(state);
    };

    const set = (changes) => {
        Object.assign(state, {page: 0}, changes);
        render();
    };

    const toggleYaml = (button) => {
        const row = button.closest('[data-region="version"]');
        const holder = row.querySelector('[data-region="yaml"]');
        if (!holder.hidden) {
            holder.hidden = true;
            button.setAttribute('aria-expanded', 'false');
            return;
        }
        holder.hidden = false;
        holder.classList.remove('sm-danger');
        button.setAttribute('aria-expanded', 'true');
        holder.textContent = strings.loading;
        loadYaml(Number(row.dataset.id)).then((yaml) => {
            const id = 'sm-yaml-' + row.dataset.id;
            holder.replaceChildren();
            const pre = document.createElement('pre');
            pre.className = 'sm-yaml';
            pre.id = id;
            const code = document.createElement('code');
            code.textContent = yaml;
            pre.appendChild(code);
            const copy = document.createElement('button');
            copy.type = 'button';
            copy.className = 'btn sm-pill compact';
            copy.dataset.copyTarget = '#' + id;
            copy.innerHTML = '<i class="fa-solid fa-copy sm-icon-gap" aria-hidden="true"></i>';
            copy.appendChild(document.createTextNode(strings.copy));
            holder.append(pre, copy);
            return yaml;
        }).catch(() => {
            holder.textContent = strings.failed;
            holder.classList.add('sm-danger');
        });
    };

    search.value = state.query;
    from.value = state.from;
    to.value = state.to;
    search.addEventListener('input', () => set({query: search.value}));
    from.addEventListener('change', () => set({from: from.value}));
    to.addEventListener('change', () => set({to: to.value}));

    root.addEventListener('change', (event) => {
        const box = event.target;
        if (!box.matches('[data-region="version-check"]')) {
            return;
        }
        const id = Number(box.value);
        if (box.checked && chosen.size >= TO_COMPARE) {
            box.checked = false;
            tooMany.hidden = false;
            return;
        }
        tooMany.hidden = true;
        if (box.checked) {
            chosen.add(id);
        } else {
            chosen.delete(id);
        }
        drawChoice();
    });

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
            set({query: '', from: '', to: '', perpage: firstSize});
        },
        'clear-selection': () => {
            chosen.clear();
            tooMany.hidden = true;
            root.querySelectorAll('[data-region="version-check"]').forEach((box) => {
                box.checked = false;
            });
            drawChoice();
        },
        'toggle-yaml': toggleYaml,
    };

    root.addEventListener('click', (event) => {
        const size = event.target.closest('[data-perpage]');
        const page = event.target.closest('[data-page]');
        const action = event.target.closest('[data-action]');
        if (size) {
            set({perpage: Number(size.dataset.perpage)});
        } else if (page) {
            state.page = Number(page.dataset.page);
            render();
        } else if (action && actions[action.dataset.action]) {
            actions[action.dataset.action](action);
        }
    });

    Promise.all([
        loadPagerStrings(),
        getStrings([
            {key: 'compare_chosen', component: 'local_servicemanager', param: {n: '{n}', total: '{total}'}},
            {key: 'history_count', component: 'local_servicemanager', param: '{n}'},
            {key: 'loading', component: 'local_servicemanager'},
            {key: 'copy', component: 'local_servicemanager'},
        ]).catch(() => null),
    ]).then(([loadedPager, loaded]) => {
        pager = loadedPager;
        if (loaded) {
            strings = Object.assign(strings, {chosen: loaded[0], count: loaded[1], loading: loaded[2], copy: loaded[3]});
        }
        return render();
    }).catch(() => render());
};
