// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A menu that opens and closes: with its button, with Escape and with a click anywhere else.
 *
 * @module     local_servicemanager/hooks/useDropdown
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useCallback, useEffect, useRef, useState, type RefObject} from 'react';

/** What the component that has the menu needs. */
export interface Dropdown {
    open: boolean;
    toggle: () => void;
    /** Goes on the element that holds the button and the menu, so a click inside it does not close the menu. */
    ref: RefObject<HTMLDivElement | null>;
}

/**
 * Keep the state of a menu.
 *
 * @returns Whether the menu is open, how to toggle it and the element that holds it.
 */
export const useDropdown = (): Dropdown => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const toggle = useCallback(() => setOpen((before) => !before), []);

    useEffect(() => {
        if (!open) {
            return undefined;
        }
        const away = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const escape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', away);
        document.addEventListener('keydown', escape);
        return () => {
            document.removeEventListener('mousedown', away);
            document.removeEventListener('keydown', escape);
        };
    }, [open]);

    return {open, toggle, ref};
};
