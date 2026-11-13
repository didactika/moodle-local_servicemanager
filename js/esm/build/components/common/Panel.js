import i from"./Icon";import{jsx as e,jsxs as a}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A card of Bootstrap with a head: the icon and the title of what it holds, how many there are, and its actions.
 *
 * @module     local_servicemanager/components/common/Panel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=({title:t,icon:s,count:n,actions:d,flush:o=!1,region:r,children:c})=>a("section",{className:"card","data-region":r,children:[a("header",{className:"card-header d-flex flex-wrap align-items-center justify-content-between gap-2",children:[a("h3",{className:"h6 mb-0 d-flex align-items-center gap-2",children:[e("span",{className:"text-muted",children:e(i,{name:s})}),t,n!==void 0&&e("span",{className:"badge badge-soft rounded-pill text-bg-secondary",children:n})]}),d]}),e("div",{className:o?void 0:"card-body",children:c})]});var p=l;export{p as default};
