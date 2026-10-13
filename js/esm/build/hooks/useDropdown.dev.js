var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * A menu that opens and closes: with its button, with Escape and with a click anywhere else.
 *
 * @module     local_servicemanager/hooks/useDropdown
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useCallback, useEffect, useRef, useState } from "react";
const useDropdown = /* @__PURE__ */ __name(() => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const toggle = useCallback(() => setOpen((before) => !before), []);
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
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return { open, toggle, ref };
}, "useDropdown");
export {
  useDropdown
};
//# sourceMappingURL=useDropdown.dev.js.map
