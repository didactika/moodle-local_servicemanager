/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What the schemas chosen in the dashboard allow doing to them together.
 *
 * @module     local_servicemanager/lib/selection
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const a=(n,t)=>{const o=n.filter(e=>t.has(e.id));return{enable:o.some(e=>!e.enabled),disable:o.some(e=>e.enabled)}};export{a as bulkActions};
