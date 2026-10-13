import i from"./Icon";import{jsx as e,jsxs as a}from"react/jsx-runtime";/**
 * A section of a page: a card with a title, an icon, how many things it holds and, when it has them, its own actions.
 *
 * Every section of every page is one, so they look the same.
 *
 * @module     local_servicemanager/components/common/Panel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=({title:s,icon:t,count:n,actions:o,flush:c=!1,region:d,children:r})=>a("section",{className:"card sm-panel","data-region":d,children:[a("header",{className:"card-header d-flex align-items-center justify-content-between",children:[a("h3",{className:"sm-panel-title mb-0",children:[e("span",{className:"sm-panel-icon text-body-secondary",children:e(i,{name:t,gap:!0})}),s,n!==void 0&&e("span",{className:"badge text-bg-secondary ms-2",children:n})]}),o]}),e("div",{className:c?void 0:"card-body",children:r})]});var p=l;export{p as default};
