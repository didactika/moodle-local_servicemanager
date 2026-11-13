/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Which pages of a list a person can go to from the one they are on.
 *
 * @module     local_servicemanager/lib/paging
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** The sizes a page of a list may have, 0 being every row at once. */
export const PAGE_SIZES = [12, 24, 48, 96, 0];

/**
 * The rows a page covers, counted from one, and none when the list is empty.
 *
 * @param page Current page, counted from 0.
 * @param perpage Rows on a page, 0 for all of them.
 * @param total Rows of the list.
 * @returns The first and the last row of the page.
 */
export const pageRange = (page: number, perpage: number, total: number): {from: number; to: number} => {
    const size = perpage > 0 ? perpage : Math.max(total, 1);
    return {from: total === 0 ? 0 : (page * size) + 1, to: Math.min(total, (page + 1) * size)};
};

/**
 * The sizes a pager offers for a list, the ones smaller than it and all of it, and the one it shows: All when every row fits
 * on the page. A list of up to 12 rows offers All only; one of 13 to 24 offers 12 and All; and so on up to 12, 24, 48, 96, All.
 *
 * @param perpage Rows per page, 0 for all of them.
 * @param total How many rows there are.
 * @returns The sizes and the one shown.
 */
export const fitPageSizes = (perpage: number, total: number): {sizes: number[]; shown: number} => ({
    sizes: PAGE_SIZES.filter((size) => size === 0 || size < total),
    shown: perpage > 0 && perpage < total ? perpage : 0,
});

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
