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
 * Make the menus inside an element work.
 *
 * @param {HTMLElement} root The element that holds the menus.
 */
export const init = (root) => {
    root.addEventListener('click', (event) => {
        const button = event.target.closest(TOGGLE);
        if (!button) {
            if (!event.target.closest('.sm-filter-menu')) {
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
    });
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
