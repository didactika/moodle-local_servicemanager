import{statusLook as m}from"../../lib/status";import n from"../common/Icon";import p from"../common/Panel";import{Fragment as c,jsx as s,jsxs as t}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A summary of the health checks of a schema: the latest one, with what it found, how many there are of each status and the way
 * to all of them, which have a page of their own.
 *
 * @module     local_servicemanager/components/schema/HealthPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const r=({health:a,text:l})=>t(p,{title:l("healthcheck_task"),icon:"heart-pulse",count:a.total,region:"health",actions:t("a",{href:a.url,className:"btn sm-pill compact tone-primary",children:[l("health_view_all"),s(n,{name:"arrow-right",className:"ms-2"})]}),children:[a.latest&&t(c,{children:[t("div",{className:"sm-health-latest",children:[s("span",{className:"text-body-secondary small text-uppercase",children:l("health_latest")}),s("span",{className:`sm-badge tone-${m(a.latest.status).tone}`,children:a.latest.statusLabel}),s("span",{className:"text-body-secondary",children:a.latest.time})]}),s("ul",{className:"sm-health-messages",children:a.latest.messages.map((e,o)=>s("li",{children:e},o))})]}),s("div",{className:"sm-health-counts",children:(a.counts??[]).map(e=>t("span",{className:`sm-badge tone-${m(e.status).tone}`,children:[e.label,s("span",{className:"ms-2",children:e.count})]},e.status))})]});var h=r;export{h as default};
