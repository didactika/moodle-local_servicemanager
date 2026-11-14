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
 */const t=({value:l,onChange:a,placeholder:o,clearLabel:s,id:i="lsm-search"})=>c("div",{className:"dd-searchbox",role:"search",children:[r(n,{name:"magnifying-glass"}),r("input",{type:"search",id:i,name:"q",value:l,className:"form-control",placeholder:o,"aria-label":o,title:s,autoComplete:"off",onChange:e=>a(e.target.value),onKeyDown:e=>{e.key==="Escape"&&a("")}})]});var d=t;export{d as default};
