import{useDropdown as l}from"../../hooks/useDropdown";import r from"./Icon";import{jsx as e,jsxs as o}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The button that opens the less used filters of a list, such as the dates and the size of the page.
 *
 * What is chosen in it applies at once, so there is nothing to confirm; it only has a way to put everything back.
 *
 * @module     local_servicemanager/components/common/FilterMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=({text:t,count:a,onReset:s,children:i})=>{const n=l();return o("div",{className:"dropdown sm-filter",ref:n.ref,children:[o("button",{className:`btn btn-outline-secondary${a>0?" active":""}`,type:"button","aria-haspopup":"true","aria-expanded":n.open,onClick:n.toggle,children:[e("span",{className:"sm-icon-gap",children:e(r,{name:"filter"})}),t("filters"),a>0&&e("span",{className:"sm-count-badge",children:a})]}),o("div",{className:`dropdown-menu dropdown-menu-end sm-filter-menu${n.open?" show":""}`,children:[o("div",{className:"sm-filter-head",children:[e("h2",{className:"sm-filter-heading",children:t("filters")}),e("button",{type:"button",className:"sm-iconbtn",onClick:s,disabled:a===0,title:t("filter_clear"),"aria-label":t("filter_clear"),children:e(r,{name:"rotate-right"})})]}),i]})]})};var c=m;export{c as default};
