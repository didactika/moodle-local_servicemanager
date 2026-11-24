import m from"./Icon";import{jsx as e,jsxs as i}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A figure of a page in a card: what it counts, the number in the colour of its state, and a line that explains it; it
 * opens a page when it has an address.
 *
 * @module     local_servicemanager/components/common/StatTile
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const p=({label:o,value:l,tone:a="secondary",icon:t,hint:s,href:r,active:d=!1})=>{const n=i("div",{className:"card-body",children:[i("div",{className:"d-flex align-items-center justify-content-between gap-2",children:[e("span",{className:"small text-muted text-uppercase fw-semibold",children:o}),t&&e("span",{className:`text-${a}`,children:e(m,{name:t})})]}),e("div",{className:`fs-4 fw-bold text-${a==="secondary"?"body":a}`,children:l}),s&&e("div",{className:"small text-muted",children:s})]}),c=`card h-100${d?" border-primary":""}`;return r?e("a",{href:r,className:`${c} text-decoration-none text-reset`,"aria-current":d?"true":void 0,children:n}):e("div",{className:c,children:n})};var v=p;export{v as default};
