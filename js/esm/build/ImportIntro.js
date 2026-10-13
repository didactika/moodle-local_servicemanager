import{useMemo as a}from"react";import e from"./components/common/BackLink";import n from"./components/common/ErrorBoundary";import m from"./components/common/Icon";import{createText as l}from"./engine/text";import{jsx as r,jsxs as i}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a person reads above the form that imports schemas: what files it takes and where the format is explained.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/ImportIntro
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const s=t=>{const o=a(()=>l(t.strings),[t.strings]);return r(n,{strings:t.strings,children:i("div",{className:"servicemanager-import-page",children:[r("div",{className:"mb-4",children:r(e,{href:t.backUrl,label:o("back")})}),i("div",{className:"alert alert-info",children:[i("h5",{children:[r(m,{name:"circle-info",gap:!0}),o("import_info_title")]}),r("p",{children:o("import_info_text")}),i("ul",{children:[r("li",{children:o("import_info_yaml")}),r("li",{children:o("import_info_zip")})]}),r("p",{className:"mb-0",children:i("a",{href:t.documentationUrl,className:"alert-link fw-bold",children:[r(m,{name:"book",gap:!0}),o("view_documentation")]})})]})]})})};var g=s;export{g as default};
