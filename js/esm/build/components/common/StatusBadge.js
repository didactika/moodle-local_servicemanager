import{statusLook as s}from"../../lib/status";import{jsx as o}from"react/jsx-runtime";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The status of a schema or of a check, as a badge of the design system with the dot of its colour.
 *
 * @module     local_servicemanager/components/common/StatusBadge
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const e=({status:t,label:a})=>o("span",{className:`badge badge-soft badge-dot rounded-pill text-bg-${s(t).tone}`,children:a});var g=e;export{g as default};
