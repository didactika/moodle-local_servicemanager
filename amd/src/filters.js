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
 * The filters of a list, as the Didactika design system draws them: each one is a menu with the shape of a select, in one row
 * beside the search. The status lists every status with its rows and several can be ticked; the date offers the usual periods and
 * two days of choice, which never go the wrong way round. A menu that narrows the list is tinted, says only what it is narrowed to
 * and has a cross that clears it; when the menus do not fit beside the search they are grouped in one menu, Filters.
 *
 * @module     local_servicemanager/filters
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** The width the search keeps beside the filters before they are grouped, in pixels (10rem). */
const SEARCH_ROOM = 160;

/**
 * A day as a date field writes it.
 *
 * @param {Date} date The day.
 * @returns {string} The day, as year-month-day.
 */
const iso = (date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')]
    .join('-');

/**
 * The usual periods, counted from today.
 *
 * @returns {Object<string, string[]>} The first and the last day of each period.
 */
export const presets = () => {
    const today = new Date();
    const back = (days) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - days);
    return {
        today: [iso(today), iso(today)],
        week: [iso(back(6)), iso(today)],
        month: [iso(new Date(today.getFullYear(), today.getMonth(), 1)), iso(today)],
        last30: [iso(back(29)), iso(today)],
    };
};

/**
 * Two days that bound a period, never the wrong way round: when the day just chosen passes the other one, the other one moves to
 * it.
 *
 * @param {string} from The first day, or empty.
 * @param {string} to The last day, or empty.
 * @param {string} changed Which of the two was just chosen: from or to.
 * @returns {string[]} The two days, in order.
 */
export const orderedDays = (from, to, changed) => {
    if (from === '' || to === '' || from <= to) {
        return [from, to];
    }
    return changed === 'from' ? [from, from] : [to, to];
};

/**
 * The menus of one row of filters.
 *
 * @param {HTMLElement} toolbar The row of the filters.
 * @returns {Object} What a page does with them.
 */
export const init = (toolbar) => {
    const menus = () => Array.from(toolbar.querySelectorAll('[data-menu]'));
    const menu = (name) => toolbar.querySelector(`[data-menu="${name}"]`);
    const fitting = {grouped: false, needed: 0};

    const open = (target, show) => {
        menus().forEach((item) => {
            const on = item === target && show;
            item.querySelector(':scope > [data-menu-toggle]')?.setAttribute('aria-expanded', on ? 'true' : 'false');
            const list = item.querySelector(':scope > .dd-select-menu');
            if (list) {
                list.hidden = !on;
            }
        });
    };

    toolbar.addEventListener('click', (event) => {
        const toggle = event.target.closest('[data-menu-toggle]');
        if (toggle) {
            const item = toggle.closest('[data-menu]');
            open(item, toggle.getAttribute('aria-expanded') !== 'true');
            // A menu inside the group of filters stays inside it, so the group does not close.
            if (item.closest('[data-region="filter-panel"]')) {
                menu('filters').querySelector(':scope > .dd-select-menu').hidden = false;
            }
        }
    });
    document.addEventListener('pointerdown', (event) => {
        if (!toolbar.contains(event.target)) {
            open(null, false);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            open(null, false);
        }
    });

    /**
     * Say what a menu is narrowed to, tint it, and show its cross.
     *
     * @param {string} name The menu.
     * @param {string} label What the menu says.
     * @param {boolean} active Whether it narrows the list.
     */
    const paint = (name, label, active) => {
        const item = menu(name);
        if (!item) {
            return;
        }
        const toggle = item.querySelector(':scope > [data-menu-toggle]');
        toggle.querySelector('[data-region="menu-label"]').textContent = label;
        toggle.classList.toggle('border-primary', active);
        toggle.classList.toggle('dd-select-set', active);
        const clear = item.querySelector(':scope > [data-menu-clear]');
        if (clear) {
            clear.hidden = !active;
        }
    };

    /**
     * Group the menus in one menu, Filters, when they do not fit beside the search, and take them back when they do.
     *
     * @param {number} count How many filters narrow the list.
     */
    const fit = (count) => {
        const box = toolbar.querySelector('[data-region="filter-menus"]');
        const row = box?.parentElement;
        const group = menu('filters');
        if (!box || !row || !group) {
            return;
        }
        const panel = group.querySelector('[data-region="filter-panel"]');
        const gap = parseFloat(window.getComputedStyle(row).columnGap) || 0;
        const room = row.clientWidth - SEARCH_ROOM - gap;
        if (!fitting.grouped) {
            const filters = Array.from(box.children).filter((child) => child !== group);
            const width = filters.reduce((sum, child) => sum + child.offsetWidth, 0) + gap * Math.max(0, filters.length - 1);
            if (width > room) {
                fitting.needed = width;
                fitting.grouped = true;
                filters.forEach((child) => panel.appendChild(child));
                group.hidden = false;
            }
        } else if (room >= fitting.needed) {
            fitting.grouped = false;
            open(null, false);
            Array.from(panel.children).forEach((child) => box.insertBefore(child, group));
            group.hidden = true;
        }
        const label = group.querySelector('[data-region="menu-label"]');
        label.textContent = count > 0 ? `${label.dataset.label} (${count})` : label.dataset.label;
        group.querySelector(':scope > [data-menu-toggle]').classList.toggle('border-primary', count > 0);
    };

    new ResizeObserver(() => fit(Number(toolbar.dataset.applied || 0))).observe(toolbar);

    return {menu, open, paint, fit};
};
