var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * What an import did, schema by schema, with the reason for each one that failed.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/ImportResult
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Icon from "./components/common/Icon";
import PageHeader from "./components/common/PageHeader";
import StatTile from "./components/common/StatTile";
import { createText } from "./engine/text";
const STATUS = {
  imported: { icon: "circle-check", tone: "success" },
  updated: { icon: "arrows-rotate", tone: "success" },
  skipped: { icon: "forward", tone: "secondary" },
  failed: { icon: "circle-xmark", tone: "danger" }
};
const ImportResult = /* @__PURE__ */ __name((props) => {
  const { totals, items, urls } = props;
  const text = useMemo(() => createText(props.strings), [props.strings]);
  const failed = totals.failed > 0;
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "servicemanager-import-result", children: [
    /* @__PURE__ */ jsxDEV(
      PageHeader,
      {
        title: text("import_result_title"),
        subtitle: text(failed ? "import_result_with_errors" : "import_result_ok"),
        actions: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("a", { href: urls.dashboard, className: "btn btn-primary", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "table-list", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
              lineNumber: 40,
              columnNumber: 74
            }),
            text("dashboard")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
            lineNumber: 40,
            columnNumber: 21
          }),
          /* @__PURE__ */ jsxDEV("a", { href: urls.again, className: "btn btn-outline-secondary", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "file-import", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
              lineNumber: 41,
              columnNumber: 80
            }),
            text("import_again")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
            lineNumber: 41,
            columnNumber: 21
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
          lineNumber: 39,
          columnNumber: 26
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
        lineNumber: 36,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "sm-tiles sm-tiles-four", "data-region": "summary", children: [
      /* @__PURE__ */ jsxDEV(StatTile, { label: text("import_imported"), value: totals.imported, tone: "success", icon: "circle-check" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
        lineNumber: 46,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(StatTile, { label: text("import_skipped"), value: totals.skipped, tone: "secondary", icon: "forward" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
        lineNumber: 47,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(StatTile, { label: text("import_failed"), value: totals.failed, tone: failed ? "danger" : "secondary", icon: "circle-xmark" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
        lineNumber: 48,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(StatTile, { label: text("import_warnings"), value: totals.warnings, tone: totals.warnings > 0 ? "warning" : "secondary", icon: "triangle-exclamation" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
        lineNumber: 49,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
      lineNumber: 45,
      columnNumber: 13
    }),
    items.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "card", children: /* @__PURE__ */ jsxDEV("ul", { className: "list-group list-group-flush", "data-region": "import-items", children: items.map((item, index) => {
      const look = STATUS[item.status];
      return /* @__PURE__ */ jsxDEV("li", { className: "list-group-item", children: /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-start", children: [
        /* @__PURE__ */ jsxDEV("span", { className: `text-${look.tone} sm-icon-gap`, children: /* @__PURE__ */ jsxDEV(Icon, { name: look.icon }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
          lineNumber: 58,
          columnNumber: 83
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
          lineNumber: 58,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-grow-1", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            item.viewUrl ? /* @__PURE__ */ jsxDEV("a", { href: item.viewUrl, className: "fw-bold", children: item.name || item.id }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
              lineNumber: 61,
              columnNumber: 57
            }) : /* @__PURE__ */ jsxDEV("strong", { children: item.name || item.id || text("import_unknown") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
              lineNumber: 61,
              columnNumber: 129
            }),
            item.id && item.name && /* @__PURE__ */ jsxDEV("code", { className: "ms-2 small", children: item.id }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
              lineNumber: 62,
              columnNumber: 66
            }),
            /* @__PURE__ */ jsxDEV("span", { className: `badge text-bg-${look.tone} ms-2`, children: text("import_status_" + item.status) }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
              lineNumber: 63,
              columnNumber: 41
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
            lineNumber: 60,
            columnNumber: 37
          }),
          item.messages.length > 0 && /* @__PURE__ */ jsxDEV("ul", { className: `small mb-0 mt-1 ${item.status === "failed" ? "text-danger" : "text-body-secondary"}`, children: item.messages.map((message, at) => /* @__PURE__ */ jsxDEV("li", { children: message }, at, false, {
            fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
            lineNumber: 66,
            columnNumber: 77
          })) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
            lineNumber: 65,
            columnNumber: 66
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
          lineNumber: 59,
          columnNumber: 33
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
        lineNumber: 57,
        columnNumber: 29
      }) }, index, false, {
        fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
        lineNumber: 56,
        columnNumber: 32
      });
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
      lineNumber: 53,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
      lineNumber: 52,
      columnNumber: 34
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
    lineNumber: 35,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ImportResult.tsx",
    lineNumber: 34,
    columnNumber: 12
  });
}, "ImportResult");
var ImportResult_default = ImportResult;
export {
  ImportResult_default as default
};
//# sourceMappingURL=ImportResult.dev.js.map
