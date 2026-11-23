import n from"./Icon";import{jsx as r,jsxs as c}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A search field that filters as the person types, with a way to clear it.
 *
 * @module     local_servicemanager/components/common/SearchBox
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const s=({value:i,onChange:a,placeholder:o,clearLabel:l,id:t="lsm-search"})=>c("div",{className:"position-relative d-flex align-items-center",role:"search",children:[r(n,{name:"magnifying-glass"}),r("input",{type:"search",id:t,name:"q",value:i,className:"form-control",placeholder:o,"aria-label":o,title:l,autoComplete:"off",onChange:e=>a(e.target.value),onKeyDown:e=>{e.key==="Escape"&&a("")}})]});var m=s;export{m as default};
