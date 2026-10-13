import{useMemo as N,useState as p}from"react";import C from"./Icon";import L from"./Modal";import _ from"./SearchBox";import{Fragment as m,jsx as t,jsxs as s}from"react/jsx-runtime";/**
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
 */const b=8,v=10,w=({title:d,names:e,chip:h,text:l,limit:a=b})=>{const[u,c]=p(!1),[i,f]=p(""),r=e.length>a,n=N(()=>{const o=i.toLowerCase().split(/\s+/).filter(Boolean);return e.filter(g=>o.every(y=>g.toLowerCase().includes(y)))},[e,i]);return s(m,{children:[s("div",{className:"sm-chip-row","data-region":"chip-list",children:[(r?e.slice(0,a):e).map(o=>h(o)),r&&s("button",{type:"button",className:"sm-role-more","data-action":"chips-all",title:l("chips_all",e.length),onClick:()=>c(!0),children:["+",e.length-a,s("span",{className:"visually-hidden",children:[" ",l("chips_all",e.length)]})]})]}),r&&s(L,{open:u,wide:!0,title:s(m,{children:[d,t("span",{className:"sm-role-count ms-2",children:e.length})]}),onClose:()=>c(!1),closeLabel:l("core_cancel"),children:[e.length>v&&t("div",{className:"sm-dialog-search",children:t(_,{value:i,onChange:f,placeholder:l("filter_name"),clearLabel:l("filter_clear"),id:"sm-chips-search"})}),t("ul",{className:"list-group sm-caps-list","data-region":"chip-all",children:n.map(o=>t("li",{className:"list-group-item",children:t("span",{className:"sm-fn",children:o})},o))}),n.length===0&&s("p",{className:"text-body-secondary text-center my-3",children:[t(C,{name:"filter-circle-xmark",gap:!0}),l("no_schemas_filtered")]})]})]})};var B=w;export{B as default};
