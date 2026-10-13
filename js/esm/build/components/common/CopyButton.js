import{useEffect as y}from"react";import{addToast as s}from"../../engine/toast";import{useCopy as f}from"../../hooks/useCopy";import i from"./Icon";import{jsx as e,jsxs as a}from"react/jsx-runtime";/**
 * The button that copies a text to the clipboard and says that it did, in the toast of Moodle.
 *
 * @module     local_servicemanager/components/common/CopyButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=({value:c,text:o,label:u,tone:l="outline-success",compact:r=!1})=>{const{copied:t,failed:n,copy:p}=f();return y(()=>{t?s(o("copied"),{type:"success"}).catch(()=>{}):n&&s(o("copy_token_failed"),{type:"danger"}).catch(()=>{})},[t,n,o]),r?a("button",{type:"button",className:`btn sm-pill icon-only compact${t?" tone-success":""}`,onClick:()=>p(c),title:o("copy"),children:[e(i,{name:t?"check":"copy"}),e("span",{className:"visually-hidden",children:o("copy")})]}):a("button",{type:"button",className:`btn btn-${t?"success":l}`,onClick:()=>p(c),children:[e(i,{name:t?"check":"copy",gap:!0}),t?o("copied"):u??o("copy")]})};var h=m;export{h as default};
