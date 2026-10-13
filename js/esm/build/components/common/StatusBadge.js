import{statusLook as s}from"../../lib/status";import e from"./Icon";import{jsx as r,jsxs as p}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The badge of a status, with its icon and its text.
 *
 * @module     local_servicemanager/components/common/StatusBadge
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const n=({status:a,label:o})=>{const t=s(a);return p("span",{className:`sm-badge tone-${t.tone}`,children:[r(e,{name:t.icon,gap:!0}),o]})};var u=n;export{u as default};
