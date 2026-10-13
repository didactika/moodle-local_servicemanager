import{useCallback as d,useEffect as u,useRef as a,useState as f}from"react";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A menu that opens and closes: with its button, with Escape and with a click anywhere else.
 *
 * @module     local_servicemanager/hooks/useDropdown
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=()=>{const[n,t]=f(!1),o=a(null),c=d(()=>t(e=>!e),[]);return u(()=>{if(!n)return;const e=r=>{o.current&&!o.current.contains(r.target)&&t(!1)},s=r=>{r.key==="Escape"&&t(!1)};return document.addEventListener("mousedown",e),document.addEventListener("keydown",s),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",s)}},[n]),{open:n,toggle:c,ref:o}};export{l as useDropdown};
