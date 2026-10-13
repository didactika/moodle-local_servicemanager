var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The user, the role and the service that the plugin created for a schema, each linked to where Moodle manages it.
 *
 * @module     local_servicemanager/components/schema/ResourcesPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from "../common/Icon";
import Panel from "../common/Panel";
const ResourcesPanel = /* @__PURE__ */ __name(({ resources, text }) => {
  const entries = [
    { label: text("service_user"), icon: "user", resource: resources.user, detail: resources.user?.username },
    { label: text("service_role"), icon: "shield-halved", resource: resources.role, detail: resources.role?.shortname },
    { label: text("external_service"), icon: "plug", resource: resources.service, detail: resources.service?.shortname }
  ];
  return /* @__PURE__ */ jsxDEV(Panel, { title: text("provisioned_resources"), icon: "server", flush: true, region: "resources", children: /* @__PURE__ */ jsxDEV("ul", { className: "list-group list-group-flush", children: entries.filter((entry) => entry.resource).map((entry) => /* @__PURE__ */ jsxDEV("li", { className: "list-group-item d-flex align-items-center", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "sm-resource-icon text-body-secondary", children: /* @__PURE__ */ jsxDEV(Icon, { name: entry.icon }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
      lineNumber: 38,
      columnNumber: 72
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
      lineNumber: 38,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-grow-1 sm-resource-body", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-body-secondary small text-uppercase", children: entry.label }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
        lineNumber: 40,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("a", { href: entry.resource?.url, target: "_blank", rel: "noreferrer", children: entry.resource?.name }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
        lineNumber: 41,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
      lineNumber: 39,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("span", { className: "sm-id-chip compact", children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "fingerprint", gap: true }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
        lineNumber: 43,
        columnNumber: 54
      }),
      entry.detail
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
      lineNumber: 43,
      columnNumber: 17
    })
  ] }, entry.label, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
    lineNumber: 37,
    columnNumber: 71
  })) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
    lineNumber: 36,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/components/schema/ResourcesPanel.tsx",
    lineNumber: 35,
    columnNumber: 12
  });
}, "ResourcesPanel");
var ResourcesPanel_default = ResourcesPanel;
export {
  ResourcesPanel_default as default
};
//# sourceMappingURL=ResourcesPanel.dev.js.map
