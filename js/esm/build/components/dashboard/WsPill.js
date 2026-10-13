import i from"../common/Icon";import{jsx as c,jsxs as l}from"react/jsx-runtime";/**
 * Whether the web services of the site work, in a line: the state, the protocols that are on and where to change them.
 *
 * @module     local_servicemanager/components/dashboard/WsPill
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const o={disabled:{tone:"danger",label:"ws_status_disabled",icon:"plug-circle-xmark"},warning:{tone:"warning",label:"ws_status_warning",icon:"plug-circle-exclamation"},operational:{tone:"success",label:"ws_status_operational",icon:"plug-circle-check"}},r=({status:s,canManage:t,text:e})=>{const n=o[s.level];return l("span",{className:"d-inline-flex flex-wrap align-items-center sm-badges-row","data-region":"ws-status",children:[l("span",{className:`badge text-bg-${n.tone}`,children:[c(i,{name:n.icon,gap:!0}),e("tile_services"),": ",e(n.label)]}),s.protocols.map(a=>l("span",{className:`sm-protocol ${a.enabled?"on":"off"}`,title:e(a.enabled?"ws_enabled_label":"ws_disabled_label"),children:[c(i,{name:a.enabled?"circle-check":"circle-minus",gap:!0}),a.name,l("span",{className:"visually-hidden",children:[" ",e(a.enabled?"ws_enabled_label":"ws_disabled_label")]})]},a.name)),t&&s.protocolsUrl&&l("a",{href:s.protocolsUrl,className:"btn btn-sm btn-outline-secondary",title:e("ws_manage_protocols_link"),children:[c(i,{name:"gear",gap:!0}),e("tile_manage")]})]})};var p=r;export{p as default};
