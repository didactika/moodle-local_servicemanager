import c from"../common/ChipList";import m from"../common/Panel";import{jsx as s,jsxs as i}from"react/jsx-runtime";/**
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
 */const p=["allow_assign","allow_override","allow_switch","allow_view"],g=[{key:"prevent",tone:"warning"},{key:"prohibit",tone:"danger"}],r=({label:o,names:l,tone:t,text:a})=>i("section",{className:"sm-role-block","data-region":"role-block",children:[i("h4",{className:"sm-role-label",children:[o,s("span",{className:"sm-role-count",children:l.length})]}),s(c,{title:o,names:l,text:a,chip:n=>s("span",{className:`sm-role-chip tone-${t}`,children:n},n)})]}),h=({role:o,text:l})=>{const t=(o.context_levels??[]).filter(e=>e!=="system"),a=g.filter(e=>(o.permissions?.[e.key]??[]).length>0),n=p.filter(e=>(o[e]??[]).length>0);return t.length===0&&a.length===0&&n.length===0?null:s(m,{title:l("role_panel_title"),icon:"user-shield",region:"role",children:i("div",{className:"sm-role-grid",children:[t.length>0&&s(r,{label:l("role_context_levels"),names:["system",...t].map(e=>l("role_level_"+e)||e),tone:"secondary",text:l}),n.map(e=>s(r,{label:l("role_"+e),names:o[e]??[],tone:"primary",text:l},e)),a.map(e=>s(r,{label:l("role_permission_"+e.key),names:o.permissions?.[e.key]??[],tone:e.tone,text:l},e.key))]})})};var _=h;export{_ as default};
