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
import {add as addToast} from 'core/toast';
import Templates from 'core/templates';
import {confirm, inform} from 'local_servicemanager/dialogue';
import {init as initFilters, orderedDays, presets} from 'local_servicemanager/filters';
import {init as fitTables} from 'local_servicemanager/fit_tables';
import {
    addressKeeper,
    drawPager,
    hasWords,
    inDates,
    loadPagerStrings,
    readState,
    PAGE_SIZES,
    pageOf,
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
    // The box of the table takes the height the window leaves it.
    fitTables();
    const root = document.querySelector('[data-region="servicemanager-history"]');
    if (!root) {
        return;
    }
    initMenus(root);
    initCopy();
    let rows = [...root.querySelectorAll('[data-region="version"]')];
    if (rows.length === 0) {
        return;
    }
    const toolbar = root.querySelector('[data-region="filters"]');
    const filters = initFilters(toolbar);
    const dateMenu = filters.menu('date');
    const search = root.querySelector('#lsm-search');
    const from = dateMenu.querySelector('[data-date="from"]');
    const to = dateMenu.querySelector('[data-date="to"]');
    const firstSize = PAGE_SIZES[0];
    const empty = root.querySelector('[data-region="empty-state"]');
    let list = root.querySelector('[data-region="versions"]');
    const pagination = root.querySelector('[data-region="pagination"]');
    const compare = root.querySelector('#compare-btn');
    const bar = root.querySelector('[data-region="compare-bar"]');
    const clear = bar.querySelector('[data-action="clear-selection"]');
    const chosenText = root.querySelector('[data-region="compare-chosen"]');
    const tooMany = root.querySelector('[data-region="compare-too-many"]');
    const state = readState(PAGE_SIZES);
    [state.from, state.to] = [state.from, state.to].sort((a, b) => (a && b ? a.localeCompare(b) : 0));
    const keepAddress = addressKeeper(firstSize);
    const chosen = new Set();
    let strings = {current: '{n}', chosen: '{n}/{total}', count: '{n}', loading: '', copy: '', failed: root.dataset.yamlFailed,
        range: '', since: '', until: '', yaml: ''};
    let pager = {};

    const drawChoice = () => {
        chosenText.textContent = strings.chosen.replace('{n}', chosen.size).replace('{total}', TO_COMPARE);
        compare.disabled = chosen.size !== TO_COMPARE;
        clear.hidden = chosen.size === 0;
        bar.hidden = chosen.size === 0;
        rows.forEach((row) => {
            row.classList.toggle('table-active', chosen.has(Number(row.dataset.id)));
        });
    };

    const render = () => {
        const found = rows.filter((row) => inDates(Number(row.dataset.at), state) &&
            hasWords(row.dataset.text.toLowerCase(), state.query));
        const range = pageOf(state.page, state.perpage, found.length);
        state.page = range.page;
        const shown = new Set(found.slice(range.from - 1, range.to));
        rows.forEach((row) => {
            row.hidden = !shown.has(row);
        });
        root.querySelector('[data-region="history-count-text"]').textContent = strings.count.replace('{n}', found.length);

        const dates = dateLabel();
        filters.paint('date', dates || dateMenu.querySelector('[data-region="menu-label"]').dataset.label, dates !== '');
        from.value = state.from;
        to.value = state.to;
        from.max = state.to;
        to.min = state.from;
        const applied = state.from || state.to ? 1 : 0;
        toolbar.dataset.applied = String(applied);
        filters.fit(applied);
        toolbar.querySelector('.table-toolbar-end [data-action="reset-all"]').disabled = applied === 0 && state.query === '';
        list.hidden = found.length === 0;
        empty.hidden = found.length !== 0;
        drawPager(pagination, state.page, state.perpage, found.length, pager);
        drawChoice();
        keepAddress(state);
    };

    const set = (changes) => {
        Object.assign(state, {page: 0}, changes);
        render();
    };

    const dateLabel = () => {
        const found = Object.entries(presets()).find(([, days]) => days[0] === state.from && days[1] === state.to);
        if (found) {
            return dateMenu.querySelector(`[data-preset="${found[0]}"]`).textContent.trim();
        }
        if (state.from && state.to) {
            return strings.range.replace('{$a->from}', state.from).replace('{$a->to}', state.to);
        }
        if (state.from) {
            return strings.since.replace('{$a}', state.from);
        }
        return state.to ? strings.until.replace('{$a}', state.to) : '';
    };

    const showYaml = (button) => {
        const row = button.closest('[data-region="version"]');
        const title = `${strings.yaml} · ${row.dataset.version}`;
        loadYaml(Number(row.dataset.id)).then((yaml) => {
            const pre = document.createElement('pre');
            pre.className = 'bg-body-tertiary border rounded p-3 small mb-0';
            const code = document.createElement('code');
            code.textContent = yaml;
            pre.appendChild(code);
            return inform(title, pre.outerHTML);
        }).catch(() => inform(title, strings.failed));
    };

    search.value = state.query;
    search.addEventListener('input', () => set({query: search.value}));
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

    const drawRolledBack = (result) => Templates.renderForPromise('local_servicemanager/history_rows', {rows: result.rows})
        .then(({html, js}) => {
            Templates.replaceNode(list, html, js);
            list = root.querySelector('[data-region="versions"]');
            rows = [...root.querySelectorAll('[data-region="version"]')];
            chosen.clear();
            tooMany.hidden = true;
            root.querySelector('[data-region="history-current"]').textContent = strings.current.replace('{n}', result.version);
            render();
            return getStrings([{key: 'rollback_success', component: 'local_servicemanager'}]);
        });

    const sayRollbackFailed = () => getStrings([{key: 'rollback_error', component: 'local_servicemanager'}])
        .then(([message]) => addToast(message, {type: 'danger'}));

    const rollback = (id) => Ajax.call([{
        methodname: 'local_servicemanager_rollback_schema',
        args: {id: Number(root.dataset.schemaid), historyid: id},
    }])[0].then(drawRolledBack)
        .then(([message]) => addToast(message, {type: 'success'}))
        .catch(sayRollbackFailed);

    const askRollback = (button) => getStrings([
        {key: 'rollback_title', component: 'local_servicemanager', param: button.dataset.version},
        {key: 'rollback_confirm', component: 'local_servicemanager'},
        {key: 'rollback', component: 'local_servicemanager'},
    ]).then(([title, body, label]) => confirm(title, body, label, () => rollback(Number(button.dataset.id))));

    const actions = {
        'reset-all': () => {
            search.value = '';
            set({query: '', from: '', to: ''});
        },
        'clear-selection': () => {
            chosen.clear();
            tooMany.hidden = true;
            root.querySelectorAll('[data-region="version-check"]').forEach((box) => {
                box.checked = false;
            });
            drawChoice();
        },
        'show-yaml': showYaml,
        'rollback': (button) => askRollback(button),
    };

    root.addEventListener('change', (event) => {
        if (event.target.matches('[data-region="perpage"]')) {
            set({perpage: Number(event.target.value)});
        }
    });

    root.addEventListener('click', (event) => {
        const page = event.target.closest('[data-page]');
        const action = event.target.closest('[data-action]');
        if (page) {
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
            {key: 'history_current', component: 'local_servicemanager', param: '{n}'},
            {key: 'filter_date_range', component: 'local_servicemanager'},
            {key: 'filter_date_since', component: 'local_servicemanager'},
            {key: 'filter_date_until', component: 'local_servicemanager'},
            {key: 'view_yaml', component: 'local_servicemanager'},
        ]).catch(() => null),
    ]).then(([loadedPager, loaded]) => {
        pager = loadedPager;
        if (loaded) {
            strings = Object.assign(strings, {
                chosen: loaded[0], count: loaded[1], loading: loaded[2], copy: loaded[3], current: loaded[4], range: loaded[5],
                since: loaded[6], until: loaded[7], yaml: loaded[8],
            });
        }
        return render();
    }).catch(() => render());
};
