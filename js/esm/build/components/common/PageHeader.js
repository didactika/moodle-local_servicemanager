import{jsx as e,jsxs as a}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The head of a page, as the design system draws it: the title with its badges and its line of context, and the actions
 * of the page at the other end; on a narrow screen the actions go under the title.
 *
 * @module     local_servicemanager/components/common/PageHeader
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const c=({title:t,subtitle:d,badges:i,actions:s})=>e("header",{className:"dd-page-header",children:a("div",{className:"dd-page-header-row",children:[e("div",{className:"dd-page-header-main",children:a("div",{children:[a("div",{className:"d-flex flex-wrap align-items-center gap-2",children:[e("h2",{className:"dd-page-title",children:t}),i]}),d&&e("p",{className:"dd-page-subtitle",children:d})]})}),s&&e("div",{className:"dd-page-actions",children:s})]})});var r=c;export{r as default};
