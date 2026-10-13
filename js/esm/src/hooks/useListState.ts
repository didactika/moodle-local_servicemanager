// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * What the person asked of a list, kept in the address of the page so that a refresh or a shared link shows the same list.
 *
 * Changing the state filters the list at once and never reloads the page; the address follows a moment later.
 *
 * @module     local_servicemanager/hooks/useListState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useCallback, useEffect, useRef, useState} from 'react';
import {parseState, stateQuery, type ListState} from '../lib/listing';

/** Milliseconds after the last change before the address follows. */
const ADDRESS_DELAY = 300;

/** The state and the ways to change it. */
export interface ListControl {
    state: ListState;
    /** Change some of what was asked; a change of anything but the page goes back to the first page. */
    set: (changes: Partial<ListState>) => void;
    /** Ask for nothing. */
    reset: () => void;
    /** How many of the optional filters are on, not counting the search and the status. */
    extras: number;
}

/**
 * Keep the state of a list.
 *
 * @param perpage Size of the page when the address does not say.
 * @param options Sizes of page that exist.
 * @returns The state and how to change it.
 */
export const useListState = (perpage: number, options: number[]): ListControl => {
    const [state, setState] = useState<ListState>(() => parseState(window.location.search, perpage, options));
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            const url = window.location.pathname + stateQuery(state, perpage) + window.location.hash;
            window.history.replaceState(window.history.state, '', url);
        }, ADDRESS_DELAY);
        return () => window.clearTimeout(timer.current);
    }, [state, perpage]);

    const set = useCallback((changes: Partial<ListState>) => {
        setState((before) => ({...before, page: 0, ...changes}));
    }, []);

    const reset = useCallback(() => {
        setState({query: '', status: '', from: '', to: '', perpage, page: 0});
    }, [perpage]);

    const extras = (state.from ? 1 : 0) + (state.to ? 1 : 0) + (state.perpage !== perpage ? 1 : 0);
    return {state, set, reset, extras};
};
