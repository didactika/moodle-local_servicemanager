import m from"../common/FilterMenu";import s from"../common/SearchBox";import{jsx as o,jsxs as r}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The tools to find a schema: a search that filters as the person types, and the dates and the size of the page in a menu. The
 * status is chosen in the summary above, so it is not asked for twice.
 *
 * @module     local_servicemanager/components/dashboard/Toolbar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const f=({list:e,text:a,actions:l})=>r("div",{className:"sm-toolbar",children:[o(s,{value:e.state.query,onChange:t=>e.set({query:t}),placeholder:a("filter_name"),clearLabel:a("filter_clear")}),r(m,{text:a,count:e.extras,onReset:()=>e.set({from:"",to:""}),children:[r("div",{className:"mb-3",children:[o("label",{htmlFor:"sm-from",className:"form-label",children:a("filter_date_from")}),o("input",{type:"date",id:"sm-from",className:"form-control",value:e.state.from,onChange:t=>e.set({from:t.target.value})})]}),r("div",{className:"mb-3",children:[o("label",{htmlFor:"sm-to",className:"form-label",children:a("filter_date_to")}),o("input",{type:"date",id:"sm-to",className:"form-control",value:e.state.to,onChange:t=>e.set({to:t.target.value})})]})]}),l&&o("div",{className:"sm-toolbar-actions",children:l})]});var n=f;export{n as default};
