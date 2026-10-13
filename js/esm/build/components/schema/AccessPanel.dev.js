var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * What the consumer of a schema gets and what it needs: the token, the files it may move, the plugins it requires and the extra capabilities.
 *
 * @module     local_servicemanager/components/schema/AccessPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import ChipList from "../common/ChipList";
import CopyButton from "../common/CopyButton";
import Icon from "../common/Icon";
import IconButton from "../common/IconButton";
import Panel from "../common/Panel";
const AccessPanel = /* @__PURE__ */ __name(({ props, freshToken, busy, onMakeToken, text }) => {
  const { requirements, extraCapabilities, schema, isHistory, canManage } = props;
  const file = /* @__PURE__ */ __name((on, icon, label, title) => /* @__PURE__ */ jsxDEV("span", { className: `badge text-bg-${on ? "success" : "secondary"}`, title, children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: icon, gap: true }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
      lineNumber: 31,
      columnNumber: 9
    }),
    label
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
    lineNumber: 30,
    columnNumber: 79
  }), "file");
  return /* @__PURE__ */ jsxDEV(Panel, { title: text("guided_access"), icon: "shield-halved", region: "access", children: /* @__PURE__ */ jsxDEV("dl", { className: "sm-facts mb-0", children: [
    !isHistory && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("dt", { children: text("tile_token") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 37,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("dd", { children: [
        /* @__PURE__ */ jsxDEV("span", { className: `badge text-bg-${schema.hasToken ? "success" : "secondary"}`, children: text(schema.hasToken ? "token_active" : "token_none") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
          lineNumber: 39,
          columnNumber: 21
        }),
        canManage && /* @__PURE__ */ jsxDEV("span", { className: "ms-2", children: /* @__PURE__ */ jsxDEV(
          IconButton,
          {
            icon: schema.hasToken ? "rotate" : "key",
            label: text(schema.hasToken ? "action_regenerate_token" : "action_generate_token"),
            onClick: onMakeToken,
            disabled: busy
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
            lineNumber: 41,
            columnNumber: 25
          }
        ) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
          lineNumber: 40,
          columnNumber: 35
        }),
        freshToken && /* @__PURE__ */ jsxDEV("div", { className: "sm-fresh-token", "data-region": "fresh-token", children: [
          /* @__PURE__ */ jsxDEV("code", { className: "sm-token-value", children: freshToken }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
            lineNumber: 49,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV(CopyButton, { value: freshToken, text, compact: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
            lineNumber: 50,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "small text-body-secondary", children: text("token_shown_once") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
            lineNumber: 51,
            columnNumber: 25
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
          lineNumber: 48,
          columnNumber: 36
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 38,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("dt", { children: text("req_file_access") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 54,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("dd", { className: "d-flex flex-wrap sm-badges-row", children: [
        file(requirements.downloadFiles, "download", text("req_download_files"), text(requirements.downloadFiles ? "req_download_files_enabled" : "req_download_files_disabled")),
        file(requirements.uploadFiles, "upload", text("req_upload_files"), text(requirements.uploadFiles ? "req_upload_files_enabled" : "req_upload_files_disabled"))
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 55,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
      lineNumber: 36,
      columnNumber: 28
    }),
    requirements.plugins.length > 0 && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("dt", { children: text("req_plugins") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 61,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("dd", { children: requirements.plugins.map((plugin) => /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("span", { className: plugin.installed ? "text-success" : "text-warning", children: /* @__PURE__ */ jsxDEV(Icon, { name: plugin.installed ? "circle-check" : "triangle-exclamation", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
          lineNumber: 65,
          columnNumber: 29
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
          lineNumber: 64,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "sm-fn", children: plugin.name }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
          lineNumber: 67,
          columnNumber: 25
        }),
        !plugin.installed && /* @__PURE__ */ jsxDEV("small", { className: "text-body-secondary ms-1", children: text("function_missing") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
          lineNumber: 68,
          columnNumber: 47
        })
      ] }, plugin.name, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 63,
        columnNumber: 59
      })) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 62,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
      lineNumber: 60,
      columnNumber: 49
    }),
    extraCapabilities.length > 0 && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("dt", { className: "sm-fact-wide", children: text("extra_capabilities") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 73,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("dd", { className: "sm-fact-wide", children: /* @__PURE__ */ jsxDEV(
        ChipList,
        {
          title: text("extra_capabilities"),
          names: extraCapabilities,
          text,
          chip: (capability) => {
            const [plugin, name] = capability.split(":");
            return /* @__PURE__ */ jsxDEV("code", { className: "sm-code-chip", title: capability, children: [
              /* @__PURE__ */ jsxDEV("span", { className: "sm-code-chip-plugin", children: plugin }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
                lineNumber: 82,
                columnNumber: 33
              }),
              name !== void 0 && /* @__PURE__ */ jsxDEV("span", { children: [
                ":",
                name
              ] }, void 0, true, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
                lineNumber: 82,
                columnNumber: 109
              })
            ] }, capability, true, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
              lineNumber: 81,
              columnNumber: 36
            });
          }
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
          lineNumber: 75,
          columnNumber: 21
        }
      ) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
        lineNumber: 74,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
      lineNumber: 72,
      columnNumber: 46
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
    lineNumber: 35,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/AccessPanel.tsx",
    lineNumber: 34,
    columnNumber: 12
  });
}, "AccessPanel");
var AccessPanel_default = AccessPanel;
export {
  AccessPanel_default as default
};
//# sourceMappingURL=AccessPanel.dev.js.map
