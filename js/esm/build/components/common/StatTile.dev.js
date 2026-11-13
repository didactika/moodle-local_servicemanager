var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A figure of a page in a card: what it counts, the number in the colour of its state, and a line that explains it; it
 * opens a page when it has an address.
 *
 * @module     local_servicemanager/components/common/StatTile
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const StatTile = /* @__PURE__ */ __name(({ label, value, tone = "secondary", icon, hint, href, active = false }) => {
  const body = /* @__PURE__ */ jsxDEV("div", { className: "card-body", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-center justify-content-between gap-2", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "small text-muted text-uppercase fw-semibold", children: label }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
        lineNumber: 30,
        columnNumber: 13
      }),
      icon && /* @__PURE__ */ jsxDEV("span", { className: `text-${tone}`, children: /* @__PURE__ */ jsxDEV(Icon, { name: icon }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
        lineNumber: 31,
        columnNumber: 55
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
        lineNumber: 31,
        columnNumber: 22
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
      lineNumber: 29,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { className: `fs-4 fw-bold text-${tone === "secondary" ? "body" : tone}`, children: value }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
      lineNumber: 33,
      columnNumber: 9
    }),
    hint && /* @__PURE__ */ jsxDEV("div", { className: "small text-muted", children: hint }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
      lineNumber: 34,
      columnNumber: 18
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
    lineNumber: 28,
    columnNumber: 18
  });
  const classes = `card h-100${active ? " border-primary" : ""}`;
  return href ? /* @__PURE__ */ jsxDEV("a", { href, className: `${classes} text-decoration-none text-reset`, "aria-current": active ? "true" : void 0, children: body }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
    lineNumber: 38,
    columnNumber: 11
  }) : /* @__PURE__ */ jsxDEV("div", { className: classes, children: body }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
    lineNumber: 39,
    columnNumber: 11
  });
}, "StatTile");
var StatTile_default = StatTile;
export {
  StatTile_default as default
};
//# sourceMappingURL=StatTile.dev.js.map
