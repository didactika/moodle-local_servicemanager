var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Catches an error of the page, so a mistake in one part leaves a message with a way out instead of a blank page.
 *
 * @module     local_servicemanager/components/common/ErrorBoundary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { Component } from "react";
import Icon from "./Icon";
class ErrorBoundary extends Component {
  static {
    __name(this, "ErrorBoundary");
  }
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error, info) {
    window.console.error("local_servicemanager", error, info.componentStack);
  }
  render() {
    if (!this.state.failed) {
      return this.props.children;
    }
    const { strings } = this.props;
    return /* @__PURE__ */ jsxDEV("div", { className: "alert alert-danger d-flex align-items-start", role: "alert", "data-region": "page-error", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "sm-icon-gap", children: /* @__PURE__ */ jsxDEV(Icon, { name: "circle-exclamation" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ErrorBoundary.tsx",
        lineNumber: 43,
        columnNumber: 43
      }, this) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ErrorBoundary.tsx",
        lineNumber: 43,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h5", { className: "alert-heading", children: strings.error_page_title }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/ErrorBoundary.tsx",
          lineNumber: 45,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "mb-2", children: strings.error_page_text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/ErrorBoundary.tsx",
          lineNumber: 46,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-sm btn-outline-danger", onClick: () => window.location.reload(), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "rotate", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ErrorBoundary.tsx",
            lineNumber: 48,
            columnNumber: 21
          }, this),
          strings.error_page_reload
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/ErrorBoundary.tsx",
          lineNumber: 47,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ErrorBoundary.tsx",
        lineNumber: 44,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ErrorBoundary.tsx",
      lineNumber: 42,
      columnNumber: 16
    }, this);
  }
}
var ErrorBoundary_default = ErrorBoundary;
export {
  ErrorBoundary_default as default
};
//# sourceMappingURL=ErrorBoundary.dev.js.map
