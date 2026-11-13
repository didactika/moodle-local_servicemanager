var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The summary at the top of the dashboard: how many schemas there are and how healthy they are, and whether the web services of the
 * site work. A person who can change the configuration of the site turns the web services and each protocol on or off from here;
 * the change is written as the administration writes it, so it is kept in the log of the configuration.
 *
 * @module     local_servicemanager/components/dashboard/Summary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useState } from "react";
import { postForm } from "../../engine/post";
import { Dialog, Icon } from "../../ds/ui";
const HEALTH = [
  { key: "healthy", tone: "success", icon: "i/valid" },
  { key: "warning", tone: "warning", icon: "i/warning" },
  { key: "critical", tone: "danger", icon: "i/invalid" }
];
const LEVELS = { disabled: "danger", warning: "warning", operational: "success" };
const Summary = /* @__PURE__ */ __name(({ counts, ws, sesskey, text }) => {
  const [asking, setAsking] = useState(false);
  const total = HEALTH.reduce((sum, part) => sum + (counts[part.key] ?? 0), 0);
  const change = /* @__PURE__ */ __name((fields) => postForm(ws.toggleUrl, { sesskey, returnurl: ws.returnUrl, ...fields }), "change");
  return /* @__PURE__ */ jsxDEV("div", { className: "card", "data-region": "summary", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "card-body d-grid gap-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "mb-0", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "fs-3 fw-bold me-1", children: total }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 43,
            columnNumber: 37
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "text-muted", children: text(total === 1 ? "tile_schema" : "tile_schemas") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 44,
            columnNumber: 21
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 43,
          columnNumber: 17
        }),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "progress flex-grow-1",
            role: "img",
            "aria-label": HEALTH.map((part) => `${counts[part.key] ?? 0} ${text(`status_${part.key}`)}`).join(", "),
            children: HEALTH.map((part) => (counts[part.key] ?? 0) > 0 && /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `progress-bar bg-${part.tone}`,
                style: { width: `${100 * (counts[part.key] ?? 0) / Math.max(1, total)}%` }
              },
              part.key,
              false,
              {
                fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
                lineNumber: 47,
                columnNumber: 74
              }
            ))
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 45,
            columnNumber: 17
          }
        ),
        /* @__PURE__ */ jsxDEV("ul", { className: "list-inline mb-0", children: HEALTH.map((part) => /* @__PURE__ */ jsxDEV("li", { className: "list-inline-item", children: /* @__PURE__ */ jsxDEV("span", { className: `badge badge-soft rounded-pill text-bg-${part.tone}`, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: part.icon, text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 53,
            columnNumber: 29
          }),
          " ",
          counts[part.key] ?? 0,
          " ",
          text(`status_${part.key}`)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 52,
          columnNumber: 25
        }) }, part.key, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 51,
          columnNumber: 43
        })) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 50,
          columnNumber: 17
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
        lineNumber: 42,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center gap-3 border-top pt-3", "data-region": "ws-status", children: [
        /* @__PURE__ */ jsxDEV("span", { className: `badge badge-soft badge-dot rounded-pill text-bg-${LEVELS[ws.level]}`, children: [
          text("tile_services"),
          ": ",
          text(`ws_status_${ws.level}`)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 59,
          columnNumber: 17
        }),
        ws.protocols.map((protocol) => /* @__PURE__ */ jsxDEV("div", { className: "form-check form-switch mb-0", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              className: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: `lsm-protocol-${protocol.key}`,
              checked: protocol.on,
              disabled: !ws.canConfigure,
              onChange: () => change({ protocol: protocol.key, enable: protocol.on ? 0 : 1 })
            },
            void 0,
            false,
            {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
              lineNumber: 63,
              columnNumber: 21
            }
          ),
          /* @__PURE__ */ jsxDEV("label", { className: "form-check-label", htmlFor: `lsm-protocol-${protocol.key}`, children: protocol.name }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 66,
            columnNumber: 21
          })
        ] }, protocol.key, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 62,
          columnNumber: 49
        })),
        ws.canConfigure && /* @__PURE__ */ jsxDEV("div", { className: "ms-auto d-flex flex-wrap gap-2", children: [
          ws.enabled ? /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-outline-danger btn-sm", onClick: () => setAsking(true), children: text("ws_disable_services") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 70,
            columnNumber: 27
          }) : /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-primary btn-sm", onClick: () => change({ enable: 1 }), children: text("ws_enable_services") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 73,
            columnNumber: 27
          }),
          ws.protocolsUrl && /* @__PURE__ */ jsxDEV("a", { href: ws.protocolsUrl, className: "btn btn-outline-secondary btn-sm", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "i/settings", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
              lineNumber: 77,
              columnNumber: 25
            }),
            " ",
            text("tile_manage")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 76,
            columnNumber: 41
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 68,
          columnNumber: 37
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
        lineNumber: 58,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
      lineNumber: 41,
      columnNumber: 9
    }),
    asking && /* @__PURE__ */ jsxDEV(
      Dialog,
      {
        title: text("ws_disable_services"),
        onClose: () => setAsking(false),
        text,
        footer: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-secondary", onClick: () => setAsking(false), children: text("core_cancel") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 84,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-danger", onClick: () => change({ enable: 0 }), children: text("ws_disable_services") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 85,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 83,
          columnNumber: 21
        }),
        children: /* @__PURE__ */ jsxDEV("p", { className: "mb-0", children: text("ws_disable_confirm") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 87,
          columnNumber: 13
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
        lineNumber: 82,
        columnNumber: 20
      }
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
    lineNumber: 40,
    columnNumber: 12
  });
}, "Summary");
var Summary_default = Summary;
export {
  HEALTH,
  Summary_default as default
};
//# sourceMappingURL=Summary.dev.js.map
