import{jsx as e,jsxs as a}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The head of a page: its title, a line that says what it is for and the actions that belong to the whole page.
 *
 * @module     local_servicemanager/components/common/PageHeader
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const c=({title:d,subtitle:t,badges:r,actions:s})=>a("header",{className:"d-flex flex-wrap justify-content-between align-items-start sm-page-header",children:[a("div",{className:"sm-page-title",children:[a("div",{className:"d-flex flex-wrap align-items-center sm-badges-row",children:[e("h2",{className:"mb-0",children:d}),r]}),t&&e("p",{className:"text-body-secondary mb-0 mt-1",children:t})]}),s&&e("div",{className:"d-flex flex-wrap align-items-center sm-actions-row",children:s})]});var l=c;export{l as default};
