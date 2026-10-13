import{useState as h}from"react";import{statusLook as m}from"../../lib/status";import c from"../common/Panel";import{jsx as t,jsxs as s}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The results of the scheduled health checks of a schema, which can be narrowed to one status.
 *
 * @module     local_servicemanager/components/schema/HealthPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const u=({logs:l,text:a})=>{const[o,i]=h(""),n=o?l.filter(e=>e.status===o):l;return t(c,{title:a("healthcheck_task"),icon:"heart-pulse",count:l.length,flush:!0,region:"health",actions:s("select",{className:"form-select form-select-sm sm-auto-width",value:o,onChange:e=>i(e.target.value),"aria-label":a("core_status"),id:"healthlog-status-filter",children:[t("option",{value:"",children:a("core_all")}),t("option",{value:"healthy",children:a("status_healthy")}),t("option",{value:"warning",children:a("status_warning")}),t("option",{value:"critical",children:a("status_critical")})]}),children:t("div",{className:"sm-scroll",children:s("table",{className:"table table-sm align-middle mb-0",id:"healthlog-table",children:[t("thead",{children:s("tr",{children:[t("th",{className:"sm-time-column",children:a("core_time")}),t("th",{className:"sm-status-column",children:a("core_status")}),t("th",{children:a("core_message")})]})}),t("tbody",{children:n.map((e,r)=>s("tr",{"data-status":e.status,children:[t("td",{children:e.time}),t("td",{children:t("span",{className:`sm-badge tone-${m(e.status).tone}`,children:e.status})}),t("td",{children:e.message})]},r))})]})})})};var b=u;export{b as default};
