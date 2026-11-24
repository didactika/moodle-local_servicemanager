var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A menu that opens and closes: with its button, with Escape and with a click anywhere else.
 *
 * A menu in a box that scrolls, such as the table of a list, floats next to its button, so the box never cuts it, and
 * closes when the box scrolls or the window changes size.
 *
 * @module     local_servicemanager/hooks/useDropdown
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
const place = /* @__PURE__ */ __name((holder) => {
  const button = holder.querySelector("button");
  const menu = holder.querySelector(".dropdown-menu");
  if (!button || !menu) {
    return;
  }
  menu.style.position = "";
  menu.style.inset = "";
  if (!holder.closest(".table-responsive") || !menu.classList.contains("show")) {
    return;
  }
  const gap = 2;
  const edge = 8;
  menu.style.position = "fixed";
  menu.style.inset = "0 auto auto 0";
  const rect = button.getBoundingClientRect();
  const left = Math.max(edge, Math.min(rect.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - edge));
  const below = rect.bottom + gap;
  const top = below + menu.offsetHeight > window.innerHeight - edge ? Math.max(edge, rect.top - menu.offsetHeight - gap) : below;
  const origin = menu.getBoundingClientRect();
  menu.style.inset = `${top - origin.top}px auto auto ${left - origin.left}px`;
}, "place");
const useDropdown = /* @__PURE__ */ __name(() => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const toggle = useCallback(() => setOpen((before) => !before), []);
  useLayoutEffect(() => {
    if (ref.current) {
      place(ref.current);
    }
  }, [open]);
  useEffect(() => {
    if (!open) {
      return void 0;
    }
    const away = /* @__PURE__ */ __name((event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }, "away");
    const escape = /* @__PURE__ */ __name((event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }, "escape");
    const scrolled = /* @__PURE__ */ __name((event) => {
      const box = event.target instanceof Element ? event.target : null;
      if (box && box.classList.contains("table-responsive") && box.contains(ref.current)) {
        setOpen(false);
      }
    }, "scrolled");
    const resized = /* @__PURE__ */ __name(() => setOpen(false), "resized");
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", escape);
    document.addEventListener("scroll", scrolled, true);
    window.addEventListener("resize", resized);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", escape);
      document.removeEventListener("scroll", scrolled, true);
      window.removeEventListener("resize", resized);
    };
  }, [open]);
  return { open, toggle, ref };
}, "useDropdown");
export {
  place,
  useDropdown
};
//# sourceMappingURL=useDropdown.dev.js.map
