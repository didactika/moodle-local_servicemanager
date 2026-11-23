// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * The menus of the plugin: a button that opens the list next to it and closes it when the person goes elsewhere.
 *
 * Bootstrap 4 and Bootstrap 5 name their attributes differently, so the menus are opened here instead of with data attributes of
 * either one, which keeps them working on every release the plugin supports.
 *
 * @module     local_servicemanager/menu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** Selector of the buttons that open a menu. */
const TOGGLE = '[data-sm-menu]';

/**
 * Close every menu that is open, except one.
 *
 * @param {HTMLElement} root Where to look for menus.
 * @param {HTMLElement|null} keep The menu that stays open.
 */
const closeAll = (root, keep = null) => {
    root.querySelectorAll(TOGGLE).forEach((button) => {
        const holder = button.closest('.dropdown');
        if (holder === keep) {
            return;
        }
        button.setAttribute('aria-expanded', 'false');
        const menu = holder.querySelector('.dropdown-menu');
        if (menu) {
            menu.classList.remove('show');
        }
    });
};

/**
 * Float a menu next to its button when it sits in a box that scrolls, such as the table of a list, so the box never cuts it.
 * It opens under the button, aligned to its end, or over it when there is no room below.
 *
 * @param {HTMLElement} button The button that opens the menu.
 * @param {HTMLElement} menu The menu.
 */
const place = (button, menu) => {
    menu.style.position = '';
    menu.style.inset = '';
    if (!button.closest('.table-responsive')) {
        return;
    }
    const gap = 2;
    const edge = 8;
    menu.style.position = 'fixed';
    menu.style.inset = '0 auto auto 0';
    const rect = button.getBoundingClientRect();
    const width = menu.offsetWidth;
    const height = menu.offsetHeight;
    const left = Math.max(edge, Math.min(rect.right - width, window.innerWidth - width - edge));
    const below = rect.bottom + gap;
    const top = below + height > window.innerHeight - edge ? Math.max(edge, rect.top - height - gap) : below;
    // A theme may give an ancestor a transform, which moves the origin of a fixed box; where the menu landed at 0 says where it is.
    const origin = menu.getBoundingClientRect();
    menu.style.inset = `${top - origin.top}px auto auto ${left - origin.left}px`;
};

/**
 * Make the menus inside an element work.
 *
 * @param {HTMLElement} root The element that holds the menus.
 */
export const init = (root) => {
    root.addEventListener('click', (event) => {
        const button = event.target.closest(TOGGLE);
        if (!button) {
            if (!event.target.closest('[data-menu]')) {
                closeAll(root);
            }
            return;
        }
        const holder = button.closest('.dropdown');
        const menu = holder.querySelector('.dropdown-menu');
        const opening = !menu.classList.contains('show');
        closeAll(root, holder);
        menu.classList.toggle('show', opening);
        button.setAttribute('aria-expanded', opening ? 'true' : 'false');
        if (opening) {
            place(button, menu);
        }
    });
    // A floating menu would stay behind while its row scrolls away, so scrolling closes it.
    root.addEventListener('scroll', (event) => {
        if (event.target.closest && event.target.closest('.table-responsive')) {
            closeAll(root);
        }
    }, true);
    window.addEventListener('resize', () => closeAll(root));
    root.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAll(root);
        }
    });
    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            closeAll(root);
        }
    });
};

export const close = closeAll;
