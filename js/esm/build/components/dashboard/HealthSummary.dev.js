var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * How many schemas are healthy, in doubt or failing, as one bar with a legend. Pressing a part of the legend shows only those schemas, and
 * pressing it again shows them all, so the same choice is not offered twice.
 *
 * @module     local_servicemanager/components/dashboard/HealthSummary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
const PARTS = [
  { key: "healthy", tone: "success", icon: "circle-check" },
  { key: "warning", tone: "warning", icon: "triangle-exclamation" },
  { key: "critical", tone: "danger", icon: "circle-xmark" }
];
const HealthSummary = /* @__PURE__ */ __name(({ counts, status, onStatus, text }) => {
  const total = PARTS.reduce((sum, part) => sum + (counts[part.key] ?? 0), 0);
  return /* @__PURE__ */ jsxDEV("div", { className: "card sm-health", "data-region": "summary", children: /* @__PURE__ */ jsxDEV("div", { className: "card-body d-flex flex-wrap align-items-center", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "sm-health-total", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "sm-health-number", children: total }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
        lineNumber: 36,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-body-secondary", children: text(total === 1 ? "tile_schema" : "tile_schemas") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
        lineNumber: 37,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
      lineNumber: 35,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "sm-health-bar", "aria-hidden": "true", children: PARTS.map((part) => (counts[part.key] ?? 0) > 0 && /* @__PURE__ */ jsxDEV(
      "span",
      {
        className: `sm-health-part bg-${part.tone}`,
        style: { flexGrow: counts[part.key] }
      },
      part.key,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
        lineNumber: 40,
        columnNumber: 69
      }
    )) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
      lineNumber: 39,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "sm-health-legend", role: "group", "aria-label": text("filter_status"), children: PARTS.map((part) => {
      const count = counts[part.key] ?? 0;
      const on = status === part.key;
      return /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          className: `sm-chip sm-health-chip${on ? " active" : ""}`,
          "aria-pressed": on,
          disabled: count === 0 && !on,
          onClick: () => onStatus(on ? "" : part.key),
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: `text-${part.tone}`, children: /* @__PURE__ */ jsxDEV(Icon, { name: part.icon }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
              lineNumber: 58,
              columnNumber: 63
            }) }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
              lineNumber: 58,
              columnNumber: 25
            }),
            /* @__PURE__ */ jsxDEV("strong", { children: count }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
              lineNumber: 59,
              columnNumber: 25
            }),
            " ",
            text("status_" + part.key)
          ]
        },
        part.key,
        true,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
          lineNumber: 50,
          columnNumber: 28
        }
      );
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
      lineNumber: 46,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
    lineNumber: 34,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/HealthSummary.tsx",
    lineNumber: 33,
    columnNumber: 12
  });
}, "HealthSummary");
var HealthSummary_default = HealthSummary;
export {
  HealthSummary_default as default
};
//# sourceMappingURL=HealthSummary.dev.js.map
