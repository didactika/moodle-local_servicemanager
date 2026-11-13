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
 * What the lists of the plugin have in common: the state that the address keeps, the dates of a row, and the bar that goes from one
 * page to another. The lists are filtered in the page, so nothing here asks the server for anything.
 *
 * @module     local_servicemanager/listing
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import Templates from 'core/templates';

/** Milliseconds after the last change before the address follows. */
const ADDRESS_DELAY = 300;

/**
 * Submit a form that has these fields.
 *
 * @param {String} url Where the form goes.
 * @param {Object} fields The fields; a list of values is sent as name[] fields.
 */
export const postForm = (url, fields) => {
    const form = document.createElement('form');
    form.method = 'post';
    form.action = url;
    form.hidden = true;
    Object.entries(fields).forEach(([name, value]) => {
        (Array.isArray(value) ? value : [value]).forEach((item) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = Array.isArray(value) ? `${name}[]` : name;
            input.value = String(item);
            form.appendChild(input);
        });
    });
    document.body.appendChild(form);
    form.submit();
};

/**
 * The start of the day that a date field names, in Unix time.
 *
 * @param {String} day The date, such as 2026-10-13.
 * @param {Boolean} end True for the last second of the day.
 * @returns {Number|null} Seconds since 1970, or null when there is no date.
 */
const dayTime = (day, end) => {
    if (!day) {
        return null;
    }
    const start = new Date(day + 'T00:00:00').getTime() / 1000;
    return Number.isNaN(start) ? null : start + (end ? 86399 : 0);
};

/**
 * Whether a moment is inside the dates that were asked for.
 *
 * @param {Number} at Unix time of the row.
 * @param {Object} state What was asked, with from and to as date fields write them.
 * @returns {Boolean} True when it is inside.
 */
export const inDates = (at, state) => {
    const lower = dayTime(state.from, false);
    const upper = dayTime(state.to, true);
    return !((lower !== null && at < lower) || (upper !== null && at > upper));
};

/**
 * Whether a text has every word that was typed.
 *
 * @param {String} haystack The text of the row, in lower case.
 * @param {String} query What was typed.
 * @returns {Boolean} True when every word is in it.
 */
export const hasWords = (haystack, query) => query.toLowerCase().split(/\s+/).filter(Boolean)
    .every((word) => haystack.includes(word));

/**
 * Read what was asked from the address.
 *
 * @param {Number[]} sizes The sizes of page that exist.
 * @returns {Object} The state.
 */
export const readState = (sizes) => {
    const params = new URLSearchParams(window.location.search);
    const asked = params.has('perpage') ? Number(params.get('perpage')) : -1;
    return {
        query: params.get('q') || '',
        status: params.get('status') || '',
        from: params.get('from') || '',
        to: params.get('to') || '',
        perpage: sizes.includes(asked) ? asked : sizes[0],
        page: Math.max(0, parseInt(params.get('page'), 10) || 0),
    };
};

/**
 * Keep the address the same as what was asked, a moment after the last change.
 *
 * @param {Number} firstSize The size of page that is not written in the address.
 * @returns {Function} Call it with the state after each change.
 */
export const addressKeeper = (firstSize) => {
    let timer = null;
    return (state) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            const next = new URLSearchParams();
            ['query:q', 'status:status', 'from:from', 'to:to'].forEach((pair) => {
                const [key, name] = pair.split(':');
                if (state[key]) {
                    next.set(name, state[key]);
                }
            });
            if (state.perpage !== firstSize) {
                next.set('perpage', state.perpage);
            }
            if (state.page > 0) {
                next.set('page', state.page);
            }
            const text = next.toString();
            window.history.replaceState(null, '', window.location.pathname + (text ? '?' + text : '') + window.location.hash);
        }, ADDRESS_DELAY);
    };
};

/** The sizes a page of a list may have, 0 being every row at once; a list starts with the first. */
export const PAGE_SIZES = [12, 24, 48, 96, 0];

/**
 * The texts of the pager.
 *
 * @returns {Promise} Resolves with the texts.
 */
