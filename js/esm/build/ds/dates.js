/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The usual periods of a filter of dates, counted from a day.
 *
 * @module     local_servicemanager/ds/dates
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const e=t=>{const r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${r}-${n}`},o=t=>{const r=n=>new Date(t.getFullYear(),t.getMonth(),t.getDate()-n);return[{key:"today",from:e(t),to:e(t)},{key:"week",from:e(r(6)),to:e(t)},{key:"month",from:e(new Date(t.getFullYear(),t.getMonth(),1)),to:e(t)},{key:"last30",from:e(r(29)),to:e(t)}]};export{o as datePresets,e as isoDay};
