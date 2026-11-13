var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a page or a list says when it has nothing, as the design system draws it: the icon in its tile, the title, the
 * explanation and what to do.
 *
 * @module     local_servicemanager/components/common/EmptyState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const EmptyState = /* @__PURE__ */ __name(({ icon, title, text, actions, bare = false }) => {
  const body = /* @__PURE__ */ jsxDEV("div", { className: "dd-empty", "data-region": "empty", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "dd-tile dd-tile-lg", children: /* @__PURE__ */ jsxDEV(Icon, { name: icon }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/EmptyState.tsx",
      lineNumber: 27,
      columnNumber: 46
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/EmptyState.tsx",
      lineNumber: 27,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("p", { className: "dd-empty-title", children: title }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/EmptyState.tsx",
      lineNumber: 28,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("p", { className: "dd-empty-text", children: text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/EmptyState.tsx",
      lineNumber: 29,
      columnNumber: 9
    }),
    actions && /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap justify-content-center gap-2", children: actions }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/EmptyState.tsx",
      lineNumber: 30,
      columnNumber: 21
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/EmptyState.tsx",
    lineNumber: 26,
    columnNumber: 18
  });
  return bare ? body : /* @__PURE__ */ jsxDEV("div", { className: "card", children: body }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/EmptyState.tsx",
    lineNumber: 32,
    columnNumber: 26
  });
}, "EmptyState");
var EmptyState_default = EmptyState;
export {
  EmptyState_default as default
};
//# sourceMappingURL=EmptyState.dev.js.map
