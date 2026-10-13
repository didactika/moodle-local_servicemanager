var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * Every web service call of the plugin's pages, in one place.
 *
 * @module     local_servicemanager/services/api
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { fetchOne } from "@moodle/lms/core/ajax";
const call = /* @__PURE__ */ __name((methodname, args) => fetchOne({ methodname, args }), "call");
const getVersionYaml = /* @__PURE__ */ __name(async (historyid) => {
  const version = await call("local_servicemanager_get_version", { historyid });
  return version.yaml;
}, "getVersionYaml");
export {
  getVersionYaml
};
//# sourceMappingURL=api.dev.js.map
