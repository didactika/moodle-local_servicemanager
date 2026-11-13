var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What changed between two versions, said in terms of the schema: which functions came and went, which fields were edited.
 *
 * @module     local_servicemanager/components/compare/ChangeSummary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { ofArea } from "../../lib/diff";
import Icon from "../common/Icon";
const AREAS = [
  { area: "field", title: "area_field", icon: "id-card" },
  { area: "function", title: "area_function", icon: "code" },
  { area: "capability", title: "area_capability", icon: "shield-halved" },
  { area: "user", title: "area_user", icon: "user" },
  { area: "plugin", title: "area_plugin", icon: "puzzle-piece" },
  { area: "files", title: "area_files", icon: "file-arrow-down" },
  { area: "role", title: "area_role", icon: "user-shield" }
];
const KINDS = {
  added: { icon: "plus", tone: "success" },
  removed: { icon: "minus", tone: "danger" },
  changed: { icon: "pen", tone: "warning" }
};
const named = /* @__PURE__ */ __name((text, area, name, value) => {
  if (value === void 0) {
    return "";
  }
  if (area === "function" || area === "files") {
    return text("state_" + value);
  }
  return value === "" ? text("change_empty") : value;
}, "named");
const label = /* @__PURE__ */ __name((text, change) => {
  if (change.area === "field") {
    return text({ name: "schema_name", version: "schema_version", maintainer: "schema_maintainer", description: "core_description" }[change.name] ?? change.name);
  }
  if (change.area === "files") {
    return text(change.name === "download_files" ? "req_download_files" : "req_upload_files");
  }
  return change.name;
}, "label");
const KIND_SIGN = { added: "plus", removed: "minus", changed: "pen" };
const ChangeSummary = /* @__PURE__ */ __name(({ changes, text }) => /* @__PURE__ */ jsxDEV("details", { className: "card", "data-region": "change-summary", open: true, children: [
  /* @__PURE__ */ jsxDEV("summary", { className: "card-header d-flex align-items-center gap-2", children: [
    /* @__PURE__ */ jsxDEV("h5", { className: "h6 mb-0", children: text("compare_changes_title") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
      lineNumber: 63,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("span", { className: "badge badge-soft rounded-pill text-bg-secondary", children: changes.length }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
      lineNumber: 64,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
    lineNumber: 61,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "card-body d-grid gap-3", children: AREAS.map(({ area, title, icon }) => {
    const items = ofArea(changes, area);
    if (items.length === 0) {
      return null;
    }
    return /* @__PURE__ */ jsxDEV("section", { children: [
      /* @__PURE__ */ jsxDEV("h6", { className: "small text-muted text-uppercase fw-semibold", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: icon, gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
          lineNumber: 73,
          columnNumber: 77
        }),
        text(title)
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
        lineNumber: 73,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("ul", { className: "list-unstyled d-flex flex-wrap gap-2 mb-0", children: items.map((change) => /* @__PURE__ */ jsxDEV("li", { className: `badge badge-soft rounded-pill text-bg-${KINDS[change.kind].tone} fw-normal d-inline-flex align-items-center gap-1`, children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: KIND_SIGN[change.kind] }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
          lineNumber: 76,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: [
          text("change_" + change.kind),
          ": "
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
          lineNumber: 77,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "fw-semibold", children: label(text, change) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
          lineNumber: 78,
          columnNumber: 25
        }),
        change.kind === "changed" && /* @__PURE__ */ jsxDEV("span", { className: "d-inline-flex align-items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-decoration-line-through", children: named(text, area, change.name, change.from) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
            lineNumber: 80,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV(Icon, { name: "arrow-right" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
            lineNumber: 81,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("span", { children: named(text, area, change.name, change.to) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
            lineNumber: 82,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
          lineNumber: 79,
          columnNumber: 55
        })
      ] }, change.kind + change.name, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
        lineNumber: 75,
        columnNumber: 44
      })) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
        lineNumber: 74,
        columnNumber: 17
      })
    ] }, area, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
      lineNumber: 72,
      columnNumber: 20
    });
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
    lineNumber: 66,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
  lineNumber: 60,
  columnNumber: 64
}), "ChangeSummary");
var ChangeSummary_default = ChangeSummary;
export {
  ChangeSummary_default as default
};
//# sourceMappingURL=ChangeSummary.dev.js.map
