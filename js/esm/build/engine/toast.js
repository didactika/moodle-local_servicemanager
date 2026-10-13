import{requireAsync as s}from"@moodle/lms/core/amd";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Typed adapter for the toasts of Moodle, which have no native ESM module yet.
 *
 * @module     local_servicemanager/engine/toast
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */let t=null;const e=async()=>{const o=await s("core/toast");return"default"in o?o.default:o},d=async(o,a={})=>{t??=e(),await(await t).add(o,a)};export{d as addToast};
