import{statusLook as o}from"../../lib/status";import m from"../common/Icon";import n from"../common/Panel";import p from"./HealthFindings";import{Fragment as c,jsx as t,jsxs as s}from"react/jsx-runtime";/**
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
 */const r=({health:a,text:l})=>s(n,{title:l("healthcheck_task"),icon:"heart-pulse",count:a.total,region:"health",actions:s("a",{href:a.url,className:"btn sm-pill compact tone-primary",children:[l("health_view_all"),t(m,{name:"arrow-right",className:"ms-2"})]}),children:[a.latest&&s(c,{children:[s("div",{className:"sm-health-latest",children:[t("span",{className:"text-body-secondary small text-uppercase",children:l("health_latest")}),s("span",{className:`sm-badge tone-${a.latest.tone}`,children:[t(m,{name:a.latest.icon,gap:!0}),a.latest.statusLabel]}),s("span",{className:"text-body-secondary",children:[a.latest.time," \xB7 ",a.latest.ago]})]}),t(p,{check:a.latest})]}),t("div",{className:"sm-health-counts",children:(a.counts??[]).map(e=>s("span",{className:`sm-badge tone-${o(e.status).tone}`,children:[e.label,t("span",{className:"ms-2",children:e.count})]},e.status))})]});var N=r;export{N as default};
