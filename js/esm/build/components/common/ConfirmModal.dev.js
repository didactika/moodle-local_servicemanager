var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * A question that must be answered before something that cannot be undone, in a dialog of the browser, which takes the focus,
 * closes with Escape and is drawn over the page with the style of Bootstrap.
 *
 * @module     local_servicemanager/components/common/ConfirmModal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "./Icon";
import Modal from "./Modal";
const ConfirmModal = /* @__PURE__ */ __name(({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, tone = "danger" }) => /* @__PURE__ */ jsxDEV(
  Modal,
  {
    open,
    title: /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "triangle-exclamation", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ConfirmModal.tsx",
        lineNumber: 30,
        columnNumber: 14
      }),
      title
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ConfirmModal.tsx",
      lineNumber: 30,
      columnNumber: 12
    }),
    onClose: onCancel,
    closeLabel: cancelLabel,
    footer: /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-secondary", onClick: onCancel, children: cancelLabel }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ConfirmModal.tsx",
        lineNumber: 34,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "button", className: `btn btn-${tone}`, onClick: onConfirm, children: confirmLabel }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ConfirmModal.tsx",
        lineNumber: 35,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ConfirmModal.tsx",
      lineNumber: 33,
      columnNumber: 13
    }),
    children: /* @__PURE__ */ jsxDEV("p", { className: "mb-0", children: message }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ConfirmModal.tsx",
      lineNumber: 38,
      columnNumber: 5
    })
  },
  void 0,
  false,
  {
    fileName: "public/local/servicemanager/js/esm/src/components/common/ConfirmModal.tsx",
    lineNumber: 28,
    columnNumber: 134
  }
), "ConfirmModal");
var ConfirmModal_default = ConfirmModal;
export {
  ConfirmModal_default as default
};
//# sourceMappingURL=ConfirmModal.dev.js.map
