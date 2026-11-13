var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The head of a page, as the design system draws it: the title with its badges and its line of context, and the actions
 * of the page at the other end; on a narrow screen the actions go under the title.
 *
 * @module     local_servicemanager/components/common/PageHeader
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const PageHeader = /* @__PURE__ */ __name(({ title, subtitle, badges, actions }) => /* @__PURE__ */ jsxDEV("header", { className: "dd-page-header", children: /* @__PURE__ */ jsxDEV("div", { className: "dd-page-header-row", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "dd-page-header-main", children: /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "dd-page-title", children: title }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
        lineNumber: 28,
        columnNumber: 21
      }),
      badges
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
      lineNumber: 27,
      columnNumber: 17
    }),
    subtitle && /* @__PURE__ */ jsxDEV("p", { className: "dd-page-subtitle", children: subtitle }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
      lineNumber: 31,
      columnNumber: 30
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
    lineNumber: 26,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
    lineNumber: 25,
    columnNumber: 9
  }),
  actions && /* @__PURE__ */ jsxDEV("div", { className: "dd-page-actions", children: actions }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
    lineNumber: 34,
    columnNumber: 21
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
  lineNumber: 24,
  columnNumber: 5
}) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
  lineNumber: 23,
  columnNumber: 77
}), "PageHeader");
var PageHeader_default = PageHeader;
export {
  PageHeader_default as default
};
//# sourceMappingURL=PageHeader.dev.js.map
