var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The versions a schema has had, to find by typing, read, compare two of them and roll back to one.
 *
 * It gets the versions without their YAML and filters them in the page, so searching never waits for the server.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/History
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useCallback, useMemo, useState } from "react";
import BackLink from "./components/common/BackLink";
import EmptyState from "./components/common/EmptyState";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ConfirmModal from "./components/common/ConfirmModal";
import Icon from "./components/common/Icon";
import PageHeader from "./components/common/PageHeader";
import { Empty, Pager as DsPager, SearchBox as DsSearch, TableBox } from "./ds/ui";
import { DateMenu, FilterGroup } from "./ds/Filters";
import CompareBar from "./components/history/CompareBar";
import VersionList from "./components/history/VersionList";
import { createText } from "./engine/text";
import { addToast } from "./engine/toast";
import { useListState } from "./hooks/useListState";
import { matches, paginate } from "./lib/listing";
import { rollbackSchema } from "./services/api";
const TO_COMPARE = 2;
const findable = /* @__PURE__ */ __name((row) => ({ texts: [row.version, row.userName, row.reason], at: row.at }), "findable");
const History = /* @__PURE__ */ __name((props) => {
  const { urls, perPageOptions } = props;
  const [rows, setRows] = useState(props.rows);
  const [currentVersion, setCurrentVersion] = useState(props.currentVersion);
  const [rollingBack, setRollingBack] = useState(null);
  const text = useMemo(() => createText(props.strings), [props.strings]);
  const list = useListState(perPageOptions[0], perPageOptions);
  const [chosen, setChosen] = useState(/* @__PURE__ */ new Set());
  const [tooMany, setTooMany] = useState(false);
  const found = useMemo(() => rows.filter((row) => matches(findable(row), list.state)), [rows, list.state.query, list.state.from, list.state.to]);
  const page = paginate(found, list.state.page, list.state.perpage);
  const asking = list.state.query !== "" || list.state.from !== "" || list.state.to !== "";
  const toggle = useCallback((id) => {
    if (!chosen.has(id) && chosen.size >= TO_COMPARE) {
      setTooMany(true);
      return;
    }
    const next = new Set(chosen);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setChosen(next);
    setTooMany(false);
  }, [chosen]);
  const confirmRollback = /* @__PURE__ */ __name(() => {
    const target = rollingBack;
    setRollingBack(null);
    if (!target) {
      return;
    }
    rollbackSchema(props.schemaId, target.id).then((result) => {
      setRows(result.rows);
      setCurrentVersion(result.version);
      setChosen(/* @__PURE__ */ new Set());
      return addToast(text("rollback_success"), { type: "success" });
    }).catch(() => addToast(text("rollback_error"), { type: "danger" })).catch(() => void 0);
  }, "confirmRollback");
  const clear = useCallback(() => {
    setChosen(/* @__PURE__ */ new Set());
    setTooMany(false);
  }, []);
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "lsm servicemanager-history-page d-grid gap-3", children: [
    /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(BackLink, { href: urls.back, label: text("back") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/History.tsx",
      lineNumber: 90,
      columnNumber: 18
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/History.tsx",
      lineNumber: 90,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      PageHeader,
      {
        title: text("version_history"),
        subtitle: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          props.schemaName,
          " \xB7 ",
          text("history_current", currentVersion)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 94,
          columnNumber: 27
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/History.tsx",
        lineNumber: 92,
        columnNumber: 13
      }
    ),
    rows.length === 0 ? /* @__PURE__ */ jsxDEV(EmptyState, { icon: "clock-rotate-left", title: text("history_empty_title"), text: text("no_history") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/History.tsx",
      lineNumber: 98,
      columnNumber: 19
    }) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "table-toolbar", "data-region": "filters", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "table-toolbar-start", children: [
            /* @__PURE__ */ jsxDEV(DsSearch, { value: list.state.query, onChange: (query) => list.set({ query }), label: text("filter_version"), text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 103,
              columnNumber: 33
            }),
            /* @__PURE__ */ jsxDEV(FilterGroup, { count: list.state.from || list.state.to ? 1 : 0, text, children: /* @__PURE__ */ jsxDEV(
              DateMenu,
              {
                label: text("history_date"),
                from: list.state.from,
                to: list.state.to,
                text,
                onChange: (from, to) => list.set({ from, to })
              },
              void 0,
              false,
              {
                fileName: "public/local/servicemanager/js/esm/src/History.tsx",
                lineNumber: 105,
                columnNumber: 37
              }
            ) }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 104,
              columnNumber: 33
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 102,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "table-toolbar-end", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              className: "btn btn-link btn-icon",
              disabled: !asking,
              title: text("filters_reset"),
              "aria-label": text("filters_reset"),
              onClick: list.reset,
              children: /* @__PURE__ */ jsxDEV(Icon, { name: "rotate" }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/History.tsx",
                lineNumber: 112,
                columnNumber: 37
              })
            },
            void 0,
            false,
            {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 110,
              columnNumber: 33
            }
          ) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 109,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 101,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("form", { action: urls.compare, method: "get", className: "servicemanager-history", children: [
          /* @__PURE__ */ jsxDEV("input", { type: "hidden", name: "id", value: props.schemaId }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 117,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV(TableBox, { busy: false, empty: page.rows.length === 0 && /* @__PURE__ */ jsxDEV(
            Empty,
            {
              icon: "a/search",
              message: text("no_schemas_filtered"),
              action: text("filters_reset"),
              onAction: list.reset,
              text
            },
            void 0,
            false,
            {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 118,
              columnNumber: 85
            }
          ), children: /* @__PURE__ */ jsxDEV(VersionList, { rows: page.rows, chosen, onToggle: toggle, onRollback: setRollingBack, text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 120,
            columnNumber: 33
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 118,
            columnNumber: 29
          }),
          chosen.size > 0 && /* @__PURE__ */ jsxDEV(CompareBar, { chosen, needed: TO_COMPARE, tooMany, onClear: clear, text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 122,
            columnNumber: 49
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 116,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(
          DsPager,
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
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 124,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/History.tsx",
        lineNumber: 100,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "text-muted small mb-0", children: [
        text("history_count", found.length),
        " ",
        text("compare_hint")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/History.tsx",
        lineNumber: 127,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/History.tsx",
      lineNumber: 99,
      columnNumber: 19
    }),
    /* @__PURE__ */ jsxDEV(
      ConfirmModal,
      {
        open: rollingBack !== null,
        title: text("rollback_title", rollingBack?.version ?? ""),
        message: text("rollback_confirm"),
        confirmLabel: text("rollback"),
        cancelLabel: text("core_cancel"),
        tone: "warning",
        onConfirm: confirmRollback,
        onCancel: () => setRollingBack(null)
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/History.tsx",
        lineNumber: 130,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/History.tsx",
    lineNumber: 89,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/History.tsx",
    lineNumber: 88,
    columnNumber: 12
  });
}, "History");
var History_default = History;
export {
  History_default as default
};
//# sourceMappingURL=History.dev.js.map
