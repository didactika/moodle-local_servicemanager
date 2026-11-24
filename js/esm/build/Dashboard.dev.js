var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The dashboard, drawn with the Didactika design system as the lists of Delegate account: the head of the page with its actions,
 * the summary of the schemas and of the web services, and the list of the schemas with its search, its filters (status and date),
 * its pager and the floating bar of what is chosen. Everything is filtered and paged here, without asking the server again.
 *
 * @module     local_servicemanager/Dashboard
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo, useState } from "react";
import SchemaTable from "./components/dashboard/SchemaTable";
import Summary, { HEALTH } from "./components/dashboard/Summary";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Dialog, Empty, FloatBar, Icon, Pager, SearchBox, TableBox } from "./ds/ui";
import { DateMenu, FilterGroup, StatusMenu } from "./ds/Filters";
import { createText } from "./engine/text";
import { postForm } from "./engine/post";
import { useBulkSelection } from "./hooks/useBulkSelection";
import { useDropdown } from "./hooks/useDropdown";
import { useListState } from "./hooks/useListState";
import { countBy, matches, paginate } from "./lib/listing";
const findable = /* @__PURE__ */ __name((row) => ({ texts: [row.name, row.schemaId, row.version], status: row.status, at: row.modifiedAt }), "findable");
const DocsMenu = /* @__PURE__ */ __name(({ urls, text }) => {
  const menu = useDropdown();
  return /* @__PURE__ */ jsxDEV("div", { className: "dropdown", ref: menu.ref, children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        type: "button",
        className: "btn btn-outline-secondary dropdown-toggle",
        "aria-haspopup": "true",
        "aria-expanded": menu.open,
        onClick: menu.toggle,
        children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "docs", text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 44,
            columnNumber: 13
          }),
          " ",
          text("docs_menu")
        ]
      },
      void 0,
      true,
      {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 42,
        columnNumber: 9
      }
    ),
    /* @__PURE__ */ jsxDEV("ul", { className: `dropdown-menu dropdown-menu-end${menu.open ? " show" : ""}`, children: [
      /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { className: "dropdown-item", href: urls.documentation, children: text("docs_schema_reference") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 47,
        columnNumber: 17
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 47,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { className: "dropdown-item", href: urls.manual, target: "_blank", rel: "noreferrer", children: [
        text("docs_plugin_manual"),
        " ",
        /* @__PURE__ */ jsxDEV(Icon, { name: "i/externallink", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 49,
          columnNumber: 46
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 48,
        columnNumber: 17
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 48,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { className: "dropdown-item", href: urls.moodleDocs, target: "_blank", rel: "noreferrer", children: [
        text("docs_moodle"),
        " ",
        /* @__PURE__ */ jsxDEV(Icon, { name: "i/externallink", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 52,
          columnNumber: 39
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 51,
        columnNumber: 17
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 51,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 46,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
    lineNumber: 41,
    columnNumber: 12
  });
}, "DocsMenu");
const Dashboard = /* @__PURE__ */ __name((props) => {
  const { canManage, urls, wsStatus, schemas, perPageOptions } = props;
  const text = useMemo(() => createText(props.strings), [props.strings]);
  const list = useListState(perPageOptions[0], perPageOptions);
  const [deleting, setDeleting] = useState(false);
  const withoutStatus = useMemo(() => {
    const state = { ...list.state, status: "" };
    return schemas.filter((row) => matches(findable(row), state));
  }, [schemas, list.state.query, list.state.from, list.state.to]);
  const counts = useMemo(() => countBy(withoutStatus), [withoutStatus]);
  const chosen = list.state.status ? list.state.status.split(",") : [];
  const found = useMemo(
    () => list.state.status ? withoutStatus.filter((row) => list.state.status.split(",").includes(row.status)) : withoutStatus,
    [withoutStatus, list.state.status]
  );
  const allCounts = useMemo(() => countBy(schemas), [schemas]);
  const page = paginate(found, list.state.page, list.state.perpage);
  const selection = useBulkSelection(page.rows, schemas);
  const narrowed = list.state.query !== "" || chosen.length > 0 || list.extras > 0;
  const resetButton = /* @__PURE__ */ jsxDEV(
    "button",
    {
      type: "button",
      className: "btn btn-link btn-icon",
      disabled: !narrowed,
      title: text("filters_reset"),
      "aria-label": text("filters_reset"),
      onClick: list.reset,
      children: /* @__PURE__ */ jsxDEV(Icon, { name: "i/reload", text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 82,
        columnNumber: 9
      })
    },
    void 0,
    false,
    {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 80,
      columnNumber: 25
    }
  );
  const applied = (chosen.length > 0 ? 1 : 0) + (list.state.from || list.state.to ? 1 : 0);
  const send = /* @__PURE__ */ __name((action, ids) => postForm(urls.bulkAction, { sesskey: props.sesskey, action, ids }), "send");
  const act = /* @__PURE__ */ __name((action) => action === "delete" ? setDeleting(true) : send(action, [...selection.chosen]), "act");
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "lsm servicemanager-dashboard d-grid gap-3", style: selection.chosen.size ? { paddingBottom: "5.5rem" } : void 0, children: [
    /* @__PURE__ */ jsxDEV("header", { className: "d-grid gap-3 pb-3 border-bottom", children: /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center justify-content-between gap-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "icon-box", children: /* @__PURE__ */ jsxDEV(Icon, { name: "plug", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 94,
          columnNumber: 52
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 94,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "text-muted mb-0", children: text("dashboard_subtitle") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 95,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 93,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(DocsMenu, { urls, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 98,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("a", { className: "btn btn-outline-secondary", href: urls.exportAll, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "t/download", text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 100,
            columnNumber: 29
          }),
          " ",
          text("export_all")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 99,
          columnNumber: 25
        }),
        canManage && /* @__PURE__ */ jsxDEV("a", { className: "btn btn-outline-secondary", href: urls.import, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "i/import", text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 103,
            columnNumber: 29
          }),
          " ",
          text("import_schemas")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 102,
          columnNumber: 39
        }),
        canManage && /* @__PURE__ */ jsxDEV("a", { className: "btn btn-primary", href: urls.create, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "t/add", text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 106,
            columnNumber: 29
          }),
          " ",
          text("new_schema")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 105,
          columnNumber: 39
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 97,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 92,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 91,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(Summary, { counts: allCounts, ws: wsStatus, sesskey: props.sesskey, text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 112,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-center justify-content-between gap-3 px-3 py-2 border-bottom", "data-region": "filters", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-center gap-2 flex-grow-1", children: [
          /* @__PURE__ */ jsxDEV(SearchBox, { value: list.state.query, onChange: (query) => list.set({ query }), label: text("filter_name"), text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 117,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV(FilterGroup, { count: applied, text, reset: resetButton, children: [
            /* @__PURE__ */ jsxDEV(
              StatusMenu,
              {
                label: text("filter_status"),
                statuses: HEALTH.map((part) => ({ key: part.key, label: text(`status_${part.key}`), count: counts[part.key] ?? 0 })),
                chosen,
                text,
                onChange: (statuses) => list.set({ status: statuses.join(",") })
              },
              void 0,
              false,
              {
                fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
                lineNumber: 119,
                columnNumber: 29
              }
            ),
            /* @__PURE__ */ jsxDEV(
              DateMenu,
              {
                label: text("schema_modified"),
                from: list.state.from,
                to: list.state.to,
                text,
                onChange: (from, to) => list.set({ from, to })
              },
              void 0,
              false,
              {
                fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
                lineNumber: 126,
                columnNumber: 29
              }
            )
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 118,
            columnNumber: 25
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 116,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-center gap-2 flex-shrink-0", children: resetButton }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 135,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 115,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(TableBox, { busy: false, empty: page.total === 0 && /* @__PURE__ */ jsxDEV(
        Empty,
        {
          icon: narrowed ? "a/search" : "plug",
          message: text(narrowed ? "no_schemas_filtered" : "no_schemas"),
          action: narrowed ? text("filters_reset") : void 0,
          onAction: narrowed ? list.reset : void 0,
          text
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 139,
          columnNumber: 67
        }
      ), children: /* @__PURE__ */ jsxDEV(
        SchemaTable,
        {
          rows: page.rows,
          canManage,
          selection,
          onToggle: (row) => send(row.enabled ? "disable" : "enable", [row.id]),
          text
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 146,
          columnNumber: 21
        }
      ) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 139,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(
        Pager,
        {
          page: page.page,
          perpage: list.state.perpage,
          total: page.total,
          text,
          onChange: (changes) => list.set({ ...changes, page: changes.page ?? 0 })
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 149,
          columnNumber: 17
        }
      )
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 114,
      columnNumber: 13
    }),
    props.truncated && /* @__PURE__ */ jsxDEV("p", { className: "text-muted small text-center", children: text("list_truncated", schemas.length) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 152,
      columnNumber: 33
    }),
    canManage && /* @__PURE__ */ jsxDEV(FloatBar, { count: selection.chosen.size, label: text("core_actions"), onClear: selection.clear, text, children: [
      selection.actions.enable && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-outline-secondary btn-sm", onClick: () => act("enable"), children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "t/show", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 156,
          columnNumber: 21
        }),
        " ",
        text("bulk_enable")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 155,
        columnNumber: 46
      }),
      selection.actions.disable && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-outline-secondary btn-sm", onClick: () => act("disable"), children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "t/hide", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 159,
          columnNumber: 21
        }),
        " ",
        text("bulk_disable")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 158,
        columnNumber: 47
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-outline-secondary btn-sm", onClick: () => act("export"), children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "t/download", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 162,
          columnNumber: 21
        }),
        " ",
        text("bulk_export")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 161,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-outline-danger btn-sm", onClick: () => act("delete"), children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "t/delete", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 165,
          columnNumber: 21
        }),
        " ",
        text("bulk_delete")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 164,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 154,
      columnNumber: 27
    }),
    deleting && /* @__PURE__ */ jsxDEV(Dialog, { title: text("bulk_delete"), onClose: () => setDeleting(false), text, footer: /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-secondary", onClick: () => setDeleting(false), children: text("core_cancel") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 170,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-danger", onClick: () => send("delete", [...selection.chosen]), children: text("bulk_delete") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 171,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 169,
      columnNumber: 117
    }), children: /* @__PURE__ */ jsxDEV("p", { className: "mb-0", children: text("bulk_delete_confirm") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 173,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 169,
      columnNumber: 26
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
    lineNumber: 90,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
    lineNumber: 89,
    columnNumber: 12
  });
}, "Dashboard");
var Dashboard_default = Dashboard;
export {
  Dashboard_default as default
};
//# sourceMappingURL=Dashboard.dev.js.map
