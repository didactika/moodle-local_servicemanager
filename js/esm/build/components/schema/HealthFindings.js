import n from"../common/Icon";import{Fragment as o,jsx as a,jsxs as l}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a health check found, one thing under another, each with the icon of the status of the check and what it is about in
 * bold.
 *
 * @module     local_servicemanager/components/schema/HealthFindings
 * @copyright  2026 Didactika.org
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const p=({check:e})=>a("ul",{className:"list-unstyled d-grid gap-1 mb-0",children:e.findings.map((s,t)=>l("li",{className:"d-flex gap-2",children:[a("span",{className:`text-${e.tone}`,children:a(n,{name:e.icon})}),l("span",{children:[s.label&&l(o,{children:[a("strong",{children:s.label})," "]}),s.text]})]},t))});var m=p;export{m as default};
