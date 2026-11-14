var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A window over the page, as Moodle and Bootstrap draw their dialogs: it takes the focus, closes with Escape, with its button or
 * with a click outside it, and gives the focus back to where the person was.
 *
 * @module     local_servicemanager/components/common/Modal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
const Modal = /* @__PURE__ */ __name(({ open, title, onClose, closeLabel, children, footer, wide = false }) => {
  const root = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) {
      return void 0;
    }
    const previous = document.activeElement;
    document.body.classList.add("modal-open");
    root.current?.focus();
    return () => {
      document.body.classList.remove("modal-open");
      previous?.focus();
    };
  }, [open]);
  if (!open) {
    return null;
  }
  return createPortal(/* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        ref: root,
        className: "modal show d-block",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": titleId,
        tabIndex: -1,
        onKeyDown: (event) => event.key === "Escape" && onClose(),
        onMouseDown: (event) => event.target === event.currentTarget && onClose(),
        children: /* @__PURE__ */ jsxDEV("div", { className: `modal-dialog modal-dialog-scrollable${wide ? " modal-lg" : ""}`, children: /* @__PURE__ */ jsxDEV("div", { className: "modal-content", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "modal-header", children: [
            /* @__PURE__ */ jsxDEV("h5", { className: "modal-title", id: titleId, children: title }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
              lineNumber: 54,
              columnNumber: 25
            }),
            /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn-close", "aria-label": closeLabel, title: closeLabel, onClick: onClose }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
              lineNumber: 55,
              columnNumber: 25
            })
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
            lineNumber: 53,
            columnNumber: 21
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "modal-body", children }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
            lineNumber: 57,
            columnNumber: 21
          }),
          footer && /* @__PURE__ */ jsxDEV("div", { className: "modal-footer", children: footer }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
            lineNumber: 58,
            columnNumber: 32
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
          lineNumber: 52,
          columnNumber: 17
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
          lineNumber: 51,
          columnNumber: 13
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
        lineNumber: 48,
        columnNumber: 9
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "modal-backdrop show" }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
      lineNumber: 62,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/Modal.tsx",
    lineNumber: 47,
    columnNumber: 25
  }), document.body);
}, "Modal");
var Modal_default = Modal;
export {
  Modal_default as default
};
//# sourceMappingURL=Modal.dev.js.map
