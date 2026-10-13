import s from"../common/Chips";import i from"../common/FilterMenu";import p from"../common/SearchBox";import{jsx as o,jsxs as t}from"react/jsx-runtime";/**
 * The tools to find a schema: a search that filters as the person types, and the dates and the size of the page in a menu. The
 * status is chosen in the summary above, so it is not asked for twice.
 *
 * @module     local_servicemanager/components/dashboard/Toolbar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const f=({list:e,options:l,text:r,actions:m})=>t("div",{className:"sm-toolbar",children:[o(p,{value:e.state.query,onChange:a=>e.set({query:a}),placeholder:r("filter_name"),clearLabel:r("filter_clear")}),t(i,{text:r,count:e.extras,onReset:()=>e.set({from:"",to:"",perpage:l[0]}),children:[t("div",{className:"mb-3",children:[o("label",{htmlFor:"sm-from",className:"form-label",children:r("filter_date_from")}),o("input",{type:"date",id:"sm-from",className:"form-control",value:e.state.from,onChange:a=>e.set({from:a.target.value})})]}),t("div",{className:"mb-3",children:[o("label",{htmlFor:"sm-to",className:"form-label",children:r("filter_date_to")}),o("input",{type:"date",id:"sm-to",className:"form-control",value:e.state.to,onChange:a=>e.set({to:a.target.value})})]}),o("div",{className:"sm-filter-title",children:r("filter_per_page")}),o(s,{label:r("filter_per_page"),value:String(e.state.perpage),onChange:a=>e.set({perpage:Number(a)}),chips:l.map(a=>({value:String(a),label:String(a)}))})]}),m&&o("div",{className:"sm-toolbar-actions",children:m})]});var b=f;export{b as default};
