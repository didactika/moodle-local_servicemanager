import o from"./Icon";import{jsx as t,jsxs as d}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a list shows when it has nothing to list: what happened and what the person can do about it.
 *
 * @module     local_servicemanager/components/common/EmptyState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const c=({icon:a,title:s,text:m,actions:e})=>t("div",{className:"card sm-empty","data-region":"empty-state",children:d("div",{className:"card-body text-center py-5",children:[t("div",{className:"sm-empty-icon text-body-secondary mb-3",children:t(o,{name:a})}),t("h4",{className:"mb-2",children:s}),t("p",{className:"text-body-secondary mx-auto sm-empty-text",children:m}),e&&t("div",{className:"d-flex flex-wrap justify-content-center sm-actions-row",children:e})]})});var r=c;export{r as default};
