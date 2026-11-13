var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The table of the schemas, as every list of the design system: a check to choose the row, the name with its id, the version, the
 * status, the last change and, at the end, the round icon buttons of the row with a menu for the rest.
 *
 * @module     local_servicemanager/components/dashboard/SchemaTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useRef } from "react";
import { Icon, Menu, useStableColumns } from "../../ds/ui";
import { HEALTH } from "./Summary";
const TONES = Object.fromEntries(HEALTH.map((part) => [part.key, part.tone]));
const SchemaTable = /* @__PURE__ */ __name(({ rows, canManage, selection, onToggle, text }) => {
  const table = useRef(null);
  useStableColumns(table, rows.length > 0);
  return /* @__PURE__ */ jsxDEV("table", { ref: table, className: "table", children: [
    /* @__PURE__ */ jsxDEV("caption", { className: "visually-hidden", children: text("dashboard") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 39,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
      canManage && /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "table-select", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "checkbox",
            id: "lsm-select-all",
            className: "form-check-input",
            checked: selection.allChosen,
            onChange: selection.toggleAll
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
            lineNumber: 43,
            columnNumber: 21
          }
        ),
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "lsm-select-all", className: "visually-hidden", children: text("select_all") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
          lineNumber: 45,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 42,
        columnNumber: 31
      }),
      /* @__PURE__ */ jsxDEV("th", { scope: "col", children: text("schema_name") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 47,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("th", { scope: "col", children: text("schema_version") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 48,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("th", { scope: "col", children: text("schema_status") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 49,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "d-none d-md-table-cell", children: text("schema_modified") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 50,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "table-actions", children: /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("core_actions") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 51,
        columnNumber: 59
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 51,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 41,
      columnNumber: 13
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 40,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxDEV("tr", { className: selection.chosen.has(row.id) ? "table-active" : void 0, children: [
      canManage && /* @__PURE__ */ jsxDEV("td", { className: "table-select", children: /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "checkbox",
          className: "form-check-input",
          checked: selection.chosen.has(row.id),
          onChange: () => selection.toggle(row.id),
          "aria-label": row.name
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
          lineNumber: 57,
          columnNumber: 21
        }
      ) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 56,
        columnNumber: 31
      }),
      /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { className: "d-flex flex-column", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          /* @__PURE__ */ jsxDEV("a", { href: row.viewUrl, className: "fw-bold", children: row.name }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
            lineNumber: 63,
            columnNumber: 29
          }),
          !row.enabled && /* @__PURE__ */ jsxDEV("span", { className: "badge badge-soft rounded-pill text-bg-secondary ms-2", children: text("disabled") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
            lineNumber: 64,
            columnNumber: 46
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
          lineNumber: 62,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("small", { className: "text-muted", children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "fingerprint", text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
            lineNumber: 66,
            columnNumber: 55
          }),
          " ",
          row.schemaId
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
          lineNumber: 66,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 61,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 60,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("td", { children: row.version }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 69,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { className: `badge badge-soft badge-dot rounded-pill text-bg-${TONES[row.status] ?? "secondary"}`, children: row.statusLabel }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 71,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 70,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "d-none d-md-table-cell", children: /* @__PURE__ */ jsxDEV("small", { className: "text-muted", children: row.modified }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 75,
        columnNumber: 56
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 75,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("td", { className: "table-actions", children: [
        /* @__PURE__ */ jsxDEV(
          "a",
          {
            className: "btn btn-link btn-icon btn-sm text-primary",
            href: row.viewUrl,
            title: text("action_view"),
            "aria-label": `${text("action_view")}: ${row.name}`,
            children: /* @__PURE__ */ jsxDEV(Icon, { name: "view", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
              lineNumber: 78,
              columnNumber: 76
            })
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
            lineNumber: 77,
            columnNumber: 21
          }
        ),
        canManage && /* @__PURE__ */ jsxDEV(
          "a",
          {
            className: "btn btn-link btn-icon btn-sm text-primary",
            href: row.editUrl,
            title: text("action_edit"),
            "aria-label": `${text("action_edit")}: ${row.name}`,
            children: /* @__PURE__ */ jsxDEV(Icon, { name: "t/edit", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
              lineNumber: 80,
              columnNumber: 76
            })
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
            lineNumber: 79,
            columnNumber: 35
          }
        ),
        canManage && /* @__PURE__ */ jsxDEV(
          "a",
          {
            className: "btn btn-link btn-icon btn-sm text-info",
            href: row.historyUrl,
            title: text("version_history"),
            "aria-label": `${text("version_history")}: ${row.name}`,
            children: /* @__PURE__ */ jsxDEV(Icon, { name: "history", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
              lineNumber: 83,
              columnNumber: 25
            })
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
            lineNumber: 81,
            columnNumber: 35
          }
        ),
        /* @__PURE__ */ jsxDEV(RowMenu, { row, canManage, onToggle, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
          lineNumber: 85,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 76,
        columnNumber: 17
      })
    ] }, row.id, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 55,
      columnNumber: 32
    })) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 54,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
    lineNumber: 38,
    columnNumber: 12
  });
}, "SchemaTable");
const RowMenu = /* @__PURE__ */ __name(({ row, canManage, onToggle, text }) => /* @__PURE__ */ jsxDEV(Menu, { button: /* @__PURE__ */ jsxDEV(Icon, { name: "i/moremenu", text }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
  lineNumber: 99,
  columnNumber: 19
}), label: `${text("row_more")}: ${row.name}`, place: "end", icon: true, children: (close) => /* @__PURE__ */ jsxDEV(Fragment, { children: [
  /* @__PURE__ */ jsxDEV("a", { className: "dropdown-item", href: row.exportUrl, children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: "t/download", text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 101,
      columnNumber: 63
    }),
    " ",
    text("action_export")
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
    lineNumber: 101,
    columnNumber: 13
  }),
  canManage && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "dropdown-item", onClick: () => {
    close();
    onToggle(row);
  }, children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: row.enabled ? "t/hide" : "t/show", text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 106,
      columnNumber: 17
    }),
    " ",
    text(row.enabled ? "bulk_disable" : "bulk_enable")
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
    lineNumber: 102,
    columnNumber: 27
  }),
  canManage && /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("hr", { className: "dropdown-divider" }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 109,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("a", { className: "dropdown-item text-danger", href: row.deleteUrl, children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "t/delete", text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 110,
        columnNumber: 79
      }),
      " ",
      text("action_delete")
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 110,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
    lineNumber: 108,
    columnNumber: 27
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
  lineNumber: 100,
  columnNumber: 21
}) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
  lineNumber: 99,
  columnNumber: 5
}), "RowMenu");
var SchemaTable_default = SchemaTable;
export {
  SchemaTable_default as default
};
//# sourceMappingURL=SchemaTable.dev.js.map
