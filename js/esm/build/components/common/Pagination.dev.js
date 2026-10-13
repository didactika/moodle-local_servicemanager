var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The bar that goes from one page of a list to another, without leaving the page.
 *
 * @module     local_servicemanager/components/common/Pagination
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { pageWindow } from "../../lib/paging";
import Icon from "./Icon";
const Pagination = /* @__PURE__ */ __name(({ page, perpage, total, onPage, text }) => {
  const bar = pageWindow(page, perpage, total);
  if (bar.pages < 2) {
    return null;
  }
  const go = /* @__PURE__ */ __name((target, title, content) => /* @__PURE__ */ jsxDEV("li", { className: "page-item", children: /* @__PURE__ */ jsxDEV("button", { type: "button", className: "page-link", title, "aria-label": title, onClick: () => onPage(target), children: content }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
    lineNumber: 31,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
    lineNumber: 30,
    columnNumber: 71
  }), "go");
  return /* @__PURE__ */ jsxDEV("nav", { "aria-label": text("pagination_aria_label"), className: "servicemanager-pagination mt-3", children: [
    /* @__PURE__ */ jsxDEV("ul", { className: "pagination justify-content-center mb-1", children: [
      bar.first && go(0, text("pagination_first"), /* @__PURE__ */ jsxDEV(Icon, { name: "angles-left" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 36,
        columnNumber: 59
      })),
      bar.previous && go(page - 1, text("pagination_previous"), /* @__PURE__ */ jsxDEV(Icon, { name: "angle-left" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 37,
        columnNumber: 72
      })),
      bar.startDots && /* @__PURE__ */ jsxDEV("li", { className: "page-item disabled", children: /* @__PURE__ */ jsxDEV("span", { className: "page-link", children: "..." }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 38,
        columnNumber: 66
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 38,
        columnNumber: 31
      }),
      bar.shown.map((index) => /* @__PURE__ */ jsxDEV("li", { className: `page-item${index === page ? " active" : ""}`, children: /* @__PURE__ */ jsxDEV("button", { type: "button", className: "page-link", onClick: () => onPage(index), "aria-current": index === page ? "page" : void 0, children: index + 1 }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 40,
        columnNumber: 17
      }) }, index, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 39,
        columnNumber: 39
      })),
      bar.endDots && /* @__PURE__ */ jsxDEV("li", { className: "page-item disabled", children: /* @__PURE__ */ jsxDEV("span", { className: "page-link", children: "..." }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 44,
        columnNumber: 64
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 44,
        columnNumber: 29
      }),
      bar.last && go(bar.pages - 1, text("pagination_last"), bar.pages),
      bar.next && go(page + 1, text("pagination_next"), /* @__PURE__ */ jsxDEV(Icon, { name: "angle-right" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
        lineNumber: 46,
        columnNumber: 64
      }))
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
      lineNumber: 35,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "text-center text-body-secondary small", children: text("pagination_page_info", { current: page + 1, total: bar.pages }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
      lineNumber: 48,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Pagination.tsx",
    lineNumber: 34,
    columnNumber: 12
  });
}, "Pagination");
var Pagination_default = Pagination;
export {
  Pagination_default as default
};
//# sourceMappingURL=Pagination.dev.js.map
