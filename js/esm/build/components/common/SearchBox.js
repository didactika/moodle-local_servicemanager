import r from"./Icon";import{jsx as a,jsxs as i}from"react/jsx-runtime";/**
 * A search field that filters as the person types, with a way to clear it.
 *
 * @module     local_servicemanager/components/common/SearchBox
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const c=({value:s,onChange:e,placeholder:t,clearLabel:o,id:l="sm-search"})=>i("div",{className:"input-group sm-search",children:[a("span",{className:"input-group-text",children:a(r,{name:"magnifying-glass"})}),a("input",{type:"search",id:l,name:"q",value:s,className:"form-control",placeholder:t,"aria-label":t,autoComplete:"off",onChange:n=>e(n.target.value),onKeyDown:n=>{n.key==="Escape"&&e("")}}),s!==""&&i("button",{type:"button",className:"btn btn-outline-secondary",onClick:()=>e(""),title:o,children:[a(r,{name:"xmark"}),a("span",{className:"visually-hidden",children:o})]})]});var m=c;export{m as default};
