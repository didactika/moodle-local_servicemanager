import{useCallback as s,useMemo as h,useState as d}from"react";import{bulkActions as g}from"../lib/selection";/**
 * The schemas chosen in the list, and what can be done with them together.
 *
 * @module     local_servicemanager/hooks/useBulkSelection
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const k=(t,a=t)=>{const[o,l]=d(new Set),i=s(e=>{l(S=>{const n=new Set(S);return n.has(e)?n.delete(e):n.add(e),n})},[]),c=t.length>0&&t.every(e=>o.has(e.id)),r=s(()=>{l(c?new Set:new Set(t.map(e=>e.id)))},[c,t]),u=s(()=>l(new Set),[]),m=h(()=>g(a,o),[a,o]);return{chosen:o,allChosen:c,actions:m,toggle:i,toggleAll:r,clear:u}};export{k as useBulkSelection};
