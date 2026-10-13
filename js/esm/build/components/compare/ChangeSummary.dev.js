var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
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
const ChangeSummary = /* @__PURE__ */ __name(({ changes, text }) => /* @__PURE__ */ jsxDEV("div", { className: "card mb-4", "data-region": "change-summary", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "card-header", children: /* @__PURE__ */ jsxDEV("h5", { className: "mb-0", children: text("compare_changes_title") }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
    lineNumber: 59,
    columnNumber: 34
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
    lineNumber: 59,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "card-body", children: /* @__PURE__ */ jsxDEV("div", { className: "row", children: AREAS.map(({ area, title, icon }) => {
    const items = ofArea(changes, area);
    if (items.length === 0) {
      return null;
    }
    return /* @__PURE__ */ jsxDEV("div", { className: "col-lg-6 mb-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-body-secondary small text-uppercase mb-2", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: icon, gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
          lineNumber: 68,
          columnNumber: 84
        }),
        text(title)
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
        lineNumber: 68,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("ul", { className: "list-unstyled mb-0", children: items.map((change) => {
        const kind = KINDS[change.kind];
        return /* @__PURE__ */ jsxDEV("li", { className: "d-flex align-items-start sm-change", children: [
          /* @__PURE__ */ jsxDEV("span", { className: `badge text-bg-${kind.tone} sm-change-badge`, title: text("change_" + change.kind), children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: kind.icon }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
              lineNumber: 74,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("change_" + change.kind) }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
              lineNumber: 74,
              columnNumber: 62
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
            lineNumber: 73,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            area === "function" || area === "capability" || area === "plugin" || area === "role" ? /* @__PURE__ */ jsxDEV("code", { children: label(text, change) }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
              lineNumber: 77,
              columnNumber: 125
            }) : label(text, change),
            change.kind === "changed" && /* @__PURE__ */ jsxDEV("span", { className: "text-body-secondary", children: [
              ": ",
              /* @__PURE__ */ jsxDEV("del", { children: named(text, area, change.name, change.from) }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
                lineNumber: 79,
                columnNumber: 47
              }),
              " \u2192 ",
              /* @__PURE__ */ jsxDEV("ins", { children: named(text, area, change.name, change.to) }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
                lineNumber: 80,
                columnNumber: 48
              })
            ] }, void 0, true, {
              fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
              lineNumber: 78,
              columnNumber: 67
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
            lineNumber: 76,
            columnNumber: 33
          })
        ] }, change.kind + change.name, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
          lineNumber: 72,
          columnNumber: 36
        });
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
        lineNumber: 69,
        columnNumber: 21
      })
    ] }, area, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
      lineNumber: 67,
      columnNumber: 24
    });
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
    lineNumber: 61,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
    lineNumber: 60,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/compare/ChangeSummary.tsx",
  lineNumber: 58,
  columnNumber: 64
}), "ChangeSummary");
var ChangeSummary_default = ChangeSummary;
export {
  ChangeSummary_default as default
};
//# sourceMappingURL=ChangeSummary.dev.js.map
