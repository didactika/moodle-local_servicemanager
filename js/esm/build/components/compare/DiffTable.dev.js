var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The two versions line by line, side by side or one over the other, with the numbers of the lines and what changed marked.
 *
 * Runs of lines that did not change are folded, and a person opens them when they want them.
 *
 * @module     local_servicemanager/components/compare/DiffTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { segments } from "../../lib/diff";
import Icon from "../common/Icon";
const CONTEXT = 2;
const SIGNS = { same: " ", removed: "-", added: "+", changed: "~" };
const LineNo = /* @__PURE__ */ __name(({ value }) => /* @__PURE__ */ jsxDEV("td", { className: "text-muted text-end small user-select-none", "aria-hidden": "true", children: value ?? "" }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
  lineNumber: 37,
  columnNumber: 58
}), "LineNo");
const TONES = { added: "table-success", removed: "table-danger", changed: "table-warning", empty: "table-light" };
const Line = /* @__PURE__ */ __name(({ kind, value }) => /* @__PURE__ */ jsxDEV("td", { className: TONES[kind] ?? "", children: /* @__PURE__ */ jsxDEV("pre", { className: "mb-0 small", children: value ?? "" }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
  lineNumber: 50,
  columnNumber: 5
}) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
  lineNumber: 49,
  columnNumber: 65
}), "Line");
const splitRow = /* @__PURE__ */ __name((row, index) => /* @__PURE__ */ jsxDEV("tr", { id: `diff-row-${index}`, children: [
  /* @__PURE__ */ jsxDEV(LineNo, { value: row.left?.no }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 54,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(Line, { kind: row.kind === "added" ? "empty" : row.kind, value: row.left?.text }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 55,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(LineNo, { value: row.right?.no }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 56,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(Line, { kind: row.kind === "removed" ? "empty" : row.kind, value: row.right?.text }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 57,
    columnNumber: 5
  })
] }, index, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
  lineNumber: 53,
  columnNumber: 51
}), "splitRow");
const unifiedRows = /* @__PURE__ */ __name((row, index) => {
  const rows = [];
  if (row.kind === "same") {
    rows.push(/* @__PURE__ */ jsxDEV("tr", { id: `diff-row-${index}`, children: [
      /* @__PURE__ */ jsxDEV(LineNo, { value: row.left?.no }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 65,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(LineNo, { value: row.right?.no }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 65,
        columnNumber: 44
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "text-muted font-monospace", children: SIGNS.same }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 66,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(Line, { kind: "same", value: row.left?.text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 66,
        columnNumber: 72
      })
    ] }, index, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 64,
      columnNumber: 19
    }));
    return rows;
  }
  if (row.left) {
    rows.push(/* @__PURE__ */ jsxDEV("tr", { id: `diff-row-${index}`, children: [
      /* @__PURE__ */ jsxDEV(LineNo, { value: row.left.no }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 72,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(LineNo, { value: void 0 }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 72,
        columnNumber: 43
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "text-muted font-monospace", children: SIGNS.removed }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 73,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(Line, { kind: "removed", value: row.left.text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 73,
        columnNumber: 75
      })
    ] }, `${index}-l`, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 71,
      columnNumber: 19
    }));
  }
  if (row.right) {
    rows.push(/* @__PURE__ */ jsxDEV("tr", { id: row.left ? void 0 : `diff-row-${index}`, children: [
      /* @__PURE__ */ jsxDEV(LineNo, { value: void 0 }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 78,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(LineNo, { value: row.right.no }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 78,
        columnNumber: 41
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "text-muted font-monospace", children: SIGNS.added }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 79,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(Line, { kind: "added", value: row.right.text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 79,
        columnNumber: 73
      })
    ] }, `${index}-r`, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 77,
      columnNumber: 19
    }));
  }
  return rows;
}, "unifiedRows");
const DiffTable = /* @__PURE__ */ __name(({ first, second, rows, view, onlyChanges, expanded, onExpand, text }) => {
  const parts = onlyChanges ? segments(rows, CONTEXT, expanded) : [{ type: "rows", rows: rows.map((row, index) => ({ row, index })) }];
  const columns = 4;
  return /* @__PURE__ */ jsxDEV("div", { className: "card", children: /* @__PURE__ */ jsxDEV("div", { className: "table-responsive", children: /* @__PURE__ */ jsxDEV("table", { className: "table table-sm mb-0 comparison-table", "data-view": view, children: [
    /* @__PURE__ */ jsxDEV("thead", { children: view === "split" ? /* @__PURE__ */ jsxDEV("tr", { children: [
      /* @__PURE__ */ jsxDEV("th", { colSpan: 2, children: [
        text("version"),
        " ",
        first.version,
        " ",
        /* @__PURE__ */ jsxDEV("small", { className: "text-body-secondary", children: first.date }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 95,
          columnNumber: 79
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 95,
        columnNumber: 29
      }),
      /* @__PURE__ */ jsxDEV("th", { colSpan: 2, children: [
        text("version"),
        " ",
        second.version,
        " ",
        /* @__PURE__ */ jsxDEV("small", { className: "text-body-secondary", children: second.date }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 96,
          columnNumber: 80
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 96,
        columnNumber: 29
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 94,
      columnNumber: 27
    }) : /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("th", { colSpan: columns, children: [
      text("version"),
      " ",
      first.version,
      " ",
      /* @__PURE__ */ jsxDEV(Icon, { name: "arrow-right" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 100,
        columnNumber: 67
      }),
      " ",
      text("version"),
      " ",
      second.version
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 99,
      columnNumber: 29
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 98,
      columnNumber: 27
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 92,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("tbody", { children: parts.map((part) => {
      if (part.type === "folded") {
        return /* @__PURE__ */ jsxDEV("tr", { className: "table-light", children: /* @__PURE__ */ jsxDEV("td", { colSpan: columns, children: /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-sm btn-link", onClick: () => onExpand(part.from), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "ellipsis", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
            lineNumber: 110,
            columnNumber: 41
          }),
          text("compare_unchanged_lines", part.count)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 109,
          columnNumber: 37
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 108,
          columnNumber: 33
        }) }, `fold-${part.from}`, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 107,
          columnNumber: 36
        });
      }
      return part.rows.flatMap(({ row, index }) => view === "split" ? [splitRow(row, index)] : unifiedRows(row, index));
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 104,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 91,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 90,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 89,
    columnNumber: 12
  });
}, "DiffTable");
var DiffTable_default = DiffTable;
export {
  DiffTable_default as default
};
//# sourceMappingURL=DiffTable.dev.js.map
