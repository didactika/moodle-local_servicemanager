import{useDropdown as h}from"../../hooks/useDropdown";import p from"./Icon";import{toneClass as w}from"./IconButton";import{Fragment as y,jsx as n,jsxs as t}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A menu of actions that opens from three dots, which is how the less frequent actions of a row or of a page are kept at hand.
 *
 * It can sit at the end of a group of buttons as one more button of the group.
 *
 * @module     local_servicemanager/components/common/ActionMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const N=({label:r,actions:l,size:s="sm",tone:u="secondary",icon:g="ellipsis",caret:b=!1,external:f=!1})=>{const o=h(),a=l.filter(e=>!e.danger),i=l.filter(e=>e.danger),d=e=>{const m=t(y,{children:[n(p,{name:e.icon,gap:!0}),e.label]}),c=`dropdown-item${e.danger?" text-danger":""}`;return e.href?n("a",{className:c,href:e.href,...f?{target:"_blank",rel:"noreferrer"}:{},children:m}):n("button",{type:"button",className:c,onClick:()=>{o.toggle(),e.onSelect?.()},children:m})};return t("div",{className:"dropdown",ref:o.ref,children:[t("button",{type:"button",className:b?`btn btn-outline-secondary dropdown-toggle${s==="sm"?" btn-sm":""}`:`btn btn-link btn-icon${s==="sm"?" btn-sm":""}${w(u)}`,"aria-haspopup":"true","aria-expanded":o.open,title:r,onClick:o.toggle,children:[n(p,{name:g}),n("span",{className:"visually-hidden",children:r})]}),t("ul",{className:`dropdown-menu dropdown-menu-end${o.open?" show":""}`,children:[a.map(e=>n("li",{children:d(e)},e.label)),a.length>0&&i.length>0&&n("li",{children:n("hr",{className:"dropdown-divider"})}),i.map(e=>n("li",{children:d(e)},e.label))]})]})};var v=N;export{v as default};
