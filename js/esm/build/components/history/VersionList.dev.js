var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The versions of a schema, one row each: who made it and when, what the change was for and what can be done with it. The YAML of a
 * version opens under its row when it is asked for.
 *
 * @module     local_servicemanager/components/history/VersionList
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useState } from "react";
import { getVersionYaml } from "../../services/api";
import CopyButton from "../common/CopyButton";
import Icon from "../common/Icon";
import IconButton from "../common/IconButton";
const VersionList = /* @__PURE__ */ __name(({ rows, chosen, onToggle, onRollback, text }) => {
  const [opened, setOpened] = useState({});
  const toggleYaml = /* @__PURE__ */ __name((id) => {
    if (opened[id]) {
      setOpened({ ...opened, [id]: void 0 });
      return;
    }
    setOpened({ ...opened, [id]: "loading" });
    getVersionYaml(id).then((yaml) => {
      setOpened((before) => ({ ...before, [id]: { yaml } }));
      return yaml;
    }).catch(() => setOpened((before) => ({ ...before, [id]: { error: true } })));
  }, "toggleYaml");
  return /* @__PURE__ */ jsxDEV("ul", { className: "card sm-versions", "data-region": "versions", children: rows.map((row) => {
    const open = opened[row.id];
    return /* @__PURE__ */ jsxDEV("li", { className: `sm-version${chosen.has(row.id) ? " active-version" : ""}`, "data-region": "version", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "sm-version-main", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "checkbox",
            id: `compare-${row.id}`,
            className: "form-check-input",
            checked: chosen.has(row.id),
            onChange: () => onToggle(row.id)
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 51,
            columnNumber: 21
          }
        ),
        /* @__PURE__ */ jsxDEV("label", { htmlFor: `compare-${row.id}`, className: "visually-hidden", children: [
          text("compare_select"),
          " ",
          row.version
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 58,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "sm-version-number", children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "code-branch", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 60,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: [
            text("version"),
            " "
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 60,
            columnNumber: 56
          }),
          row.version
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 59,
          columnNumber: 21
        }),
        row.isCurrent ? /* @__PURE__ */ jsxDEV("span", { className: "sm-badge tone-success", children: text("current") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 62,
          columnNumber: 38
        }) : /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 62,
          columnNumber: 105
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "sm-version-who", children: [
          /* @__PURE__ */ jsxDEV("img", { src: row.userPicture, alt: "", width: 24, height: 24, className: "rounded-circle", loading: "lazy" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 64,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "sm-version-name", children: row.userName }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 65,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "sm-version-date", children: row.date }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 66,
            columnNumber: 25
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 63,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "sm-version-reason", title: row.reason, children: row.reason }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 68,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "sm-group", role: "group", children: [
          /* @__PURE__ */ jsxDEV(
            IconButton,
            {
              icon: open && open !== "loading" ? "chevron-up" : "code",
              label: text("view_yaml"),
              onClick: () => toggleYaml(row.id)
            },
            void 0,
            false,
            {
              fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
              lineNumber: 70,
              columnNumber: 25
            }
          ),
          /* @__PURE__ */ jsxDEV(IconButton, { icon: "eye", label: text("action_view"), href: row.viewUrl, tone: "primary" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 75,
            columnNumber: 25
          }),
          row.canRollback ? /* @__PURE__ */ jsxDEV(IconButton, { icon: "rotate-left", label: text("rollback"), onClick: () => onRollback(row), tone: "warning" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 77,
            columnNumber: 31
          }) : /* @__PURE__ */ jsxDEV("span", { className: "sm-slot", "aria-hidden": "true" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 78,
            columnNumber: 31
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 69,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 50,
        columnNumber: 17
      }),
      open === "loading" && /* @__PURE__ */ jsxDEV("div", { className: "sm-version-yaml small text-body-secondary", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "spinner", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 81,
          columnNumber: 99
        }),
        text("loading")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 81,
        columnNumber: 40
      }),
      open && typeof open === "object" && "error" in open && /* @__PURE__ */ jsxDEV("div", { className: "sm-version-yaml text-danger small", role: "alert", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "circle-exclamation", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 83,
          columnNumber: 21
        }),
        text("version_yaml_failed")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 82,
        columnNumber: 73
      }),
      open && typeof open === "object" && "yaml" in open && /* @__PURE__ */ jsxDEV("div", { className: "sm-version-yaml", children: [
        /* @__PURE__ */ jsxDEV("pre", { className: "sm-yaml p-2 rounded small mb-2", children: /* @__PURE__ */ jsxDEV("code", { children: open.yaml }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 86,
          columnNumber: 69
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 86,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV(CopyButton, { value: open.yaml, text, compact: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 87,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 85,
        columnNumber: 72
      })
    ] }, row.id, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
      lineNumber: 49,
      columnNumber: 20
    });
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
    lineNumber: 46,
    columnNumber: 12
  });
}, "VersionList");
var VersionList_default = VersionList;
export {
  VersionList_default as default
};
//# sourceMappingURL=VersionList.dev.js.map
