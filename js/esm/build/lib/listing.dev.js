var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a list shows for what the person asked: the rows that match a search, a status and a range of dates, and the page of them.
 *
 * The lists are filtered in the page, so nothing here touches the server, the DOM or React.
 *
 * @module     local_servicemanager/lib/listing
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const parseState = /* @__PURE__ */ __name((search, perpage, options) => {
  const params = new URLSearchParams(search);
  const asked = Number(params.get("perpage"));
  const page = Number(params.get("page"));
  return {
    query: params.get("q") ?? "",
    status: params.get("status") ?? "",
    from: params.get("from") ?? "",
    to: params.get("to") ?? "",
    perpage: options.includes(asked) ? asked : perpage,
    page: Number.isInteger(page) && page > 0 ? page : 0
  };
}, "parseState");
const stateQuery = /* @__PURE__ */ __name((state, perpage) => {
  const params = new URLSearchParams();
  if (state.query) {
    params.set("q", state.query);
  }
  if (state.status) {
    params.set("status", state.status);
  }
  if (state.from) {
    params.set("from", state.from);
  }
  if (state.to) {
    params.set("to", state.to);
  }
  if (state.perpage !== perpage) {
    params.set("perpage", String(state.perpage));
  }
  if (state.page > 0) {
    params.set("page", String(state.page));
  }
  const text = params.toString();
  return text ? "?" + text : "";
}, "stateQuery");
const dayTime = /* @__PURE__ */ __name((day, end) => {
  if (!day) {
    return null;
  }
  const start = (/* @__PURE__ */ new Date(day + "T00:00:00")).getTime() / 1e3;
  return Number.isNaN(start) ? null : start + (end ? 86399 : 0);
}, "dayTime");
const matches = /* @__PURE__ */ __name((row, state) => {
  if (state.status && row.status !== state.status) {
    return false;
  }
  const from = dayTime(state.from, false);
  const to = dayTime(state.to, true);
  if (from !== null && row.at < from || to !== null && row.at > to) {
    return false;
  }
  const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return true;
  }
  const haystack = row.texts.join(" ").toLowerCase();
  return words.every((word) => haystack.includes(word));
}, "matches");
const paginate = /* @__PURE__ */ __name((rows, page, perpage) => {
  const pages = Math.max(1, Math.ceil(rows.length / Math.max(1, perpage)));
  const at = Math.min(Math.max(0, page), pages - 1);
  return { rows: rows.slice(at * perpage, (at + 1) * perpage), page: at, pages, total: rows.length };
}, "paginate");
const countBy = /* @__PURE__ */ __name((rows) => {
  const counts = {};
  for (const row of rows) {
    const key = row.status ?? "";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}, "countBy");
export {
  countBy,
  matches,
  paginate,
  parseState,
  stateQuery
};
//# sourceMappingURL=listing.dev.js.map
