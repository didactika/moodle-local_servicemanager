var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The button that opens the less used filters of a list, such as the dates and the size of the page.
 *
 * What is chosen in it applies at once, so there is nothing to confirm; it only has a way to put everything back.
 *
 * @module     local_servicemanager/components/common/FilterMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useDropdown } from "../../hooks/useDropdown";
import FilterClearIcon from "./FilterClearIcon";
import FilterIcon from "./FilterIcon";
const FilterMenu = /* @__PURE__ */ __name(({ text, count, onReset, children }) => {
  const menu = useDropdown();
  return /* @__PURE__ */ jsxDEV("div", { className: "dropdown sm-filter", ref: menu.ref, children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        className: `btn btn-outline-secondary${count > 0 ? " active" : ""}`,
        type: "button",
        "aria-haspopup": "true",
        "aria-expanded": menu.open,
        onClick: menu.toggle,
        children: [
          /* @__PURE__ */ jsxDEV("span", { className: "sm-icon-gap", children: /* @__PURE__ */ jsxDEV(FilterIcon, {}, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
            lineNumber: 40,
            columnNumber: 43
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
            lineNumber: 40,
            columnNumber: 13
          }),
          text("filters"),
          count > 0 && /* @__PURE__ */ jsxDEV("span", { className: "sm-count-badge", children: count }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
            lineNumber: 41,
            columnNumber: 27
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
        lineNumber: 33,
        columnNumber: 9
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: `dropdown-menu dropdown-menu-end sm-filter-menu${menu.open ? " show" : ""}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "sm-filter-head", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "sm-filter-heading", children: text("filters") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
          lineNumber: 45,
          columnNumber: 17
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            className: "sm-iconbtn",
            onClick: onReset,
            disabled: count === 0,
            title: text("filter_clear"),
            "aria-label": text("filter_clear"),
            children: /* @__PURE__ */ jsxDEV(FilterClearIcon, {}, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
              lineNumber: 54,
              columnNumber: 21
            })
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
            lineNumber: 46,
            columnNumber: 17
          }
        )
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
        lineNumber: 44,
        columnNumber: 13
      }),
      children
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
      lineNumber: 43,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/FilterMenu.tsx",
    lineNumber: 32,
    columnNumber: 12
  });
}, "FilterMenu");
var FilterMenu_default = FilterMenu;
export {
  FilterMenu_default as default
};
//# sourceMappingURL=FilterMenu.dev.js.map
