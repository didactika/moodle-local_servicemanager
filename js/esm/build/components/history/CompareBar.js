import m from"../common/Icon";import{jsx as e,jsxs as n}from"react/jsx-runtime";/**
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
 */const p=({chosen:o,needed:r,tooMany:s,onClear:l,text:a})=>n("div",{className:"dd-floatbar",role:"region","aria-label":a("compare_versions"),"data-region":"compare-bar",children:[[...o].map(t=>e("input",{type:"hidden",name:"compare[]",value:t},t)),e("span",{className:"dd-floatbar-count",role:"status","data-region":"compare-chosen",children:a("compare_chosen",{n:o.size,total:r})}),s&&e("span",{className:"text-danger small",role:"alert",children:a("compare_select_two")}),e("div",{className:"dd-floatbar-actions",children:n("button",{type:"submit",id:"compare-btn",className:"btn btn-primary btn-sm",disabled:o.size!==r,children:[e(m,{name:"code-compare",gap:!0}),a("compare_versions")]})}),e("button",{type:"button",className:"dd-floatbar-clear",onClick:l,title:a("compare_clear"),"aria-label":a("compare_clear")})]});var i=p;export{i as default};
