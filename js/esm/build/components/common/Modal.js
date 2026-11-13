import{useEffect as u,useId as v,useRef as b}from"react";import{createPortal as f}from"react-dom";import{Fragment as p,jsx as e,jsxs as d}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A window over the page, as Moodle and Bootstrap draw their dialogs: it takes the focus, closes with Escape, with its button or
 * with a click outside it, and gives the focus back to where the person was.
 *
 * @module     local_servicemanager/components/common/Modal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const N=({open:a,title:r,onClose:l,closeLabel:t,children:n,footer:s,wide:m=!1})=>{const i=b(null),c=v();return u(()=>{if(!a)return;const o=document.activeElement;return document.body.classList.add("modal-open"),i.current?.focus(),()=>{document.body.classList.remove("modal-open"),o?.focus()}},[a]),a?f(d(p,{children:[e("div",{ref:i,className:"modal show d-block",role:"dialog","aria-modal":"true","aria-labelledby":c,tabIndex:-1,onKeyDown:o=>o.key==="Escape"&&l(),onMouseDown:o=>o.target===o.currentTarget&&l(),children:e("div",{className:`modal-dialog modal-dialog-scrollable${m?" modal-lg":""}`,children:d("div",{className:"modal-content",children:[d("div",{className:"modal-header",children:[e("h5",{className:"modal-title",id:c,children:r}),e("button",{type:"button",className:"btn-close","aria-label":t,title:t,onClick:l})]}),e("div",{className:"modal-body",children:n}),s&&e("div",{className:"modal-footer",children:s})]})})}),e("div",{className:"modal-backdrop show"})]}),document.body):null};var h=N;export{h as default};
