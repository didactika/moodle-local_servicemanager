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

    const next = () => {
        const rows = [...activeTable().querySelectorAll('tbody tr[data-row]')].filter((row) => !row.hidden);
        const changed = (row) => row.querySelector(CHANGED) !== null;
        const starts = rows.filter((row, index) => changed(row) && (index === 0 || !changed(rows[index - 1])));
        if (starts.length === 0) {
            return;
        }
        position = (position + 1) % starts.length;
        starts[position].scrollIntoView({block: 'center', behavior: 'smooth'});
    };

    root.addEventListener('click', (event) => {
        const switcher = event.target.closest('[data-view]');
        const fold = event.target.closest('[data-action="open-fold"]');
        if (switcher) {
            view = switcher.dataset.view;
            position = -1;
            render();
        } else if (fold) {
            opened.add(fold.closest('[data-region="fold"]').dataset.from);
            render();
        } else if (event.target.closest('[data-action="next-change"]')) {
            next();
        }
    });
    only.addEventListener('change', () => {
        position = -1;
        render();
    });
    render();
};
