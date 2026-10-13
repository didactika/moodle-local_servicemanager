var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The button that copies a text to the clipboard and says that it did, in the toast of Moodle.
 *
 * @module     local_servicemanager/components/common/CopyButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useEffect } from "react";
import { addToast } from "../../engine/toast";
import { useCopy } from "../../hooks/useCopy";
import Icon from "./Icon";
const CopyButton = /* @__PURE__ */ __name(({ value, text, label, tone = "outline-success", compact = false }) => {
  const { copied, failed, copy } = useCopy();
  useEffect(() => {
    if (copied) {
      addToast(text("copied"), { type: "success" }).catch(() => void 0);
    } else if (failed) {
      addToast(text("copy_token_failed"), { type: "danger" }).catch(() => void 0);
    }
  }, [copied, failed, text]);
  if (compact) {
    return /* @__PURE__ */ jsxDEV(
      "button",
      {
        type: "button",
        className: `btn sm-pill icon-only compact${copied ? " tone-success" : ""}`,
        onClick: () => copy(value),
        title: text("copy"),
        children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: copied ? "check" : "copy" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/CopyButton.tsx",
            lineNumber: 48,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: text("copy") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/CopyButton.tsx",
            lineNumber: 48,
            columnNumber: 54
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/common/CopyButton.tsx",
        lineNumber: 42,
        columnNumber: 16
      }
    );
  }
  return /* @__PURE__ */ jsxDEV("button", { type: "button", className: `btn btn-${copied ? "success" : tone}`, onClick: () => copy(value), children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: copied ? "check" : "copy", gap: true }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/CopyButton.tsx",
      lineNumber: 52,
      columnNumber: 9
    }),
    copied ? text("copied") : label ?? text("copy")
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/CopyButton.tsx",
    lineNumber: 51,
    columnNumber: 12
  });
}, "CopyButton");
var CopyButton_default = CopyButton;
export {
  CopyButton_default as default
};
//# sourceMappingURL=CopyButton.dev.js.map
