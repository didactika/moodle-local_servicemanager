var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The versions of a schema, newest first: who made each, when and why, and the ways to read it, compare it or go back to it.
 *
 * The YAML of a version is asked for when it is opened, not before, so a long history costs nothing until it is read.
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
const VersionList = /* @__PURE__ */ __name(({ rows, chosen, onToggle, text }) => {
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
  return /* @__PURE__ */ jsxDEV("ul", { className: "list-group sm-versions", "data-region": "versions", children: rows.map((row) => {
    const open = opened[row.id];
    return /* @__PURE__ */ jsxDEV("li", { className: `list-group-item${chosen.has(row.id) ? " active-version" : ""}`, children: /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-start sm-version-row", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "checkbox",
          id: `compare-${row.id}`,
          className: "form-check-input mt-2",
          checked: chosen.has(row.id),
          onChange: () => onToggle(row.id)
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 50,
          columnNumber: 21
        }
      ),
      /* @__PURE__ */ jsxDEV("label", { htmlFor: `compare-${row.id}`, className: "visually-hidden", children: [
        text("compare_select"),
        " ",
        row.version
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 57,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("img", { src: row.userPicture, alt: "", width: 36, height: 36, className: "rounded-circle", loading: "lazy" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 58,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-grow-1 sm-version-body", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center sm-badges-row", children: [
          /* @__PURE__ */ jsxDEV("strong", { children: [
            text("version"),
            " ",
            row.version
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 61,
            columnNumber: 29
          }),
          row.isCurrent && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-success", children: text("current") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 62,
            columnNumber: 47
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 60,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "small text-body-secondary", children: [
          row.userName,
          " \xB7 ",
          row.date
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 64,
          columnNumber: 25
        }),
        row.reason && /* @__PURE__ */ jsxDEV("div", { className: "fst-italic mt-1", children: row.reason }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 65,
          columnNumber: 40
        }),
        open === "loading" && /* @__PURE__ */ jsxDEV("div", { className: "small text-body-secondary mt-2", children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "spinner", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 66,
            columnNumber: 96
          }),
          text("loading")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 66,
          columnNumber: 48
        }),
        open && typeof open === "object" && "error" in open && /* @__PURE__ */ jsxDEV("div", { className: "text-danger small mt-2", role: "alert", children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "circle-exclamation", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 68,
            columnNumber: 29
          }),
          text("version_yaml_failed")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 67,
          columnNumber: 81
        }),
        open && typeof open === "object" && "yaml" in open && /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
          /* @__PURE__ */ jsxDEV("pre", { className: "sm-yaml p-2 rounded small mb-2", children: /* @__PURE__ */ jsxDEV("code", { children: open.yaml }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 71,
            columnNumber: 77
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 71,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV(CopyButton, { value: open.yaml, text, tone: "outline-secondary" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 72,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 70,
          columnNumber: 80
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 59,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "sm-group", role: "group", children: [
        /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn sm-pill", onClick: () => toggleYaml(row.id), "aria-expanded": Boolean(open), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "code", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 77,
            columnNumber: 29
          }),
          text("view_yaml")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 76,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("a", { href: row.viewUrl, className: "btn sm-pill icon-only compact tone-primary", title: text("action_view"), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "eye" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 80,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("action_view") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 80,
            columnNumber: 48
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 79,
          columnNumber: 25
        }),
        row.rollbackUrl && /* @__PURE__ */ jsxDEV("a", { href: row.rollbackUrl, className: "btn sm-pill tone-warning", title: text("rollback"), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "rotate-left", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 83,
            columnNumber: 29
          }),
          text("rollback")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 82,
          columnNumber: 45
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 75,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
      lineNumber: 49,
      columnNumber: 17
    }) }, row.id, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
      lineNumber: 48,
      columnNumber: 20
    });
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
    lineNumber: 45,
    columnNumber: 12
  });
}, "VersionList");
var VersionList_default = VersionList;
export {
  VersionList_default as default
};
//# sourceMappingURL=VersionList.dev.js.map
