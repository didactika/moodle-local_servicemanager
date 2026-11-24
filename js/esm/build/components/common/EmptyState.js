import c from"./Icon";import{jsx as e,jsxs as r}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a page or a list says when it has nothing, as the design system draws it: the icon in its tile, the title, the
 * explanation and what to do.
 *
 * @module     local_servicemanager/components/common/EmptyState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=({icon:s,title:o,text:n,actions:t,bare:p=!1})=>{const a=r("div",{className:"d-flex flex-column align-items-center gap-2 px-4 py-5 text-center","data-region":"empty",children:[e("span",{className:"icon-box",children:e(c,{name:s})}),e("p",{className:"fw-bold mb-0",children:o}),e("p",{className:"text-muted mb-0",children:n}),t&&e("div",{className:"d-flex flex-wrap justify-content-center gap-2",children:t})]});return p?a:e("div",{className:"card",children:a})};var l=m;export{l as default};
