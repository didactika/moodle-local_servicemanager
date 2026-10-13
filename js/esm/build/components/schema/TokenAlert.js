import n from"../common/CopyButton";import l from"../common/Icon";import{jsx as e,jsxs as o}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The token that was just generated, which is shown once.
 *
 * @module     local_servicemanager/components/schema/TokenAlert
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const s=({token:a,text:t})=>o("div",{className:"alert alert-success mb-4",role:"alert","data-region":"new-token",children:[o("h4",{className:"alert-heading",children:[e(l,{name:"key",gap:!0}),t("token_generated")]}),e("p",{className:"mb-3",children:t("token_copy_warning")}),e("hr",{}),o("div",{className:"input-group",children:[e("input",{type:"text",className:"form-control font-monospace",value:a,readOnly:!0,id:"new-token-value",onFocus:r=>r.currentTarget.select(),"aria-label":t("current_token")}),e(n,{value:a,text:t})]})]});var i=s;export{i as default};
