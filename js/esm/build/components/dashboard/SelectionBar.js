import t from"../common/Icon";import{jsx as o,jsxs as a}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What can be done with the schemas that were chosen. It floats at the bottom of the screen while there is a choice, so the page
 * does not move and the actions are always at hand.
 *
 * @module     local_servicemanager/components/dashboard/SelectionBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const c=({count:s,actions:n,onAction:l,onClear:i,text:e})=>a("div",{className:"sm-floating","data-region":"bulk-actions",role:"status",children:[o("span",{className:"sm-floating-count",children:a("span",{children:[s," ",e("selected")]})}),a("div",{className:"sm-floating-actions",role:"group","aria-label":e("core_actions"),children:[n.enable&&a("button",{type:"button",className:"sm-pill tone-success",onClick:()=>l("enable"),children:[o(t,{name:"toggle-on",gap:!0}),e("bulk_enable")]}),n.disable&&a("button",{type:"button",className:"sm-pill tone-warning",onClick:()=>l("disable"),children:[o(t,{name:"toggle-off",gap:!0}),e("bulk_disable")]}),a("button",{type:"button",className:"sm-pill tone-info",onClick:()=>l("export"),children:[o(t,{name:"download",gap:!0}),e("bulk_export")]}),a("button",{type:"button",className:"sm-pill tone-danger",onClick:()=>l("delete"),children:[o(t,{name:"trash",gap:!0}),e("bulk_delete")]})]}),a("button",{type:"button",className:"sm-floating-clear",onClick:i,title:e("compare_clear"),children:[o(t,{name:"xmark"}),o("span",{className:"visually-hidden",children:e("compare_clear")})]})]});var b=c;export{b as default};
