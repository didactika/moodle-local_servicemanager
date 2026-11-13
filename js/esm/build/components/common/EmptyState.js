import o from"./Icon";import{jsx as t,jsxs as r}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a page or a list says when it has nothing, as the design system draws it: the icon in its tile, the title, the
 * explanation and what to do.
 *
 * @module     local_servicemanager/components/common/EmptyState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=({icon:d,title:s,text:p,actions:e,bare:i=!1})=>{const a=r("div",{className:"dd-empty","data-region":"empty",children:[t("span",{className:"dd-tile dd-tile-lg",children:t(o,{name:d})}),t("p",{className:"dd-empty-title",children:s}),t("p",{className:"dd-empty-text",children:p}),e&&t("div",{className:"d-flex flex-wrap justify-content-center gap-2",children:e})]});return i?a:t("div",{className:"card",children:a})};var l=m;export{l as default};
