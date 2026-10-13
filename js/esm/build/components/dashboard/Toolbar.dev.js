var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The tools to find a schema: a search that filters as the person types, and the dates and the size of the page in a menu. The
 * status is chosen in the summary above, so it is not asked for twice.
 *
 * @module     local_servicemanager/components/dashboard/Toolbar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Chips from "../common/Chips";
import FilterMenu from "../common/FilterMenu";
import SearchBox from "../common/SearchBox";
const Toolbar = /* @__PURE__ */ __name(({ list, options, text, actions }) => /* @__PURE__ */ jsxDEV("div", { className: "sm-toolbar", children: [
  /* @__PURE__ */ jsxDEV(
    SearchBox,
    {
      value: list.state.query,
      onChange: (query) => list.set({ query }),
      placeholder: text("filter_name"),
      clearLabel: text("filter_clear")
    },
    void 0,
    false,
    {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
      lineNumber: 29,
      columnNumber: 5
    }
  ),
  /* @__PURE__ */ jsxDEV(FilterMenu, { text, count: list.extras, onReset: () => list.set({ from: "", to: "", perpage: options[0] }), children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxDEV("label", { htmlFor: "sm-from", className: "form-label", children: text("filter_date_from") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
        lineNumber: 37,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("input", { type: "date", id: "sm-from", className: "form-control", value: list.state.from, onChange: (event) => list.set({ from: event.target.value }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
        lineNumber: 38,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
      lineNumber: 36,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxDEV("label", { htmlFor: "sm-to", className: "form-label", children: text("filter_date_to") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
        lineNumber: 41,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("input", { type: "date", id: "sm-to", className: "form-control", value: list.state.to, onChange: (event) => list.set({ to: event.target.value }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
        lineNumber: 42,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
      lineNumber: 40,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "sm-filter-title", children: text("filter_per_page") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
      lineNumber: 44,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV(
      Chips,
      {
        label: text("filter_per_page"),
        value: String(list.state.perpage),
        onChange: (value) => list.set({ perpage: Number(value) }),
        chips: options.map((option) => ({ value: String(option), label: String(option) }))
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
        lineNumber: 45,
        columnNumber: 9
      }
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
    lineNumber: 35,
    columnNumber: 5
  }),
  actions && /* @__PURE__ */ jsxDEV("div", { className: "sm-toolbar-actions", children: actions }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
    lineNumber: 52,
    columnNumber: 17
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Toolbar.tsx",
  lineNumber: 28,
  columnNumber: 67
}), "Toolbar");
var Toolbar_default = Toolbar;
export {
  Toolbar_default as default
};
//# sourceMappingURL=Toolbar.dev.js.map
