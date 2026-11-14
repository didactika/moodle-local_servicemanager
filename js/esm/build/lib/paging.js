/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Which pages of a list a person can go to from the one they are on.
 *
 * @module     local_servicemanager/lib/paging
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const a=[12,24,48,96,0],u=(n,o,t)=>{const e=o>0?o:Math.max(t,1);return{from:t===0?0:n*e+1,to:Math.min(t,(n+1)*e)}},b=(n,o)=>({sizes:a.filter(t=>t===0||t<o),shown:n>0&&n<o?n:0}),c=(n,o,t)=>{const e=Math.max(1,Math.ceil(t/Math.max(1,o))),r=Math.max(0,n-2),s=Math.min(e-1,n+2),m=[];for(let i=r;i<=s;i++)m.push(i);return{pages:e,shown:m,first:n>1,previous:n>0,next:n<e-1,last:n<e-2,startDots:r>0,endDots:s<e-1}},h=(n,o)=>{const[t,e=""]=n.split("?"),r=e.split("&").filter(s=>s!==""&&!s.startsWith("page="));return t+"?"+[...r,"page="+o].join("&")};export{a as PAGE_SIZES,b as fitPageSizes,u as pageRange,h as pageUrl,c as pageWindow};
