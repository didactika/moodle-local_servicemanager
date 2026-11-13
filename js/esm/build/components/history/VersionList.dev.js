var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The versions of a schema, as every table of the design system: a check to choose the two to compare, the version, who made it
 * and when, why, and at the end the round icon buttons of the row; the YAML of a version opens in a dialog.
 *
 * @module     local_servicemanager/components/history/VersionList
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useRef, useState } from "react";
import { Dialog, useStableColumns } from "../../ds/ui";
import { getVersionYaml } from "../../services/api";
import CopyButton from "../common/CopyButton";
import Icon from "../common/Icon";
import IconButton from "../common/IconButton";
const VersionList = /* @__PURE__ */ __name(({ rows, chosen, onToggle, onRollback, text }) => {
  const [opened, setOpened] = useState(null);
  const table = useRef(null);
  useStableColumns(table, rows.length > 0);
  const openYaml = /* @__PURE__ */ __name((row) => {
    setOpened({ row });
    getVersionYaml(row.id).then((yaml) => {
      setOpened({ row, yaml });
      return yaml;
    }).catch(() => setOpened({ row, error: true }));
  }, "openYaml");
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("table", { ref: table, className: "table", "data-region": "versions", children: [
      /* @__PURE__ */ jsxDEV("caption", { className: "visually-hidden", children: text("version_history") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 47,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "table-select", children: /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("compare_select") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 50,
          columnNumber: 62
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 50,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", children: text("version") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 51,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", children: text("history_by") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 52,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "d-none d-md-table-cell", children: text("history_reason") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 53,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("th", { scope: "col", className: "table-actions", children: /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("core_actions") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 54,
          columnNumber: 63
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 54,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 49,
        columnNumber: 17
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 48,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxDEV("tr", { className: chosen.has(row.id) ? "table-active" : void 0, "data-region": "version", children: [
        /* @__PURE__ */ jsxDEV("td", { className: "table-select", children: /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "checkbox",
            className: "form-check-input",
            checked: chosen.has(row.id),
            onChange: () => onToggle(row.id),
            "aria-label": `${text("compare_select")} ${row.version}`
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 60,
            columnNumber: 25
          }
        ) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 59,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("td", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "fw-semibold", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "code-branch", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
              lineNumber: 64,
              columnNumber: 55
            }),
            row.version
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 64,
            columnNumber: 25
          }),
          row.isCurrent && /* @__PURE__ */ jsxDEV("span", { className: "badge badge-soft rounded-pill text-bg-success ms-2", children: text("current") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 65,
            columnNumber: 43
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 63,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { className: "d-flex align-items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("img", { src: row.userPicture, alt: "", width: 24, height: 24, className: "rounded-circle", loading: "lazy" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 69,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "d-flex flex-column", children: [
            row.userName,
            /* @__PURE__ */ jsxDEV("small", { className: "text-muted", children: row.date }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
              lineNumber: 72,
              columnNumber: 33
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 70,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 68,
          columnNumber: 25
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 67,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "d-none d-md-table-cell", children: /* @__PURE__ */ jsxDEV("span", { className: "text-truncate d-block", title: row.reason, children: row.reason }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 76,
          columnNumber: 60
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 76,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "table-actions", children: [
          /* @__PURE__ */ jsxDEV(IconButton, { icon: "code", label: text("view_yaml"), onClick: () => openYaml(row) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 78,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV(IconButton, { icon: "eye", label: text("action_view"), href: row.viewUrl, tone: "primary" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 79,
            columnNumber: 25
          }),
          row.canRollback && /* @__PURE__ */ jsxDEV(IconButton, { icon: "rotate-left", label: text("rollback"), onClick: () => onRollback(row), tone: "warning" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 80,
            columnNumber: 45
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 77,
          columnNumber: 21
        })
      ] }, row.id, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 58,
        columnNumber: 36
      })) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 57,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
      lineNumber: 46,
      columnNumber: 9
    }),
    opened && /* @__PURE__ */ jsxDEV(
      Dialog,
      {
        title: `${text("view_yaml")} \xB7 ${opened.row.version}`,
        onClose: () => setOpened(null),
        text,
        footer: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          opened.yaml !== void 0 && /* @__PURE__ */ jsxDEV(CopyButton, { value: opened.yaml, text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 87,
            columnNumber: 47
          }),
          /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-secondary", onClick: () => setOpened(null), children: text("core_closebuttontitle") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 88,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
          lineNumber: 86,
          columnNumber: 21
        }),
        children: [
          opened.error && /* @__PURE__ */ jsxDEV("p", { className: "text-danger mb-0", role: "alert", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "circle-exclamation", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
              lineNumber: 90,
              columnNumber: 75
            }),
            text("version_yaml_failed")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 90,
            columnNumber: 30
          }),
          !opened.error && opened.yaml === void 0 && /* @__PURE__ */ jsxDEV("p", { className: "text-muted mb-0", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "spinner", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
              lineNumber: 91,
              columnNumber: 91
            }),
            text("loading")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 91,
            columnNumber: 60
          }),
          opened.yaml !== void 0 && /* @__PURE__ */ jsxDEV("pre", { className: "bg-body-tertiary border rounded p-3 small mb-0", children: /* @__PURE__ */ jsxDEV("code", { children: opened.yaml }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 92,
            columnNumber: 107
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
            lineNumber: 92,
            columnNumber: 43
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/history/VersionList.tsx",
        lineNumber: 85,
        columnNumber: 20
      }
    )
  ] }, void 0, true, {
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
