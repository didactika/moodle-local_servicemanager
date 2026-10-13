/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a list shows for what the person asked: the rows that match a search, a status and a range of dates, and the page of them.
 *
 * The lists are filtered in the page, so nothing here touches the server, the DOM or React.
 *
 * @module     local_servicemanager/lib/listing
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** What a person asked of a list. */
export interface ListState {
    query: string;
    /** A status, or an empty text for all of them. */
    status: string;
    /** First day of the range, as a date field writes it. */
    from: string;
    /** Last day of the range, as a date field writes it. */
    to: string;
    perpage: number;
    /** Page, counted from 0. */
    page: number;
}

/** What a row has to say for the filters to find it. */
export interface Findable {
    /** Texts that the search looks in. */
    texts: string[];
    status?: string;
    /** Unix time of the row. */
    at: number;
}

/**
 * Read what was asked from the query of an address.
 *
 * @param search The query of the address, with or without the question mark.
 * @param perpage Size of the page when the address does not say.
 * @param options Sizes of page that exist.
 * @returns The state.
 */
export const parseState = (search: string, perpage: number, options: number[]): ListState => {
    const params = new URLSearchParams(search);
    const asked = Number(params.get('perpage'));
    const page = Number(params.get('page'));
    return {
        query: params.get('q') ?? '',
        status: params.get('status') ?? '',
        from: params.get('from') ?? '',
        to: params.get('to') ?? '',
        perpage: options.includes(asked) ? asked : perpage,
        page: Number.isInteger(page) && page > 0 ? page : 0,
    };
};

/**
 * The query of an address that says what was asked, leaving out what is the same as if nothing had been asked.
 *
 * @param state What was asked.
 * @param perpage Size of the page when nothing is asked.
 * @returns The query, with the question mark when there is any.
 */
export const stateQuery = (state: ListState, perpage: number): string => {
    const params = new URLSearchParams();
    if (state.query) {
        params.set('q', state.query);
    }
    if (state.status) {
        params.set('status', state.status);
    }
    if (state.from) {
        params.set('from', state.from);
    }
    if (state.to) {
        params.set('to', state.to);
    }
    if (state.perpage !== perpage) {
        params.set('perpage', String(state.perpage));
    }
    if (state.page > 0) {
        params.set('page', String(state.page));
    }
    const text = params.toString();
    return text ? '?' + text : '';
};

/**
 * The start of the day a date field names, in Unix time.
 *
 * @param day The date, such as 2026-10-13.
 * @param end True for the last second of the day.
 * @returns Seconds since 1970, or null when there is no date.
 */
const dayTime = (day: string, end: boolean): number | null => {
    if (!day) {
        return null;
    }
    const start = new Date(day + 'T00:00:00').getTime() / 1000;
    return Number.isNaN(start) ? null : start + (end ? 86399 : 0);
};

/**
 * Whether a row is what was asked for.
 *
 * @param row The row.
 * @param state What was asked.
 * @returns True when the row is shown.
 */
export const matches = (row: Findable, state: ListState): boolean => {
    if (state.status && row.status !== state.status) {
        return false;
    }
    const from = dayTime(state.from, false);
    const to = dayTime(state.to, true);
    if ((from !== null && row.at < from) || (to !== null && row.at > to)) {
        return false;
    }
    const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        return true;
    }
    const haystack = row.texts.join(' ').toLowerCase();
    return words.every((word) => haystack.includes(word));
};

/** A page of a list. */
export interface Page<T> {
    rows: T[];
    /** The page, counted from 0, which is the last one that exists when a later one was asked for. */
    page: number;
    pages: number;
    total: number;
}

/**
 * The rows of one page.
 *
 * @param rows All the rows.
 * @param page Page, counted from 0.
 * @param perpage Rows on a page.
 * @returns The page.
 */
export const paginate = <T>(rows: T[], page: number, perpage: number): Page<T> => {
    const pages = Math.max(1, Math.ceil(rows.length / Math.max(1, perpage)));
    const at = Math.min(Math.max(0, page), pages - 1);
    return {rows: rows.slice(at * perpage, (at + 1) * perpage), page: at, pages, total: rows.length};
};

/**
 * How many rows there are of each status.
 *
 * @param rows The rows.
 * @returns The count of each status that appears.
 */
export const countBy = (rows: Array<{status?: string}>): Record<string, number> => {
    const counts: Record<string, number> = {};
    for (const row of rows) {
        const key = row.status ?? '';
        counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
};
