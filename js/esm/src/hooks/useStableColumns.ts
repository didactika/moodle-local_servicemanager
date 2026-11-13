/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The columns of a table that keep their width.
 *
 * @module     local_servicemanager/hooks/useStableColumns
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useLayoutEffect} from 'react';
import type {RefObject} from 'react';

/**
 * Keeps the columns of a table still: once the table has rows, the width the browser gives each column is measured and kept, so a
 * filter, a sort or another page never moves them. They are measured again only when the box of the table changes width.
 *
 * @param table The table.
 * @param ready Whether the table has its first rows.
 */
export function useStableColumns(table: RefObject<HTMLTableElement | null>, ready: boolean): void {
    useLayoutEffect(() => {
        const element = table.current;
        const box = element?.parentElement;
        if (!element || !box || !ready) {
            return undefined;
        }
        const freeze = (): void => {
            const heads = Array.from(element.tHead?.rows[0]?.cells ?? []);
            element.style.tableLayout = '';
            heads.forEach((head) => {
                head.style.width = '';
            });
            const widths = heads.map((head) => head.getBoundingClientRect().width);
            heads.forEach((head, index) => {
                head.style.width = `${widths[index]}px`;
            });
            element.style.tableLayout = 'fixed';
        };
        freeze();
        let width = box.clientWidth;
        const observer = new ResizeObserver(() => {
            if (Math.abs(box.clientWidth - width) > 1) {
                width = box.clientWidth;
                freeze();
            }
        });
        observer.observe(box);
        return () => observer.disconnect();
    }, [ready]);
}
