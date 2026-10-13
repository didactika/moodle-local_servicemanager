import d from"../common/Icon";import{jsx as a,jsxs as l}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * How many schemas are healthy, in doubt or failing, as one bar with a legend. Pressing a part of the legend shows only those schemas, and
 * pressing it again shows them all, so the same choice is not offered twice.
 *
 * @module     local_servicemanager/components/dashboard/HealthSummary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const i=[{key:"healthy",tone:"success",icon:"circle-check"},{key:"warning",tone:"warning",icon:"triangle-exclamation"},{key:"critical",tone:"danger",icon:"circle-xmark"}],y=({counts:s,status:m,onStatus:r,text:c})=>{const o=i.reduce((e,t)=>e+(s[t.key]??0),0);return a("div",{className:"card sm-health","data-region":"summary",children:l("div",{className:"card-body d-flex flex-wrap align-items-center",children:[l("div",{className:"sm-health-total",children:[a("span",{className:"sm-health-number",children:o}),a("span",{className:"text-body-secondary",children:c(o===1?"tile_schema":"tile_schemas")})]}),a("div",{className:"sm-health-bar","aria-hidden":"true",children:i.map(e=>(s[e.key]??0)>0&&a("span",{className:`sm-health-part bg-${e.tone}`,style:{flexGrow:s[e.key]}},e.key))}),a("div",{className:"sm-health-legend",role:"group","aria-label":c("filter_status"),children:i.map(e=>{const t=s[e.key]??0,n=m===e.key;return l("button",{type:"button",className:`sm-chip sm-health-chip${n?" active":""}`,"aria-pressed":n,disabled:t===0&&!n,onClick:()=>r(n?"":e.key),children:[a("span",{className:`text-${e.tone}`,children:a(d,{name:e.icon})}),a("strong",{children:t})," ",c("status_"+e.key)]},e.key)})})]})})};var u=y;export{u as default};
