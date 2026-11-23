/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A menu that opens and closes: with its button, with Escape and with a click anywhere else.
 *
 * A menu in a box that scrolls, such as the table of a list, floats next to its button, so the box never cuts it, and
 * closes when the box scrolls or the window changes size.
 *
 * @module     local_servicemanager/hooks/useDropdown
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject} from 'react';

/** What the component that has the menu needs. */
export interface Dropdown {
    open: boolean;
    toggle: () => void;
    /** Goes on the element that holds the button and the menu, so a click inside it does not close the menu. */
    ref: RefObject<HTMLDivElement | null>;
}

/**
 * Float a menu under its button, aligned to its end, or over it when there is no room below.
 *
 * @param holder The element that holds the button and the menu.
 */
export const place = (holder: HTMLElement) => {
    const button = holder.querySelector<HTMLElement>('button');
    const menu = holder.querySelector<HTMLElement>('.dropdown-menu');
    if (!button || !menu) {
        return;
    }
    menu.style.position = '';
    menu.style.inset = '';
    if (!holder.closest('.table-responsive') || !menu.classList.contains('show')) {
        return;
    }
    const gap = 2;
    const edge = 8;
    // The menu floats before it is measured, since its width depends on where it sits.
    menu.style.position = 'fixed';
    menu.style.inset = '0 auto auto 0';
    const rect = button.getBoundingClientRect();
    const left = Math.max(edge, Math.min(rect.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - edge));
    const below = rect.bottom + gap;
    const top = below + menu.offsetHeight > window.innerHeight - edge ? Math.max(edge, rect.top - menu.offsetHeight - gap) : below;
    // A theme may give an ancestor a transform, which moves the origin of a fixed box; where the menu landed at 0 says where it is.
    const origin = menu.getBoundingClientRect();
    menu.style.inset = `${top - origin.top}px auto auto ${left - origin.left}px`;
};

/**
 * Keep the state of a menu.
 *
 * @returns Whether the menu is open, how to toggle it and the element that holds it.
 */
export const useDropdown = (): Dropdown => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const toggle = useCallback(() => setOpen((before) => !before), []);

    useLayoutEffect(() => {
        if (ref.current) {
            place(ref.current);
        }
    }, [open]);

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
        const scrolled = (event: Event) => {
            const box = event.target instanceof Element ? event.target : null;
            if (box && box.classList.contains('table-responsive') && box.contains(ref.current)) {
                setOpen(false);
            }
        };
        const resized = () => setOpen(false);
        document.addEventListener('mousedown', away);
        document.addEventListener('keydown', escape);
        document.addEventListener('scroll', scrolled, true);
        window.addEventListener('resize', resized);
        return () => {
            document.removeEventListener('mousedown', away);
            document.removeEventListener('keydown', escape);
            document.removeEventListener('scroll', scrolled, true);
            window.removeEventListener('resize', resized);
        };
    }, [open]);

    return {open, toggle, ref};
};
