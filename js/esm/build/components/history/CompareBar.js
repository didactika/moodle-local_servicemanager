import l from"../common/Icon";import{jsx as e,jsxs as p}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The floating bar of the design system while versions are chosen to compare: how many of the two are chosen, a warning when a
 * third one was tried, the button that compares them and the one that clears the choice.
 *
 * @module     local_servicemanager/components/history/CompareBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=({chosen:o,needed:r,tooMany:t,onClear:s,text:a})=>p("div",{className:"card",role:"region","aria-label":a("compare_versions"),"data-region":"compare-bar",children:[[...o].map(n=>e("input",{type:"hidden",name:"compare[]",value:n},n)),e("span",{className:"fw-bold text-nowrap",role:"status","data-region":"compare-chosen",children:a("compare_chosen",{n:o.size,total:r})}),t&&e("span",{className:"text-danger small",role:"alert",children:a("compare_select_two")}),e("div",{className:"d-flex flex-wrap gap-2",children:p("button",{type:"submit",id:"compare-btn",className:"btn btn-primary btn-sm",disabled:o.size!==r,children:[e(l,{name:"code-compare",gap:!0}),a("compare_versions")]})}),e("button",{type:"button",className:"btn-close",onClick:s,title:a("compare_clear"),"aria-label":a("compare_clear")})]});var i=m;export{i as default};
