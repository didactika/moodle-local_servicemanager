import m from"../common/Icon";import{jsx as a,jsxs as e}from"react/jsx-runtime";/**
 * The bar that follows the person down the history while they pick the two versions to compare.
 *
 * @module     local_servicemanager/components/history/CompareBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=({chosen:o,needed:s,tooMany:p,onClear:n,text:r})=>e("div",{className:"sm-compare-bar",role:"status","data-region":"compare-bar",children:[[...o].map(t=>a("input",{type:"hidden",name:"compare[]",value:t},t)),e("div",{className:"d-flex align-items-center flex-wrap sm-actions-row",children:[a("span",{className:"fw-bold",children:r("compare_chosen",{n:o.size,total:s})}),p&&a("span",{className:"text-danger",role:"alert",children:r("compare_select_two")}),e("div",{className:"ms-auto sm-group",children:[o.size>0&&e("button",{type:"button",className:"btn sm-pill",onClick:n,children:[a(m,{name:"xmark",gap:!0}),r("compare_clear")]}),e("button",{type:"submit",id:"compare-btn",className:"btn sm-pill solid tone-primary",disabled:o.size!==s,children:[a(m,{name:"code-compare",gap:!0}),r("compare_versions")]})]})]})]});var c=l;export{c as default};
