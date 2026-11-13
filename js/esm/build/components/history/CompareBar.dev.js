var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The floating bar of the design system while versions are chosen to compare: how many of the two are chosen, a warning when a
 * third one was tried, the button that compares them and the one that clears the choice.
 *
 * @module     local_servicemanager/components/history/CompareBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
const CompareBar = /* @__PURE__ */ __name(({ chosen, needed, tooMany, onClear, text }) => /* @__PURE__ */ jsxDEV(
  "div",
  {
    className: "dd-floatbar",
    role: "region",
    "aria-label": text("compare_versions"),
    "data-region": "compare-bar",
    children: [
      [...chosen].map((id) => /* @__PURE__ */ jsxDEV("input", { type: "hidden", name: "compare[]", value: id }, id, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
        lineNumber: 27,
        columnNumber: 30
      })),
      /* @__PURE__ */ jsxDEV("span", { className: "dd-floatbar-count", role: "status", "data-region": "compare-chosen", children: text("compare_chosen", { n: chosen.size, total: needed }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
        lineNumber: 28,
        columnNumber: 5
      }),
      tooMany && /* @__PURE__ */ jsxDEV("span", { className: "text-danger small", role: "alert", children: text("compare_select_two") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
        lineNumber: 29,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "dd-floatbar-actions", children: /* @__PURE__ */ jsxDEV("button", { type: "submit", id: "compare-btn", className: "btn btn-primary btn-sm", disabled: chosen.size !== needed, children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "code-compare", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
          lineNumber: 32,
          columnNumber: 13
        }),
        text("compare_versions")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
        lineNumber: 31,
        columnNumber: 9
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
        lineNumber: 30,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "button", className: "dd-floatbar-clear", onClick: onClear, title: text("compare_clear"), "aria-label": text("compare_clear") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
        lineNumber: 35,
        columnNumber: 5
      })
    ]
  },
  void 0,
  true,
  {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 25,
    columnNumber: 83
  }
), "CompareBar");
var CompareBar_default = CompareBar;
export {
  CompareBar_default as default
};
//# sourceMappingURL=CompareBar.dev.js.map
