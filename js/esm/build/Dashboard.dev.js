var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * The dashboard: the schemas of the site, found by typing, filtered by status and acted on one by one or together.
 *
 * It gets every schema at once and filters them in the page, so searching never waits for the server and never reloads.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/Dashboard
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo, useState } from "react";
import HealthSummary from "./components/dashboard/HealthSummary";
import SchemaTable from "./components/dashboard/SchemaTable";
import SelectionBar from "./components/dashboard/SelectionBar";
import Toolbar from "./components/dashboard/Toolbar";
import WsPill from "./components/dashboard/WsPill";
import ConfirmModal from "./components/common/ConfirmModal";
import EmptyState from "./components/common/EmptyState";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Icon from "./components/common/Icon";
import PageHeader from "./components/common/PageHeader";
import Pagination from "./components/common/Pagination";
import ActionMenu from "./components/common/ActionMenu";
import IconButton from "./components/common/IconButton";
import { createText } from "./engine/text";
import { postForm } from "./engine/post";
import { useBulkSelection } from "./hooks/useBulkSelection";
import { useListState } from "./hooks/useListState";
import { countBy, matches, paginate } from "./lib/listing";
const findable = /* @__PURE__ */ __name((row) => ({ texts: [row.name, row.schemaId, row.version], status: row.status, at: row.modifiedAt }), "findable");
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
  const found = useMemo(
    () => list.state.status ? withoutStatus.filter((row) => row.status === list.state.status) : withoutStatus,
    [withoutStatus, list.state.status]
  );
  const page = paginate(found, list.state.page, list.state.perpage);
  const selection = useBulkSelection(page.rows, schemas);
  const asking = list.state.query !== "" || list.state.status !== "" || list.extras > 0;
  const send = /* @__PURE__ */ __name((action, ids) => postForm(urls.bulkAction, { sesskey: props.sesskey, action, ids }), "send");
  const act = /* @__PURE__ */ __name((action) => action === "delete" ? setDeleting(true) : send(action, [...selection.chosen]), "act");
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "servicemanager-dashboard", children: [
    /* @__PURE__ */ jsxDEV(
      PageHeader,
      {
        title: text("dashboard"),
        subtitle: /* @__PURE__ */ jsxDEV(WsPill, { status: wsStatus, canManage, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 69,
          columnNumber: 27
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 67,
        columnNumber: 13
      }
    ),
    schemas.length === 0 ? /* @__PURE__ */ jsxDEV(
      EmptyState,
      {
        icon: "plug",
        title: text("empty_title"),
        text: text("no_schemas"),
        actions: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          canManage && /* @__PURE__ */ jsxDEV("a", { href: urls.create, className: "btn btn-primary", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "plus", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
              lineNumber: 78,
              columnNumber: 89
            }),
            text("new_schema")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 78,
            columnNumber: 39
          }),
          canManage && /* @__PURE__ */ jsxDEV("a", { href: urls.import, className: "btn btn-outline-primary", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "file-import", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
              lineNumber: 79,
              columnNumber: 97
            }),
            text("import_schemas")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 79,
            columnNumber: 39
          }),
          /* @__PURE__ */ jsxDEV("a", { href: urls.documentation, className: "btn btn-outline-secondary", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "book", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
              lineNumber: 80,
              columnNumber: 92
            }),
            text("view_documentation")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 80,
            columnNumber: 25
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 77,
          columnNumber: 30
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 73,
        columnNumber: 19
      }
    ) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(HealthSummary, { counts, status: list.state.status, onStatus: (status) => list.set({ status }), text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 84,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV(
        Toolbar,
        {
          list,
          options: perPageOptions,
          text,
          actions: /* @__PURE__ */ jsxDEV("div", { className: "sm-group", role: "group", "aria-label": text("core_actions"), children: [
            canManage && /* @__PURE__ */ jsxDEV(IconButton, { large: true, solid: true, tone: "primary", icon: "plus", label: text("new_schema"), href: urls.create }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
              lineNumber: 90,
              columnNumber: 43
            }),
            canManage && /* @__PURE__ */ jsxDEV(IconButton, { large: true, tone: "success", icon: "file-import", label: text("import_schemas"), href: urls.import }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
              lineNumber: 91,
              columnNumber: 43
            }),
            /* @__PURE__ */ jsxDEV(IconButton, { large: true, tone: "info", icon: "file-zipper", label: text("export_all"), href: urls.exportAll }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
              lineNumber: 92,
              columnNumber: 29
            }),
            /* @__PURE__ */ jsxDEV(
              ActionMenu,
              {
                size: "md",
                caret: true,
                icon: "book",
                label: text("docs_menu"),
                actions: [
                  { label: text("docs_schema_reference"), icon: "file-lines", href: urls.documentation },
                  { label: text("docs_plugin_wiki"), icon: "book-open", href: urls.wiki },
                  { label: text("docs_moodle"), icon: "life-ring", href: urls.moodleDocs }
                ]
              },
              void 0,
              false,
              {
                fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
                lineNumber: 93,
                columnNumber: 29
              }
            )
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 89,
            columnNumber: 34
          })
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 85,
          columnNumber: 21
        }
      ),
      page.rows.length > 0 ? /* @__PURE__ */ jsxDEV(
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
          lineNumber: 108,
          columnNumber: 27
        }
      ) : /* @__PURE__ */ jsxDEV(
        EmptyState,
        {
          icon: "filter-circle-xmark",
          title: text("empty_filtered_title"),
          text: text("no_schemas_filtered"),
          actions: asking ? /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-secondary", onClick: list.reset, children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "xmark", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
              lineNumber: 121,
              columnNumber: 37
            }),
            text("filter_clear")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
            lineNumber: 120,
            columnNumber: 35
          }) : void 0
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
          lineNumber: 115,
          columnNumber: 27
        }
      ),
      /* @__PURE__ */ jsxDEV(Pagination, { page: page.page, perpage: list.state.perpage, total: page.total, onPage: (next) => list.set({ page: next }), text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 126,
        columnNumber: 21
      }),
      props.truncated && /* @__PURE__ */ jsxDEV("p", { className: "text-body-secondary small text-center", children: text("list_truncated", schemas.length) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 127,
        columnNumber: 41
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
      lineNumber: 83,
      columnNumber: 19
    }),
    canManage && selection.chosen.size > 0 && /* @__PURE__ */ jsxDEV(
      SelectionBar,
      {
        count: selection.chosen.size,
        actions: selection.actions,
        onAction: act,
        onClear: selection.clear,
        text
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 130,
        columnNumber: 56
      }
    ),
    /* @__PURE__ */ jsxDEV(
      ConfirmModal,
      {
        open: deleting,
        title: text("bulk_delete"),
        message: text("bulk_delete_confirm"),
        confirmLabel: text("bulk_delete"),
        cancelLabel: text("core_cancel"),
        onCancel: () => setDeleting(false),
        onConfirm: () => send("delete", [...selection.chosen])
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
        lineNumber: 138,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
    lineNumber: 66,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/Dashboard.tsx",
    lineNumber: 65,
    columnNumber: 12
  });
}, "Dashboard");
var Dashboard_default = Dashboard;
export {
  Dashboard_default as default
};
//# sourceMappingURL=Dashboard.dev.js.map
