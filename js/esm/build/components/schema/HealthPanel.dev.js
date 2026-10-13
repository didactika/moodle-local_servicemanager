var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The results of the scheduled health checks of a schema, which can be narrowed to one status.
 *
 * @module     local_servicemanager/components/schema/HealthPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useState } from "react";
import { statusLook } from "../../lib/status";
import Panel from "../common/Panel";
const HealthPanel = /* @__PURE__ */ __name(({ logs, text }) => {
  const [status, setStatus] = useState("");
  const shown = status ? logs.filter((log) => log.status === status) : logs;
  return /* @__PURE__ */ jsxDEV(
    Panel,
    {
      title: text("healthcheck_task"),
      icon: "heart-pulse",
      count: logs.length,
      flush: true,
      region: "health",
      actions: /* @__PURE__ */ jsxDEV(
        "select",
        {
          className: "form-select form-select-sm sm-auto-width",
          value: status,
          onChange: (event) => setStatus(event.target.value),
          "aria-label": text("core_status"),
          id: "healthlog-status-filter",
          children: [
            /* @__PURE__ */ jsxDEV("option", { value: "", children: text("core_all") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
              lineNumber: 39,
              columnNumber: 13
            }),
            /* @__PURE__ */ jsxDEV("option", { value: "healthy", children: text("status_healthy") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
              lineNumber: 40,
              columnNumber: 13
            }),
            /* @__PURE__ */ jsxDEV("option", { value: "warning", children: text("status_warning") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
              lineNumber: 41,
              columnNumber: 13
            }),
            /* @__PURE__ */ jsxDEV("option", { value: "critical", children: text("status_critical") }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
              lineNumber: 42,
              columnNumber: 13
            })
          ]
        },
        void 0,
        true,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 32,
          columnNumber: 18
        }
      ),
      children: /* @__PURE__ */ jsxDEV("div", { className: "sm-scroll", children: /* @__PURE__ */ jsxDEV("table", { className: "table table-sm align-middle mb-0", id: "healthlog-table", children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { className: "sm-time-column", children: text("core_time") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 49,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("th", { className: "sm-status-column", children: text("core_status") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 50,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("th", { children: text("core_message") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 51,
            columnNumber: 25
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 48,
          columnNumber: 21
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 47,
          columnNumber: 17
        }),
        /* @__PURE__ */ jsxDEV("tbody", { children: shown.map((log, index) => /* @__PURE__ */ jsxDEV("tr", { "data-status": log.status, children: [
          /* @__PURE__ */ jsxDEV("td", { children: log.time }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 56,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { className: `sm-badge tone-${statusLook(log.status).tone}`, children: log.status }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 57,
            columnNumber: 29
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 57,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("td", { children: log.message }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 58,
            columnNumber: 25
          })
        ] }, index, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 55,
          columnNumber: 48
        })) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 54,
          columnNumber: 17
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
        lineNumber: 46,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
        lineNumber: 45,
        columnNumber: 9
      })
    },
    void 0,
    false,
    {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
      lineNumber: 26,
      columnNumber: 12
    }
  );
}, "HealthPanel");
var HealthPanel_default = HealthPanel;
export {
  HealthPanel_default as default
};
//# sourceMappingURL=HealthPanel.dev.js.map
