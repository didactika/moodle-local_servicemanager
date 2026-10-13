var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A choice of one among a few, drawn as pills that take the whole width of their row; the one that is chosen is tinted and has a check.
 *
 * @module     local_servicemanager/components/common/Chips
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const Chips = /* @__PURE__ */ __name(({ label, chips, value, onChange }) => /* @__PURE__ */ jsxDEV("div", { className: "sm-chips", role: "group", "aria-label": label, children: chips.map((chip) => /* @__PURE__ */ jsxDEV(
  "button",
  {
    type: "button",
    className: `sm-chip${chip.value === value ? " active" : ""}`,
    "aria-pressed": chip.value === value,
    onClick: () => onChange(chip.value),
    children: [
      chip.value === value && /* @__PURE__ */ jsxDEV(Icon, { name: "check", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Chips.tsx",
        lineNumber: 35,
        columnNumber: 34
      }),
      chip.label
    ]
  },
  chip.value,
  true,
  {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Chips.tsx",
    lineNumber: 28,
    columnNumber: 26
  }
)) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/common/Chips.tsx",
  lineNumber: 27,
  columnNumber: 64
}), "Chips");
var Chips_default = Chips;
export {
  Chips_default as default
};
//# sourceMappingURL=Chips.dev.js.map
