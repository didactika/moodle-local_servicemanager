import{useEffect as y}from"react";import{addToast as p}from"../../engine/toast";import{useCopy as f}from"../../hooks/useCopy";import i from"./Icon";import{jsx as e,jsxs as a}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The button that copies a text to the clipboard and says that it did, in the toast of Moodle.
 *
 * @module     local_servicemanager/components/common/CopyButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=({value:n,text:o,label:u,tone:r="outline-success",compact:l=!1})=>{const{copied:t,failed:c,copy:s}=f();return y(()=>{t?p(o("copied"),{type:"success"}).catch(()=>{}):c&&p(o("copy_token_failed"),{type:"danger"}).catch(()=>{})},[t,c,o]),l?a("button",{type:"button",className:`btn btn-link btn-icon btn-sm${t?" text-success":""}`,onClick:()=>s(n),title:o("copy"),children:[e(i,{name:t?"check":"copy"}),e("span",{className:"visually-hidden",children:o("copy")})]}):a("button",{type:"button",className:`btn btn-${t?"success":r}`,onClick:()=>s(n),children:[e(i,{name:t?"check":"copy",gap:!0}),t?o("copied"):u??o("copy")]})};var g=m;export{g as default};
