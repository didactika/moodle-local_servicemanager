import d from"./Icon";import{jsx as s}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A round icon button of the design system (btn-link btn-icon), as the actions of a row, or a filled one for the main
 * action; the label is its title and what assistive technology says.
 *
 * @module     local_servicemanager/components/common/IconButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=n=>n&&n!=="secondary"?` text-${n}`:"",f=({icon:n,label:t,href:a,onClick:c,tone:o="secondary",large:e=!1,solid:l=!1,disabled:b=!1})=>{const i=s(d,{name:n}),r=l?`btn btn-${o==="secondary"?"primary":o} btn-icon${e?"":" btn-sm"}`:`btn btn-link btn-icon${e?"":" btn-sm"}${m(o)}`;return a?s("a",{href:a,className:r,title:t,"aria-label":t,children:i}):s("button",{type:"button",className:r,title:t,"aria-label":t,onClick:c,disabled:b,children:i})};var u=f;export{u as default,m as toneClass};
