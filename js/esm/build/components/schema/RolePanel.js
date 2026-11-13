import c from"../common/ChipList";import p from"../common/Panel";import{jsx as t,jsxs as i}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What the role of the schema may do: where it can be assigned, which roles it may assign, override, switch to and see, and which
 * capabilities it is kept from or forbidden.
 *
 * Each of them is a block with its name over its list, because a list of roles can be long; the ones past the first few are
 * behind a button that opens all of them in a dialogue, so the card stays the size of what matters.
 *
 * @module     local_servicemanager/components/schema/RolePanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const g=["allow_assign","allow_override","allow_switch","allow_view"],m=[{key:"prevent",tone:"warning"},{key:"prohibit",tone:"danger"}],r=({label:o,names:l,tone:n,text:a})=>i("section",{className:"col","data-region":"role-block",children:[i("h4",{className:"h6 d-flex align-items-center gap-2",children:[o,t("span",{className:"badge badge-soft rounded-pill text-bg-secondary",children:l.length})]}),t(c,{title:o,names:l,text:a,chip:s=>t("span",{className:`badge badge-soft rounded-pill text-bg-${n} fw-normal`,children:s},s)})]}),d=({role:o,text:l})=>{const n=(o.context_levels??[]).filter(e=>e!=="system"),a=m.filter(e=>(o.permissions?.[e.key]??[]).length>0),s=g.filter(e=>(o[e]??[]).length>0);return n.length===0&&a.length===0&&s.length===0?null:t(p,{title:l("role_panel_title"),icon:"user-shield",region:"role",children:i("div",{className:"row row-cols-1 row-cols-md-2 g-3",children:[n.length>0&&t(r,{label:l("role_context_levels"),names:["system",...n].map(e=>l("role_level_"+e)||e),tone:"secondary",text:l}),s.map(e=>t(r,{label:l("role_"+e),names:o[e]??[],tone:"primary",text:l},e)),a.map(e=>t(r,{label:l("role_permission_"+e.key),names:o.permissions?.[e.key]??[],tone:e.tone,text:l},e.key))]})})};var f=d;export{f as default};
