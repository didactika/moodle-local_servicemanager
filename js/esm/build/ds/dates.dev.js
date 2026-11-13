var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
 */
const isoDay = /* @__PURE__ */ __name((date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}, "isoDay");
const datePresets = /* @__PURE__ */ __name((today) => {
  const back = /* @__PURE__ */ __name((days) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - days), "back");
  return [
    { key: "today", from: isoDay(today), to: isoDay(today) },
    { key: "week", from: isoDay(back(6)), to: isoDay(today) },
    { key: "month", from: isoDay(new Date(today.getFullYear(), today.getMonth(), 1)), to: isoDay(today) },
    { key: "last30", from: isoDay(back(29)), to: isoDay(today) }
  ];
}, "datePresets");
export {
  datePresets,
  isoDay
};
//# sourceMappingURL=dates.dev.js.map
