var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The health checks of a schema, narrowed to one status and a page at a time. The server reads the page that is asked for, so
 * the choices of status, of page and of size of page are links to the page with them.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/HealthChecks
 * @copyright  2026 Didactika.org
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo } from "react";
import BackLink from "./components/common/BackLink";
import EmptyState from "./components/common/EmptyState";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Icon from "./components/common/Icon";
import PageHeader from "./components/common/PageHeader";
import HealthFindings from "./components/schema/HealthFindings";
import { createText } from "./engine/text";
import { pageUrl } from "./lib/paging";
import Pager from "./components/common/Pager";
const HealthChecks = /* @__PURE__ */ __name((props) => {
  const { rows, filters, paging, urls } = props;
  const text = useMemo(() => createText(props.strings), [props.strings]);
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "servicemanager-health-page", "data-region": "servicemanager-health", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDEV(BackLink, { href: urls.back, label: text("back") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
      lineNumber: 33,
      columnNumber: 35
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
      lineNumber: 33,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(PageHeader, { title: text("health_checks"), subtitle: props.schemaName }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
      lineNumber: 34,
      columnNumber: 13
    }),
    !props.hasAny && /* @__PURE__ */ jsxDEV(EmptyState, { icon: "heart-pulse", title: text("health_checks"), text: text("health_none") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
      lineNumber: 36,
      columnNumber: 31
    }),
    props.hasAny && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center justify-content-between mb-3 sm-actions-row", children: /* @__PURE__ */ jsxDEV(
        "nav",
        {
          className: "d-flex flex-wrap align-items-center sm-health-filters",
          "aria-label": text("core_status"),
          "data-region": "health-filters",
          children: filters.map((filter) => /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: filter.url,
              className: `btn sm-pill compact tone-${filter.tone}${filter.active ? " active" : ""}`,
              "aria-current": filter.active ? "true" : void 0,
              children: [
                filter.label,
                /* @__PURE__ */ jsxDEV("span", { className: "sm-count-badge", children: filter.count }, void 0, false, {
                  fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                  lineNumber: 47,
                  columnNumber: 40
                })
              ]
            },
            filter.status || "all",
            true,
            {
              fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
              lineNumber: 42,
              columnNumber: 50
            }
          ))
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
          lineNumber: 40,
          columnNumber: 21
        }
      ) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
        lineNumber: 39,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "card sm-list", children: [
        rows.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "table-responsive", "data-region": "tablewrap", children: /* @__PURE__ */ jsxDEV("table", { className: "table mb-0 sm-health-table", "data-region": "health-table", children: [
          /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("th", { className: "sm-time-column", children: text("core_time") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
              lineNumber: 56,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("th", { className: "sm-status-column", children: text("core_status") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
              lineNumber: 57,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("th", { children: text("core_message") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
              lineNumber: 58,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
            lineNumber: 55,
            columnNumber: 33
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
            lineNumber: 54,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("tbody", { children: rows.map((row, index) => /* @__PURE__ */ jsxDEV(
            "tr",
            {
              className: `sm-health-row tone-${row.tone}`,
              "data-status": row.status,
              children: [
                /* @__PURE__ */ jsxDEV("td", { className: "sm-time-column", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "sm-health-time", children: row.time }, void 0, false, {
                    fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                    lineNumber: 68,
                    columnNumber: 41
                  }),
                  /* @__PURE__ */ jsxDEV("span", { className: "sm-health-ago", children: row.ago }, void 0, false, {
                    fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                    lineNumber: 69,
                    columnNumber: 41
                  })
                ] }, void 0, true, {
                  fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                  lineNumber: 67,
                  columnNumber: 37
                }),
                /* @__PURE__ */ jsxDEV("td", { className: "sm-status-column", children: /* @__PURE__ */ jsxDEV("span", { className: `sm-badge tone-${row.tone}`, children: [
                  /* @__PURE__ */ jsxDEV(Icon, { name: row.icon, gap: true }, void 0, false, {
                    fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                    lineNumber: 73,
                    columnNumber: 45
                  }),
                  row.statusLabel
                ] }, void 0, true, {
                  fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                  lineNumber: 72,
                  columnNumber: 41
                }) }, void 0, false, {
                  fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                  lineNumber: 71,
                  columnNumber: 37
                }),
                /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV(HealthFindings, { check: row }, void 0, false, {
                  fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                  lineNumber: 76,
                  columnNumber: 41
                }) }, void 0, false, {
                  fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
                  lineNumber: 76,
                  columnNumber: 37
                })
              ]
            },
            index,
            true,
            {
              fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
              lineNumber: 62,
              columnNumber: 59
            }
          )) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
            lineNumber: 61,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
          lineNumber: 53,
          columnNumber: 25
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
          lineNumber: 52,
          columnNumber: 41
        }),
        rows.length === 0 && /* @__PURE__ */ jsxDEV("div", { "data-region": "tablewrap", children: /* @__PURE__ */ jsxDEV(EmptyState, { bare: true, icon: "filter-circle-xmark", title: text("empty_filtered_title"), text: text("health_none_with_status") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
          lineNumber: 82,
          columnNumber: 25
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
          lineNumber: 81,
          columnNumber: 43
        }),
        /* @__PURE__ */ jsxDEV(
          Pager,
          {
            page: paging.page,
            perpage: paging.perpage,
            total: paging.total,
            text,
            onChange: ({ page, perpage }) => {
              const target = new URL(perpage === void 0 ? pageUrl(urls.page, page ?? 0) : urls.perpage, window.location.href);
              if (perpage !== void 0) {
                target.searchParams.set("perpage", String(perpage));
              }
              window.location.assign(target.toString());
            }
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
            lineNumber: 84,
            columnNumber: 21
          }
        )
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
        lineNumber: 51,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
      lineNumber: 38,
      columnNumber: 30
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
    lineNumber: 32,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/HealthChecks.tsx",
    lineNumber: 31,
    columnNumber: 12
  });
}, "HealthChecks");
var HealthChecks_default = HealthChecks;
export {
  HealthChecks_default as default
};
//# sourceMappingURL=HealthChecks.dev.js.map
