var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * A table of the fields of one part of a schema, with whether each is required and what it is for.
 *
 * @module     local_servicemanager/components/documentation/FieldTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const FieldTable = /* @__PURE__ */ __name(({ fields, text }) => /* @__PURE__ */ jsxDEV("table", { className: "table table-bordered table-striped", children: [
  /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
    /* @__PURE__ */ jsxDEV("th", { children: text("field") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
      lineNumber: 30,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("th", { children: text("core_required") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
      lineNumber: 31,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("th", { children: text("core_description") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
      lineNumber: 32,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
    lineNumber: 29,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
    lineNumber: 28,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("tbody", { children: fields.map((field) => /* @__PURE__ */ jsxDEV("tr", { children: [
    /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("code", { children: field.name }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
      lineNumber: 37,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
      lineNumber: 37,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { className: `badge text-bg-${field.required ? "success" : "secondary"}`, children: text(field.required ? "core_yes" : "core_no") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
      lineNumber: 38,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
      lineNumber: 38,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("td", { children: text(field.description) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
      lineNumber: 39,
      columnNumber: 13
    })
  ] }, field.name, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
    lineNumber: 36,
    columnNumber: 32
  })) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
    lineNumber: 35,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/documentation/FieldTable.tsx",
  lineNumber: 27,
  columnNumber: 57
}), "FieldTable");
var FieldTable_default = FieldTable;
export {
  FieldTable_default as default
};
//# sourceMappingURL=FieldTable.dev.js.map
