var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The token that was just generated, which is shown once.
 *
 * @module     local_servicemanager/components/schema/TokenAlert
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import CopyButton from "../common/CopyButton";
import Icon from "../common/Icon";
const TokenAlert = /* @__PURE__ */ __name(({ token, text }) => /* @__PURE__ */ jsxDEV("div", { className: "alert alert-success mb-4", role: "alert", "data-region": "new-token", children: [
  /* @__PURE__ */ jsxDEV("h4", { className: "alert-heading", children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: "key", gap: true }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/TokenAlert.tsx",
      lineNumber: 22,
      columnNumber: 35
    }),
    text("token_generated")
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/TokenAlert.tsx",
    lineNumber: 22,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("p", { className: "mb-3", children: text("token_copy_warning") }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/TokenAlert.tsx",
    lineNumber: 23,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("hr", {}, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/TokenAlert.tsx",
    lineNumber: 24,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "input-group", children: [
    /* @__PURE__ */ jsxDEV(
      "input",
      {
        type: "text",
        className: "form-control font-monospace",
        value: token,
        readOnly: true,
        id: "new-token-value",
        onFocus: (event) => event.currentTarget.select(),
        "aria-label": text("current_token")
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/TokenAlert.tsx",
        lineNumber: 26,
        columnNumber: 9
      }
    ),
    /* @__PURE__ */ jsxDEV(CopyButton, { value: token, text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/TokenAlert.tsx",
      lineNumber: 35,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/TokenAlert.tsx",
    lineNumber: 25,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/schema/TokenAlert.tsx",
  lineNumber: 21,
  columnNumber: 56
}), "TokenAlert");
var TokenAlert_default = TokenAlert;
export {
  TokenAlert_default as default
};
//# sourceMappingURL=TokenAlert.dev.js.map
