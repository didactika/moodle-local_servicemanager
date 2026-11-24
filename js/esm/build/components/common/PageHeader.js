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
 */const l=({title:i,subtitle:d,badges:s,actions:t})=>e("header",{className:"d-grid gap-3 pb-3 border-bottom",children:a("div",{className:"d-flex flex-wrap align-items-center justify-content-between gap-3",children:[e("div",{className:"d-flex align-items-center gap-3",children:a("div",{children:[a("div",{className:"d-flex flex-wrap align-items-center gap-2",children:[e("h2",{className:"h5 fw-bold mb-0",children:i}),s]}),d&&e("p",{className:"text-muted mb-0",children:d})]})}),t&&e("div",{className:"d-flex flex-wrap align-items-center gap-2",children:t})]})});var r=l;export{r as default};
