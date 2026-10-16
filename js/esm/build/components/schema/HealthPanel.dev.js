var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A summary of the health checks of a schema: the latest one, with what it found, how many there are of each status and the way
 * to all of them, which have a page of their own.
 *
 * @module     local_servicemanager/components/schema/HealthPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { statusLook } from "../../lib/status";
import Icon from "../common/Icon";
import Panel from "../common/Panel";
const HealthPanel = /* @__PURE__ */ __name(({ health, text }) => /* @__PURE__ */ jsxDEV(
  Panel,
  {
    title: text("healthcheck_task"),
    icon: "heart-pulse",
    count: health.total,
    region: "health",
    actions: /* @__PURE__ */ jsxDEV("a", { href: health.url, className: "btn sm-pill compact tone-primary", children: [
      text("health_view_all"),
      /* @__PURE__ */ jsxDEV(Icon, { name: "arrow-right", className: "ms-2" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
        lineNumber: 29,
        columnNumber: 34
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
      lineNumber: 28,
      columnNumber: 14
    }),
    children: [
      health.latest && /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "sm-health-latest", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-body-secondary small text-uppercase", children: text("health_latest") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 34,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("span", { className: `sm-badge tone-${statusLook(health.latest.status).tone}`, children: health.latest.statusLabel }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 35,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "text-body-secondary", children: health.latest.time }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
            lineNumber: 36,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 33,
          columnNumber: 9
        }),
        /* @__PURE__ */ jsxDEV("ul", { className: "sm-health-messages", children: health.latest.messages.map((message, index) => /* @__PURE__ */ jsxDEV("li", { children: message }, index, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 39,
          columnNumber: 61
        })) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 38,
          columnNumber: 9
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
        lineNumber: 32,
        columnNumber: 23
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "sm-health-counts", children: (health.counts ?? []).map((count) => /* @__PURE__ */ jsxDEV("span", { className: `sm-badge tone-${statusLook(count.status).tone}`, children: [
        count.label,
        /* @__PURE__ */ jsxDEV("span", { className: "ms-2", children: count.count }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
          lineNumber: 44,
          columnNumber: 26
        })
      ] }, count.status, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
        lineNumber: 43,
        columnNumber: 47
      })) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
        lineNumber: 42,
        columnNumber: 5
      })
    ]
  },
  void 0,
  true,
  {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthPanel.tsx",
    lineNumber: 23,
    columnNumber: 59
  }
), "HealthPanel");
var HealthPanel_default = HealthPanel;
export {
  HealthPanel_default as default
};
//# sourceMappingURL=HealthPanel.dev.js.map
