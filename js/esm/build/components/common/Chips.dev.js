var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The filter chips of the design system, for the one choice of a short list: the chosen one is pressed.
 *
 * @module     local_servicemanager/components/common/Chips
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const Chips = /* @__PURE__ */ __name(({ label, chips, value, onChange }) => /* @__PURE__ */ jsxDEV("div", { className: "dd-chips", role: "group", "aria-label": label, children: chips.map((chip) => /* @__PURE__ */ jsxDEV(
  "button",
  {
    type: "button",
    className: "dd-chip",
    "aria-pressed": chip.value === value,
    onClick: () => onChange(chip.value),
    children: chip.label
  },
  chip.value,
  false,
  {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Chips.tsx",
    lineNumber: 26,
    columnNumber: 26
  }
)) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/common/Chips.tsx",
  lineNumber: 25,
  columnNumber: 64
}), "Chips");
var Chips_default = Chips;
export {
  Chips_default as default
};
//# sourceMappingURL=Chips.dev.js.map
