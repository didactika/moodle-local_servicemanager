import{useId as d}from"react";import{fitPageSizes as u,pageRange as f}from"../../lib/paging";import m from"./Icon";import{jsx as e,jsxs as o}from"react/jsx-runtime";/**
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
 */const v=({page:i,perpage:r,total:t,onChange:l,text:a})=>{const s=d();if(t===0)return null;const{from:g,to:p}=f(i,r,t),{sizes:b,shown:c}=u(r,t);return e("div",{className:"px-3 py-2 border-top","data-region":"pager",children:o("nav",{className:"d-flex flex-wrap align-items-center justify-content-between gap-3 small text-muted","aria-label":a("pagination_aria_label"),children:[o("div",{className:"d-none d-sm-flex align-items-center gap-2",children:[e("label",{htmlFor:s,className:"mb-0",children:a("pagination_per_page")}),e("select",{id:s,className:"form-select form-select-sm",value:c,onChange:n=>l({perpage:Number(n.target.value),page:0}),children:b.map(n=>e("option",{value:n,children:n||a("pagination_all")},n))})]}),o("div",{className:"d-flex flex-wrap align-items-center gap-3 ms-auto",children:[e("span",{className:"text-body text-nowrap",role:"status","data-region":"range",children:a("pagination_range",{from:g,to:p,total:t})}),o("div",{className:"d-flex gap-1",children:[e("button",{type:"button",className:"btn btn-outline-secondary btn-sm btn-icon",disabled:i===0,title:a("pagination_previous"),"aria-label":a("pagination_previous"),onClick:()=>l({page:i-1}),children:e(m,{name:"angle-left"})}),e("button",{type:"button",className:"btn btn-outline-secondary btn-sm btn-icon",disabled:p>=t,title:a("pagination_next"),"aria-label":a("pagination_next"),onClick:()=>l({page:i+1}),children:e(m,{name:"angle-right"})})]})]})]})})};var x=v;export{x as default};
