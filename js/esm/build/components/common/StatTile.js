import m from"./Icon";import{Fragment as y,jsx as e,jsxs as n}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A figure with its label: how many schemas there are, how many are healthy, whether the web services work.
 *
 * It is a link when the figure leads somewhere, such as the list of the schemas that it counts.
 *
 * @module     local_servicemanager/components/common/StatTile
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const v=({label:r,value:o,tone:a="secondary",icon:s,hint:t,href:i,active:c=!1})=>{const d=n(y,{children:[n("div",{className:"d-flex align-items-center justify-content-between",children:[e("span",{className:"text-body-secondary small text-uppercase sm-tile-label",children:r}),s&&e("span",{className:`sm-tile-icon text-${a}`,children:e(m,{name:s})})]}),e("div",{className:`sm-tile-value text-${a==="secondary"?"body":a}`,children:o}),t&&e("div",{className:"text-body-secondary small",children:t})]}),l=`card sm-tile${c?" sm-tile-active":""}`;return i?e("a",{href:i,className:`${l} text-decoration-none sm-tile-link`,"aria-current":c?"true":void 0,children:e("div",{className:"card-body",children:d})}):e("div",{className:l,children:e("div",{className:"card-body",children:d})})};var N=v;export{N as default};
