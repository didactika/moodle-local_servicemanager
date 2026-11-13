var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The foot of a list, as the Didactika design system and Delegate account draw it: rows per page with the sizes that fit the
 * list, which rows are shown, and the arrows.
 *
 * @module     local_servicemanager/components/common/Pager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useId } from "react";
import { fitPageSizes, pageRange } from "../../lib/paging";
import Icon from "./Icon";
const Pager = /* @__PURE__ */ __name(({ page, perpage, total, onChange, text }) => {
  const id = useId();
  if (total === 0) {
    return null;
  }
  const { from, to } = pageRange(page, perpage, total);
  const { sizes, shown } = fitPageSizes(perpage, total);
  return /* @__PURE__ */ jsxDEV("div", { className: "table-foot", children: /* @__PURE__ */ jsxDEV("nav", { className: "dd-pager", "aria-label": text("pagination_aria_label"), children: [
    /* @__PURE__ */ jsxDEV("div", { className: "dd-pager-size", children: [
      /* @__PURE__ */ jsxDEV("label", { htmlFor: id, className: "mb-0", children: text("pagination_per_page") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
        lineNumber: 39,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(
        "select",
        {
          id,
          className: "form-select form-select-sm dd-select",
          value: shown,
          onChange: (event) => onChange({ perpage: Number(event.target.value), page: 0 }),
          children: sizes.map((size) => /* @__PURE__ */ jsxDEV("option", { value: size, children: size ? size : text("pagination_all") }, size, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
            lineNumber: 46,
            columnNumber: 42
          }))
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
          lineNumber: 40,
          columnNumber: 17
        }
      )
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
      lineNumber: 38,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "dd-pager-end", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "dd-pager-range", role: "status", children: text("pagination_range", { from, to, total }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
        lineNumber: 50,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "dd-pager-arrows", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            className: "btn btn-outline-secondary btn-sm btn-icon",
            disabled: page === 0,
            title: text("pagination_previous"),
            "aria-label": text("pagination_previous"),
            onClick: () => onChange({ page: page - 1 }),
            children: /* @__PURE__ */ jsxDEV(Icon, { name: "angle-left" }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
              lineNumber: 55,
              columnNumber: 25
            })
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
            lineNumber: 52,
            columnNumber: 21
          }
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            className: "btn btn-outline-secondary btn-sm btn-icon",
            disabled: to >= total,
            title: text("pagination_next"),
            "aria-label": text("pagination_next"),
            onClick: () => onChange({ page: page + 1 }),
            children: /* @__PURE__ */ jsxDEV(Icon, { name: "angle-right" }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
              lineNumber: 60,
              columnNumber: 25
            })
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
            lineNumber: 57,
            columnNumber: 21
          }
        )
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
        lineNumber: 51,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
      lineNumber: 49,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
    lineNumber: 37,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Pager.tsx",
    lineNumber: 36,
    columnNumber: 12
  });
}, "Pager");
var Pager_default = Pager;
export {
  Pager_default as default
};
//# sourceMappingURL=Pager.dev.js.map
