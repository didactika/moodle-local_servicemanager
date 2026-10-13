var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * A figure with its label: how many schemas there are, how many are healthy, whether the web services work.
 *
 * It is a link when the figure leads somewhere, such as the list of the schemas that it counts.
 *
 * @module     local_servicemanager/components/common/StatTile
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const StatTile = /* @__PURE__ */ __name(({ label, value, tone = "secondary", icon, hint, href, active = false }) => {
  const body = /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-center justify-content-between", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-body-secondary small text-uppercase sm-tile-label", children: label }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
        lineNumber: 32,
        columnNumber: 13
      }),
      icon && /* @__PURE__ */ jsxDEV("span", { className: `sm-tile-icon text-${tone}`, children: /* @__PURE__ */ jsxDEV(Icon, { name: icon }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
        lineNumber: 33,
        columnNumber: 68
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
        lineNumber: 33,
        columnNumber: 22
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
      lineNumber: 31,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV("div", { className: `sm-tile-value text-${tone === "secondary" ? "body" : tone}`, children: value }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
      lineNumber: 35,
      columnNumber: 9
    }),
    hint && /* @__PURE__ */ jsxDEV("div", { className: "text-body-secondary small", children: hint }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
      lineNumber: 36,
      columnNumber: 18
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
    lineNumber: 30,
    columnNumber: 18
  });
  const classes = `card sm-tile${active ? " sm-tile-active" : ""}`;
  return href ? /* @__PURE__ */ jsxDEV("a", { href, className: `${classes} text-decoration-none sm-tile-link`, "aria-current": active ? "true" : void 0, children: /* @__PURE__ */ jsxDEV("div", { className: "card-body", children: body }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
    lineNumber: 41,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
    lineNumber: 40,
    columnNumber: 11
  }) : /* @__PURE__ */ jsxDEV("div", { className: classes, children: /* @__PURE__ */ jsxDEV("div", { className: "card-body", children: body }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
    lineNumber: 43,
    columnNumber: 36
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/StatTile.tsx",
    lineNumber: 43,
    columnNumber: 11
  });
}, "StatTile");
var StatTile_default = StatTile;
export {
  StatTile_default as default
};
//# sourceMappingURL=StatTile.dev.js.map
