var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A round icon button of the design system (btn-link btn-icon), as the actions of a row, or a filled one for the main
 * action; the label is its title and what assistive technology says.
 *
 * @module     local_servicemanager/components/common/IconButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const toneClass = /* @__PURE__ */ __name((tone) => tone && tone !== "secondary" ? ` text-${tone}` : "", "toneClass");
const IconButton = /* @__PURE__ */ __name(({ icon, label, href, onClick, tone = "secondary", large = false, solid = false, disabled = false }) => {
  const content = /* @__PURE__ */ jsxDEV(Icon, { name: icon }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/IconButton.tsx",
    lineNumber: 38,
    columnNumber: 21
  });
  const className = solid ? `btn btn-${tone === "secondary" ? "primary" : tone} btn-icon${large ? "" : " btn-sm"}` : `btn btn-link btn-icon${large ? "" : " btn-sm"}${toneClass(tone)}`;
  return href ? /* @__PURE__ */ jsxDEV("a", { href, className, title: label, "aria-label": label, children: content }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/IconButton.tsx",
    lineNumber: 43,
    columnNumber: 11
  }) : /* @__PURE__ */ jsxDEV("button", { type: "button", className, title: label, "aria-label": label, onClick, disabled, children: content }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/IconButton.tsx",
    lineNumber: 44,
    columnNumber: 11
  });
}, "IconButton");
var IconButton_default = IconButton;
export {
  IconButton_default as default,
  toneClass
};
//# sourceMappingURL=IconButton.dev.js.map
