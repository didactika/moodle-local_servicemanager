/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Text of the page, which the server sends once with the properties of the component.
 *
 * @module     local_servicemanager/engine/text
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {Text} from '../types';

/**
 * Create the function that looks a text up.
 *
 * @param strings Texts by name, where {n} marks the place of a value, or {name} the place of each value when there are several.
 * @returns Function that returns the text, with the values in place.
 */
export const createText = (strings: Record<string, string>): Text => (name, value = '') => {
    const text = strings[name] ?? '';
    if (value !== null && typeof value === 'object') {
        return Object.keys(value).reduce((result, key) => result.split(`{${key}}`).join(String(value[key])), text);
    }
    return text.replace('{n}', String(value));
};
