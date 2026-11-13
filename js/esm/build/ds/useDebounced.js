import{useEffect as u,useState as s}from"react";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A value that follows another one a moment after it stops changing, so a search is not made for every key that is pressed.
 *
 * @module     report_autograder/hooks/useDebounced
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const c=(e,t)=>{const[o,r]=s(e);return u(()=>{const n=window.setTimeout(()=>r(e),t);return()=>window.clearTimeout(n)},[e,t]),o};export{c as useDebounced};
