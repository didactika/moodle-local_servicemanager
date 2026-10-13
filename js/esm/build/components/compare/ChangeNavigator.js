import r from"../common/Icon";import{jsx as n,jsxs as o}from"react/jsx-runtime";/**
 * Goes through the changes of a comparison, one after another, from a bar that floats at the bottom of the screen: the arrows go to
 * the previous and the next change and the text says which one it is and where.
 *
 * @module     local_servicemanager/components/compare/ChangeNavigator
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=({runs:t,position:s,onMove:c,text:a})=>{const e=t[s];return o("div",{className:"sm-floating sm-changenav",role:"status","data-region":"change-navigator",children:[o("button",{type:"button",className:"sm-navbtn",onClick:()=>c(-1),title:a("compare_prev_change"),children:[n(r,{name:"chevron-up"}),n("span",{className:"visually-hidden",children:a("compare_prev_change")})]}),o("span",{className:"sm-changenav-info",children:[n("strong",{children:e?a("compare_change_of",{n:s+1,total:t.length}):a("compare_changes_found",t.length)}),n("small",{children:e?a("compare_change_at",{line:e.line,kind:a("change_"+e.kind)}):a("compare_changes_hint")})]}),o("button",{type:"button",className:"sm-navbtn",onClick:()=>c(1),title:a("compare_next_change"),children:[n(r,{name:"chevron-down"}),n("span",{className:"visually-hidden",children:a("compare_next_change")})]})]})};var i=m;export{i as default};
