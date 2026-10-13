/**
 * How the rows of a comparison are shown: which are marked, which are folded away and where the changes are.
 *
 * @module     local_servicemanager/lib/diff
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=e=>e.kind!=="same",p=e=>{const n=[];return e.forEach((a,r)=>{l(a)&&(r===0||!l(e[r-1]))&&n.push(r)}),n},i=(e,n,a=new Set)=>{const r=new Array(e.length).fill(!1);e.forEach((o,s)=>{if(l(o))for(let f=Math.max(0,s-n);f<=Math.min(e.length-1,s+n);f++)r[f]=!0});const h=[];let t=0;for(;t<e.length;){const o=t,s=r[t];for(;t<e.length&&r[t]===s;)t++;s||a.has(o)?h.push({type:"rows",rows:e.slice(o,t).map((f,m)=>({row:f,index:o+m}))}):h.push({type:"folded",from:o,count:t-o})}return h},u=(e,n)=>e.filter(a=>a.area===n);export{p as changeStarts,l as isChange,u as ofArea,i as segments};
