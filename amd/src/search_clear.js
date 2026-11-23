// This file is part of Moodle - https://moodle.org/
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
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * The button that empties a search field of the plugin: a round icon button, as the actions of a row, shown while the field
 * holds text. It takes the place of the cross the browser draws, which neither looks like a button nor follows the theme.
 * Emptying the field fires input, as typing does, so the lists and menus react to it as usual.
 *
 * @module     local_servicemanager/search_clear
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_string as getString} from 'core/str';
import Templates from 'core/templates';

/** The search fields of the screens and dialogs of the plugin. */
const FIELD = ':is(.lsm, .modal) [role="search"] input[type="search"]';

let installed = false;
let parts = null;

/**
 * The label and the icon of the button, asked for once.
 *
 * @returns {Promise<Array>}
 */
const load = () => {
    if (!parts) {
        parts = Promise.all([getString('clear', 'moodle'), Templates.renderPix('e/cancel', 'core')]);
    }
    return parts;
};

/**
 * Shows the button of a field while it holds text, and adds it the first time.
 *
 * @param {HTMLInputElement} field The search field.
 */
const sync = async(field) => {
    const box = field.parentElement;
    let button = box.querySelector(':scope > [data-action="clear-search"]');
    if (!button && field.value === '') {
        return;
    }
    if (!button) {
        const [label, icon] = await load();
        button = box.querySelector(':scope > [data-action="clear-search"]');
        if (!button) {
            button = document.createElement('button');
            button.type = 'button';
            button.className = 'btn btn-link btn-icon btn-sm';
            button.dataset.action = 'clear-search';
            button.title = label;
            button.setAttribute('aria-label', label);
            button.innerHTML = icon;
            box.append(button);
        }
    }
    button.hidden = field.value === '';
};

/**
 * Makes the search fields of the plugin show their button. It is installed once per page.
 */
export const init = () => {
    if (installed) {
        return;
    }
    installed = true;
    document.addEventListener('input', (event) => {
        const field = event.target instanceof Element ? event.target.closest(FIELD) : null;
        if (field) {
            sync(field);
        }
    }, true);
    document.addEventListener('click', (event) => {
        const button = event.target instanceof Element ? event.target.closest('[data-action="clear-search"]') : null;
        if (button) {
            const field = button.parentElement.querySelector('input[type="search"]');
            field.value = '';
            field.dispatchEvent(new Event('input', {bubbles: true}));
            button.hidden = true;
            field.focus();
            return;
        }
        // A field emptied by its page, as the button that clears every filter does, hides its button as well.
        setTimeout(() => document.querySelectorAll(FIELD).forEach((field) => {
            if (field.value === '') {
                sync(field);
            }
        }), 0);
    });
};
