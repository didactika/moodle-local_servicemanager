import c from"./Icon";import{jsx as t,jsxs as r}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a list shows when it has nothing to list: what happened and what the person can do about it.
 *
 * @module     local_servicemanager/components/common/EmptyState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const d=({icon:a,title:s,text:o,actions:e,bare:m=!1})=>t("div",{className:`${m?"":"card "}sm-empty`,"data-region":"empty-state",children:r("div",{className:"card-body text-center py-5",children:[t("div",{className:"sm-empty-icon text-body-secondary mb-3",children:t(c,{name:a})}),t("h4",{className:"mb-2",children:s}),t("p",{className:"text-body-secondary mx-auto sm-empty-text",children:o}),e&&t("div",{className:"d-flex flex-wrap justify-content-center sm-actions-row",children:e})]})});var n=d;export{n as default};
