import p from"./Icon";import{Fragment as d,jsx as o,jsxs as g}from"react/jsx-runtime";/**
 * A button or a link that is only an icon, with its name as a tooltip and for assistive technology.
 *
 * @module     local_servicemanager/components/common/IconButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const u=t=>{const n=t.replace(/^outline-/,"");return n==="secondary"?"":` tone-${n}`},m=({icon:t,label:n,href:s,onClick:c,tone:l="secondary",large:i=!1,solid:r=!1})=>{const e=g(d,{children:[o(p,{name:t}),o("span",{className:"visually-hidden",children:n})]}),a=`btn sm-pill icon-only${i?"":" compact"}${u(l)}${r?" solid":""}`;return s?o("a",{href:s,className:a,title:n,children:e}):o("button",{type:"button",className:a,title:n,onClick:c,children:e})};var b=m;export{b as default,u as toneClass};
