import{useDropdown as s}from"../../hooks/useDropdown";import l from"./FilterClearIcon";import m from"./FilterIcon";import{jsx as e,jsxs as a}from"react/jsx-runtime";/**
 * The button that opens the less used filters of a list, such as the dates and the size of the page.
 *
 * What is chosen in it applies at once, so there is nothing to confirm; it only has a way to put everything back.
 *
 * @module     local_servicemanager/components/common/FilterMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const p=({text:t,count:o,onReset:n,children:i})=>{const r=s();return a("div",{className:"dropdown sm-filter",ref:r.ref,children:[a("button",{className:`btn btn-outline-secondary${o>0?" active":""}`,type:"button","aria-haspopup":"true","aria-expanded":r.open,onClick:r.toggle,children:[e("span",{className:"sm-icon-gap",children:e(m,{})}),t("filters"),o>0&&e("span",{className:"sm-count-badge",children:o})]}),a("div",{className:`dropdown-menu dropdown-menu-end sm-filter-menu${r.open?" show":""}`,children:[a("div",{className:"sm-filter-head",children:[e("h2",{className:"sm-filter-heading",children:t("filters")}),e("button",{type:"button",className:"sm-iconbtn",onClick:n,disabled:o===0,title:t("filter_clear"),"aria-label":t("filter_clear"),children:e(l,{})})]}),i]})]})};var u=p;export{u as default};
