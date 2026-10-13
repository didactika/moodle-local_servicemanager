var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What the person has chosen to compare and the button that compares it. It floats at the bottom of the screen, as the bar of the
 * schemas of the dashboard does, so it is at hand however long the list is.
 *
 * @module     local_servicemanager/components/history/CompareBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
const CompareBar = /* @__PURE__ */ __name(({ chosen, needed, tooMany, onClear, text }) => /* @__PURE__ */ jsxDEV("div", { className: "sm-floating sm-compare", role: "status", "data-region": "compare-bar", children: [
  [...chosen].map((id) => /* @__PURE__ */ jsxDEV("input", { type: "hidden", name: "compare[]", value: id }, id, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 26,
    columnNumber: 30
  })),
  /* @__PURE__ */ jsxDEV("span", { className: "sm-floating-count", "data-region": "compare-chosen", children: /* @__PURE__ */ jsxDEV("span", { children: text("compare_chosen", { n: chosen.size, total: needed }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 28,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 27,
    columnNumber: 5
  }),
  tooMany && /* @__PURE__ */ jsxDEV("span", { className: "sm-compare-warning", role: "alert", children: text("compare_select_two") }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 30,
    columnNumber: 17
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "sm-floating-actions", children: /* @__PURE__ */ jsxDEV("button", { type: "submit", id: "compare-btn", className: "btn sm-pill solid tone-primary", disabled: chosen.size !== needed, children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: "code-compare", gap: true }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
      lineNumber: 33,
      columnNumber: 13
    }),
    text("compare_versions")
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 32,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 31,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("button", { type: "button", className: "sm-floating-clear", onClick: onClear, title: text("compare_clear"), children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: "xmark" }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
      lineNumber: 37,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("compare_clear") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
      lineNumber: 37,
      columnNumber: 30
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 36,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
  lineNumber: 25,
  columnNumber: 83
}), "CompareBar");
var CompareBar_default = CompareBar;
export {
  CompareBar_default as default
};
//# sourceMappingURL=CompareBar.dev.js.map
