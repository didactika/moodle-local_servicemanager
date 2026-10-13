var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A list of chips that shows the first few and, when there are more, a button that opens all of them in a dialogue, as rows that scroll,
 * with a search for the ones that are many.
 *
 * @module     local_servicemanager/components/common/ChipList
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useMemo, useState } from "react";
import Icon from "./Icon";
import Modal from "./Modal";
import SearchBox from "./SearchBox";
const SHOWN = 8;
const SEARCHABLE_FROM = 10;
const ChipList = /* @__PURE__ */ __name(({ title, names, chip, text, limit = SHOWN }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const folded = names.length > limit;
  const found = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return names.filter((name) => words.every((word) => name.toLowerCase().includes(word)));
  }, [names, query]);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "sm-chip-row", "data-region": "chip-list", children: [
      (folded ? names.slice(0, limit) : names).map((name) => chip(name)),
      folded && /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          className: "sm-role-more",
          "data-action": "chips-all",
          title: text("chips_all", names.length),
          onClick: () => setOpen(true),
          children: [
            "+",
            names.length - limit,
            /* @__PURE__ */ jsxDEV("span", { className: "visually-hidden", children: [
              " ",
              text("chips_all", names.length)
            ] }, void 0, true, {
              fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
              lineNumber: 56,
              columnNumber: 17
            })
          ]
        },
        void 0,
        true,
        {
          fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
          lineNumber: 48,
          columnNumber: 24
        }
      )
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
      lineNumber: 46,
      columnNumber: 9
    }),
    folded && /* @__PURE__ */ jsxDEV(
      Modal,
      {
        open,
        wide: true,
        title: /* @__PURE__ */ jsxDEV(Fragment, { children: [
          title,
          /* @__PURE__ */ jsxDEV("span", { className: "sm-role-count ms-2", children: names.length }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
            lineNumber: 62,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
          lineNumber: 62,
          columnNumber: 20
        }),
        onClose: () => setOpen(false),
        closeLabel: text("core_cancel"),
        children: [
          names.length > SEARCHABLE_FROM && /* @__PURE__ */ jsxDEV("div", { className: "sm-dialog-search", children: /* @__PURE__ */ jsxDEV(
            SearchBox,
            {
              value: query,
              onChange: setQuery,
              placeholder: text("filter_name"),
              clearLabel: text("filter_clear"),
              id: "sm-chips-search"
            },
            void 0,
            false,
            {
              fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
              lineNumber: 67,
              columnNumber: 17
            }
          ) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
            lineNumber: 66,
            columnNumber: 48
          }),
          /* @__PURE__ */ jsxDEV("ul", { className: "list-group sm-caps-list", "data-region": "chip-all", children: found.map((name) => /* @__PURE__ */ jsxDEV("li", { className: "list-group-item", children: /* @__PURE__ */ jsxDEV("span", { className: "sm-fn", children: name }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
            lineNumber: 76,
            columnNumber: 81
          }) }, name, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
            lineNumber: 76,
            columnNumber: 38
          })) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
            lineNumber: 75,
            columnNumber: 13
          }),
          found.length === 0 && /* @__PURE__ */ jsxDEV("p", { className: "text-body-secondary text-center my-3", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "filter-circle-xmark", gap: true }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
              lineNumber: 78,
              columnNumber: 88
            }),
            text("no_schemas_filtered")
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
            lineNumber: 78,
            columnNumber: 36
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
        lineNumber: 59,
        columnNumber: 20
      }
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/components/common/ChipList.tsx",
    lineNumber: 45,
    columnNumber: 12
  });
}, "ChipList");
var ChipList_default = ChipList;
export {
  ChipList_default as default
};
//# sourceMappingURL=ChipList.dev.js.map
