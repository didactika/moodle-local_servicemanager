var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * An icon of Moodle, asked for by its id and drawn by the server with the icon map of the theme, so a theme (or Icon Restyle)
 * changes it like every other icon of the site. The components name the icons by what they show; each name is the icon of Moodle
 * that shows it or, where Moodle has none, an icon of the plugin that lib.php maps to Font Awesome.
 *
 * @module     local_servicemanager/components/common/Icon
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const ICON_IDS = {
  "angle-left": "i/previous",
  "angle-right": "i/next",
  "arrow-left": "t/left",
  "arrow-right": "t/right",
  "arrows-rotate": "i/reload",
  "bars": "i/menubars",
  "book": "docs",
  "check": "i/checked",
  "chevron-down": "t/expanded",
  "chevron-right": "t/collapsed",
  "chevron-up": "t/up",
  "circle-check": "i/valid",
  "circle-exclamation": "i/warning",
  "circle-info": "i/info",
  "circle-xmark": "i/invalid",
  "clock": "i/scheduled",
  "clock-rotate-left": "history",
  "code": "code",
  "code-branch": "branch",
  "code-compare": "compare",
  "copy": "t/copy",
  "download": "t/download",
  "ellipsis": "i/moremenu",
  "eye": "view",
  "file-arrow-down": "t/download",
  "file-import": "i/import",
  "filter": "i/filter",
  "filter-circle-xmark": "i/filter",
  "fingerprint": "fingerprint",
  "forward": "t/right",
  "gear": "i/settings",
  "heart-pulse": "health",
  "key": "key",
  "magnifying-glass": "a/search",
  "minus": "t/less",
  "pen": "t/edit",
  "pen-to-square": "t/edit",
  "plug": "plug",
  "plug-circle-check": "plug",
  "plug-circle-exclamation": "plug",
  "plug-circle-xmark": "plug",
  "plus": "t/add",
  "power-off": "power",
  "puzzle-piece": "plugin",
  "rotate": "i/reload",
  "rotate-left": "t/reset",
  "rotate-right": "i/reload",
  "server": "server",
  "shield-halved": "i/permissions",
  "spinner": "i/loading",
  "table-columns": "columns",
  "table-list": "list",
  "toggle-off": "t/hide",
  "toggle-on": "t/show",
  "trash": "t/delete",
  "triangle-exclamation": "i/warning",
  "user": "i/user",
  "user-shield": "i/permissions",
  "xmark": "e/cancel"
};
let drawn = {};
const registerIcons = /* @__PURE__ */ __name((strings) => {
  drawn = strings;
}, "registerIcons");
const Icon = /* @__PURE__ */ __name(({ name, gap = false, className = "" }) => {
  const html = drawn[`pix:${ICON_IDS[name] ?? name}`];
  const classes = `d-inline-flex${gap ? " me-1" : ""}${className ? ` ${className}` : ""}`;
  return html ? /* @__PURE__ */ jsxDEV("span", { className: classes, "aria-hidden": "true", dangerouslySetInnerHTML: { __html: html } }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Icon.tsx",
    lineNumber: 103,
    columnNumber: 11
  }) : /* @__PURE__ */ jsxDEV("span", { className: classes, "aria-hidden": "true" }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Icon.tsx",
    lineNumber: 104,
    columnNumber: 11
  });
}, "Icon");
var Icon_default = Icon;
export {
  ICON_IDS,
  Icon_default as default,
  registerIcons
};
//# sourceMappingURL=Icon.dev.js.map
