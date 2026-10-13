var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The dates of the filters, which a date field writes as text and the server reads as a Unix time.
 *
 * @module     local_servicemanager/lib/dates
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const toTimestamp = /* @__PURE__ */ __name((day) => {
  if (!day) {
    return "";
  }
  return String(Math.floor(new Date(day).getTime() / 1e3));
}, "toTimestamp");
export {
  toTimestamp
};
//# sourceMappingURL=dates.dev.js.map
