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
import { useMemo, useState } from "react";
import BackLink from "./components/common/BackLink";
import ConfirmModal from "./components/common/ConfirmModal";
import ErrorBoundary from "./components/common/ErrorBoundary";
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
import { addToast } from "./engine/toast";
import { regenerateToken, setSchemaEnabled } from "./services/api";
const SchemaDetail = /* @__PURE__ */ __name((props) => {
  const { schema, urls, resources, isHistory, canManage } = props;
  const text = useMemo(() => createText(props.strings), [props.strings]);
  const hasResources = Boolean(resources.user || resources.role || resources.service);
  const [enabled, setEnabled] = useState(schema.enabled);
  const [hasToken, setHasToken] = useState(schema.hasToken);
  const [freshToken, setFreshToken] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const current = { ...schema, enabled, hasToken };
  const failed = /* @__PURE__ */ __name(() => addToast(text("error_action_failed"), { type: "danger" }).catch(() => void 0), "failed");
  const toggle = /* @__PURE__ */ __name(() => {
    if (busy) {
      return;
    }
    setBusy(true);
    setSchemaEnabled(schema.id, !enabled).then((now) => {
      setEnabled(now);
      return addToast(text(now ? "schema_enabled_toast" : "schema_disabled_toast", schema.name), { type: "success" });
    }).catch(failed).finally(() => setBusy(false));
  }, "toggle");
  const makeToken = /* @__PURE__ */ __name(() => {
    setConfirming(false);
    setBusy(true);
    regenerateToken(schema.id).then((token) => {
      setHasToken(true);
      setFreshToken(token);
      return addToast(text("token_regenerated"), { type: "success" });
    }).catch(failed).finally(() => setBusy(false));
  }, "makeToken");
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "servicemanager-detail", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDEV(BackLink, { href: isHistory ? urls.back : urls.dashboard, label: text(isHistory ? "back" : "dashboard") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 71,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 70,
      columnNumber: 13
    }),
    props.newToken && /* @__PURE__ */ jsxDEV(TokenAlert, { token: props.newToken, text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 74,
      columnNumber: 32
    }),
    /* @__PURE__ */ jsxDEV(
      PageHeader,
      {
        title: schema.name,
        badges: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV(StatusBadge, { status: schema.status, label: schema.statusLabel }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
            lineNumber: 79,
            columnNumber: 21
          }),
          !isHistory && !enabled && /* @__PURE__ */ jsxDEV("span", { className: "badge text-bg-secondary", children: text("disabled") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
            lineNumber: 80,
            columnNumber: 48
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 78,
          columnNumber: 25
        }),
        subtitle: /* @__PURE__ */ jsxDEV("code", { children: schema.schemaId }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 82,
          columnNumber: 27
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
        lineNumber: 76,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "row", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "col-lg-4", children: [
        /* @__PURE__ */ jsxDEV(DetailsPanel, { schema: current, urls, canManage, isHistory, busy, onToggle: toggle, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 87,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV(
          AccessPanel,
          {
            props: { ...props, schema: current },
            freshToken,
            busy,
            onMakeToken: () => setConfirming(true),
            text
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
            lineNumber: 88,
            columnNumber: 21
          }
        ),
        /* @__PURE__ */ jsxDEV(RolePanel, { role: props.role, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 95,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
        lineNumber: 86,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "col-lg-8", children: [
        props.functions.length > 0 && /* @__PURE__ */ jsxDEV(FunctionsPanel, { functions: props.functions, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 98,
          columnNumber: 52
        }),
        hasResources && /* @__PURE__ */ jsxDEV(ResourcesPanel, { resources, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 99,
          columnNumber: 38
        }),
        props.healthLogs.length > 0 && /* @__PURE__ */ jsxDEV(HealthPanel, { logs: props.healthLogs, text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
          lineNumber: 100,
          columnNumber: 53
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
        lineNumber: 97,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
      lineNumber: 85,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      ConfirmModal,
      {
        open: confirming,
        title: text(hasToken ? "action_regenerate_token" : "action_generate_token"),
        message: text(hasToken ? "confirm_regenerate_token" : "confirm_generate_token"),
        confirmLabel: text(hasToken ? "action_regenerate_token" : "action_generate_token"),
        cancelLabel: text("core_cancel"),
        onCancel: () => setConfirming(false),
        onConfirm: makeToken
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
        lineNumber: 104,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
    lineNumber: 69,
    columnNumber: 9
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/SchemaDetail.tsx",
    lineNumber: 68,
    columnNumber: 12
  });
}, "SchemaDetail");
var SchemaDetail_default = SchemaDetail;
export {
  SchemaDetail_default as default
};
//# sourceMappingURL=SchemaDetail.dev.js.map
