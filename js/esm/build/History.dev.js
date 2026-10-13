var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
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
import Chips from "./components/common/Chips";
import FilterMenu from "./components/common/FilterMenu";
import Icon from "./components/common/Icon";
import PageHeader from "./components/common/PageHeader";
import Pagination from "./components/common/Pagination";
import SearchBox from "./components/common/SearchBox";
import CompareBar from "./components/history/CompareBar";
import VersionList from "./components/history/VersionList";
import { createText } from "./engine/text";
import { useListState } from "./hooks/useListState";
import { matches, paginate } from "./lib/listing";
const TO_COMPARE = 2;
const findable = /* @__PURE__ */ __name((row) => ({ texts: [row.version, row.userName, row.reason], at: row.at }), "findable");
const History = /* @__PURE__ */ __name((props) => {
  const { urls, rows, perPageOptions } = props;
  const text = useMemo(() => createText(props.strings), [props.strings]);
  const list = useListState(perPageOptions[0], perPageOptions);
  const [chosen, setChosen] = useState(/* @__PURE__ */ new Set());
  const [tooMany, setTooMany] = useState(false);
  const found = useMemo(() => rows.filter((row) => matches(findable(row), list.state)), [rows, list.state.query, list.state.from, list.state.to]);
  const page = paginate(found, list.state.page, list.state.perpage);
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
  const clear = useCallback(() => {
    setChosen(/* @__PURE__ */ new Set());
    setTooMany(false);
  }, []);
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "servicemanager-history-page", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDEV(BackLink, { href: urls.back, label: text("back") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/History.tsx",
      lineNumber: 71,
      columnNumber: 35
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/History.tsx",
      lineNumber: 71,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      PageHeader,
      {
        title: text("version_history"),
        subtitle: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          props.schemaName,
          " \xB7 ",
          text("history_current", props.currentVersion)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 75,
          columnNumber: 27
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/History.tsx",
        lineNumber: 73,
        columnNumber: 13
      }
    ),
    rows.length === 0 ? /* @__PURE__ */ jsxDEV(EmptyState, { icon: "clock-rotate-left", title: text("history_empty_title"), text: text("no_history") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/History.tsx",
      lineNumber: 79,
      columnNumber: 19
    }) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "sm-toolbar", children: [
        /* @__PURE__ */ jsxDEV(
          SearchBox,
          {
            value: list.state.query,
            onChange: (query) => list.set({ query }),
            placeholder: text("filter_version"),
            clearLabel: text("filter_clear")
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 82,
            columnNumber: 25
          }
        ),
        /* @__PURE__ */ jsxDEV(FilterMenu, { text, count: list.extras, onReset: () => list.set({ from: "", to: "", perpage: perPageOptions[0] }), children: [
          /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "sm-from", className: "form-label", children: text("filter_date_from") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 90,
              columnNumber: 33
            }),
            /* @__PURE__ */ jsxDEV("input", { type: "date", id: "sm-from", className: "form-control", value: list.state.from, onChange: (event) => list.set({ from: event.target.value }) }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 91,
              columnNumber: 33
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 89,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "sm-to", className: "form-label", children: text("filter_date_to") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 94,
              columnNumber: 33
            }),
            /* @__PURE__ */ jsxDEV("input", { type: "date", id: "sm-to", className: "form-control", value: list.state.to, onChange: (event) => list.set({ to: event.target.value }) }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 95,
              columnNumber: 33
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 93,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "sm-filter-title", children: text("filter_per_page") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 97,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV(
            Chips,
            {
              label: text("filter_per_page"),
              value: String(list.state.perpage),
              onChange: (value) => list.set({ perpage: Number(value) }),
              chips: perPageOptions.map((option) => ({ value: String(option), label: String(option) }))
            },
            void 0,
            false,
            {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 98,
              columnNumber: 29
            }
          )
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 88,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/History.tsx",
        lineNumber: 81,
        columnNumber: 21
      }),
      page.rows.length === 0 ? /* @__PURE__ */ jsxDEV(
        EmptyState,
        {
          icon: "filter-circle-xmark",
          title: text("empty_filtered_title"),
          text: text("no_schemas_filtered"),
          actions: /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-secondary", onClick: list.reset, children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "xmark", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/History.tsx",
              lineNumber: 112,
              columnNumber: 111
            }),
            text("filter_clear")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/History.tsx",
            lineNumber: 112,
            columnNumber: 38
          })
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 108,
          columnNumber: 27
        }
      ) : /* @__PURE__ */ jsxDEV("form", { action: urls.compare, method: "get", className: "servicemanager-history", children: [
        /* @__PURE__ */ jsxDEV("input", { type: "hidden", name: "id", value: props.schemaId }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 115,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "text-body-secondary small mb-2", children: [
          text("history_count", found.length),
          " ",
          text("compare_hint")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 116,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV(VersionList, { rows: page.rows, chosen, onToggle: toggle, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 117,
          columnNumber: 29
        }),
        chosen.size > 0 && /* @__PURE__ */ jsxDEV(CompareBar, { chosen, needed: TO_COMPARE, tooMany, onClear: clear, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/History.tsx",
          lineNumber: 118,
          columnNumber: 49
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/History.tsx",
        lineNumber: 114,
        columnNumber: 27
      }),
      /* @__PURE__ */ jsxDEV(Pagination, { page: page.page, perpage: list.state.perpage, total: page.total, onPage: (next) => list.set({ page: next }), text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/History.tsx",
        lineNumber: 121,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/History.tsx",
      lineNumber: 80,
      columnNumber: 19
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/History.tsx",
    lineNumber: 70,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/History.tsx",
    lineNumber: 69,
    columnNumber: 12
  });
}, "History");
var History_default = History;
export {
  History_default as default
};
//# sourceMappingURL=History.dev.js.map
