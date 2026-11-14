import a from"../common/IconButton";import b from"../common/Panel";import{Fragment as t,jsx as e,jsxs as l}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a schema says about itself: its description, who maintains it, when it was made and changed and whether it is on.
 *
 * @module     local_servicemanager/components/schema/DetailsPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const p=({schema:d,urls:i,canManage:n,isHistory:r,busy:s,onToggle:c,text:o})=>l(b,{title:o("schema_information"),icon:"circle-info",region:"details",actions:r?void 0:l("div",{className:"d-flex flex-wrap gap-1",role:"group","aria-label":o("core_actions"),children:[n&&e(a,{icon:"pen-to-square",label:o("action_edit"),href:i.edit}),n&&e(a,{icon:"clock-rotate-left",label:o("version_history"),href:i.history,tone:"primary"}),e(a,{icon:"download",label:o("action_export"),href:i.export,tone:"info"}),n&&e(a,{icon:d.enabled?"toggle-on":"toggle-off",label:o(d.enabled?"bulk_disable":"bulk_enable"),onClick:c,disabled:s,tone:d.enabled?"success":"secondary"}),n&&e(a,{icon:"trash",label:o("action_delete"),href:i.delete,tone:"danger"})]}),children:[d.description&&e("p",{className:"mb-3",children:d.description}),l("dl",{className:"dd-dl mb-0",children:[e("dt",{children:o("schema_version")}),e("dd",{children:d.version}),d.maintainer&&l(t,{children:[e("dt",{children:o("schema_maintainer")}),e("dd",{children:d.maintainer})]}),e("dt",{children:o("schema_created")}),e("dd",{children:d.created}),e("dt",{children:o("schema_modified")}),e("dd",{children:d.modified}),!r&&l(t,{children:[e("dt",{children:o("schema_enabled")}),e("dd",{children:e("span",{className:`badge badge-soft rounded-pill text-bg-${d.enabled?"success":"secondary"}`,children:o(d.enabled?"core_yes":"core_no")})})]})]})]});var _=p;export{_ as default};
