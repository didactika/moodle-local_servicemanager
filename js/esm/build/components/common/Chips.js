import o from"./Icon";import{jsx as s,jsxs as n}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A choice of one among a few, drawn as pills that take the whole width of their row; the one that is chosen is tinted and has a check.
 *
 * @module     local_servicemanager/components/common/Chips
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const r=({label:l,chips:t,value:a,onChange:i})=>s("div",{className:"sm-chips",role:"group","aria-label":l,children:t.map(e=>n("button",{type:"button",className:`sm-chip${e.value===a?" active":""}`,"aria-pressed":e.value===a,onClick:()=>i(e.value),children:[e.value===a&&s(o,{name:"check",gap:!0}),e.label]},e.value))});var u=r;export{u as default};
