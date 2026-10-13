// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Addresses of the lists, which are the same list with another filter.
 *
 * @module     local_servicemanager/lib/url
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * The address of a list with one of its parameters set, or taken out when the value is empty. Going to another filter starts at
 * the first page, so the page is always taken out.
 *
 * @param base Address of the list, which may already have parameters.
 * @param name Parameter to set.
 * @param value Its value, or an empty text to take it out.
 * @returns The address.
 */
export const withParam = (base: string, name: string, value: string): string => {
    const [path, query = ''] = base.split('?');
    const kept = query.split('&').filter((part) => part !== '' && !part.startsWith(name + '=') && !part.startsWith('page='));
    if (value !== '') {
        kept.push(name + '=' + encodeURIComponent(value));
    }
    return kept.length ? path + '?' + kept.join('&') : path;
};
