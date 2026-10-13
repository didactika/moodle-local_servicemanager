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
    const asked = Number(params.get('perpage'));
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

/**
 * The texts of the bar of pages.
 *
 * @returns {Promise} Resolves with the texts.
 */
export const loadPagerStrings = () => getStrings([
    {key: 'pagination_first', component: 'local_servicemanager'},
    {key: 'pagination_previous', component: 'local_servicemanager'},
    {key: 'pagination_next', component: 'local_servicemanager'},
    {key: 'pagination_last', component: 'local_servicemanager'},
    {key: 'pagination_page_info', component: 'local_servicemanager', param: {current: '{current}', total: '{total}'}},
]).then((loaded) => ({first: loaded[0], previous: loaded[1], next: loaded[2], last: loaded[3], info: loaded[4]}))
    .catch(() => ({first: '', previous: '', next: '', last: '', info: '{current} / {total}'}));

const icon = (name) => {
    const element = document.createElement('i');
    element.className = 'fa-solid fa-' + name;
    element.setAttribute('aria-hidden', 'true');
    return element;
};

const pageItem = (target, content, title, active) => {
    const item = document.createElement('li');
    item.className = 'page-item' + (active ? ' active' : '');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'page-link';
    button.dataset.page = target;
    if (title) {
        button.title = title;
        button.setAttribute('aria-label', title);
    }
    if (active) {
        button.setAttribute('aria-current', 'page');
    }
    if (typeof content === 'string') {
        button.textContent = content;
    } else {
        button.appendChild(content);
    }
    item.appendChild(button);
    return item;
};

const dots = () => {
    const item = document.createElement('li');
    item.className = 'page-item disabled';
    const dotsText = document.createElement('span');
    dotsText.className = 'page-link';
    dotsText.textContent = '...';
    item.appendChild(dotsText);
    return item;
};

/**
 * Draw the bar that goes from one page to another: two pages on each side of the current one, the ends and the neighbours.
 *
 * @param {HTMLElement} nav The element of the bar, with a list inside and a region for the line that says where the person is.
 * @param {Number} page The current page, counted from 0.
 * @param {Number} pages How many pages there are.
 * @param {Object} strings The texts of the bar.
 */
export const drawPager = (nav, page, pages, strings) => {
    nav.hidden = pages < 2;
    const list = nav.querySelector('ul');
    list.replaceChildren();
    if (pages < 2) {
        return;
    }
    const start = Math.max(0, page - 2);
    const end = Math.min(pages - 1, page + 2);
    if (page > 1) {
        list.appendChild(pageItem(0, icon('angles-left'), strings.first));
    }
    if (page > 0) {
        list.appendChild(pageItem(page - 1, icon('angle-left'), strings.previous));
    }
    if (start > 0) {
        list.appendChild(dots());
    }
    for (let index = start; index <= end; index++) {
        list.appendChild(pageItem(index, String(index + 1), '', index === page));
    }
    if (end < pages - 1) {
        list.appendChild(dots());
    }
    if (page < pages - 2) {
        list.appendChild(pageItem(pages - 1, String(pages), strings.last));
    }
    if (page < pages - 1) {
        list.appendChild(pageItem(page + 1, icon('angle-right'), strings.next));
    }
    nav.querySelector('[data-region="page-info"]').textContent =
        strings.info.replace('{current}', page + 1).replace('{total}', pages);
};
