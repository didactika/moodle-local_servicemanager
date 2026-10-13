/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a list shows for what the person asked: the rows that match a search, a status and a range of dates, and the page of them.
 *
 * The lists are filtered in the page, so nothing here touches the server, the DOM or React.
 *
 * @module     local_servicemanager/lib/listing
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const i=(t,n,e)=>{const r=new URLSearchParams(t),s=Number(r.get("perpage")),a=Number(r.get("page"));return{query:r.get("q")??"",status:r.get("status")??"",from:r.get("from")??"",to:r.get("to")??"",perpage:e.includes(s)?s:n,page:Number.isInteger(a)&&a>0?a:0}},g=(t,n)=>{const e=new URLSearchParams;t.query&&e.set("q",t.query),t.status&&e.set("status",t.status),t.from&&e.set("from",t.from),t.to&&e.set("to",t.to),t.perpage!==n&&e.set("perpage",String(t.perpage)),t.page>0&&e.set("page",String(t.page));const r=e.toString();return r?"?"+r:""},o=(t,n)=>{if(!t)return null;const e=new Date(t+"T00:00:00").getTime()/1e3;return Number.isNaN(e)?null:e+(n?86399:0)},m=(t,n)=>{if(n.status&&t.status!==n.status)return!1;const e=o(n.from,!1),r=o(n.to,!0);if(e!==null&&t.at<e||r!==null&&t.at>r)return!1;const s=n.query.toLowerCase().split(/\s+/).filter(Boolean);if(s.length===0)return!0;const a=t.texts.join(" ").toLowerCase();return s.every(u=>a.includes(u))},c=(t,n,e)=>{const r=Math.max(1,Math.ceil(t.length/Math.max(1,e))),s=Math.min(Math.max(0,n),r-1);return{rows:t.slice(s*e,(s+1)*e),page:s,pages:r,total:t.length}},p=t=>{const n={};for(const e of t){const r=e.status??"";n[r]=(n[r]??0)+1}return n};export{p as countBy,m as matches,c as paginate,i as parseState,g as stateQuery};
