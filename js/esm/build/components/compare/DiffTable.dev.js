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
const LineNo = /* @__PURE__ */ __name(({ value }) => /* @__PURE__ */ jsxDEV("td", { className: "sm-line-no", "aria-hidden": "true", children: value ?? "" }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
  lineNumber: 37,
  columnNumber: 58
}), "LineNo");
const splitRow = /* @__PURE__ */ __name((row, index) => /* @__PURE__ */ jsxDEV("tr", { id: `diff-row-${index}`, children: [
  /* @__PURE__ */ jsxDEV(LineNo, { value: row.left?.no }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 41,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("td", { className: `sm-diff sm-diff-${row.kind === "added" ? "empty" : row.kind}`, children: row.left?.text ?? "" }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 42,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(LineNo, { value: row.right?.no }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 43,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("td", { className: `sm-diff sm-diff-${row.kind === "removed" ? "empty" : row.kind}`, children: row.right?.text ?? "" }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 44,
    columnNumber: 5
  })
] }, index, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
  lineNumber: 40,
  columnNumber: 51
}), "splitRow");
const unifiedRows = /* @__PURE__ */ __name((row, index) => {
  const rows = [];
  if (row.kind === "same") {
    rows.push(/* @__PURE__ */ jsxDEV("tr", { id: `diff-row-${index}`, children: [
      /* @__PURE__ */ jsxDEV(LineNo, { value: row.left?.no }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 52,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(LineNo, { value: row.right?.no }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 52,
        columnNumber: 44
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "sm-sign", children: SIGNS.same }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 53,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "sm-diff sm-diff-same", children: row.left?.text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 53,
        columnNumber: 54
      })
    ] }, index, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 51,
      columnNumber: 19
    }));
    return rows;
  }
  if (row.left) {
    rows.push(/* @__PURE__ */ jsxDEV("tr", { id: `diff-row-${index}`, children: [
      /* @__PURE__ */ jsxDEV(LineNo, { value: row.left.no }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 59,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(LineNo, { value: void 0 }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 59,
        columnNumber: 43
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "sm-sign", children: SIGNS.removed }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 60,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "sm-diff sm-diff-removed", children: row.left.text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 60,
        columnNumber: 57
      })
    ] }, `${index}-l`, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 58,
      columnNumber: 19
    }));
  }
  if (row.right) {
    rows.push(/* @__PURE__ */ jsxDEV("tr", { id: row.left ? void 0 : `diff-row-${index}`, children: [
      /* @__PURE__ */ jsxDEV(LineNo, { value: void 0 }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 65,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV(LineNo, { value: row.right.no }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 65,
        columnNumber: 41
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "sm-sign", children: SIGNS.added }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 66,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "sm-diff sm-diff-added", children: row.right.text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 66,
        columnNumber: 55
      })
    ] }, `${index}-r`, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 64,
      columnNumber: 19
    }));
  }
  return rows;
}, "unifiedRows");
const DiffTable = /* @__PURE__ */ __name(({ first, second, rows, view, onlyChanges, expanded, onExpand, text }) => {
  const parts = onlyChanges ? segments(rows, CONTEXT, expanded) : [{ type: "rows", rows: rows.map((row, index) => ({ row, index })) }];
  const columns = 4;
  return /* @__PURE__ */ jsxDEV("div", { className: "card sm-diff-card", children: /* @__PURE__ */ jsxDEV("div", { className: "table-responsive", children: /* @__PURE__ */ jsxDEV("table", { className: `table table-sm mb-0 comparison-table sm-diff-${view}`, children: [
    /* @__PURE__ */ jsxDEV("thead", { children: view === "split" ? /* @__PURE__ */ jsxDEV("tr", { children: [
      /* @__PURE__ */ jsxDEV("th", { colSpan: 2, children: [
        text("version"),
        " ",
        first.version,
        " ",
        /* @__PURE__ */ jsxDEV("small", { className: "text-body-secondary", children: first.date }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 82,
          columnNumber: 79
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 82,
        columnNumber: 29
      }),
      /* @__PURE__ */ jsxDEV("th", { colSpan: 2, children: [
        text("version"),
        " ",
        second.version,
        " ",
        /* @__PURE__ */ jsxDEV("small", { className: "text-body-secondary", children: second.date }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 83,
          columnNumber: 80
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 83,
        columnNumber: 29
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 81,
      columnNumber: 27
    }) : /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("th", { colSpan: columns, children: [
      text("version"),
      " ",
      first.version,
      " ",
      /* @__PURE__ */ jsxDEV(Icon, { name: "arrow-right" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
        lineNumber: 87,
        columnNumber: 67
      }),
      " ",
      text("version"),
      " ",
      second.version
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 86,
      columnNumber: 29
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 85,
      columnNumber: 27
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 79,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("tbody", { children: parts.map((part) => {
      if (part.type === "folded") {
        return /* @__PURE__ */ jsxDEV("tr", { className: "sm-folded", children: /* @__PURE__ */ jsxDEV("td", { colSpan: columns, children: /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-sm btn-link", onClick: () => onExpand(part.from), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "ellipsis", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
            lineNumber: 97,
            columnNumber: 41
          }),
          text("compare_unchanged_lines", part.count)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 96,
          columnNumber: 37
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 95,
          columnNumber: 33
        }) }, `fold-${part.from}`, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
          lineNumber: 94,
          columnNumber: 36
        });
      }
      return part.rows.flatMap(({ row, index }) => view === "split" ? [splitRow(row, index)] : unifiedRows(row, index));
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
      lineNumber: 91,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 78,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 77,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/DiffTable.tsx",
    lineNumber: 76,
    columnNumber: 12
  });
}, "DiffTable");
var DiffTable_default = DiffTable;
export {
  DiffTable_default as default
};
//# sourceMappingURL=DiffTable.dev.js.map
