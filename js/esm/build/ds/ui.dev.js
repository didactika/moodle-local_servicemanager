var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The pieces the screens of the plugin are made of, drawn with the classes of Bootstrap, Moodle and the Didactika design system, as
 * the plugin Delegate account draws its lists: the icon, the search, the menu with the shape of a select, the sortable header, the
 * pager, the explanation that opens on a button and what a list says when it has nothing.
 *
 * @module     local_servicemanager/ds/ui
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { fitPageSizes, pageRange } from "../lib/paging";
import { place as float } from "../hooks/useDropdown";
function Icon({ name, text }) {
  return /* @__PURE__ */ jsxDEV("span", { className: "d-inline-flex", "aria-hidden": "true", dangerouslySetInnerHTML: { __html: text(`pix:${name}`) } }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 28,
    columnNumber: 12
  }, this);
}
__name(Icon, "Icon");
function SearchBox({ value, onChange, label, text }) {
  const id = useId();
  return /* @__PURE__ */ jsxDEV("div", { className: "position-relative d-flex align-items-center", role: "search", children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: "a/search", text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 40,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("label", { className: "visually-hidden", htmlFor: id, children: label }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 41,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      "input",
      {
        className: "form-control",
        type: "search",
        id,
        value,
        placeholder: label,
        autoComplete: "off",
        onChange: (event) => onChange(event.target.value),
        onKeyDown: (event) => event.key === "Enter" && event.preventDefault()
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
        lineNumber: 42,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 39,
    columnNumber: 12
  }, this);
}
__name(SearchBox, "SearchBox");
function Menu({ button, label, name, active = false, small = false, place = "", icon = false, onClear, text, children }) {
  const clearable = active && onClear !== void 0;
  const clear = text ? `${text("filter_clear")}: ${label}` : label;
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);
  const id = useId();
  useLayoutEffect(() => {
    if (root.current) {
      float(root.current);
    }
  }, [open]);
  useEffect(() => {
    if (!open) {
      return void 0;
    }
    const outside = /* @__PURE__ */ __name((event) => {
      if (!root.current?.contains(event.target)) {
        setOpen(false);
      }
    }, "outside");
    const keys = /* @__PURE__ */ __name((event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }, "keys");
    const scrolled = /* @__PURE__ */ __name((event) => {
      const box = event.target instanceof Element ? event.target : null;
      if (box && box.classList.contains("table-responsive") && box.contains(root.current)) {
        setOpen(false);
      }
    }, "scrolled");
    const resized = /* @__PURE__ */ __name(() => setOpen(false), "resized");
    document.addEventListener("pointerdown", outside, true);
    document.addEventListener("keydown", keys, true);
    document.addEventListener("scroll", scrolled, true);
    window.addEventListener("resize", resized);
    return () => {
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("keydown", keys, true);
      document.removeEventListener("scroll", scrolled, true);
      window.removeEventListener("resize", resized);
    };
  }, [open]);
  return /* @__PURE__ */ jsxDEV("span", { className: `${place === "up" ? "dropup" : "dropdown"} d-inline-flex`, "data-menu": name, ref: root, children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        ref: toggle,
        type: "button",
        className: icon ? "btn btn-link btn-icon btn-sm" : `form-select${small ? " form-select-sm" : ""}${active ? " border-primary" : ""}`,
        title: icon ? label : void 0,
        "aria-label": label,
        "aria-haspopup": "true",
        "aria-expanded": open,
        "aria-controls": open ? id : void 0,
        onClick: () => setOpen(!open),
        children: button
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
        lineNumber: 127,
        columnNumber: 9
      },
      this
    ),
    clearable && /* @__PURE__ */ jsxDEV(
      "button",
      {
        type: "button",
        className: "btn btn-link p-0",
        "data-menu-clear": true,
        title: clear,
        "aria-label": clear,
        onClick: () => {
          setOpen(false);
          onClear();
          toggle.current?.focus();
        },
        children: text && /* @__PURE__ */ jsxDEV(Icon, { name: "e/cancel", text }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
          lineNumber: 149,
          columnNumber: 19
        }, this)
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
        lineNumber: 139,
        columnNumber: 23
      },
      this
    ),
    open && /* @__PURE__ */ jsxDEV("div", { id, className: `dropdown-menu show${place === "end" ? " dropdown-menu-end" : ""}`, role: "group", "aria-label": label, children: children(() => {
      setOpen(false);
      toggle.current?.focus();
    }) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 150,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 126,
    columnNumber: 12
  }, this);
}
__name(Menu, "Menu");
function SelectMenu({ options: all, value, label, small = false, place = "", base, text, onChange }) {
  const chosen = all.find((option) => option.value === value);
  const options = base === void 0 ? all : all.filter((option) => option.value !== base);
  const set = base !== void 0 && value !== base;
  return /* @__PURE__ */ jsxDEV(
    Menu,
    {
      button: chosen?.label ?? label,
      label,
      small,
      place,
      active: set,
      text,
      onClear: base === void 0 ? void 0 : () => onChange(base),
      children: (close) => options.map((option) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          role: "option",
          className: "dropdown-item",
          "aria-selected": option.value === value,
          onClick: () => {
            close();
            if (option.value !== value) {
              onChange(option.value);
            }
          },
          children: option.label
        },
        option.value,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
          lineNumber: 188,
          columnNumber: 45
        },
        this
      ))
    },
    void 0,
    false,
    {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 179,
      columnNumber: 12
    },
    this
  );
}
__name(SelectMenu, "SelectMenu");
function SortHeader({ label, help, active, direction, onSort, col }) {
  let ariaSort;
  if (active) {
    ariaSort = direction === "asc" ? "ascending" : "descending";
  }
  return /* @__PURE__ */ jsxDEV("th", { scope: "col", "aria-sort": ariaSort, "data-col": col, children: /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-link", title: help, onClick: onSort, children: label }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 223,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 222,
    columnNumber: 12
  }, this);
}
__name(SortHeader, "SortHeader");
function Pager({ page, perpage, total, disabled, text, onChange }) {
  if (total === 0) {
    return null;
  }
  const { from, to } = pageRange(page, perpage, total);
  const { sizes, shown } = fitPageSizes(perpage, total);
  return /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-2 border-top", "data-region": "pager", children: /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center justify-content-between gap-3 small text-muted", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "d-none d-sm-flex align-items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV("span", { children: text("pagination_per_page") }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
        lineNumber: 251,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV(
        SelectMenu,
        {
          small: true,
          place: "up",
          label: text("pagination_per_page"),
          value: String(shown),
          options: sizes.map((size) => ({ value: String(size), label: size ? String(size) : text("pagination_all") })),
          onChange: (size) => onChange({ perpage: Number(size), page: 0 })
        },
        void 0,
        false,
        {
          fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
          lineNumber: 252,
          columnNumber: 17
        },
        this
      )
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 250,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap align-items-center gap-3 ms-auto", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-body text-nowrap", role: "status", "data-region": "range", children: text("pagination_range", { from, to, total }) }, void 0, false, {
        fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
        lineNumber: 262,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "d-flex gap-1", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            className: "btn btn-outline-secondary btn-sm btn-icon",
            disabled: disabled || page === 0,
            title: text("pagination_previous"),
            "aria-label": text("pagination_previous"),
            onClick: () => onChange({ page: page - 1 }),
            children: /* @__PURE__ */ jsxDEV(Icon, { name: "i/previous", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
              lineNumber: 272,
              columnNumber: 25
            }, this)
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
            lineNumber: 264,
            columnNumber: 21
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            className: "btn btn-outline-secondary btn-sm btn-icon",
            disabled: disabled || to >= total,
            title: text("pagination_next"),
            "aria-label": text("pagination_next"),
            onClick: () => onChange({ page: page + 1 }),
            children: /* @__PURE__ */ jsxDEV(Icon, { name: "i/next", text }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
              lineNumber: 282,
              columnNumber: 25
            }, this)
          },
          void 0,
          false,
          {
            fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
            lineNumber: 274,
            columnNumber: 21
          },
          this
        )
      ] }, void 0, true, {
        fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
        lineNumber: 263,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 261,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 249,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 248,
    columnNumber: 12
  }, this);
}
__name(Pager, "Pager");
const TABLE_MIN = 288;
const TABLE_ROOM = 24;
function useFitHeight(box) {
  useLayoutEffect(() => {
    const fit = /* @__PURE__ */ __name(() => {
      const element = box.current;
      if (!element || element.querySelector('[data-region="empty"]')) {
        return;
      }
      const rect = element.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const frame = element.closest(".card");
      const card2 = frame?.getBoundingClientRect();
      const line = frame ? parseFloat(getComputedStyle(frame).borderBottomWidth) || 0 : 0;
      const below = card2 ? Math.max(0, card2.bottom - rect.bottom - line) : 0;
      const height = Math.max(TABLE_MIN, window.innerHeight - top - below - TABLE_ROOM);
      const holder = frame ?? element;
      holder.style.setProperty("--dd-table-h", height + "px");
      holder.style.setProperty("--dd-foot-h", below + "px");
    }, "fit");
    fit();
    const observer = new ResizeObserver(() => fit());
    observer.observe(document.body);
    const card = box.current?.closest(".card");
    if (card) {
      observer.observe(card);
    }
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);
}
__name(useFitHeight, "useFitHeight");
function TableBox({ busy, empty, children }) {
  const box = useRef(null);
  useFitHeight(box);
  return /* @__PURE__ */ jsxDEV("div", { ref: box, className: "table-responsive", "data-region": "tablewrap", "aria-busy": busy, children: empty || children }, void 0, false, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 351,
    columnNumber: 12
  }, this);
}
__name(TableBox, "TableBox");
function Empty({ icon, message, action, onAction, text }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-column align-items-center gap-2 px-4 py-5 text-center", "data-region": "empty", role: "status", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "icon-box", children: /* @__PURE__ */ jsxDEV(Icon, { name: icon, text }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 371,
      columnNumber: 36
    }, this) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 371,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-muted mb-0", children: message }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 372,
      columnNumber: 9
    }, this),
    action && onAction && /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-outline-secondary btn-sm", onClick: onAction, children: action }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 373,
      columnNumber: 32
    }, this)
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 370,
    columnNumber: 12
  }, this);
}
__name(Empty, "Empty");
function Dialog({ title, children, footer, onClose, text }) {
  const root = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    document.body.classList.add("modal-open");
    root.current?.querySelector(".modal-footer .btn")?.focus();
    return () => {
      document.body.classList.remove("modal-open");
      previous?.focus();
    };
  }, []);
  return createPortal(/* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        ref: root,
        className: "modal show d-block",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": titleId,
        tabIndex: -1,
        onKeyDown: (event) => event.key === "Escape" && onClose(),
        onMouseDown: (event) => event.target === event.currentTarget && onClose(),
        children: /* @__PURE__ */ jsxDEV("div", { className: "modal-dialog modal-dialog-scrollable", children: /* @__PURE__ */ jsxDEV("div", { className: "modal-content", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "modal-header", children: [
            /* @__PURE__ */ jsxDEV("h5", { className: "modal-title", id: titleId, children: title }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
              lineNumber: 416,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn-close", "aria-label": text("core_closebuttontitle"), onClick: onClose }, void 0, false, {
              fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
              lineNumber: 417,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
            lineNumber: 415,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "modal-body", children }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
            lineNumber: 419,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "modal-footer", children: footer ?? /* @__PURE__ */ jsxDEV("button", { type: "button", className: "btn btn-secondary", onClick: onClose, children: text("core_closebuttontitle") }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
            lineNumber: 421,
            columnNumber: 36
          }, this) }, void 0, false, {
            fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
            lineNumber: 420,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
          lineNumber: 414,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
          lineNumber: 413,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
        lineNumber: 403,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "modal-backdrop show" }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 426,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 402,
    columnNumber: 25
  }, this), document.body);
}
__name(Dialog, "Dialog");
function useStableColumns(table, ready) {
  useLayoutEffect(() => {
    const element = table.current;
    const box = element?.parentElement;
    if (!element || !box || !ready) {
      return void 0;
    }
    const freeze = /* @__PURE__ */ __name(() => {
      const heads = Array.from(element.tHead?.rows[0]?.cells ?? []);
      element.style.tableLayout = "";
      heads.forEach((head) => {
        head.style.width = "";
      });
      const widths = heads.map((head) => head.getBoundingClientRect().width);
      heads.forEach((head, index) => {
        head.style.width = `${widths[index]}px`;
      });
      element.style.tableLayout = "fixed";
    }, "freeze");
    freeze();
    let width = box.clientWidth;
    const observer = new ResizeObserver(() => {
      if (Math.abs(box.clientWidth - width) > 1) {
        width = box.clientWidth;
        freeze();
      }
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, [ready]);
}
__name(useStableColumns, "useStableColumns");
function FloatBar({ count, label, onClear, children, text }) {
  if (count === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "card", role: "region", "aria-label": label, "data-region": "bulk-actions", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "fw-bold text-nowrap", role: "status", children: text("selected_count", count) }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 486,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "d-flex flex-wrap gap-2", children }, void 0, false, {
      fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
      lineNumber: 487,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        type: "button",
        className: "btn-close",
        title: text("clear_selection"),
        "aria-label": text("clear_selection"),
        onClick: onClear
      },
      void 0,
      false,
      {
        fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
        lineNumber: 488,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "public/local/servicemanager/js/esm/src/ds/ui.tsx",
    lineNumber: 485,
    columnNumber: 12
  }, this);
}
__name(FloatBar, "FloatBar");
export {
  Dialog,
  Empty,
  FloatBar,
  Icon,
  Menu,
  Pager,
  SearchBox,
  SelectMenu,
  SortHeader,
  TableBox,
  useFitHeight,
  useStableColumns
};
//# sourceMappingURL=ui.dev.js.map
