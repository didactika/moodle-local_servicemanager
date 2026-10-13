var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What the role of the schema may do: where it can be assigned, which roles it may assign, override, switch to and see, and which
 * capabilities it is kept from or forbidden.
 *
 * Each of them is a block with its name over its list, because a list of roles can be long; the ones past the first few are
 * behind a button that opens all of them in a dialogue, so the card stays the size of what matters.
 *
 * @module     local_servicemanager/components/schema/RolePanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import ChipList from "../common/ChipList";
import Panel from "../common/Panel";
const RELATIONS = ["allow_assign", "allow_override", "allow_switch", "allow_view"];
const PERMISSIONS = [
  { key: "prevent", tone: "warning" },
  { key: "prohibit", tone: "danger" }
];
const Block = /* @__PURE__ */ __name(({ label, names, tone, text }) => /* @__PURE__ */ jsxDEV("section", { className: "sm-role-block", "data-region": "role-block", children: [
  /* @__PURE__ */ jsxDEV("h4", { className: "sm-role-label", children: [
    label,
    /* @__PURE__ */ jsxDEV("span", { className: "sm-role-count", children: names.length }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
      lineNumber: 39,
      columnNumber: 42
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
    lineNumber: 39,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(
    ChipList,
    {
      title: label,
      names,
      text,
      chip: (name) => /* @__PURE__ */ jsxDEV("span", { className: `sm-role-chip tone-${tone}`, children: name }, name, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 44,
        columnNumber: 25
      })
    },
    void 0,
    false,
    {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
      lineNumber: 40,
      columnNumber: 5
    }
  )
] }, void 0, true, {
  fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
  lineNumber: 38,
  columnNumber: 59
}), "Block");
const RolePanel = /* @__PURE__ */ __name(({ role, text }) => {
  const levels = (role.context_levels ?? []).filter((level) => level !== "system");
  const permissions = PERMISSIONS.filter((permission) => (role.permissions?.[permission.key] ?? []).length > 0);
  const relations = RELATIONS.filter((relation) => (role[relation] ?? []).length > 0);
  if (levels.length === 0 && permissions.length === 0 && relations.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxDEV(Panel, { title: text("role_panel_title"), icon: "user-shield", region: "role", children: /* @__PURE__ */ jsxDEV("div", { className: "sm-role-grid", children: [
    levels.length > 0 && /* @__PURE__ */ jsxDEV(
      Block,
      {
        label: text("role_context_levels"),
        names: ["system", ...levels].map((level) => text("role_level_" + level) || level),
        tone: "secondary",
        text
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 58,
        columnNumber: 35
      }
    ),
    relations.map((relation) => /* @__PURE__ */ jsxDEV(
      Block,
      {
        label: text("role_" + relation),
        names: role[relation] ?? [],
        tone: "primary",
        text
      },
      relation,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 64,
        columnNumber: 42
      }
    )),
    permissions.map((permission) => /* @__PURE__ */ jsxDEV(
      Block,
      {
        label: text("role_permission_" + permission.key),
        names: role.permissions?.[permission.key] ?? [],
        tone: permission.tone,
        text
      },
      permission.key,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 71,
        columnNumber: 46
      }
    ))
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
    lineNumber: 57,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
    lineNumber: 56,
    columnNumber: 12
  });
}, "RolePanel");
var RolePanel_default = RolePanel;
export {
  RolePanel_default as default
};
//# sourceMappingURL=RolePanel.dev.js.map
