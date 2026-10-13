var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * Two versions of a schema: what changed in terms of the schema, and the lines of both with the changes marked.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/Compare
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo, useState } from "react";
import BackLink from "./components/common/BackLink";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Icon from "./components/common/Icon";
import PageHeader from "./components/common/PageHeader";
import ChangeSummary from "./components/compare/ChangeSummary";
import DiffTable from "./components/compare/DiffTable";
import { createText } from "./engine/text";
import { changeStarts } from "./lib/diff";
const Compare = /* @__PURE__ */ __name((props) => {
  const { first, second, counts, changes, rows } = props;
  const text = useMemo(() => createText(props.strings), [props.strings]);
  const [view, setView] = useState("split");
  const [onlyChanges, setOnlyChanges] = useState(true);
  const [expanded, setExpanded] = useState(/* @__PURE__ */ new Set());
  const [position, setPosition] = useState(-1);
  const starts = useMemo(() => changeStarts(rows), [rows]);
  const identical = counts.added + counts.removed + counts.changed === 0;
  const next = /* @__PURE__ */ __name(() => {
    const target = (position + 1) % starts.length;
    setPosition(target);
    document.getElementById(`diff-row-${starts[target]}`)?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, "next");
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "servicemanager-compare-page", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDEV(BackLink, { href: props.backUrl, label: text("back") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
      lineNumber: 43,
      columnNumber: 35
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
      lineNumber: 43,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      PageHeader,
      {
        title: props.title,
        subtitle: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("a", { href: first.viewUrl, children: [
            text("version"),
            " ",
            first.version
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
            lineNumber: 48,
            columnNumber: 21
          }),
          " ",
          /* @__PURE__ */ jsxDEV(Icon, { name: "arrow-right" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
            lineNumber: 48,
            columnNumber: 83
          }),
          " ",
          /* @__PURE__ */ jsxDEV("a", { href: second.viewUrl, children: [
            text("version"),
            " ",
            second.version
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
            lineNumber: 49,
            columnNumber: 21
          }),
          " \xB7 ",
          second.user,
          ", ",
          second.date
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
          lineNumber: 47,
          columnNumber: 27
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
        lineNumber: 45,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center mb-3 sm-badges-row", "data-region": "diff-counts", children: identical ? /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-secondary", children: text("compare_no_changes") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
      lineNumber: 56,
      columnNumber: 23
    }) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
      counts.added > 0 && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-success", children: text("compare_added", counts.added) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
        lineNumber: 58,
        columnNumber: 46
      }),
      counts.removed > 0 && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-danger", children: text("compare_removed", counts.removed) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
        lineNumber: 59,
        columnNumber: 48
      }),
      counts.changed > 0 && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-warning", children: text("compare_changed", counts.changed) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
        lineNumber: 60,
        columnNumber: 48
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
      lineNumber: 57,
      columnNumber: 23
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
      lineNumber: 54,
      columnNumber: 13
    }),
    changes.length > 0 && /* @__PURE__ */ jsxDEV(ChangeSummary, { changes, text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
      lineNumber: 64,
      columnNumber: 36
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center justify-content-between mb-3 sm-actions-row", "data-region": "diff-tools", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "btn-group", role: "group", "aria-label": text("compare_view"), children: [
        /* @__PURE__ */ jsxDEV("button", { type: "button", className: `btn btn-outline-secondary${view === "split" ? " active" : ""}`, "aria-pressed": view === "split", onClick: () => setView("split"), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "table-columns", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
            lineNumber: 69,
            columnNumber: 25
          }),
          text("compare_view_split")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
          lineNumber: 68,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("button", { type: "button", className: `btn btn-outline-secondary${view === "unified" ? " active" : ""}`, "aria-pressed": view === "unified", onClick: () => setView("unified"), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "bars", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
            lineNumber: 72,
            columnNumber: 25
          }),
          text("compare_view_unified")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
          lineNumber: 71,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
        lineNumber: 67,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-center sm-actions-row", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "form-check form-switch mb-0", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              className: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: "only-changes",
              checked: onlyChanges,
              onChange: (event) => setOnlyChanges(event.target.checked)
            },
            void 0,
            false,
            {
              fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
              lineNumber: 77,
              columnNumber: 25
            }
          ),
          /* @__PURE__ */ jsxDEV("label", { className: "form-check-label", htmlFor: "only-changes", children: text("compare_only_changes") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
            lineNumber: 85,
            columnNumber: 25
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
          lineNumber: 76,
          columnNumber: 21
        }),
        starts.length > 0 && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-outline-primary", onClick: next, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "arrow-down", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
            lineNumber: 88,
            columnNumber: 25
          }),
          text("compare_next_change")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
          lineNumber: 87,
          columnNumber: 43
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
        lineNumber: 75,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
      lineNumber: 66,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      DiffTable,
      {
        first,
        second,
        rows,
        view,
        onlyChanges,
        expanded,
        onExpand: (from) => setExpanded(new Set(expanded).add(from)),
        text
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
        lineNumber: 93,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
    lineNumber: 42,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/Compare.tsx",
    lineNumber: 41,
    columnNumber: 12
  });
}, "Compare");
var Compare_default = Compare;
export {
  Compare_default as default
};
//# sourceMappingURL=Compare.dev.js.map
