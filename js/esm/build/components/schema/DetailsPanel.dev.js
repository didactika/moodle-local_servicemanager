var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * What a schema says about itself: its description, who maintains it, when it was made and changed and whether it is on.
 *
 * @module     local_servicemanager/components/schema/DetailsPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import IconButton from "../common/IconButton";
import Panel from "../common/Panel";
const DetailsPanel = /* @__PURE__ */ __name(({ schema, urls, canManage, isHistory, busy, onToggle, text }) => /* @__PURE__ */ jsxDEV(
  Panel,
  {
    title: text("schema_information"),
    icon: "circle-info",
    region: "details",
    actions: !isHistory ? /* @__PURE__ */ jsxDEV("div", { className: "sm-group", role: "group", "aria-label": text("core_actions"), children: [
      canManage && /* @__PURE__ */ jsxDEV(IconButton, { icon: "pen-to-square", label: text("action_edit"), href: urls.edit }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
        lineNumber: 32,
        columnNumber: 23
      }),
      canManage && /* @__PURE__ */ jsxDEV(IconButton, { icon: "clock-rotate-left", label: text("version_history"), href: urls.history, tone: "primary" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
        lineNumber: 33,
        columnNumber: 23
      }),
      /* @__PURE__ */ jsxDEV(IconButton, { icon: "download", label: text("action_export"), href: urls.export, tone: "info" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
        lineNumber: 34,
        columnNumber: 9
      }),
      canManage && /* @__PURE__ */ jsxDEV(
        IconButton,
        {
          icon: schema.enabled ? "toggle-on" : "toggle-off",
          label: text(schema.enabled ? "bulk_disable" : "bulk_enable"),
          onClick: onToggle,
          disabled: busy,
          tone: schema.enabled ? "success" : "secondary"
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
          lineNumber: 35,
          columnNumber: 23
        }
      ),
      canManage && /* @__PURE__ */ jsxDEV(IconButton, { icon: "trash", label: text("action_delete"), href: urls.delete, tone: "danger" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
        lineNumber: 42,
        columnNumber: 23
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
      lineNumber: 31,
      columnNumber: 27
    }) : void 0,
    children: [
      schema.description && /* @__PURE__ */ jsxDEV("p", { className: "mb-3", children: schema.description }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
        lineNumber: 45,
        columnNumber: 28
      }),
      /* @__PURE__ */ jsxDEV("dl", { className: "sm-facts-row mb-0", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "sm-fact", children: [
          /* @__PURE__ */ jsxDEV("dt", { children: text("schema_version") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 47,
            columnNumber: 34
          }),
          /* @__PURE__ */ jsxDEV("dd", { children: schema.version }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 47,
            columnNumber: 67
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
          lineNumber: 47,
          columnNumber: 9
        }),
        schema.maintainer && /* @__PURE__ */ jsxDEV("div", { className: "sm-fact", children: [
          /* @__PURE__ */ jsxDEV("dt", { children: text("schema_maintainer") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 48,
            columnNumber: 56
          }),
          /* @__PURE__ */ jsxDEV("dd", { children: schema.maintainer }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 48,
            columnNumber: 92
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
          lineNumber: 48,
          columnNumber: 31
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "sm-fact", children: [
          /* @__PURE__ */ jsxDEV("dt", { children: text("schema_created") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 49,
            columnNumber: 34
          }),
          /* @__PURE__ */ jsxDEV("dd", { children: schema.created }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 49,
            columnNumber: 67
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
          lineNumber: 49,
          columnNumber: 9
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "sm-fact", children: [
          /* @__PURE__ */ jsxDEV("dt", { children: text("schema_modified") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 50,
            columnNumber: 34
          }),
          /* @__PURE__ */ jsxDEV("dd", { children: schema.modified }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 50,
            columnNumber: 68
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
          lineNumber: 50,
          columnNumber: 9
        }),
        !isHistory && /* @__PURE__ */ jsxDEV("div", { className: "sm-fact", children: [
          /* @__PURE__ */ jsxDEV("dt", { children: text("schema_enabled") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 52,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("dd", { children: /* @__PURE__ */ jsxDEV("span", { className: `sm-badge tone-${schema.enabled ? "success" : "secondary"}`, children: text(schema.enabled ? "core_yes" : "core_no") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 54,
            columnNumber: 17
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
            lineNumber: 53,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
          lineNumber: 51,
          columnNumber: 24
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
        lineNumber: 46,
        columnNumber: 5
      })
    ]
  },
  void 0,
  true,
  {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/DetailsPanel.tsx",
    lineNumber: 27,
    columnNumber: 105
  }
), "DetailsPanel");
var DetailsPanel_default = DetailsPanel;
export {
  DetailsPanel_default as default
};
//# sourceMappingURL=DetailsPanel.dev.js.map
