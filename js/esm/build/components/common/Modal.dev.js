var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * A window over the page, in a dialog of the browser: it takes the focus, closes with Escape or with its button and returns the focus to
 * where the person was.
 *
 * @module     local_servicemanager/components/common/Modal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useEffect, useRef } from "react";
import Icon from "./Icon";
const Modal = /* @__PURE__ */ __name(({ open, title, onClose, closeLabel, children, footer }) => {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) {
      return;
    }
    if (open && !element.open) {
      element.showModal();
    } else if (!open && element.open) {
      element.close();
    }
  }, [open]);
  return /* @__PURE__ */ jsxDEV("dialog", { ref: dialog, className: "sm-dialog", onCancel: (event) => {
    event.preventDefault();
    onClose();
  }, onClick: (event) => {
    if (event.target === dialog.current) {
      onClose();
    }
  }, children: /* @__PURE__ */ jsxDEV("div", { className: "sm-dialog-body", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "d-flex align-items-start justify-content-between mb-3", children: [
      /* @__PURE__ */ jsxDEV("h5", { className: "mb-0", children: title }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
        lineNumber: 51,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-sm btn-link text-body-secondary", onClick: onClose, title: closeLabel, children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "xmark" }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
          lineNumber: 53,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: closeLabel }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
          lineNumber: 53,
          columnNumber: 42
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
        lineNumber: 52,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
      lineNumber: 50,
      columnNumber: 13
    }),
    children,
    footer && /* @__PURE__ */ jsxDEV("div", { className: "d-flex justify-content-end sm-actions-row mt-3", children: footer }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
      lineNumber: 57,
      columnNumber: 24
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
    lineNumber: 49,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
    lineNumber: 40,
    columnNumber: 12
  });
}, "Modal");
var Modal_default = Modal;
export {
  Modal_default as default
};
//# sourceMappingURL=Modal.dev.js.map
