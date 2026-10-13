var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * One schema, or one past version of it: what it declares, what the plugin created for it and how healthy it is.
 *
 * The actions of the schema are one group of buttons in the head of the page, and the rest of the page is made of sections that
 * all look the same: the main ones at the left and the ones about what the schema is and who gets what at the right.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/SchemaDetail
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo } from "react";
import BackLink from "./components/common/BackLink";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Icon from "./components/common/Icon";
import PageHeader from "./components/common/PageHeader";
import StatusBadge from "./components/common/StatusBadge";
import AccessPanel from "./components/schema/AccessPanel";
import DetailsPanel from "./components/schema/DetailsPanel";
import FunctionsPanel from "./components/schema/FunctionsPanel";
import HealthPanel from "./components/schema/HealthPanel";
import ResourcesPanel from "./components/schema/ResourcesPanel";
import RolePanel from "./components/schema/RolePanel";
import TokenAlert from "./components/schema/TokenAlert";
import { createText } from "./engine/text";
import { postForm } from "./engine/post";
const SchemaDetail = /* @__PURE__ */ __name((props) => {
  const { schema, urls, resources, isHistory, canManage } = props;
  const text = useMemo(() => createText(props.strings), [props.strings]);
  const hasResources = Boolean(resources.user || resources.role || resources.service);
  const toggle = /* @__PURE__ */ __name(() => postForm(urls.bulkAction, { sesskey: props.sesskey, action: schema.enabled ? "disable" : "enable", ids: [schema.id] }), "toggle");
  const actions = !isHistory && canManage ? /* @__PURE__ */ jsxDEV("a", { href: urls.edit, className: "btn btn-primary", children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: "pen-to-square", gap: true }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 42,
      columnNumber: 59
    }),
    text("action_edit")
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
    lineNumber: 42,
    columnNumber: 11
  }) : void 0;
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "servicemanager-detail", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDEV(BackLink, { href: isHistory ? urls.back : urls.dashboard, label: text(isHistory ? "back" : "dashboard") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 48,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 47,
      columnNumber: 13
    }),
    props.newToken && /* @__PURE__ */ jsxDEV(TokenAlert, { token: props.newToken, text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 51,
      columnNumber: 32
    }),
    /* @__PURE__ */ jsxDEV(
      PageHeader,
      {
        title: schema.name,
        badges: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV(StatusBadge, { status: schema.status, label: schema.statusLabel }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
            lineNumber: 56,
            columnNumber: 21
          }),
          !isHistory && !schema.enabled && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-secondary", children: text("disabled") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
            lineNumber: 57,
            columnNumber: 55
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 55,
          columnNumber: 25
        }),
        subtitle: /* @__PURE__ */ jsxDEV("code", { children: schema.schemaId }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 59,
          columnNumber: 27
        }),
        actions
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
        lineNumber: 53,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "row", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "col-lg-8", children: [
        props.functions.length > 0 && /* @__PURE__ */ jsxDEV(FunctionsPanel, { functions: props.functions, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 65,
          columnNumber: 52
        }),
        hasResources && /* @__PURE__ */ jsxDEV(ResourcesPanel, { resources, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 66,
          columnNumber: 38
        }),
        props.healthLogs.length > 0 && /* @__PURE__ */ jsxDEV(HealthPanel, { logs: props.healthLogs, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 67,
          columnNumber: 53
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
        lineNumber: 64,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "col-lg-4", children: [
        /* @__PURE__ */ jsxDEV(DetailsPanel, { schema, urls, canManage, isHistory, onToggle: toggle, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 70,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV(AccessPanel, { props, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 71,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV(RolePanel, { role: props.role, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 72,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
        lineNumber: 69,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 63,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
    lineNumber: 46,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
    lineNumber: 45,
    columnNumber: 12
  });
}, "SchemaDetail");
var SchemaDetail_default = SchemaDetail;
export {
  SchemaDetail_default as default
};
//# sourceMappingURL=SchemaDetail.dev.js.map
