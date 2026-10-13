/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Text of the page, which the server sends once with the properties of the component.
 *
 * @module     local_servicemanager/engine/text
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const i=n=>(o,t="")=>{const e=n[o]??"";return t!==null&&typeof t=="object"?Object.keys(t).reduce((c,r)=>c.split(`{${r}}`).join(String(t[r])),e):e.replace("{n}",String(t))};export{i as createText};
