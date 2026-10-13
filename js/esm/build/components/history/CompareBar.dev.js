var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The bar that follows the person down the history while they pick the two versions to compare.
 *
 * @module     local_servicemanager/components/history/CompareBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
const CompareBar = /* @__PURE__ */ __name(({ chosen, needed, tooMany, onClear, text }) => /* @__PURE__ */ jsxDEV("div", { className: "sm-compare-bar", role: "status", "data-region": "compare-bar", children: [
  [...chosen].map((id) => /* @__PURE__ */ jsxDEV("input", { type: "hidden", name: "compare[]", value: id }, id, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 25,
    columnNumber: 30
  })),
  /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-center flex-wrap sm-actions-row", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "fw-bold", children: text("compare_chosen", { n: chosen.size, total: needed }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
      lineNumber: 27,
      columnNumber: 9
    }),
    tooMany && /* @__PURE__ */ jsxDEV("span", { className: "text-danger", role: "alert", children: text("compare_select_two") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
      lineNumber: 28,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "ms-auto sm-group", children: [
      chosen.size > 0 && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn sm-pill", onClick: onClear, children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "xmark", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
          lineNumber: 31,
          columnNumber: 17
        }),
        text("compare_clear")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
        lineNumber: 30,
        columnNumber: 33
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "submit", id: "compare-btn", className: "btn sm-pill solid tone-primary", disabled: chosen.size !== needed, children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "code-compare", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
          lineNumber: 34,
          columnNumber: 17
        }),
        text("compare_versions")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
        lineNumber: 33,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
      lineNumber: 29,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
    lineNumber: 26,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/history/CompareBar.tsx",
  lineNumber: 24,
  columnNumber: 83
}), "CompareBar");
var CompareBar_default = CompareBar;
export {
  CompareBar_default as default
};
//# sourceMappingURL=CompareBar.dev.js.map
