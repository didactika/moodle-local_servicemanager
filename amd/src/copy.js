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
 * Buttons that copy what is in another element, such as the token that was just generated or an example of YAML. The result is told
 * where Moodle tells everything else, so it is seen wherever the person is looking.
 *
 * @module     local_servicemanager/copy
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_strings as getStrings} from 'core/str';
import {add as addToast} from 'core/toast';

/**
 * Copy a text, with the clipboard of the browser when it has one and by selecting it when it does not.
 *
 * @param {String} value What to copy.
 * @param {HTMLElement} source The element it came from, which is selected when the clipboard is not there.
 * @returns {Promise} Resolves when the text was copied.
 */
const copyText = (value, source) => {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(value);
    }
    const field = source.matches('input, textarea') ? source : document.createElement('textarea');
    if (field !== source) {
        field.value = value;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
    }
    field.select();
    const done = document.execCommand('copy');
    if (field !== source) {
        field.remove();
    }
    return done ? Promise.resolve() : Promise.reject(new Error('copy'));
};

/**
 * Make the copy buttons of the page work.
 */
export const init = () => {
    document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-copy-target]');
        if (!button) {
            return;
        }
        const source = document.querySelector(button.dataset.copyTarget);
        if (!source) {
            return;
        }
        const value = source.matches('input, textarea') ? source.value : source.textContent;
        getStrings([
            {key: 'copied', component: 'local_servicemanager'},
            {key: 'copy_token_failed', component: 'local_servicemanager'},
        ]).then((strings) => copyText(value, source)
            .then(() => addToast(strings[0], {type: 'success'}))
            .catch(() => addToast(strings[1], {type: 'danger'}))
        ).catch(() => null);
    });
};
