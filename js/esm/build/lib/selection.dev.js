var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * What the schemas chosen in the dashboard allow doing to them together.
 *
 * @module     local_servicemanager/lib/selection
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const bulkActions = /* @__PURE__ */ __name((rows, chosen) => {
  const picked = rows.filter((row) => chosen.has(row.id));
  return {
    enable: picked.some((row) => !row.enabled),
    disable: picked.some((row) => row.enabled)
  };
}, "bulkActions");
export {
  bulkActions
};
//# sourceMappingURL=selection.dev.js.map
