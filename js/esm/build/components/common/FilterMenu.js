import{useDropdown as s}from"../../hooks/useDropdown";import l from"./FilterClearIcon";import m from"./Icon";import{jsx as e,jsxs as a}from"react/jsx-runtime";/**
 * The button that opens the less used filters of a list, such as the dates and the size of the page.
 *
 * What is chosen in it applies at once, so there is nothing to confirm; it only has a way to put everything back.
 *
 * @module     local_servicemanager/components/common/FilterMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const d=({text:t,count:r,onReset:n,children:i})=>{const o=s();return a("div",{className:"dropdown sm-filter",ref:o.ref,children:[a("button",{className:`btn btn-outline-secondary${r>0?" active":""}`,type:"button","aria-haspopup":"true","aria-expanded":o.open,onClick:o.toggle,children:[e(m,{name:"sliders",gap:!0}),t("filters"),r>0&&e("span",{className:"badge text-bg-primary ms-2",children:r})]}),a("div",{className:`dropdown-menu dropdown-menu-end sm-filter-menu${o.open?" show":""}`,children:[a("div",{className:"sm-filter-head",children:[e("h2",{className:"sm-filter-heading",children:t("filters")}),e("button",{type:"button",className:"sm-iconbtn",onClick:n,disabled:r===0,title:t("filter_clear"),"aria-label":t("filter_clear"),children:e(l,{})})]}),i]})]})};var u=d;export{u as default};
