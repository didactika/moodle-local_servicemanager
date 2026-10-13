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
 * The page of a schema: searches its functions, shows the capabilities of one in a dialogue, filters its health checks and enables
 * or disables it.
 *
 * @module     local_servicemanager/schema
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import ModalCancel from 'core/modal_cancel';
import {init as initCopy} from 'local_servicemanager/copy';
import {postForm} from 'local_servicemanager/listing';

/**
 * Escape a text to put it in HTML.
 *
 * @param {String} text The text.
 * @returns {String} The text, safe to write inside an element.
 */
const escapeHtml = (text) => {
    const holder = document.createElement('div');
    holder.textContent = text;
    return holder.innerHTML;
};

/**
 * Show the capabilities of a function.
 *
 * @param {HTMLElement} button The button of the function.
 */
const showCapabilities = (button) => {
    getStrings([
        {key: 'function_capabilities_title', component: 'local_servicemanager'},
        {key: 'function_capabilities_help', component: 'local_servicemanager'},
    ]).then((strings) => {
        const capabilities = JSON.parse(button.dataset.capabilities);
        const description = button.dataset.description ? `<p class="sm-muted">${escapeHtml(button.dataset.description)}</p>` : '';
        const items = capabilities.map((name) => `<li class="list-group-item"><code>${escapeHtml(name)}</code></li>`).join('');
        return ModalCancel.create({
            title: strings[0],
            body: `<p><code>${escapeHtml(button.dataset.name)}</code></p>${description}` +
                `<p class="small sm-muted">${escapeHtml(strings[1])}</p><ul class="list-group sm-caps-list">${items}</ul>`,
            show: true,
            removeOnClose: true,
        });
    }).catch(() => null);
};

/**
 * Start the page.
 */
export const init = () => {
    const root = document.querySelector('[data-region="servicemanager-detail"]');
    if (!root) {
        return;
    }
    initCopy();

    const search = root.querySelector('#sm-functions-search');
    if (search) {
        const rows = [...root.querySelectorAll('[data-region="function"]')];
        const empty = root.querySelector('[data-region="functions-empty"]');
        search.addEventListener('input', () => {
            const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
            let shown = 0;
            rows.forEach((row) => {
                const match = words.every((word) => row.dataset.search.includes(word));
                row.hidden = !match;
                shown += match ? 1 : 0;
            });
            empty.hidden = shown !== 0;
        });
    }

    const filter = root.querySelector('#healthlog-status-filter');
    if (filter) {
        filter.addEventListener('change', () => {
            root.querySelectorAll('#healthlog-table tbody tr').forEach((row) => {
                row.hidden = filter.value !== '' && row.dataset.status !== filter.value;
            });
        });
    }

    root.addEventListener('click', (event) => {
        const capabilities = event.target.closest('[data-action="show-capabilities"]');
        if (capabilities) {
            showCapabilities(capabilities);
            return;
        }
        if (event.target.closest('[data-action="toggle-schema"]')) {
            postForm(root.dataset.bulkUrl, {
                sesskey: root.dataset.sesskey,
                action: root.dataset.enabled === '1' ? 'disable' : 'enable',
                ids: [root.dataset.id],
            });
        }
    });
};
