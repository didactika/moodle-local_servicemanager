import{useEffect as m,useRef as f}from"react";import g from"./Icon";import{jsx as o,jsxs as s}from"react/jsx-runtime";/**
 * A window over the page, in a dialog of the browser: it takes the focus, closes with Escape or with its button and returns the focus to
 * where the person was.
 *
 * @module     local_servicemanager/components/common/Modal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const u=({open:a,title:n,onClose:l,closeLabel:i,children:c,footer:d,wide:r=!1})=>{const t=f(null);return m(()=>{const e=t.current;e&&(a&&!e.open?e.showModal():!a&&e.open&&e.close())},[a]),o("dialog",{ref:t,className:`sm-dialog${r?" wide":""}`,onCancel:e=>{e.preventDefault(),l()},onClick:e=>{e.target===t.current&&l()},children:s("div",{className:"sm-dialog-body",children:[s("header",{className:"sm-dialog-head",children:[o("h5",{className:"sm-dialog-title",children:n}),s("button",{type:"button",className:"sm-iconbtn",onClick:l,title:i,children:[o(g,{name:"xmark"}),o("span",{className:"visually-hidden",children:i})]})]}),o("div",{className:"sm-dialog-scroll",children:c}),d&&o("footer",{className:"sm-dialog-foot",children:d})]})})};var h=u;export{h as default};
