// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Which pages of a list a person can go to from the one they are on.
 *
 * @module     local_servicemanager/lib/paging
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** The links of a pagination bar. */
export interface PageWindow {
    /** Number of pages of the list. */
    pages: number;
    /** Pages shown as numbers, counted from 0. */
    shown: number[];
    first: boolean;
    previous: boolean;
    next: boolean;
    last: boolean;
    startDots: boolean;
    endDots: boolean;
}

/**
 * The pages to link to from a page of a list: two on each side of the current one, the ends and the neighbours.
 *
 * @param page Current page, counted from 0.
 * @param perpage Rows on a page.
 * @param total Rows of the list.
 * @returns The window, with no links at all when everything fits on a page.
 */
export const pageWindow = (page: number, perpage: number, total: number): PageWindow => {
    const pages = Math.max(1, Math.ceil(total / Math.max(1, perpage)));
    const start = Math.max(0, page - 2);
    const end = Math.min(pages - 1, page + 2);
    const shown: number[] = [];
    for (let index = start; index <= end; index++) {
        shown.push(index);
    }
    return {
        pages,
        shown,
        first: page > 1,
        previous: page > 0,
        next: page < pages - 1,
        last: page < pages - 2,
        startDots: start > 0,
        endDots: end < pages - 1,
    };
};

/**
 * The address of a page of a list.
 *
 * @param base Address of the list with its filters, which may already name a page.
 * @param page Page, counted from 0.
 * @returns The address of that page.
 */
export const pageUrl = (base: string, page: number): string => {
    const [path, query = ''] = base.split('?');
    const kept = query.split('&').filter((part) => part !== '' && !part.startsWith('page='));
    return path + '?' + [...kept, 'page=' + page].join('&');
};