export const loadPagerStrings = () => Promise.all([getStrings([
    {key: 'pagination_previous', component: 'local_servicemanager'},
    {key: 'pagination_next', component: 'local_servicemanager'},
    {key: 'pagination_per_page', component: 'local_servicemanager'},
    {key: 'pagination_all', component: 'local_servicemanager'},
    {key: 'pagination_range', component: 'local_servicemanager', param: {from: '{from}', to: '{to}', total: '{total}'}},
    {key: 'pagination_aria_label', component: 'local_servicemanager'},
]), Templates.renderPix('i/previous', 'core'), Templates.renderPix('i/next', 'core')]).then(([loaded, previousIcon, nextIcon]) => ({
    previous: loaded[0],
    next: loaded[1],
    perpage: loaded[2],
    all: loaded[3],
    range: loaded[4],
    label: loaded[5],
    previousIcon,
    nextIcon,
}))
    .catch(() => ({previous: '', next: '', perpage: '', all: '', range: '{from}–{to} / {total}', label: '', previousIcon: '‹',
        nextIcon: '›'}));

/**
 * The rows a page shows: how many fit on it, which page it is and the first and the last row.
 *
 * @param {Number} page The page asked for, counted from 0.
 * @param {Number} perpage Rows on a page, 0 for all of them.
 * @param {Number} total Rows of the list.
 * @returns {Object} The size, the page, the first and last row counted from 1, and how many pages there are.
 */
export const pageOf = (page, perpage, total) => {
    const size = perpage > 0 ? perpage : Math.max(1, total);
    const pages = Math.max(1, Math.ceil(total / size));
    const at = Math.min(Math.max(0, page), pages - 1);
    return {size, page: at, pages, from: total === 0 ? 0 : at * size + 1, to: Math.min(total, (at + 1) * size)};
};

const arrow = (target, name, title, disabled) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-secondary btn-sm btn-icon';
    button.dataset.page = target;
    button.title = title;
    button.setAttribute('aria-label', title);
    button.disabled = disabled;
    // The icon of Moodle, drawn once by the theme.
    button.innerHTML = name;
    return button;
};

/**
 * Draw the foot of a list, as the design system draws it: rows per page with the sizes smaller than the list and All, the rows
 * shown and the arrows. A list of up to 12 rows offers All only; one of 13 to 24 offers 12 and All; and so on.
 *
 * @param {HTMLElement} foot The foot of the list.
 * @param {Number} page The current page, counted from 0.
 * @param {Number} perpage Rows on a page, 0 for all of them.
 * @param {Number} total Rows of the list.
 * @param {Object} strings The texts of the pager.
 */
export const drawPager = (foot, page, perpage, total, strings) => {
    foot.hidden = total === 0;
    foot.replaceChildren();
    if (total === 0) {
        return;
    }
    const range = pageOf(page, perpage, total);
    const sizes = PAGE_SIZES.filter((size) => size === 0 || size < total);
    const shown = perpage > 0 && perpage < total ? perpage : 0;

    const nav = document.createElement('nav');
    nav.className = 'dd-pager';
    nav.setAttribute('aria-label', strings.label);

    const left = document.createElement('div');
    left.className = 'dd-pager-size';
    const label = document.createElement('label');
    label.className = 'mb-0';
    label.htmlFor = 'lsm-perpage';
    label.textContent = strings.perpage;
    const select = document.createElement('select');
    select.id = 'lsm-perpage';
    select.className = 'custom-select custom-select-sm form-select form-select-sm dd-select';
    select.dataset.region = 'perpage';
    sizes.forEach((size) => select.appendChild(new Option(size ? String(size) : strings.all, String(size), false, size === shown)));
    left.append(label, select);

    const right = document.createElement('div');
    right.className = 'dd-pager-end';
    const text = document.createElement('span');
    text.className = 'dd-pager-range';
    text.setAttribute('role', 'status');
    text.textContent = strings.range.replace('{from}', range.from).replace('{to}', range.to).replace('{total}', total);
    const arrows = document.createElement('div');
    arrows.className = 'dd-pager-arrows';
    arrows.append(
        arrow(range.page - 1, strings.previousIcon || '‹', strings.previous, range.page === 0),
        arrow(range.page + 1, strings.nextIcon || '›', strings.next, range.to >= total)
    );
    right.append(text, arrows);

    nav.append(left, right);
    foot.appendChild(nav);
};
