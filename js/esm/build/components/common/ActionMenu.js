import{useDropdown as h}from"../../hooks/useDropdown";import r from"./Icon";import{toneClass as w}from"./IconButton";import{Fragment as y,jsx as n,jsxs as t}from"react/jsx-runtime";/**
 * A menu of actions that opens from three dots, which is how the less frequent actions of a row or of a page are kept at hand.
 *
 * It can sit at the end of a group of buttons as one more button of the group.
 *
 * @module     local_servicemanager/components/common/ActionMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const N=({label:a,actions:s,size:u="sm",tone:g="secondary",icon:f="ellipsis",caret:l=!1,external:b=!1})=>{const o=h(),i=s.filter(e=>!e.danger),m=s.filter(e=>e.danger),c=e=>{const d=t(y,{children:[n(r,{name:e.icon,gap:!0}),e.label]}),p=`dropdown-item${e.danger?" text-danger":""}`;return e.href?n("a",{className:p,href:e.href,...b?{target:"_blank",rel:"noreferrer"}:{},children:d}):n("button",{type:"button",className:p,onClick:()=>{o.toggle(),e.onSelect?.()},children:d})};return t("div",{className:"dropdown sm-action-menu",ref:o.ref,children:[t("button",{type:"button",className:`btn sm-pill ${l?"has-caret":`icon-only${u==="sm"?" compact":""}`}${w(g)}`,"aria-haspopup":"true","aria-expanded":o.open,title:a,onClick:o.toggle,children:[n(r,{name:f}),l&&n(r,{name:"chevron-down",className:"sm-caret"}),n("span",{className:"visually-hidden",children:a})]}),t("ul",{className:`dropdown-menu dropdown-menu-end sm-row-menu${o.open?" show":""}`,children:[i.map(e=>n("li",{children:c(e)},e.label)),i.length>0&&m.length>0&&n("li",{children:n("hr",{className:"dropdown-divider"})}),m.map(e=>n("li",{children:c(e)},e.label))]})]})};var k=N;export{k as default};
