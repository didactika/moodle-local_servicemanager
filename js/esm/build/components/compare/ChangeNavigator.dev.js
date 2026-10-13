var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Goes through the changes of a comparison, one after another, from a bar that floats at the bottom of the screen: the arrows go to
 * the previous and the next change and the text says which one it is and where.
 *
 * @module     local_servicemanager/components/compare/ChangeNavigator
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
const ChangeNavigator = /* @__PURE__ */ __name(({ runs, position, onMove, text }) => {
  const current = runs[position];
  return /* @__PURE__ */ jsxDEV("div", { className: "sm-floating sm-changenav", role: "status", "data-region": "change-navigator", children: [
    /* @__PURE__ */ jsxDEV("button", { type: "button", className: "sm-navbtn", onClick: () => onMove(-1), title: text("compare_prev_change"), children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "chevron-up" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
        lineNumber: 29,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("compare_prev_change") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
        lineNumber: 29,
        columnNumber: 39
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
      lineNumber: 28,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("span", { className: "sm-changenav-info", children: [
      /* @__PURE__ */ jsxDEV("strong", { children: current ? text("compare_change_of", { n: position + 1, total: runs.length }) : text("compare_changes_found", runs.length) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
        lineNumber: 32,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("small", { children: current ? text("compare_change_at", { line: current.line, kind: text("change_" + current.kind) }) : text("compare_changes_hint") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
        lineNumber: 33,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
      lineNumber: 31,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("button", { type: "button", className: "sm-navbtn", onClick: () => onMove(1), title: text("compare_next_change"), children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "chevron-down" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
        lineNumber: 36,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("compare_next_change") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
        lineNumber: 36,
        columnNumber: 41
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
      lineNumber: 35,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeNavigator.tsx",
    lineNumber: 27,
    columnNumber: 12
  });
}, "ChangeNavigator");
var ChangeNavigator_default = ChangeNavigator;
export {
  ChangeNavigator_default as default
};
//# sourceMappingURL=ChangeNavigator.dev.js.map
