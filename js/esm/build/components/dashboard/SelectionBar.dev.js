var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What can be done with the schemas that were chosen. It floats at the bottom of the screen while there is a choice, so the page
 * does not move and the actions are always at hand.
 *
 * @module     local_servicemanager/components/dashboard/SelectionBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
const SelectionBar = /* @__PURE__ */ __name(({ count, actions, onAction, onClear, text }) => /* @__PURE__ */ jsxDEV("div", { className: "sm-floating", "data-region": "bulk-actions", role: "status", children: [
  /* @__PURE__ */ jsxDEV("span", { className: "sm-floating-count", children: /* @__PURE__ */ jsxDEV("span", { children: [
    count,
    " ",
    text("selected")
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
    lineNumber: 26,
    columnNumber: 41
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
    lineNumber: 26,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "sm-floating-actions", role: "group", "aria-label": text("core_actions"), children: [
    actions.enable && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "sm-pill tone-success", onClick: () => onAction("enable"), children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "toggle-on", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
        lineNumber: 29,
        columnNumber: 13
      }),
      text("bulk_enable")
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
      lineNumber: 28,
      columnNumber: 28
    }),
    actions.disable && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "sm-pill tone-warning", onClick: () => onAction("disable"), children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "toggle-off", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
        lineNumber: 32,
        columnNumber: 13
      }),
      text("bulk_disable")
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
      lineNumber: 31,
      columnNumber: 29
    }),
    /* @__PURE__ */ jsxDEV("button", { type: "button", className: "sm-pill tone-info", onClick: () => onAction("export"), children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "download", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
        lineNumber: 35,
        columnNumber: 13
      }),
      text("bulk_export")
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
      lineNumber: 34,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("button", { type: "button", className: "sm-pill tone-danger", onClick: () => onAction("delete"), children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "trash", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
        lineNumber: 38,
        columnNumber: 13
      }),
      text("bulk_delete")
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
      lineNumber: 37,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
    lineNumber: 27,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("button", { type: "button", className: "sm-floating-clear", onClick: onClear, title: text("compare_clear"), children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: "xmark" }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
      lineNumber: 42,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("compare_clear") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
      lineNumber: 42,
      columnNumber: 30
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
    lineNumber: 41,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SelectionBar.tsx",
  lineNumber: 25,
  columnNumber: 88
}), "SelectionBar");
var SelectionBar_default = SelectionBar;
export {
  SelectionBar_default as default
};
//# sourceMappingURL=SelectionBar.dev.js.map
