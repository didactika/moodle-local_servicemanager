import{useEffect as r,useRef as m}from"react";import f from"./Icon";import{jsx as t,jsxs as l}from"react/jsx-runtime";/**
 * A window over the page, in a dialog of the browser: it takes the focus, closes with Escape or with its button and returns the focus to
 * where the person was.
 *
 * @module     local_servicemanager/components/common/Modal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const u=({open:a,title:d,onClose:o,closeLabel:s,children:c,footer:i})=>{const n=m(null);return r(()=>{const e=n.current;e&&(a&&!e.open?e.showModal():!a&&e.open&&e.close())},[a]),t("dialog",{ref:n,className:"sm-dialog",onCancel:e=>{e.preventDefault(),o()},onClick:e=>{e.target===n.current&&o()},children:l("div",{className:"sm-dialog-body",children:[l("div",{className:"d-flex align-items-start justify-content-between mb-3",children:[t("h5",{className:"mb-0",children:d}),l("button",{type:"button",className:"btn btn-sm btn-link text-body-secondary",onClick:o,title:s,children:[t(f,{name:"xmark"}),t("span",{className:"visually-hidden",children:s})]})]}),c,i&&t("div",{className:"d-flex justify-content-end sm-actions-row mt-3",children:i})]})})};var N=u;export{N as default};
