import{useCallback as n,useEffect as m,useRef as d,useState as l}from"react";import{parseState as S,stateQuery as f}from"../lib/listing";/**
 * What the person asked of a list, kept in the address of the page so that a refresh or a shared link shows the same list.
 *
 * Changing the state filters the list at once and never reloads the page; the address follows a moment later.
 *
 * @module     local_servicemanager/hooks/useListState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const L=300,y=(t,a)=>{const[e,r]=l(()=>S(window.location.search,t,a)),o=d(void 0);m(()=>(window.clearTimeout(o.current),o.current=window.setTimeout(()=>{const s=window.location.pathname+f(e,t)+window.location.hash;window.history.replaceState(window.history.state,"",s)},L),()=>window.clearTimeout(o.current)),[e,t]);const i=n(s=>{r(w=>({...w,page:0,...s}))},[]),u=n(()=>{r({query:"",status:"",from:"",to:"",perpage:t,page:0})},[t]),c=(e.from?1:0)+(e.to?1:0)+(e.perpage!==t?1:0);return{state:e,set:i,reset:u,extras:c}};export{y as useListState};
