import b from"./Icon";import p from"./Modal";import{Fragment as e,jsx as o,jsxs as a}from"react/jsx-runtime";/**
 * A question that must be answered before something that cannot be undone, in a dialog of the browser, which takes the focus,
 * closes with Escape and is drawn over the page with the style of Bootstrap.
 *
 * @module     local_servicemanager/components/common/ConfirmModal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const c=({open:l,title:i,message:r,confirmLabel:s,cancelLabel:n,onConfirm:m,onCancel:t})=>o(p,{open:l,title:a(e,{children:[o(b,{name:"triangle-exclamation",gap:!0}),i]}),onClose:t,closeLabel:n,footer:a(e,{children:[o("button",{type:"button",className:"btn btn-secondary",onClick:t,children:n}),o("button",{type:"button",className:"btn btn-danger",onClick:m,children:s})]}),children:o("p",{className:"mb-0",children:r})});var g=c;export{g as default};
