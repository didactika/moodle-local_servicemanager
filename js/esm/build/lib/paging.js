/**
 * Which pages of a list a person can go to from the one they are on.
 *
 * @module     local_servicemanager/lib/paging
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=(t,s,r)=>{const n=Math.max(1,Math.ceil(r/Math.max(1,s))),o=Math.max(0,t-2),e=Math.min(n-1,t+2),i=[];for(let a=o;a<=e;a++)i.push(a);return{pages:n,shown:i,first:t>1,previous:t>0,next:t<n-1,last:t<n-2,startDots:o>0,endDots:e<n-1}},b=(t,s)=>{const[r,n=""]=t.split("?"),o=n.split("&").filter(e=>e!==""&&!e.startsWith("page="));return r+"?"+[...o,"page="+s].join("&")};export{b as pageUrl,l as pageWindow};
