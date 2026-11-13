import{useLayoutEffect as f}from"react";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The columns of a table that keep their width.
 *
 * @module     local_servicemanager/hooks/useStableColumns
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */function b(c,i){f(()=>{const e=c.current,t=e?.parentElement;if(!e||!t||!i)return;const r=()=>{const o=Array.from(e.tHead?.rows[0]?.cells??[]);e.style.tableLayout="",o.forEach(n=>{n.style.width=""});const a=o.map(n=>n.getBoundingClientRect().width);o.forEach((n,d)=>{n.style.width=`${a[d]}px`}),e.style.tableLayout="fixed"};r();let s=t.clientWidth;const l=new ResizeObserver(()=>{Math.abs(t.clientWidth-s)>1&&(s=t.clientWidth,r())});return l.observe(t),()=>l.disconnect()},[i])}export{b as useStableColumns};
