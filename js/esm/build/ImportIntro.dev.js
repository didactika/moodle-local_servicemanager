var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a person reads above the form that imports schemas: what files it takes and where the format is explained.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/ImportIntro
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Icon from "./components/common/Icon";
import { createText } from "./engine/text";
const ImportIntro = /* @__PURE__ */ __name((props) => {
  const text = useMemo(() => createText(props.strings), [props.strings]);
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "lsm servicemanager-import-page d-grid gap-3", children: /* @__PURE__ */ jsxDEV("div", { className: "alert alert-info", children: [
    /* @__PURE__ */ jsxDEV("h5", { children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "circle-info", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
        lineNumber: 25,
        columnNumber: 17
      }),
      text("import_info_title")
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
      lineNumber: 25,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("p", { children: text("import_info_text") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
      lineNumber: 26,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("ul", { children: [
      /* @__PURE__ */ jsxDEV("li", { children: text("import_info_yaml") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
        lineNumber: 28,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("li", { children: text("import_info_zip") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
        lineNumber: 29,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
      lineNumber: 27,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("p", { className: "mb-0", children: /* @__PURE__ */ jsxDEV("a", { href: props.documentationUrl, className: "alert-link fw-bold", children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "book", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
        lineNumber: 33,
        columnNumber: 21
      }),
      text("view_documentation")
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
      lineNumber: 32,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
      lineNumber: 31,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
    lineNumber: 24,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
    lineNumber: 23,
    columnNumber: 51
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ImportIntro.tsx",
    lineNumber: 23,
    columnNumber: 12
  });
}, "ImportIntro");
var ImportIntro_default = ImportIntro;
export {
  ImportIntro_default as default
};
//# sourceMappingURL=ImportIntro.dev.js.map
