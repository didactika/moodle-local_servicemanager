import{Component as n}from"react";import o,{registerIcons as i}from"./Icon";import{jsx as e,jsxs as t}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Catches an error of the page, so a mistake in one part leaves a message with a way out instead of a blank page.
 *
 * @module     local_servicemanager/components/common/ErrorBoundary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */class s extends n{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(r,a){window.console.error("local_servicemanager",r,a.componentStack)}render(){if(i(this.props.strings),!this.state.failed)return this.props.children;const{strings:r}=this.props;return t("div",{className:"alert alert-danger d-flex align-items-start",role:"alert","data-region":"page-error",children:[e(o,{name:"circle-exclamation",gap:!0}),t("div",{children:[e("h5",{className:"alert-heading",children:r.error_page_title}),e("p",{className:"mb-2",children:r.error_page_text}),t("button",{type:"button",className:"btn btn-sm btn-outline-danger",onClick:()=>window.location.reload(),children:[e(o,{name:"rotate",gap:!0}),r.error_page_reload]})]})]})}}var p=s;export{p as default};
