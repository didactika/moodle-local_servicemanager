var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A search field that filters as the person types, with a way to clear it.
 *
 * @module     local_servicemanager/components/common/SearchBox
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const SearchBox = /* @__PURE__ */ __name(({ value, onChange, placeholder, clearLabel, id = "sm-search" }) => /* @__PURE__ */ jsxDEV("div", { className: "input-group sm-search", children: [
  /* @__PURE__ */ jsxDEV("span", { className: "input-group-text", children: /* @__PURE__ */ jsxDEV(Icon, { name: "magnifying-glass" }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/SearchBox.tsx",
    lineNumber: 23,
    columnNumber: 40
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/SearchBox.tsx",
    lineNumber: 23,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(
    "input",
    {
      type: "search",
      id,
      name: "q",
      value,
      className: "form-control",
      placeholder,
      "aria-label": placeholder,
      autoComplete: "off",
      onChange: (event) => onChange(event.target.value),
      onKeyDown: (event) => {
        if (event.key === "Escape") {
          onChange("");
        }
      }
    },
    void 0,
    false,
    {
      fileName: "public/local/servicemanager/js/esm/src/components/common/SearchBox.tsx",
      lineNumber: 24,
      columnNumber: 5
    }
  ),
  value !== "" && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-outline-secondary", onClick: () => onChange(""), title: clearLabel, children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: "xmark" }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/SearchBox.tsx",
      lineNumber: 41,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: clearLabel }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/SearchBox.tsx",
      lineNumber: 41,
      columnNumber: 30
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/SearchBox.tsx",
    lineNumber: 40,
    columnNumber: 22
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/common/SearchBox.tsx",
  lineNumber: 22,
  columnNumber: 101
}), "SearchBox");
var SearchBox_default = SearchBox;
export {
  SearchBox_default as default
};
//# sourceMappingURL=SearchBox.dev.js.map
