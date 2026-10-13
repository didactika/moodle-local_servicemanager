var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * Which pages of a list a person can go to from the one they are on.
 *
 * @module     local_servicemanager/lib/paging
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const pageWindow = /* @__PURE__ */ __name((page, perpage, total) => {
  const pages = Math.max(1, Math.ceil(total / Math.max(1, perpage)));
  const start = Math.max(0, page - 2);
  const end = Math.min(pages - 1, page + 2);
  const shown = [];
  for (let index = start; index <= end; index++) {
    shown.push(index);
  }
  return {
    pages,
    shown,
    first: page > 1,
    previous: page > 0,
    next: page < pages - 1,
    last: page < pages - 2,
    startDots: start > 0,
    endDots: end < pages - 1
  };
}, "pageWindow");
const pageUrl = /* @__PURE__ */ __name((base, page) => {
  const [path, query = ""] = base.split("?");
  const kept = query.split("&").filter((part) => part !== "" && !part.startsWith("page="));
  return path + "?" + [...kept, "page=" + page].join("&");
}, "pageUrl");
export {
  pageUrl,
  pageWindow
};
//# sourceMappingURL=paging.dev.js.map
