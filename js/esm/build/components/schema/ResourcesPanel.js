import o from"../common/Icon";import c from"../common/Panel";import{jsx as r,jsxs as a}from"react/jsx-runtime";/**
 * The user, the role and the service that the plugin created for a schema, each linked to where Moodle manages it.
 *
 * @module     local_servicemanager/components/schema/ResourcesPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const n=({resources:s,text:l})=>{const i=[{label:l("service_user"),icon:"user",resource:s.user,detail:s.user?.username},{label:l("service_role"),icon:"shield-halved",resource:s.role,detail:s.role?.shortname},{label:l("external_service"),icon:"plug",resource:s.service,detail:s.service?.shortname}];return r(c,{title:l("provisioned_resources"),icon:"server",flush:!0,region:"resources",children:r("ul",{className:"list-group list-group-flush",children:i.filter(e=>e.resource).map(e=>a("li",{className:"list-group-item d-flex align-items-center",children:[r("span",{className:"sm-resource-icon text-body-secondary",children:r(o,{name:e.icon})}),a("div",{className:"flex-grow-1 sm-resource-body",children:[r("div",{className:"text-body-secondary small text-uppercase",children:e.label}),r("a",{href:e.resource?.url,target:"_blank",rel:"noreferrer",children:e.resource?.name})]}),a("span",{className:"sm-id-chip compact",children:[r(o,{name:"fingerprint",gap:!0}),e.detail]})]},e.label))})})};var m=n;export{m as default};
