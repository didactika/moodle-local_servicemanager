var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * Copying a text to the clipboard, and saying so for a moment.
 *
 * @module     local_servicemanager/hooks/useCopy
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useCallback, useEffect, useRef, useState } from "react";
const CONFIRMATION_TIME = 2e3;
const write = /* @__PURE__ */ __name(async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
    }
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
  document.body.appendChild(field);
  field.focus();
  field.select();
  let done = false;
  try {
    done = document.execCommand("copy");
  } catch {
    done = false;
  }
  document.body.removeChild(field);
  return done;
}, "write");
const useCopy = /* @__PURE__ */ __name(() => {
  const [state, setState] = useState("idle");
  const timer = useRef(void 0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = useCallback((text) => {
    write(text).then((done) => {
      setState(done ? "copied" : "failed");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setState("idle"), CONFIRMATION_TIME);
      return done;
    }).catch(() => setState("failed"));
  }, []);
  return { copied: state === "copied", failed: state === "failed", copy };
}, "useCopy");
export {
  useCopy
};
//# sourceMappingURL=useCopy.dev.js.map
