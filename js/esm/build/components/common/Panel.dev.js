var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * A section of a page: a card with a title, an icon, how many things it holds and, when it has them, its own actions.
 *
 * Every section of every page is one, so they look the same.
 *
 * @module     local_servicemanager/components/common/Panel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const Panel = /* @__PURE__ */ __name(({ title, icon, count, actions, flush = false, region, children }) => /* @__PURE__ */ jsxDEV("section", { className: "card sm-panel", "data-region": region, children: [
  /* @__PURE__ */ jsxDEV("header", { className: "card-header d-flex align-items-center justify-content-between", children: [
    /* @__PURE__ */ jsxDEV("h3", { className: "sm-panel-title mb-0", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "sm-panel-icon text-body-secondary", children: /* @__PURE__ */ jsxDEV(Icon, { name: icon, gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
        lineNumber: 31,
        columnNumber: 65
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
        lineNumber: 31,
        columnNumber: 13
      }),
      title,
      count !== void 0 && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-secondary ms-2", children: count }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
        lineNumber: 33,
        columnNumber: 37
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
      lineNumber: 30,
      columnNumber: 9
    }),
    actions
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
    lineNumber: 29,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("div", { className: flush ? void 0 : "card-body", children }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
    lineNumber: 37,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
  lineNumber: 28,
  columnNumber: 95
}), "Panel");
var Panel_default = Panel;
export {
  Panel_default as default
};
//# sourceMappingURL=Panel.dev.js.map
