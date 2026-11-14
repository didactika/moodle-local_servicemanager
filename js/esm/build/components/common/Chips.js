import{jsx as a}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The filter chips of the design system, for the one choice of a short list: the chosen one is pressed.
 *
 * @module     local_servicemanager/components/common/Chips
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const r=({label:l,chips:s,value:i,onChange:t})=>a("div",{className:"dd-chips",role:"group","aria-label":l,children:s.map(e=>a("button",{type:"button",className:"dd-chip","aria-pressed":e.value===i,onClick:()=>t(e.value),children:e.label},e.value))});var n=r;export{n as default};
