// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The schemas chosen in the list, and what can be done with them together.
 *
 * @module     local_servicemanager/hooks/useBulkSelection
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useCallback, useMemo, useState} from 'react';
import {bulkActions, type BulkActions} from '../lib/selection';
import type {SchemaRow} from '../types';

/** The choice and the ways to change it. */
export interface BulkSelection {
    chosen: ReadonlySet<number>;
    allChosen: boolean;
    actions: BulkActions;
    toggle: (id: number) => void;
    toggleAll: () => void;
    clear: () => void;
}

/**
 * Keep the choice of schemas of the page.
 *
 * @param rows The schemas that are shown, which the box at the head of the list chooses.
 * @param all Every schema, which the actions on the choice are worked out from, because a choice outlives a change of page.
 * @returns The choice, which schemas it allows enabling or disabling, and how to change it.
 */
export const useBulkSelection = (rows: SchemaRow[], all: SchemaRow[] = rows): BulkSelection => {
    const [chosen, setChosen] = useState<ReadonlySet<number>>(new Set());

    const toggle = useCallback((id: number) => {
        setChosen((before) => {
            const next = new Set(before);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    const allChosen = rows.length > 0 && rows.every((row) => chosen.has(row.id));
    const toggleAll = useCallback(() => {
        setChosen(allChosen ? new Set() : new Set(rows.map((row) => row.id)));
    }, [allChosen, rows]);

    const clear = useCallback(() => setChosen(new Set()), []);
    const actions = useMemo(() => bulkActions(all, chosen), [all, chosen]);
    return {chosen, allChosen, actions, toggle, toggleAll, clear};
};
