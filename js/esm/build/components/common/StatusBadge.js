import{statusLook as s}from"../../lib/status";import e from"./Icon";import{jsx as r,jsxs as g}from"react/jsx-runtime";/**
 * The badge of a status, with its icon and its text.
 *
 * @module     local_servicemanager/components/common/StatusBadge
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const n=({status:a,label:o})=>{const t=s(a);return g("span",{className:`badge text-bg-${t.tone}`,children:[r(e,{name:t.icon,gap:!0}),o]})};var c=n;export{c as default};
