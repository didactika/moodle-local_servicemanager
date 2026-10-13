var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * A button or a link that is only an icon, with its name as a tooltip and for assistive technology.
 *
 * @module     local_servicemanager/components/common/IconButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
const toneClass = /* @__PURE__ */ __name((tone) => {
  const name = tone.replace(/^outline-/, "");
  return name === "secondary" ? "" : ` tone-${name}`;
}, "toneClass");
const IconButton = /* @__PURE__ */ __name(({ icon, label, href, onClick, tone = "secondary", large = false, solid = false }) => {
  const content = /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: icon }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/IconButton.tsx",
      lineNumber: 39,
      columnNumber: 23
    }),
    /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: label }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/IconButton.tsx",
      lineNumber: 39,
      columnNumber: 43
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/IconButton.tsx",
    lineNumber: 39,
    columnNumber: 21
  });
  const className = `btn sm-pill icon-only${large ? "" : " compact"}${toneClass(tone)}${solid ? " solid" : ""}`;
  return href ? /* @__PURE__ */ jsxDEV("a", { href, className, title: label, children: content }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/IconButton.tsx",
    lineNumber: 42,
    columnNumber: 11
  }) : /* @__PURE__ */ jsxDEV("button", { type: "button", className, title: label, onClick, children: content }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/IconButton.tsx",
    lineNumber: 43,
    columnNumber: 11
  });
}, "IconButton");
var IconButton_default = IconButton;
export {
  IconButton_default as default,
  toneClass
};
//# sourceMappingURL=IconButton.dev.js.map
