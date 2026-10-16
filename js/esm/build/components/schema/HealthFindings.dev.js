var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a health check found, one thing under another, each with the icon of the status of the check and what it is about in
 * bold.
 *
 * @module     local_servicemanager/components/schema/HealthFindings
 * @copyright  2026 Didactika.org
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
const HealthFindings = /* @__PURE__ */ __name(({ check }) => /* @__PURE__ */ jsxDEV("ul", { className: `sm-health-findings tone-${check.tone}`, children: check.findings.map((finding, index) => /* @__PURE__ */ jsxDEV("li", { children: [
  /* @__PURE__ */ jsxDEV(Icon, { name: check.icon }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthFindings.tsx",
    lineNumber: 22,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("span", { children: [
    finding.label && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("strong", { children: finding.label }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthFindings.tsx",
        lineNumber: 23,
        columnNumber: 35
      }),
      " "
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthFindings.tsx",
      lineNumber: 23,
      columnNumber: 33
    }),
    finding.text
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthFindings.tsx",
    lineNumber: 23,
    columnNumber: 9
  })
] }, index, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthFindings.tsx",
  lineNumber: 21,
  columnNumber: 45
})) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/schema/HealthFindings.tsx",
  lineNumber: 20,
  columnNumber: 58
}), "HealthFindings");
var HealthFindings_default = HealthFindings;
export {
  HealthFindings_default as default
};
//# sourceMappingURL=HealthFindings.dev.js.map
