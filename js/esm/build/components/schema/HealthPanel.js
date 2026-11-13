import{statusLook as o}from"../../lib/status";import n from"../common/Icon";import m from"../common/Panel";import p from"./HealthFindings";import{Fragment as i,jsx as t,jsxs as e}from"react/jsx-runtime";/**
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
 */const r=({health:a,text:l})=>e(m,{title:l("healthcheck_task"),icon:"heart-pulse",count:a.total,region:"health",actions:e("a",{href:a.url,className:"btn btn-sm btn-outline-primary",children:[l("health_view_all"),t(n,{name:"arrow-right",className:"ms-2"})]}),children:[a.latest&&e(i,{children:[e("div",{className:"d-flex flex-wrap align-items-center gap-2 mb-2",children:[t("span",{className:"text-body-secondary small text-uppercase",children:l("health_latest")}),e("span",{className:`badge badge-soft rounded-pill text-bg-${a.latest.tone}`,children:[t(n,{name:a.latest.icon,gap:!0}),a.latest.statusLabel]}),e("span",{className:"text-body-secondary",children:[a.latest.time," \xB7 ",a.latest.ago]})]}),t(p,{check:a.latest})]}),t("div",{className:"d-flex flex-wrap gap-2 mt-3",children:(a.counts??[]).map(s=>e("span",{className:`badge badge-soft rounded-pill text-bg-${o(s.status).tone}`,children:[s.label,t("span",{className:"ms-2",children:s.count})]},s.status))})]});var g=r;export{g as default};
