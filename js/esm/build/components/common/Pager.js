import{useId as c}from"react";import{fitPageSizes as u,pageRange as v}from"../../lib/paging";import m from"./Icon";import{jsx as a,jsxs as o}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The foot of a list, as the Didactika design system and Delegate account draw it: rows per page with the sizes that fit the
 * list, which rows are shown, and the arrows.
 *
 * @module     local_servicemanager/components/common/Pager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const f=({page:i,perpage:s,total:t,onChange:r,text:e})=>{const l=c();if(t===0)return null;const{from:d,to:p}=v(i,s,t),{sizes:g,shown:b}=u(s,t);return a("div",{className:"table-foot",children:o("nav",{className:"dd-pager","aria-label":e("pagination_aria_label"),children:[o("div",{className:"dd-pager-size",children:[a("label",{htmlFor:l,className:"mb-0",children:e("pagination_per_page")}),a("select",{id:l,className:"form-select form-select-sm dd-select",value:b,onChange:n=>r({perpage:Number(n.target.value),page:0}),children:g.map(n=>a("option",{value:n,children:n||e("pagination_all")},n))})]}),o("div",{className:"dd-pager-end",children:[a("span",{className:"dd-pager-range",role:"status",children:e("pagination_range",{from:d,to:p,total:t})}),o("div",{className:"dd-pager-arrows",children:[a("button",{type:"button",className:"btn btn-outline-secondary btn-sm btn-icon",disabled:i===0,title:e("pagination_previous"),"aria-label":e("pagination_previous"),onClick:()=>r({page:i-1}),children:a(m,{name:"angle-left"})}),a("button",{type:"button",className:"btn btn-outline-secondary btn-sm btn-icon",disabled:p>=t,title:e("pagination_next"),"aria-label":e("pagination_next"),onClick:()=>r({page:i+1}),children:a(m,{name:"angle-right"})})]})]})]})})};var P=f;export{P as default};
