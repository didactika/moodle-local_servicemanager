import{useDropdown as i}from"../../hooks/useDropdown";import a from"./Icon";import{jsx as n,jsxs as o}from"react/jsx-runtime";/**
 * The button that opens the less used filters of a list, such as the dates and the size of the page.
 *
 * What is chosen in it applies at once, so there is nothing to confirm; it only has a way to put everything back.
 *
 * @module     local_servicemanager/components/common/FilterMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const d=({text:r,count:e,onReset:p,children:s})=>{const t=i();return o("div",{className:"dropdown sm-filter",ref:t.ref,children:[o("button",{className:`btn btn-outline-secondary${e>0?" active":""}`,type:"button","aria-haspopup":"true","aria-expanded":t.open,onClick:t.toggle,children:[n(a,{name:"sliders",gap:!0}),r("filters"),e>0&&n("span",{className:"badge text-bg-primary ms-2",children:e})]}),o("div",{className:`dropdown-menu dropdown-menu-end sm-filter-menu${t.open?" show":""}`,children:[s,o("button",{type:"button",className:"btn btn-link px-0",onClick:p,disabled:e===0,children:[n(a,{name:"rotate-left",gap:!0}),r("filter_clear")]})]})]})};var u=d;export{u as default};
