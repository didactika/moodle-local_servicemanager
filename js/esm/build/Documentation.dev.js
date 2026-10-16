var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The reference of the YAML format of a schema.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/Documentation
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo } from "react";
import BackLink from "./components/common/BackLink";
import CopyButton from "./components/common/CopyButton";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Icon from "./components/common/Icon";
import PageHeader from "./components/common/PageHeader";
import FieldTable from "./components/documentation/FieldTable";
import { createText } from "./engine/text";
const META = [
  { name: "id", required: true, description: "doc_meta_id" },
  { name: "name", required: true, description: "doc_meta_name" },
  { name: "version", required: false, description: "doc_meta_version" },
  { name: "maintainer", required: false, description: "doc_meta_maintainer" },
  { name: "description", required: false, description: "doc_meta_description" }
];
const REQUIREMENTS = [
  { name: "plugins", required: false, description: "doc_requirements_plugins" },
  { name: "download_files", required: false, description: "doc_requirements_download_files" },
  { name: "upload_files", required: false, description: "doc_requirements_upload_files" }
];
const ROLE = [
  { name: "context_levels", required: false, description: "doc_role_context_levels" },
  { name: "permissions", required: false, description: "doc_role_permissions" },
  { name: "allow_assign", required: false, description: "doc_role_allow_assign" },
  { name: "allow_override", required: false, description: "doc_role_allow_override" },
  { name: "allow_switch", required: false, description: "doc_role_allow_switch" },
  { name: "allow_view", required: false, description: "doc_role_allow_view" }
];
const NAMING = [
  { resource: "doc_naming_username", pattern: "ws.{id}", example: "ws.example.service" },
  { resource: "doc_naming_displayname", pattern: "User Webservice {name}", example: "User Webservice Example Service" },
  { resource: "doc_naming_email", pattern: "ws.{id}@devnull.{domain}", example: "ws.example.service@devnull.example.com" },
  { resource: "doc_naming_role", pattern: "ws_{id}", example: "ws_example_service" },
  { resource: "doc_naming_service", pattern: "ws_{id}", example: "ws_example_service" },
  { resource: "doc_naming_token", pattern: "Token - {name}", example: "Token - Example Service" }
];
const SECTIONS = ["structure", "meta", "definition", "role", "naming", "example"];
const Documentation = /* @__PURE__ */ __name((props) => {
  const text = useMemo(() => createText(props.strings), [props.strings]);
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { strings: props.strings, children: /* @__PURE__ */ jsxDEV("div", { className: "servicemanager-documentation", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDEV(BackLink, { href: props.backUrl, label: text("back") }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
      lineNumber: 63,
      columnNumber: 31
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
      lineNumber: 63,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV(
      PageHeader,
      {
        title: text("schema_reference"),
        actions: /* @__PURE__ */ jsxDEV("a", { href: props.downloadUrl, className: "btn btn-outline-primary", children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "download", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 66,
            columnNumber: 86
          }),
          text("download_example")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 66,
          columnNumber: 22
        })
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 64,
        columnNumber: 9
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "card", children: /* @__PURE__ */ jsxDEV("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxDEV("h5", { className: "mb-3", children: text("quick_links") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 71,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("ul", { className: "list-unstyled mb-4", children: SECTIONS.map((section) => /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: `#${section}`, children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "chevron-right", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 74,
          columnNumber: 49
        }),
        text("doc_" + section)
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 74,
        columnNumber: 25
      }) }, section, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 73,
        columnNumber: 48
      })) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 72,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "alert alert-success mb-4", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "download", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 79,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("a", { href: props.downloadUrl, className: "alert-link", children: text("download_example") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 80,
          columnNumber: 21
        }),
        " - ",
        text("download_example_desc")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 78,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("h4", { id: "structure", className: "mt-4 mb-3 text-primary", children: text("doc_structure") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 84,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { children: text("doc_structure_desc") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 85,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("pre", { className: "sm-code p-3 rounded", children: /* @__PURE__ */ jsxDEV("code", { children: props.structureCode }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 86,
        columnNumber: 54
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 86,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(CopyButton, { value: props.structureCode, text, tone: "outline-secondary" }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 87,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("h4", { id: "meta", className: "mt-4 mb-3 text-primary", children: text("doc_meta") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 89,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(FieldTable, { fields: META, text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 90,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-3", children: /* @__PURE__ */ jsxDEV(FieldTable, { fields: REQUIREMENTS, text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 91,
        columnNumber: 39
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 91,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("h4", { id: "definition", className: "mt-4 mb-3 text-primary", children: text("doc_definition") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 93,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { children: text("doc_definition_desc") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 94,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("h5", { className: "mt-3", children: text("functions") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 95,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { children: text("doc_functions_desc") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 96,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("pre", { className: "sm-code p-3 rounded", children: /* @__PURE__ */ jsxDEV("code", { children: props.functionCode }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 97,
        columnNumber: 54
      }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 97,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "alert alert-info mt-3", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "circle-info", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 99,
          columnNumber: 21
        }),
        text("doc_default_capabilities"),
        " ",
        /* @__PURE__ */ jsxDEV("code", { children: "webservice/rest:use" }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 101,
          columnNumber: 26
        }),
        ", ",
        /* @__PURE__ */ jsxDEV("code", { children: "webservice/soap:use" }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 101,
          columnNumber: 60
        }),
        "."
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 98,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("h4", { id: "role", className: "mt-4 mb-3 text-primary", children: text("doc_role") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 104,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { children: text("doc_role_desc") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 105,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(FieldTable, { fields: ROLE, text }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 106,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "alert alert-info mt-3", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "circle-info", gap: true }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 108,
          columnNumber: 21
        }),
        text("doc_role_note")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 107,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("h4", { id: "naming", className: "mt-4 mb-3 text-primary", children: text("doc_naming") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 111,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("table", { className: "table table-bordered table-striped", children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { children: text("resource") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 115,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("th", { children: text("pattern") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 116,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("th", { children: text("doc_example_col") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 117,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 114,
          columnNumber: 25
        }) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 113,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("tbody", { children: NAMING.map((row) => /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("td", { children: text(row.resource) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 122,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("code", { children: row.pattern }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 123,
            columnNumber: 33
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 123,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("code", { children: row.example }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 124,
            columnNumber: 33
          }) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 124,
            columnNumber: 29
          })
        ] }, row.resource, true, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 121,
          columnNumber: 46
        })) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 120,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 112,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("h4", { id: "example", className: "mt-4 mb-3 text-primary", children: text("doc_example") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 129,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { children: [
        text("doc_example_complete_desc"),
        " ",
        /* @__PURE__ */ jsxDEV("a", { href: props.downloadUrl, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "download", gap: true }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
            lineNumber: 132,
            columnNumber: 49
          }),
          text("download_example")
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
          lineNumber: 132,
          columnNumber: 21
        }),
        " ",
        text("doc_example_to_get_started")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
        lineNumber: 130,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
      lineNumber: 70,
      columnNumber: 13
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
      lineNumber: 69,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
    lineNumber: 62,
    columnNumber: 51
  }) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/Documentation.tsx",
    lineNumber: 62,
    columnNumber: 12
  });
}, "Documentation");
var Documentation_default = Documentation;
export {
  Documentation_default as default
};
//# sourceMappingURL=Documentation.dev.js.map
