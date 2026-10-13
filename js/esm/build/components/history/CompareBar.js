import r from"../common/Icon";import{jsx as a,jsxs as s}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What the person has chosen to compare and the button that compares it. It floats at the bottom of the screen, as the bar of the
 * schemas of the dashboard does, so it is at hand however long the list is.
 *
 * @module     local_servicemanager/components/history/CompareBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=({chosen:o,needed:n,tooMany:t,onClear:p,text:e})=>s("div",{className:"sm-floating sm-compare",role:"status","data-region":"compare-bar",children:[[...o].map(m=>a("input",{type:"hidden",name:"compare[]",value:m},m)),a("span",{className:"sm-floating-count","data-region":"compare-chosen",children:a("span",{children:e("compare_chosen",{n:o.size,total:n})})}),t&&a("span",{className:"sm-compare-warning",role:"alert",children:e("compare_select_two")}),a("div",{className:"sm-floating-actions",children:s("button",{type:"submit",id:"compare-btn",className:"btn sm-pill solid tone-primary",disabled:o.size!==n,children:[a(r,{name:"code-compare",gap:!0}),e("compare_versions")]})}),s("button",{type:"button",className:"sm-floating-clear",onClick:p,title:e("compare_clear"),children:[a(r,{name:"xmark"}),a("span",{className:"visually-hidden",children:e("compare_clear")})]})]});var i=l;export{i as default};
