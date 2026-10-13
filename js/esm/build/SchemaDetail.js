import{useMemo as d}from"react";import g from"./components/common/BackLink";import u from"./components/common/ErrorBoundary";import f from"./components/common/PageHeader";import b from"./components/common/StatusBadge";import h from"./components/schema/AccessPanel";import v from"./components/schema/DetailsPanel";import k from"./components/schema/FunctionsPanel";import x from"./components/schema/HealthPanel";import y from"./components/schema/ResourcesPanel";import P from"./components/schema/RolePanel";import N from"./components/schema/TokenAlert";import{createText as B}from"./engine/text";import{postForm as T}from"./engine/post";import{Fragment as H,jsx as e,jsxs as o}from"react/jsx-runtime";/**
 * One schema, or one past version of it: what it declares, what the plugin created for it and how healthy it is.
 *
 * The actions of the schema are one group of buttons in the head of the page, and the rest of the page is made of sections that
 * all look the same: the main ones at the left and the ones about what the schema is and who gets what at the right.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/SchemaDetail
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const D=t=>{const{schema:s,urls:r,resources:i,isHistory:l,canManage:n}=t,a=d(()=>B(t.strings),[t.strings]),m=!!(i.user||i.role||i.service),c=()=>T(r.bulkAction,{sesskey:t.sesskey,action:s.enabled?"disable":"enable",ids:[s.id]});return e(u,{strings:t.strings,children:o("div",{className:"servicemanager-detail",children:[e("div",{className:"mb-3",children:e(g,{href:l?r.back:r.dashboard,label:a(l?"back":"dashboard")})}),t.newToken&&e(N,{token:t.newToken,text:a}),e(f,{title:s.name,badges:o(H,{children:[e(b,{status:s.status,label:s.statusLabel}),!l&&!s.enabled&&e("span",{className:"badge text-bg-secondary",children:a("disabled")})]}),subtitle:e("code",{children:s.schemaId})}),o("div",{className:"row",children:[o("div",{className:"col-lg-4",children:[e(v,{schema:s,urls:r,canManage:n,isHistory:l,onToggle:c,text:a}),e(h,{props:t,text:a}),e(P,{role:t.role,text:a})]}),o("div",{className:"col-lg-8",children:[t.functions.length>0&&e(k,{functions:t.functions,text:a}),m&&e(y,{resources:i,text:a}),t.healthLogs.length>0&&e(x,{logs:t.healthLogs,text:a})]})]})]})})};var J=D;export{J as default};
