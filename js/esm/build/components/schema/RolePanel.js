import i from"../common/Panel";import{Fragment as g,jsx as s,jsxs as a}from"react/jsx-runtime";/**
 * What the schema says about the role that was created for it: where it can be assigned, which capabilities it has explicitly and
 * which other roles it may assign, override, switch to and see.
 *
 * @module     local_servicemanager/components/schema/RolePanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=["allow_assign","allow_override","allow_switch","allow_view"],c=[{key:"prevent",tone:"warning"},{key:"prohibit",tone:"danger"}],o=({names:t,tone:l="secondary"})=>s("span",{className:"d-flex flex-wrap sm-badges-row",children:t.map(n=>s("span",{className:`badge text-bg-${l}`,children:n},n))}),p=({role:t,text:l})=>{const n=(t.context_levels??[]).filter(e=>e!=="system"),r=c.filter(e=>(t.permissions?.[e.key]??[]).length>0),d=m.filter(e=>(t[e]??[]).length>0);return n.length===0&&r.length===0&&d.length===0?null:s(i,{title:l("role_panel_title"),icon:"user-shield",region:"role",children:a("dl",{className:"sm-facts mb-0",children:[n.length>0&&a(g,{children:[s("dt",{children:l("role_context_levels")}),s("dd",{children:s(o,{names:["system",...n].map(e=>l("role_level_"+e)||e)})})]}),d.map(e=>a("div",{className:"sm-fact-pair",children:[s("dt",{children:l("role_"+e)}),s("dd",{children:s(o,{names:t[e]??[],tone:"primary"})})]},e)),r.map(e=>a("div",{className:"sm-fact-pair",children:[s("dt",{children:l("role_permission_"+e.key)}),s("dd",{children:s(o,{names:t.permissions?.[e.key]??[],tone:e.tone})})]},e.key))]})})};var _=p;export{_ as default};
