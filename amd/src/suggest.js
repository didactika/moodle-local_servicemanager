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
 * What the autocomplete fields of the guided form ask for while the person types.
 *
 * Moodle's autocomplete takes a module that has a transport, which gets what was typed, and a processResults, which turns
 * the answer into the options. The kind of what is suggested comes from the name of the field.
 *
 * @module     local_servicemanager/suggest
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Ajax from 'core/ajax';

/** What each field of the form suggests. */
const KINDS = {
    functions: 'function',
    optionalfunctions: 'function',
    extracapabilities: 'capability',
    prevent: 'capability',
    prohibit: 'capability',
    plugins: 'plugin',
    additionalusers: 'user',
};

/**
 * Ask for the suggestions of what was typed.
 *
 * @param {String} selector Selector of the field.
 * @param {String} query What was typed.
 * @param {Function} success Called with the answer.
 * @param {Function} failure Called with the error.
 */
export const transport = (selector, query, success, failure) => {
    const field = selector.replace(/^#id_/, '');
    const kind = KINDS[field];
    if (!kind) {
        success([]);
        return;
    }
    Ajax.call([{
        methodname: 'local_servicemanager_get_suggestions',
        args: {kind, query: query || ''}
    }])[0].then(success).catch(failure);
};

/**
 * Turn the answer into the options of the field.
 *
 * @param {String} selector Selector of the field.
 * @param {Array} results What the server suggested.
 * @returns {Array} The options.
 */
export const processResults = (selector, results) => results.map((result) => ({value: result.value, label: result.label}));
