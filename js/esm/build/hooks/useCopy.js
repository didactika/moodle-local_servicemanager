import{useCallback as r,useEffect as a,useRef as d,useState as l}from"react";/**
 * Copying a text to the clipboard, and saying so for a moment.
 *
 * @module     local_servicemanager/hooks/useCopy
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const s=2e3,u=async o=>{if(navigator.clipboard&&window.isSecureContext)try{return await navigator.clipboard.writeText(o),!0}catch{}const e=document.createElement("textarea");e.value=o,e.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(e),e.focus(),e.select();let t=!1;try{t=document.execCommand("copy")}catch{t=!1}return document.body.removeChild(e),t},f=()=>{const[o,e]=l("idle"),t=d(void 0);a(()=>()=>window.clearTimeout(t.current),[]);const c=r(n=>{u(n).then(i=>(e(i?"copied":"failed"),window.clearTimeout(t.current),t.current=window.setTimeout(()=>e("idle"),s),i)).catch(()=>e("failed"))},[]);return{copied:o==="copied",failed:o==="failed",copy:c}};export{f as useCopy};
