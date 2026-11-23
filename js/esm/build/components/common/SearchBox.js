import i from"./Icon";import{jsx as t,jsxs as c}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A search field that filters as the person types, with a way to clear it.
 *
 * @module     local_servicemanager/components/common/SearchBox
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const s=({value:r,onChange:a,placeholder:o,clearLabel:n,id:l="lsm-search"})=>c("div",{className:"position-relative d-flex align-items-center",role:"search",children:[t(i,{name:"magnifying-glass"}),t("input",{type:"search",id:l,name:"q",value:r,className:"form-control",placeholder:o,"aria-label":o,title:n,autoComplete:"off",onChange:e=>a(e.target.value),onKeyDown:e=>{e.key==="Escape"&&a("")}}),r!==""&&t("button",{type:"button",className:"btn btn-link btn-icon btn-sm","data-action":"clear-search",title:n,"aria-label":n,onClick:e=>{a(""),e.currentTarget.parentElement?.querySelector("input")?.focus()},children:t(i,{name:"xmark"})})]});var p=s;export{p as default};
