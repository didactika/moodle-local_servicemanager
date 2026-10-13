import t from"../common/Icon";import{jsx as o,jsxs as e}from"react/jsx-runtime";/**
 * What can be done with the schemas that were chosen. It floats at the bottom of the screen while there is a choice, so the page
 * does not move and the actions are always at hand.
 *
 * @module     local_servicemanager/components/dashboard/SelectionBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const c=({count:s,actions:n,onAction:l,onClear:i,text:a})=>e("div",{className:"sm-floating","data-region":"bulk-actions",role:"status",children:[e("span",{className:"sm-floating-count",children:[e("span",{children:[o("strong",{children:s})," ",a("selected")]}),e("button",{type:"button",className:"sm-floating-clear",onClick:i,title:a("compare_clear"),children:[o(t,{name:"xmark"}),o("span",{className:"visually-hidden",children:a("compare_clear")})]})]}),e("div",{className:"sm-floating-actions",role:"group","aria-label":a("core_actions"),children:[n.enable&&e("button",{type:"button",className:"sm-pill tone-success",onClick:()=>l("enable"),children:[o(t,{name:"toggle-on",gap:!0}),a("bulk_enable")]}),n.disable&&e("button",{type:"button",className:"sm-pill tone-warning",onClick:()=>l("disable"),children:[o(t,{name:"toggle-off",gap:!0}),a("bulk_disable")]}),e("button",{type:"button",className:"sm-pill tone-info",onClick:()=>l("export"),children:[o(t,{name:"download",gap:!0}),a("bulk_export")]}),e("button",{type:"button",className:"sm-pill tone-danger",onClick:()=>l("delete"),children:[o(t,{name:"trash",gap:!0}),a("bulk_delete")]})]})]});var r=c;export{r as default};
