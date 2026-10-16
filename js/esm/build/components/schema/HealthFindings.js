import s from"../common/Icon";import{Fragment as i,jsx as l,jsxs as n}from"react/jsx-runtime";/**
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
 */const o=({check:e})=>l("ul",{className:`sm-health-findings tone-${e.tone}`,children:e.findings.map((t,a)=>n("li",{children:[l(s,{name:e.icon}),n("span",{children:[t.label&&n(i,{children:[l("strong",{children:t.label})," "]}),t.text]})]},a))});var h=o;export{h as default};
