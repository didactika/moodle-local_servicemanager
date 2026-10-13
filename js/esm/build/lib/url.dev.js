var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * Addresses of the lists, which are the same list with another filter.
 *
 * @module     local_servicemanager/lib/url
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const withParam = /* @__PURE__ */ __name((base, name, value) => {
  const [path, query = ""] = base.split("?");
  const kept = query.split("&").filter((part) => part !== "" && !part.startsWith(name + "=") && !part.startsWith("page="));
  if (value !== "") {
    kept.push(name + "=" + encodeURIComponent(value));
  }
  return kept.length ? path + "?" + kept.join("&") : path;
}, "withParam");
export {
  withParam
};
//# sourceMappingURL=url.dev.js.map
