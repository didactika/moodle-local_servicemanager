var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The head of a page: its title, a line that says what it is for and the actions that belong to the whole page.
 *
 * @module     local_servicemanager/components/common/PageHeader
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const PageHeader = /* @__PURE__ */ __name(({ title, subtitle, badges, actions }) => /* @__PURE__ */ jsxDEV(
  "header",
  {
    className: "d-flex flex-wrap justify-content-between align-items-start sm-page-header",
    children: [
      /* @__PURE__ */ jsxDEV("div", { className: "sm-page-title", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center sm-badges-row", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "mb-0", children: title }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
            lineNumber: 27,
            columnNumber: 13
          }),
          badges
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
          lineNumber: 26,
          columnNumber: 9
        }),
        subtitle && /* @__PURE__ */ jsxDEV("p", { className: "text-body-secondary mb-0 mt-1", children: subtitle }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
          lineNumber: 30,
          columnNumber: 22
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
        lineNumber: 25,
        columnNumber: 5
      }),
      actions && /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center sm-actions-row", children: actions }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
        lineNumber: 32,
        columnNumber: 17
      })
    ]
  },
  void 0,
  true,
  {
    fileName: "public/local/servicemanager/js/esm/src/components/common/PageHeader.tsx",
    lineNumber: 22,
    columnNumber: 77
  }
), "PageHeader");
var PageHeader_default = PageHeader;
export {
  PageHeader_default as default
};
//# sourceMappingURL=PageHeader.dev.js.map
