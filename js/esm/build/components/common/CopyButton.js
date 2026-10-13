import{useEffect as r}from"react";import{addToast as c}from"../../engine/toast";import{useCopy as u}from"../../hooks/useCopy";import f from"./Icon";import{jsx as d,jsxs as y}from"react/jsx-runtime";/**
 * The button that copies a text to the clipboard and says that it did, in the toast of Moodle.
 *
 * @module     local_servicemanager/components/common/CopyButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const a=({value:n,text:o,label:p,tone:s="outline-success"})=>{const{copied:t,failed:e,copy:i}=u();return r(()=>{t?c(o("copied"),{type:"success"}).catch(()=>{}):e&&c(o("copy_token_failed"),{type:"danger"}).catch(()=>{})},[t,e,o]),y("button",{type:"button",className:`btn btn-${t?"success":s}`,onClick:()=>i(n),children:[d(f,{name:t?"check":"copy",gap:!0}),t?o("copied"):p??o("copy")]})};var C=a;export{C as default};
