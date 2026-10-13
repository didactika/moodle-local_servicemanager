var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The list of schemas of the page: what each is, how it is, when it changed and what can be done with it.
 *
 * The actions of a row are one group of buttons: look at it, edit it and, in the caret at the end of the group, the rest.
 *
 * @module     local_servicemanager/components/dashboard/SchemaTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import ActionMenu from "../common/ActionMenu";
import IconButton from "../common/IconButton";
import StatusBadge from "../common/StatusBadge";
const SchemaTable = /* @__PURE__ */ __name(({ rows, canManage, selection, onToggle, text }) => /* @__PURE__ */ jsxDEV("div", { className: "card sm-list", children: /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("table", { className: "table table-hover align-middle mb-0", children: [
  /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
    canManage && /* @__PURE__ */ jsxDEV("th", { className: "text-center sm-check-column", children: [
      /* @__PURE__ */ jsxDEV("input", { type: "checkbox", id: "select-all", className: "form-check-input", checked: selection.allChosen, onChange: selection.toggleAll }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 36,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("label", { htmlFor: "select-all", className: "visually-hidden", children: text("select_all") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 37,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 35,
      columnNumber: 35
    }),
    /* @__PURE__ */ jsxDEV("th", { children: text("schema_name") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 39,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("th", { children: text("schema_version") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 40,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("th", { children: text("schema_status") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 41,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("th", { className: "d-none d-md-table-cell", children: text("schema_modified") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 42,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("th", { className: "text-end", children: /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("core_actions") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 43,
      columnNumber: 46
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 43,
      columnNumber: 21
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
    lineNumber: 34,
    columnNumber: 17
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
    lineNumber: 33,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxDEV("tr", { className: selection.chosen.has(row.id) ? "table-active" : void 0, children: [
    canManage && /* @__PURE__ */ jsxDEV("td", { className: "text-center", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "checkbox",
          id: `schema-${row.id}`,
          className: "form-check-input",
          checked: selection.chosen.has(row.id),
          onChange: () => selection.toggle(row.id)
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
          lineNumber: 49,
          columnNumber: 25
        }
      ),
      /* @__PURE__ */ jsxDEV("label", { htmlFor: `schema-${row.id}`, className: "visually-hidden", children: row.name }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 56,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 48,
      columnNumber: 35
    }),
    /* @__PURE__ */ jsxDEV("td", { children: [
      /* @__PURE__ */ jsxDEV("a", { href: row.viewUrl, className: "fw-bold", children: row.name }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 59,
        columnNumber: 25
      }),
      !row.enabled && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-secondary ms-2", children: text("disabled") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 60,
        columnNumber: 42
      }),
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("code", { className: "small", children: row.schemaId }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 61,
        columnNumber: 30
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 61,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 58,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("td", { children: row.version }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 63,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV(StatusBadge, { status: row.status, label: row.statusLabel }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 64,
      columnNumber: 25
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 64,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("td", { className: "d-none d-md-table-cell text-body-secondary", children: row.modified }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 65,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("td", { className: "text-end text-nowrap", children: /* @__PURE__ */ jsxDEV("div", { className: "sm-group", role: "group", children: [
      /* @__PURE__ */ jsxDEV(IconButton, { icon: "eye", label: text("action_view"), href: row.viewUrl, tone: "primary" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 68,
        columnNumber: 29
      }),
      canManage && /* @__PURE__ */ jsxDEV(IconButton, { icon: "pen-to-square", label: text("action_edit"), href: row.editUrl }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 69,
        columnNumber: 43
      }),
      canManage && /* @__PURE__ */ jsxDEV(IconButton, { icon: "clock-rotate-left", label: text("version_history"), href: row.historyUrl, tone: "warning" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 70,
        columnNumber: 43
      }),
      /* @__PURE__ */ jsxDEV(ActionMenu, { label: text("row_more"), actions: [
        { label: text("action_export"), icon: "download", href: row.exportUrl },
        ...canManage ? [
          {
            label: text(row.enabled ? "bulk_disable" : "bulk_enable"),
            icon: row.enabled ? "toggle-off" : "toggle-on",
            onSelect: /* @__PURE__ */ __name(() => onToggle(row), "onSelect")
          },
          { label: text("action_delete"), icon: "trash", href: row.deleteUrl, danger: true }
        ] : []
      ] }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
        lineNumber: 71,
        columnNumber: 29
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 67,
      columnNumber: 25
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
      lineNumber: 66,
      columnNumber: 21
    })
  ] }, row.id, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
    lineNumber: 47,
    columnNumber: 36
  })) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
    lineNumber: 46,
    columnNumber: 13
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
  lineNumber: 32,
  columnNumber: 9
}) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
  lineNumber: 31,
  columnNumber: 5
}) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/dashboard/SchemaTable.tsx",
  lineNumber: 30,
  columnNumber: 89
}), "SchemaTable");
var SchemaTable_default = SchemaTable;
export {
  SchemaTable_default as default
};
//# sourceMappingURL=SchemaTable.dev.js.map
