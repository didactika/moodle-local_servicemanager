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
const setSchemaEnabled = /* @__PURE__ */ __name(async (id, enabled) => {
  const result = await call("local_servicemanager_set_enabled", { id, enabled });
  return result.enabled;
}, "setSchemaEnabled");
const rollbackSchema = /* @__PURE__ */ __name(async (id, historyid) => {
  const result = await call("local_servicemanager_rollback_schema", { id, historyid });
  return {
    version: result.version,
    rows: result.rows.map((row) => ({
      id: row.id,
      version: row.version,
      userName: row.username,
      userPicture: row.userpicture,
      date: row.date,
      at: row.at,
      reason: row.reason,
      isCurrent: row.iscurrent,
      viewUrl: row.viewurl,
      canRollback: row.canrollback
    }))
  };
}, "rollbackSchema");
const regenerateToken = /* @__PURE__ */ __name(async (id) => {
  const result = await call("local_servicemanager_regenerate_token", { id });
  return result.token;
}, "regenerateToken");
export {
  getVersionYaml,
  regenerateToken,
  rollbackSchema,
  setSchemaEnabled
};
//# sourceMappingURL=api.dev.js.map
