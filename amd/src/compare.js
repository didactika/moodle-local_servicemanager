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
 * The comparison of two versions: changes between the side by side and the unified layouts, folds the lines that did not change and
 * goes from one difference to the next.
 *
 * @module     local_servicemanager/compare
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';

/** The selector of a cell that holds a difference. */
const CHANGED = '.sm-diff-added, .sm-diff-removed, .sm-diff-changed';

/**
 * Start the page.
 */
export const init = () => {
    const root = document.querySelector('[data-region="servicemanager-compare"]');
    if (!root) {
        return;
    }
    const tables = {
        split: root.querySelector('[data-region="diff-split"]'),
        unified: root.querySelector('[data-region="diff-unified"]'),
    };
    const only = root.querySelector('#only-changes');
    const opened = new Set();
    let view = 'split';
    let position = -1;

    const activeTable = () => tables[view];

    const render = () => {
        Object.entries(tables).forEach(([name, table]) => {
            table.hidden = name !== view;
            // The tests of the page, and the people who style it, look for the comparison where it is shown.
            table.classList.toggle('comparison-table', name === view);
        });
        root.querySelectorAll('[data-view]').forEach((button) => {
            const on = button.dataset.view === view;
            button.classList.toggle('active', on);
            button.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        Object.values(tables).forEach((table) => {
            table.querySelectorAll('[data-fold]').forEach((row) => {
                row.hidden = only.checked && !opened.has(row.dataset.fold);
            });
            table.querySelectorAll('[data-region="fold"]').forEach((row) => {
                row.hidden = !only.checked || opened.has(row.dataset.from);
            });
        });
    };

    const title = root.querySelector('[data-region="change-title"]');
    const detail = root.querySelector('[data-region="change-detail"]');
    let strings = {of: '{n}/{total}', found: '{n}', at: '{line} {kind}', hint: '', added: '', removed: '', changed: ''};

    const changed = (row) => row.querySelector(CHANGED) !== null;

    /**
     * The runs of rows that differ in the rows that are shown, with the line where each starts and what it is.
     *
     * @returns {Object[]} One entry for each run: its first row, its line and whether it was added, removed or changed.
     */
    const runs = () => {
        const rows = [...activeTable().querySelectorAll('tbody tr[data-row]')].filter((row) => !row.hidden);
        const result = [];
        rows.forEach((row, index) => {
            if (!changed(row)) {
                return;
            }
            if (index === 0 || !changed(rows[index - 1])) {
                const cells = row.querySelectorAll('.sm-line-no');
                const numbers = [...cells].map((cell) => cell.textContent.trim()).filter((value) => value !== '');
                result.push({row, line: numbers.length ? numbers[numbers.length - 1] : '', kinds: new Set()});
            }
            const kinds = result[result.length - 1].kinds;
            ['added', 'removed', 'changed'].forEach((kind) => {
                if (row.querySelector('.sm-diff-' + kind)) {
                    kinds.add(kind);
                }
            });
        });
        return result;
    };

    const showPosition = () => {
        if (!title) {
            return;
        }
        const list = runs();
        if (position < 0 || position >= list.length) {
            title.textContent = strings.found.replace('{n}', list.length);
            detail.textContent = strings.hint;
            return;
        }
        const kinds = list[position].kinds;
        const kind = kinds.size === 1 ? [...kinds][0] : 'changed';
        title.textContent = strings.of.replace('{n}', position + 1).replace('{total}', list.length);
        detail.textContent = strings.at.replace('{line}', list[position].line).replace('{kind}', strings[kind]);
    };

    const move = (step) => {
        const list = runs();
        if (list.length === 0) {
            return;
        }
        // Before any change was chosen, down goes to the first one and up to the last one.
        if (position < 0) {
            position = step > 0 ? 0 : list.length - 1;
        } else {
            position = (position + step + list.length) % list.length;
        }
        list[position].row.scrollIntoView({block: 'center', behavior: 'smooth'});
        showPosition();
    };

    root.addEventListener('click', (event) => {
        const switcher = event.target.closest('[data-view]');
        const fold = event.target.closest('[data-action="open-fold"]');
        if (switcher) {
            view = switcher.dataset.view;
            position = -1;
            render();
            showPosition();
        } else if (fold) {
            opened.add(fold.closest('[data-region="fold"]').dataset.from);
            render();
        } else if (event.target.closest('[data-action="next-change"]')) {
            move(1);
        } else if (event.target.closest('[data-action="prev-change"]')) {
            move(-1);
        }
    });
    only.addEventListener('change', () => {
        position = -1;
        render();
        showPosition();
    });
    render();
    showPosition();
    getStrings([
        {key: 'compare_change_of', component: 'local_servicemanager', param: {n: '{n}', total: '{total}'}},
        {key: 'compare_changes_found', component: 'local_servicemanager', param: '{n}'},
        {key: 'compare_change_at', component: 'local_servicemanager', param: {line: '{line}', kind: '{kind}'}},
        {key: 'compare_changes_hint', component: 'local_servicemanager'},
        {key: 'change_added', component: 'local_servicemanager'},
        {key: 'change_removed', component: 'local_servicemanager'},
        {key: 'change_changed', component: 'local_servicemanager'},
    ]).then(([of, found, at, hint, added, removed, changedLabel]) => {
        strings = {of, found, at, hint, added, removed, changed: changedLabel};
        showPosition();
        return null;
    }).catch(() => showPosition());
};
