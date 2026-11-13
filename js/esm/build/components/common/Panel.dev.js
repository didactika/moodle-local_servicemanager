var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A card of Bootstrap with a head: the icon and the title of what it holds, how many there are, and its actions.
 *
 * @module     local_servicemanager/components/common/Panel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const Panel = /* @__PURE__ */ __name(({ title, icon, count, actions, flush = false, region, children }) => /* @__PURE__ */ jsxDEV("section", { className: "card", "data-region": region, children: [
  /* @__PURE__ */ jsxDEV("header", { className: "card-header d-flex flex-wrap align-items-center justify-content-between gap-2", children: [
    /* @__PURE__ */ jsxDEV("h3", { className: "h6 mb-0 d-flex align-items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-muted", children: /* @__PURE__ */ jsxDEV(Icon, { name: icon }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
        lineNumber: 29,
        columnNumber: 42
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
        lineNumber: 29,
        columnNumber: 13
      }),
      title,
      count !== void 0 && /* @__PURE__ */ jsxDEV("span", { className: "badge badge-soft rounded-pill text-bg-secondary", children: count }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
        lineNumber: 31,
        columnNumber: 37
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
      lineNumber: 28,
      columnNumber: 9
    }),
    actions
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
    lineNumber: 27,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("div", { className: flush ? void 0 : "card-body", children }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
    lineNumber: 35,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/common/Panel.tsx",
  lineNumber: 26,
  columnNumber: 95
}), "Panel");
var Panel_default = Panel;
export {
  Panel_default as default
};
//# sourceMappingURL=Panel.dev.js.map
