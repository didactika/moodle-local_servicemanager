var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The badge of a status, with its icon and its text.
 *
 * @module     local_servicemanager/components/common/StatusBadge
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { statusLook } from "../../lib/status";
import Icon from "./Icon";
const StatusBadge = /* @__PURE__ */ __name(({ status, label }) => {
  const look = statusLook(status);
  return /* @__PURE__ */ jsxDEV("span", { className: `sm-badge tone-${look.tone}`, children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: look.icon, gap: true }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/StatusBadge.tsx",
      lineNumber: 23,
      columnNumber: 9
    }),
    label
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatusBadge.tsx",
    lineNumber: 22,
    columnNumber: 12
  });
}, "StatusBadge");
var StatusBadge_default = StatusBadge;
export {
  StatusBadge_default as default
};
//# sourceMappingURL=StatusBadge.dev.js.map
