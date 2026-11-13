import s from"../common/Icon";import{jsx as a,jsxs as o}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Goes through the changes of a comparison, one after another, from a bar that floats at the bottom of the screen: the arrows go to
 * the previous and the next change and the text says which one it is and where.
 *
 * @module     local_servicemanager/components/compare/ChangeNavigator
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const l=({runs:t,position:c,onMove:r,text:n})=>{const e=t[c];return o("div",{className:"dd-floatbar",role:"region","aria-label":n("compare_changes_hint"),"data-region":"change-navigator",children:[o("button",{type:"button",className:"btn btn-outline-secondary btn-sm btn-icon",onClick:()=>r(-1),title:n("compare_prev_change"),children:[a(s,{name:"chevron-up"}),a("span",{className:"visually-hidden",children:n("compare_prev_change")})]}),o("span",{className:"d-flex flex-column small",role:"status",children:[a("strong",{children:e?n("compare_change_of",{n:c+1,total:t.length}):n("compare_changes_found",t.length)}),a("small",{children:e?n("compare_change_at",{line:e.line,kind:n("change_"+e.kind)}):n("compare_changes_hint")})]}),o("button",{type:"button",className:"btn btn-outline-secondary btn-sm btn-icon",onClick:()=>r(1),title:n("compare_next_change"),children:[a(s,{name:"chevron-down"}),a("span",{className:"visually-hidden",children:n("compare_next_change")})]})]})};var p=l;export{p as default};
