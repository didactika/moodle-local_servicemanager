var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * Whether the web services of the site work, in a line: the state, the protocols that are on and where to change them.
 *
 * @module     local_servicemanager/components/dashboard/WsPill
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
const LEVELS = {
  disabled: { tone: "danger", label: "ws_status_disabled", icon: "plug-circle-xmark" },
  warning: { tone: "warning", label: "ws_status_warning", icon: "plug-circle-exclamation" },
  operational: { tone: "success", label: "ws_status_operational", icon: "plug-circle-check" }
};
const WsPill = /* @__PURE__ */ __name(({ status, canManage, text }) => {
  const level = LEVELS[status.level];
  return /* @__PURE__ */ jsxDEV("span", { className: "d-inline-flex flex-wrap align-items-center sm-badges-row", "data-region": "ws-status", children: [
    /* @__PURE__ */ jsxDEV("span", { className: `badge text-bg-${level.tone}`, children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: level.icon, gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/WsPill.tsx",
        lineNumber: 31,
        columnNumber: 57
      }),
      text("tile_services"),
      ": ",
      text(level.label)
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/WsPill.tsx",
      lineNumber: 31,
      columnNumber: 9
    }),
    status.protocols.map((protocol) => /* @__PURE__ */ jsxDEV(
      "span",
      {
        className: `sm-protocol ${protocol.enabled ? "on" : "off"}`,
        title: text(protocol.enabled ? "ws_enabled_label" : "ws_disabled_label"),
        children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: protocol.enabled ? "circle-check" : "circle-minus", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/WsPill.tsx",
            lineNumber: 37,
            columnNumber: 13
          }),
          protocol.name,
          /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: [
            " ",
            text(protocol.enabled ? "ws_enabled_label" : "ws_disabled_label")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/dashboard/WsPill.tsx",
            lineNumber: 38,
            columnNumber: 13
          })
        ]
      },
      protocol.name,
      true,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/WsPill.tsx",
        lineNumber: 32,
        columnNumber: 45
      }
    )),
    canManage && status.protocolsUrl && /* @__PURE__ */ jsxDEV("a", { href: status.protocolsUrl, className: "btn btn-sm btn-outline-secondary", title: text("ws_manage_protocols_link"), children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "gear", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/dashboard/WsPill.tsx",
        lineNumber: 41,
        columnNumber: 13
      }),
      text("tile_manage")
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/dashboard/WsPill.tsx",
      lineNumber: 40,
      columnNumber: 46
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/dashboard/WsPill.tsx",
    lineNumber: 30,
    columnNumber: 12
  });
}, "WsPill");
var WsPill_default = WsPill;
export {
  WsPill_default as default
};
//# sourceMappingURL=WsPill.dev.js.map
