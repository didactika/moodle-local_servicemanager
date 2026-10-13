var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * What the schema says about the role that was created for it: where it can be assigned, which capabilities it has explicitly and
 * which other roles it may assign, override, switch to and see.
 *
 * @module     local_servicemanager/components/schema/RolePanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Panel from "../common/Panel";
const RELATIONS = ["allow_assign", "allow_override", "allow_switch", "allow_view"];
const PERMISSIONS = [
  { key: "prevent", tone: "warning" },
  { key: "prohibit", tone: "danger" }
];
const Names = /* @__PURE__ */ __name(({ names, tone = "secondary" }) => /* @__PURE__ */ jsxDEV("span", { className: "d-flex flex-wrap sm-badges-row", children: names.map((name) => /* @__PURE__ */ jsxDEV("span", { className: `badge text-bg-${tone}`, children: name }, name, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
  lineNumber: 28,
  columnNumber: 26
})) }, void 0, false, {
  fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
  lineNumber: 27,
  columnNumber: 82
}), "Names");
const RolePanel = /* @__PURE__ */ __name(({ role, text }) => {
  const levels = (role.context_levels ?? []).filter((level) => level !== "system");
  const permissions = PERMISSIONS.filter((permission) => (role.permissions?.[permission.key] ?? []).length > 0);
  const relations = RELATIONS.filter((relation) => (role[relation] ?? []).length > 0);
  if (levels.length === 0 && permissions.length === 0 && relations.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxDEV(Panel, { title: text("role_panel_title"), icon: "user-shield", region: "role", children: /* @__PURE__ */ jsxDEV("dl", { className: "sm-facts mb-0", children: [
    levels.length > 0 && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("dt", { children: text("role_context_levels") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 42,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("dd", { children: /* @__PURE__ */ jsxDEV(Names, { names: ["system", ...levels].map((level) => text("role_level_" + level) || level) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 43,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 43,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
      lineNumber: 41,
      columnNumber: 35
    }),
    relations.map((relation) => /* @__PURE__ */ jsxDEV("div", { className: "sm-fact-pair", children: [
      /* @__PURE__ */ jsxDEV("dt", { children: text("role_" + relation) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 46,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("dd", { children: /* @__PURE__ */ jsxDEV(Names, { names: role[relation] ?? [], tone: "primary" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 47,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 47,
        columnNumber: 17
      })
    ] }, relation, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
      lineNumber: 45,
      columnNumber: 42
    })),
    permissions.map((permission) => /* @__PURE__ */ jsxDEV("div", { className: "sm-fact-pair", children: [
      /* @__PURE__ */ jsxDEV("dt", { children: text("role_permission_" + permission.key) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 50,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("dd", { children: /* @__PURE__ */ jsxDEV(Names, { names: role.permissions?.[permission.key] ?? [], tone: permission.tone }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 51,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
        lineNumber: 51,
        columnNumber: 17
      })
    ] }, permission.key, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
      lineNumber: 49,
      columnNumber: 46
    }))
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
    lineNumber: 40,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/RolePanel.tsx",
    lineNumber: 39,
    columnNumber: 12
  });
}, "RolePanel");
var RolePanel_default = RolePanel;
export {
  RolePanel_default as default
};
//# sourceMappingURL=RolePanel.dev.js.map
