/**
 * How the rows of a comparison are shown: which are marked, which are folded away and where the changes are.
 *
 * @module     local_servicemanager/lib/diff
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=e=>e.kind!=="same",s=e=>{const n=[];return e.forEach((o,t)=>{l(o)&&(t===0||!l(e[t-1]))&&n.push(t)}),n},m=e=>s(e).map(n=>{let o=n;const t=new Set;for(;o<e.length&&l(e[o]);)t.add(e[o].kind),o++;const a=t.size===1?[...t][0]:"changed";return{start:n,kind:a==="added"||a==="removed"?a:"changed",line:e[n].right?.no??e[n].left?.no??0}}),c=(e,n,o=new Set)=>{const t=new Array(e.length).fill(!1);e.forEach((f,h)=>{if(l(f))for(let i=Math.max(0,h-n);i<=Math.min(e.length-1,h+n);i++)t[i]=!0});const a=[];let r=0;for(;r<e.length;){const f=r,h=t[r];for(;r<e.length&&t[r]===h;)r++;h||o.has(f)?a.push({type:"rows",rows:e.slice(f,r).map((i,d)=>({row:i,index:f+d}))}):a.push({type:"folded",from:f,count:r-f})}return a},g=(e,n)=>e.filter(o=>o.area===n);export{m as changeRuns,s as changeStarts,l as isChange,g as ofArea,c as segments};
