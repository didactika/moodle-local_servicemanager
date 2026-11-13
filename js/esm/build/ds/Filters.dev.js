var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The filters of a list, as the design system draws them: each one is a menu with the shape of a select, in one row beside the
 * search. The status lists every status with its rows; the date offers the usual periods and two days of choice. A menu that narrows
 * the list is tinted and says only what it is narrowed to; when the menus do not fit beside the search they are grouped in one menu,
 * Filters, with its funnel.
 *
 * @module     local_servicemanager/ds/Filters
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useId, useLayoutEffect, useRef, useState } from "react";
import { Icon, Menu } from "./ui";
import { datePresets } from "./dates";
function StatusMenu({ label, statuses, chosen, text, onChange }) {
  const id = useId();
  const options = statuses;
  let button = label;
  if (chosen.length === 1) {
    button = statuses.find((status) => status.key === chosen[0])?.label ?? chosen[0];
  } else if (chosen.length > 1) {
    button = `${label}: ${chosen.length}`;
  }
  return /* @__PURE__ */ jsxDEV(Menu, { button, label, name: "status", active: chosen.length > 0, text, onClear: () => onChange([]), children: () => options.map((option) => /* @__PURE__ */ jsxDEV("label", { className: "dropdown-item", htmlFor: `${id}-${option.key}`, children: [
    /* @__PURE__ */ jsxDEV(
      "input",
      {
        type: "checkbox",
        className: "form-check-input",
        id: `${id}-${option.key}`,
        checked: chosen.includes(option.key),
        onChange: () => onChange(chosen.includes(option.key) ? chosen.filter((key) => key !== option.key) : [...chosen, option.key])
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
        lineNumber: 52,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("span", { children: option.label }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
      lineNumber: 61,
      columnNumber: 13
    }, this),
    option.count >= 0 && /* @__PURE__ */ jsxDEV("span", { className: "dd-chip-count", children: option.count }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
      lineNumber: 62,
      columnNumber: 35
    }, this)
  ] }, option.key, true, {
    fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
    lineNumber: 51,
    columnNumber: 40
  }, this)) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
    lineNumber: 50,
    columnNumber: 12
  }, this);
}
__name(StatusMenu, "StatusMenu");
const orderedDays = /* @__PURE__ */ __name((from, to, changed) => {
  if (from === "" || to === "" || from <= to) {
    return [from, to];
  }
  return changed === "from" ? [from, from] : [to, to];
}, "orderedDays");
function DateMenu({ label, from, to, text, onChange }) {
  const fromId = useId();
  const toId = useId();
  const presets = datePresets(/* @__PURE__ */ new Date());
  const preset = presets.find((item) => item.from === from && item.to === to);
  let button = label;
  if (preset) {
    button = text(`filter_date_${preset.key}`);
  } else if (from !== "" && to !== "") {
    button = text("filter_date_range", { from, to });
  } else if (from !== "") {
    button = text("filter_date_since", from);
  } else if (to !== "") {
    button = text("filter_date_until", to);
  }
  return /* @__PURE__ */ jsxDEV(Menu, { button, label, name: "date", active: from !== "" || to !== "", text, onClear: () => onChange("", ""), children: (close) => /* @__PURE__ */ jsxDEV(Fragment, { children: [
    presets.map((item) => /* @__PURE__ */ jsxDEV(
      "button",
      {
        type: "button",
        role: "option",
        className: "dropdown-item",
        "aria-selected": preset?.key === item.key,
        onClick: () => {
          close();
          onChange(item.from, item.to);
        },
        children: text(`filter_date_${item.key}`)
      },
      item.key,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
        lineNumber: 113,
        columnNumber: 36
      },
      this
    )),
    /* @__PURE__ */ jsxDEV("hr", {}, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
      lineNumber: 124,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "dd-menu-form", children: /* @__PURE__ */ jsxDEV("div", { className: "dd-menu-dates", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "form-label small mb-1", htmlFor: fromId, children: text("filter_date_from") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
          lineNumber: 128,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            id: fromId,
            type: "date",
            className: "form-control form-control-sm",
            value: from,
            max: to || void 0,
            onChange: (event) => onChange(...orderedDays(event.target.value, to, "from"))
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
            lineNumber: 129,
            columnNumber: 25
          },
          this
        )
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
        lineNumber: 127,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "form-label small mb-1", htmlFor: toId, children: text("filter_date_to") }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
          lineNumber: 133,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            id: toId,
            type: "date",
            className: "form-control form-control-sm",
            value: to,
            min: from || void 0,
            onChange: (event) => onChange(...orderedDays(from, event.target.value, "to"))
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
            lineNumber: 134,
            columnNumber: 25
          },
          this
        )
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
        lineNumber: 132,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
      lineNumber: 126,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
      lineNumber: 125,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
    lineNumber: 112,
    columnNumber: 21
  }, this) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
    lineNumber: 111,
    columnNumber: 12
  }, this);
}
__name(DateMenu, "DateMenu");
const SEARCH_ROOM = 160;
function FilterGroup({ count, text, children }) {
  const [grouped, setGrouped] = useState(false);
  const box = useRef(null);
  const needed = useRef(0);
  useLayoutEffect(() => {
    const row = box.current?.parentElement;
    if (!box.current || !row) {
      return void 0;
    }
    const measure = /* @__PURE__ */ __name(() => {
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const room = row.clientWidth - SEARCH_ROOM - gap;
      if (!grouped) {
        const menus = Array.from(box.current?.children ?? []);
        const width = menus.reduce((sum, menu) => sum + menu.offsetWidth, 0) + gap * Math.max(0, menus.length - 1);
        if (width > room) {
          needed.current = width;
          setGrouped(true);
        }
      } else if (room >= needed.current) {
        setGrouped(false);
      }
    }, "measure");
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  });
  return /* @__PURE__ */ jsxDEV("div", { ref: box, "data-region": "filter-menus", children: grouped ? /* @__PURE__ */ jsxDEV(
    Menu,
    {
      button: /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "i/filter", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
          lineNumber: 186,
          columnNumber: 23
        }, this),
        " ",
        count > 0 ? `${text("filters")} (${count})` : text("filters")
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
        lineNumber: 186,
        columnNumber: 21
      }, this),
      label: text("filters"),
      name: "filters",
      active: count > 0,
      place: "end",
      children: () => /* @__PURE__ */ jsxDEV("div", { "data-region": "filter-panel", children }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
        lineNumber: 192,
        columnNumber: 20
      }, this)
    },
    void 0,
    false,
    {
      fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
      lineNumber: 185,
      columnNumber: 20
    },
    this
  ) : children }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ds/Filters.tsx",
    lineNumber: 184,
    columnNumber: 12
  }, this);
}
__name(FilterGroup, "FilterGroup");
export {
  DateMenu,
  FilterGroup,
  StatusMenu,
  orderedDays
};
//# sourceMappingURL=Filters.dev.js.map
