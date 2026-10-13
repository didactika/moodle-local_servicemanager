var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A menu of actions that opens from three dots, which is how the less frequent actions of a row or of a page are kept at hand.
 *
 * It can sit at the end of a group of buttons as one more button of the group.
 *
 * @module     local_servicemanager/components/common/ActionMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useDropdown } from "../../hooks/useDropdown";
import Icon from "./Icon";
import { toneClass } from "./IconButton";
const ActionMenu = /* @__PURE__ */ __name(({ label, actions, size = "sm", tone = "secondary", icon = "ellipsis", caret = false, external = false }) => {
  const menu = useDropdown();
  const common = actions.filter((action) => !action.danger);
  const dangerous = actions.filter((action) => action.danger);
  const item = /* @__PURE__ */ __name((action) => {
    const content = /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: action.icon, gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
        lineNumber: 49,
        columnNumber: 27
      }),
      action.label
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
      lineNumber: 49,
      columnNumber: 25
    });
    const className = `dropdown-item${action.danger ? " text-danger" : ""}`;
    return action.href ? /* @__PURE__ */ jsxDEV("a", { className, href: action.href, ...external ? { target: "_blank", rel: "noreferrer" } : {}, children: content }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
      lineNumber: 52,
      columnNumber: 15
    }) : /* @__PURE__ */ jsxDEV("button", { type: "button", className, onClick: () => {
      menu.toggle();
      action.onSelect?.();
    }, children: content }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
      lineNumber: 53,
      columnNumber: 15
    });
  }, "item");
  return /* @__PURE__ */ jsxDEV("div", { className: "dropdown sm-action-menu", ref: menu.ref, children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        type: "button",
        className: `btn sm-pill ${caret ? "has-caret" : `icon-only${size === "sm" ? " compact" : ""}`}${toneClass(tone)}`,
        "aria-haspopup": "true",
        "aria-expanded": menu.open,
        title: label,
        onClick: menu.toggle,
        children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: icon }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
            lineNumber: 68,
            columnNumber: 13
          }),
          caret && /* @__PURE__ */ jsxDEV(Icon, { name: "chevron-down", className: "sm-caret" }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
            lineNumber: 68,
            columnNumber: 43
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: label }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
            lineNumber: 68,
            columnNumber: 93
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
        lineNumber: 60,
        columnNumber: 9
      }
    ),
    /* @__PURE__ */ jsxDEV("ul", { className: `dropdown-menu dropdown-menu-end sm-row-menu${menu.open ? " show" : ""}`, children: [
      common.map((action) => /* @__PURE__ */ jsxDEV("li", { children: item(action) }, action.label, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
        lineNumber: 71,
        columnNumber: 37
      })),
      common.length > 0 && dangerous.length > 0 && /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("hr", { className: "dropdown-divider" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
        lineNumber: 72,
        columnNumber: 63
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
        lineNumber: 72,
        columnNumber: 59
      }),
      dangerous.map((action) => /* @__PURE__ */ jsxDEV("li", { children: item(action) }, action.label, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
        lineNumber: 73,
        columnNumber: 40
      }))
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
      lineNumber: 70,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/ActionMenu.tsx",
    lineNumber: 59,
    columnNumber: 12
  });
}, "ActionMenu");
var ActionMenu_default = ActionMenu;
export {
  ActionMenu_default as default
};
//# sourceMappingURL=ActionMenu.dev.js.map
