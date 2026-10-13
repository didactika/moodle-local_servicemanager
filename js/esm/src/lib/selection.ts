// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * What the schemas chosen in the dashboard allow doing to them together.
 *
 * @module     local_servicemanager/lib/selection
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {SchemaRow} from '../types';

/** The actions that the chosen schemas allow. */
export interface BulkActions {
    /** At least one of them is disabled, so they can be enabled. */
    enable: boolean;
    /** At least one of them is enabled, so they can be disabled. */
    disable: boolean;
}

/**
 * The actions that make sense for a choice of schemas.
 *
 * @param rows All the schemas of the page.
 * @param chosen Ids of the chosen schemas.
 * @returns Which of enabling and disabling apply.
 */
export const bulkActions = (rows: SchemaRow[], chosen: ReadonlySet<number>): BulkActions => {
    const picked = rows.filter((row) => chosen.has(row.id));
    return {
        enable: picked.some((row) => !row.enabled),
        disable: picked.some((row) => row.enabled),
    };
};
