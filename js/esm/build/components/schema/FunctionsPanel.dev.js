var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * The web service functions that a schema declares: what each does, whether it reads or writes, what it asks of whoever calls it
 * and whether this Moodle has it. The capabilities of a function open in a window.
 *
 * @module     local_servicemanager/components/schema/FunctionsPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo, useState } from "react";
import Icon from "../common/Icon";
import Modal from "../common/Modal";
import Panel from "../common/Panel";
import SearchBox from "../common/SearchBox";
const SEARCHABLE_FROM = 8;
const FunctionsPanel = /* @__PURE__ */ __name(({ functions, text }) => {
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState(null);
  const missing = functions.filter((fn) => !fn.exists).length;
  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return functions.filter((fn) => words.every((word) => (fn.name + " " + fn.description).toLowerCase().includes(word)));
  }, [functions, query]);
  return /* @__PURE__ */ jsxDEV(
    Panel,
    {
      title: text(functions.length === 1 ? "tile_function" : "functions"),
      icon: "code",
      count: functions.length,
      flush: true,
      region: "functions",
      actions: missing > 0 ? /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-danger", children: text("tile_functions_missing", missing) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
        lineNumber: 43,
        columnNumber: 32
      }) : void 0,
      children: [
        functions.length >= SEARCHABLE_FROM && /* @__PURE__ */ jsxDEV("div", { className: "p-3 border-bottom", children: /* @__PURE__ */ jsxDEV(SearchBox, { value: query, onChange: setQuery, placeholder: text("functions_search"), clearLabel: text("filter_clear"), id: "sm-functions-search" }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
          lineNumber: 46,
          columnNumber: 13
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
          lineNumber: 45,
          columnNumber: 49
        }),
        /* @__PURE__ */ jsxDEV("ul", { className: "list-group list-group-flush sm-functions", children: shown.map((fn) => /* @__PURE__ */ jsxDEV("li", { className: `list-group-item sm-function${fn.exists ? "" : " missing"}`, children: [
          /* @__PURE__ */ jsxDEV("span", { className: `sm-function-icon text-${fn.exists ? fn.type === "write" ? "warning" : "success" : "danger"}`, children: /* @__PURE__ */ jsxDEV(Icon, { name: fn.exists ? fn.type === "write" ? "pen" : "eye" : "circle-xmark" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
            lineNumber: 51,
            columnNumber: 21
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
            lineNumber: 50,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-grow-1 sm-function-body", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center sm-badges-row", children: [
              /* @__PURE__ */ jsxDEV("code", { children: fn.name }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 55,
                columnNumber: 25
              }),
              fn.type && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-light border", children: text("function_" + fn.type) }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 56,
                columnNumber: 37
              }),
              fn.critical && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-secondary", children: text("function_critical") }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 57,
                columnNumber: 41
              }),
              !fn.exists && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-danger", children: text("function_missing") }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 58,
                columnNumber: 40
              })
            ] }, void 0, true, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
              lineNumber: 54,
              columnNumber: 21
            }),
            fn.description && /* @__PURE__ */ jsxDEV("div", { className: "text-body-secondary small", children: fn.description }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
              lineNumber: 60,
              columnNumber: 40
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
            lineNumber: 53,
            columnNumber: 17
          }),
          fn.capabilities.length > 0 && /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              className: "btn btn-sm btn-outline-primary sm-function-caps",
              onClick: () => setViewing(fn),
              title: text("function_capabilities_view"),
              children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "shield-halved", gap: true }, void 0, false, {
                  fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                  lineNumber: 68,
                  columnNumber: 21
                }),
                text("function_capabilities", fn.capabilities.length)
              ]
            },
            void 0,
            true,
            {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
              lineNumber: 62,
              columnNumber: 48
            }
          )
        ] }, fn.name, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
          lineNumber: 49,
          columnNumber: 32
        })) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
          lineNumber: 48,
          columnNumber: 9
        }),
        shown.length === 0 && /* @__PURE__ */ jsxDEV("p", { className: "text-body-secondary text-center my-4", children: text("no_schemas_filtered") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
          lineNumber: 72,
          columnNumber: 32
        }),
        /* @__PURE__ */ jsxDEV(
          Modal,
          {
            open: viewing !== null,
            title: /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "shield-halved", gap: true }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 76,
                columnNumber: 22
              }),
              text("function_capabilities_title")
            ] }, void 0, true, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
              lineNumber: 76,
              columnNumber: 20
            }),
            onClose: () => setViewing(null),
            closeLabel: text("core_cancel"),
            children: viewing && /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "mb-2", children: /* @__PURE__ */ jsxDEV("code", { children: viewing.name }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 81,
                columnNumber: 37
              }) }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 81,
                columnNumber: 17
              }),
              viewing.description && /* @__PURE__ */ jsxDEV("p", { className: "text-body-secondary", children: viewing.description }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 82,
                columnNumber: 41
              }),
              /* @__PURE__ */ jsxDEV("p", { className: "small text-body-secondary", children: text("function_capabilities_help") }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 83,
                columnNumber: 17
              }),
              /* @__PURE__ */ jsxDEV("ul", { className: "list-group sm-caps-list", children: viewing.capabilities.map((capability) => /* @__PURE__ */ jsxDEV("li", { className: "list-group-item", children: /* @__PURE__ */ jsxDEV("code", { children: capability }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 85,
                columnNumber: 112
              }) }, capability, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 85,
                columnNumber: 63
              })) }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
                lineNumber: 84,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
              lineNumber: 80,
              columnNumber: 25
            })
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
            lineNumber: 74,
            columnNumber: 9
          }
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/FunctionsPanel.tsx",
      lineNumber: 37,
      columnNumber: 12
    }
  );
}, "FunctionsPanel");
var FunctionsPanel_default = FunctionsPanel;
export {
  FunctionsPanel_default as default
};
//# sourceMappingURL=FunctionsPanel.dev.js.map
