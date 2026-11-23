var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The summary at the top of the dashboard: how many schemas there are and how healthy they are, and whether the web services of the
 * site work. A person who can change the configuration of the site turns the web services and each protocol on or off from here,
 * without reloading the page; the change is written as the administration writes it, so it is kept in the log of the configuration.
 *
 * @module     local_servicemanager/components/dashboard/Summary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useState } from "react";
import { setWebServices } from "../../services/api";
import { addToast } from "../../engine/toast";
import { Dialog, Icon } from "../../ds/ui";
const HEALTH = [
  { key: "healthy", tone: "success", icon: "i/valid" },
  { key: "warning", tone: "warning", icon: "i/warning" },
  { key: "critical", tone: "danger", icon: "i/invalid" }
];
const LEVELS = { disabled: "danger", warning: "warning", operational: "success" };
const Summary = /* @__PURE__ */ __name(({ counts, ws: initial, text }) => {
  const [asking, setAsking] = useState(false);
  const [ws, setWs] = useState(initial);
  const [busy, setBusy] = useState(false);
  const total = HEALTH.reduce((sum, part) => sum + (counts[part.key] ?? 0), 0);
  const change = /* @__PURE__ */ __name(async (enable, protocol = "") => {
    setBusy(true);
    try {
      const { message, ...status } = await setWebServices(enable, protocol);
      setWs((before) => ({ ...before, ...status }));
      setAsking(false);
      await addToast(message, { type: "success" });
    } catch (error) {
      await addToast(String(error?.message ?? error), { type: "danger" });
    } finally {
      setBusy(false);
    }
  }, "change");
  return /* @__PURE__ */ jsxDEV("div", { className: "card", "data-region": "summary", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "card-body d-grid gap-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "mb-0", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "fs-3 fw-bold me-1", children: total }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 59,
            columnNumber: 37
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "text-muted", children: text(total === 1 ? "tile_schema" : "tile_schemas") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 60,
            columnNumber: 21
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 59,
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
                lineNumber: 63,
                columnNumber: 74
              }
            ))
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 61,
            columnNumber: 17
          }
        ),
        /* @__PURE__ */ jsxDEV("ul", { className: "list-inline mb-0", children: HEALTH.map((part) => /* @__PURE__ */ jsxDEV("li", { className: "list-inline-item", children: /* @__PURE__ */ jsxDEV("span", { className: `badge badge-soft rounded-pill text-bg-${part.tone}`, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: part.icon, text }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 69,
            columnNumber: 29
          }),
          " ",
          counts[part.key] ?? 0,
          " ",
          text(`status_${part.key}`)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 68,
          columnNumber: 25
        }) }, part.key, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 67,
          columnNumber: 43
        })) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 66,
          columnNumber: 17
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
        lineNumber: 58,
        columnNumber: 13
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center gap-2 border-top pt-3", "data-region": "ws-status", children: [
        /* @__PURE__ */ jsxDEV("span", { className: `badge badge-soft badge-dot rounded-pill text-bg-${LEVELS[ws.level]} me-1`, children: [
          text("tile_services"),
          ": ",
          text(`ws_status_${ws.level}`)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 75,
          columnNumber: 17
        }),
        ws.protocols.map((protocol) => ws.canConfigure ? /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            "aria-pressed": protocol.on,
            className: `btn btn-sm btn-tonal rounded-pill btn-${protocol.on ? "success" : "secondary"}`,
            title: text(protocol.on ? "ws_protocol_turn_off" : "ws_protocol_turn_on", protocol.name),
            disabled: busy,
            onClick: () => void change(!protocol.on, protocol.key),
            children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: protocol.on ? "i/checkedcircle" : "i/uncheckedcircle", text }, void 0, false, {
                fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
                lineNumber: 83,
                columnNumber: 25
              }),
              " ",
              protocol.name
            ]
          },
          protocol.key,
          true,
          {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 79,
            columnNumber: 23
          }
        ) : /* @__PURE__ */ jsxDEV("span", { className: `badge badge-outline rounded-pill text-bg-${protocol.on ? "success" : "secondary"}`, children: [
          protocol.name,
          /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: [
            " ",
            text(protocol.on ? "ws_enabled_label" : "ws_disabled_label")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 86,
            columnNumber: 40
          })
        ] }, protocol.key, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 85,
          columnNumber: 23
        })),
        ws.canConfigure && /* @__PURE__ */ jsxDEV("div", { className: "ms-auto d-flex flex-wrap gap-2", children: [
          ws.enabled ? /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-sm btn-tonal btn-secondary rounded-pill", onClick: () => setAsking(true), children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "power", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
              lineNumber: 91,
              columnNumber: 29
            }),
            " ",
            text("ws_disable_services")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 90,
            columnNumber: 27
          }) : /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-sm btn-primary rounded-pill", disabled: busy, onClick: () => void change(true), children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "power", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
              lineNumber: 94,
              columnNumber: 29
            }),
            " ",
            text("ws_enable_services")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 93,
            columnNumber: 27
          }),
          ws.protocolsUrl && /* @__PURE__ */ jsxDEV("a", { href: ws.protocolsUrl, className: "btn btn-sm btn-tonal btn-secondary rounded-pill", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "i/settings", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
              lineNumber: 97,
              columnNumber: 25
            }),
            " ",
            text("tile_manage")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 96,
            columnNumber: 41
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 88,
          columnNumber: 37
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
        lineNumber: 74,
        columnNumber: 13
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
      lineNumber: 57,
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
            lineNumber: 104,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-danger", disabled: busy, onClick: () => void change(false), children: text("ws_disable_services") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
            lineNumber: 105,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 103,
          columnNumber: 21
        }),
        children: /* @__PURE__ */ jsxDEV("p", { className: "mb-0", children: text("ws_disable_confirm") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
          lineNumber: 107,
          columnNumber: 13
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
        lineNumber: 102,
        columnNumber: 20
      }
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/Summary.tsx",
    lineNumber: 56,
    columnNumber: 12
  });
}, "Summary");
var Summary_default = Summary;
export {
  HEALTH,
  Summary_default as default
};
//# sourceMappingURL=Summary.dev.js.map
