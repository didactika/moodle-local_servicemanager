import p from"./Icon";import{Fragment as b,jsx as o,jsxs as f}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A button or a link that is only an icon, with its name as a tooltip and for assistive technology.
 *
 * @module     local_servicemanager/components/common/IconButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const u=t=>{const n=t.replace(/^outline-/,"");return n==="secondary"?"":` tone-${n}`},m=({icon:t,label:n,href:s,onClick:l,tone:c="secondary",large:i=!1,solid:r=!1,disabled:d=!1})=>{const e=f(b,{children:[o(p,{name:t}),o("span",{className:"visually-hidden",children:n})]}),a=`btn sm-pill icon-only${i?"":" compact"}${u(c)}${r?" solid":""}`;return s?o("a",{href:s,className:a,title:n,children:e}):o("button",{type:"button",className:a,title:n,onClick:l,disabled:d,children:e})};var y=m;export{y as default,u as toneClass};
