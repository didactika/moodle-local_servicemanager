import i from"../common/Icon";import n from"../common/Panel";import{jsx as r,jsxs as a}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The user, the role and the service that the plugin created for a schema, each linked to where Moodle manages it.
 *
 * @module     local_servicemanager/components/schema/ResourcesPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const t=({resources:s,text:l})=>{const o=[{label:l("service_user"),icon:"user",resource:s.user,detail:s.user?.username},{label:l("service_role"),icon:"shield-halved",resource:s.role,detail:s.role?.shortname},{label:l("external_service"),icon:"plug",resource:s.service,detail:s.service?.shortname}];return r(n,{title:l("provisioned_resources"),icon:"server",flush:!0,region:"resources",children:r("ul",{className:"list-group list-group-flush",children:o.filter(e=>e.resource).map(e=>a("li",{className:"list-group-item d-flex align-items-center",children:[r("span",{className:"dd-tile me-3",children:r(i,{name:e.icon})}),a("div",{className:"flex-grow-1",children:[r("div",{className:"text-body-secondary small text-uppercase",children:e.label}),r("a",{href:e.resource?.url,target:"_blank",rel:"noreferrer",children:e.resource?.name})]}),a("span",{className:"small text-muted",children:[r(i,{name:"fingerprint",gap:!0}),e.detail]})]},e.label))})})};var m=t;export{m as default};
