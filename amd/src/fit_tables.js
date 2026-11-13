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
 * The height of the box of every table of the page: what is left of the window from where the box starts, less what comes under
 * it inside its card (the pager), so on a computer the filters, the table and the pager fit the window without scrolling the
 * page. It is one height whatever the table holds, at least 18rem, measured again when the window changes size or what is
 * above it moves it.
 *
 * @module     local_servicemanager/fit_tables
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** The least height of a box, in pixels (18rem), however short the window is. */
const LEAST = 288;

/** The room left under a box, in pixels, for the margin of the page. */
const ROOM = 24;

/** Whether the page already follows the size of the window. */
let started = false;

/**
 * Give every box of a table on the page the height the window leaves it.
 */
const fit = () => {
    document.querySelectorAll('[data-region="tablewrap"]').forEach((element) => {
        const box = element.getBoundingClientRect();
        const card = element.closest('.card');
        const below = card ? Math.max(0, card.getBoundingClientRect().bottom - box.bottom) : 0;
        const height = Math.max(LEAST, window.innerHeight - (box.top + window.scrollY) - below - ROOM);
        // On the card, so the empty state that may take the place of the table has the same height.
        (card || element).style.setProperty('--dd-table-h', height + 'px');
    });
};

/**
 * Fit the boxes of the tables now, and again when the window changes size.
 */
export const init = () => {
    fit();
    if (!started) {
        started = true;
        window.addEventListener('resize', fit);
        // Measured again when what is above a box finishes drawing and moves it.
        const observer = new ResizeObserver(fit);
        observer.observe(document.body);
        document.querySelectorAll('[data-region="tablewrap"]').forEach((box) => observer.observe(box.closest('.card') || box));
    }
};
