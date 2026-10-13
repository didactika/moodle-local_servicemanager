import p from"./Icon";import c from"./Modal";import{Fragment as e,jsx as o,jsxs as a}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A question that must be answered before something that cannot be undone, in a dialog of the browser, which takes the focus,
 * closes with Escape and is drawn over the page with the style of Bootstrap.
 *
 * @module     local_servicemanager/components/common/ConfirmModal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const d=({open:i,title:l,message:r,confirmLabel:s,cancelLabel:n,onConfirm:m,onCancel:t,tone:b="danger"})=>o(c,{open:i,title:a(e,{children:[o(p,{name:"triangle-exclamation",gap:!0}),l]}),onClose:t,closeLabel:n,footer:a(e,{children:[o("button",{type:"button",className:"btn btn-secondary",onClick:t,children:n}),o("button",{type:"button",className:`btn btn-${b}`,onClick:m,children:s})]}),children:o("p",{className:"mb-0",children:r})});var C=d;export{C as default};
