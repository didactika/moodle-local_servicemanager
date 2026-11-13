var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The status of a schema or of a check, as a badge of the design system with the dot of its colour.
 *
 * @module     local_servicemanager/components/common/StatusBadge
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { statusLook } from "../../lib/status";
const StatusBadge = /* @__PURE__ */ __name(({ status, label }) => /* @__PURE__ */ jsxDEV("span", { className: `badge badge-soft badge-dot rounded-pill text-bg-${statusLook(status).tone}`, children: label }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/common/StatusBadge.tsx",
  lineNumber: 20,
  columnNumber: 5
}), "StatusBadge");
var StatusBadge_default = StatusBadge;
export {
  StatusBadge_default as default
};
//# sourceMappingURL=StatusBadge.dev.js.map
