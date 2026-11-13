import{useMemo as y,useState as p}from"react";import N from"./Icon";import C from"./Modal";import L from"./SearchBox";import{Fragment as d,jsx as l,jsxs as t}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A list of chips that shows the first few and, when there are more, a button that opens all of them in a dialogue, as rows that scroll,
 * with a search for the ones that are many.
 *
 * @module     local_servicemanager/components/common/ChipList
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const _=8,v=10,x=({title:h,names:e,chip:m,text:a,limit:s=_})=>{const[g,n]=p(!1),[i,f]=p(""),r=e.length>s,c=y(()=>{const o=i.toLowerCase().split(/\s+/).filter(Boolean);return e.filter(u=>o.every(b=>u.toLowerCase().includes(b)))},[e,i]);return t(d,{children:[t("div",{className:"d-flex flex-wrap gap-1","data-region":"chip-list",children:[(r?e.slice(0,s):e).map(o=>m(o)),r&&t("button",{type:"button",className:"badge rounded-pill text-bg-light border","data-action":"chips-all",title:a("chips_all",e.length),onClick:()=>n(!0),children:["+",e.length-s,t("span",{className:"visually-hidden",children:[" ",a("chips_all",e.length)]})]})]}),r&&t(C,{open:g,wide:!0,title:t(d,{children:[h,l("span",{className:"badge badge-soft rounded-pill text-bg-secondary ms-2",children:e.length})]}),onClose:()=>n(!1),closeLabel:a("core_cancel"),children:[e.length>v&&l("div",{className:"mb-3",children:l(L,{value:i,onChange:f,placeholder:a("filter_name"),clearLabel:a("filter_clear"),id:"lsm-chips-search"})}),l("ul",{className:"list-group","data-region":"chip-all",children:c.map(o=>l("li",{className:"list-group-item",children:l("span",{className:"font-monospace small",children:o})},o))}),c.length===0&&t("p",{className:"text-body-secondary text-center my-3",children:[l(N,{name:"filter-circle-xmark",gap:!0}),a("no_schemas_filtered")]})]})]})};var k=x;export{k as default};
