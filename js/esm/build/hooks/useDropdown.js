import{useCallback as u,useEffect as d,useLayoutEffect as f,useRef as m,useState as p}from"react";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A menu that opens and closes: with its button, with Escape and with a click anywhere else.
 *
 * A menu in a box that scrolls, such as the table of a list, floats next to its button, so the box never cuts it, and
 * closes when the box scrolls or the window changes size.
 *
 * @module     local_servicemanager/hooks/useDropdown
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const E=n=>{const o=n.querySelector("button"),e=n.querySelector(".dropdown-menu");if(!o||!e||(e.style.position="",e.style.inset="",!n.closest(".table-responsive")||!e.classList.contains("show")))return;const a=2,t=8;e.style.position="fixed",e.style.inset="0 auto auto 0";const r=o.getBoundingClientRect(),l=Math.max(t,Math.min(r.right-e.offsetWidth,window.innerWidth-e.offsetWidth-t)),c=r.bottom+a,s=c+e.offsetHeight>window.innerHeight-t?Math.max(t,r.top-e.offsetHeight-a):c,i=e.getBoundingClientRect();e.style.inset=`${s-i.top}px auto auto ${l-i.left}px`},w=()=>{const[n,o]=p(!1),e=m(null),a=u(()=>o(t=>!t),[]);return f(()=>{e.current&&E(e.current)},[n]),d(()=>{if(!n)return;const t=s=>{e.current&&!e.current.contains(s.target)&&o(!1)},r=s=>{s.key==="Escape"&&o(!1)},l=s=>{const i=s.target instanceof Element?s.target:null;i&&i.classList.contains("table-responsive")&&i.contains(e.current)&&o(!1)},c=()=>o(!1);return document.addEventListener("mousedown",t),document.addEventListener("keydown",r),document.addEventListener("scroll",l,!0),window.addEventListener("resize",c),()=>{document.removeEventListener("mousedown",t),document.removeEventListener("keydown",r),document.removeEventListener("scroll",l,!0),window.removeEventListener("resize",c)}},[n]),{open:n,toggle:a,ref:e}};export{E as place,w as useDropdown};
