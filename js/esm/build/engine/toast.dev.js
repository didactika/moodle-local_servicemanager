var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Typed adapter for the toasts of Moodle, which have no native ESM module yet.
 *
 * @module     local_servicemanager/engine/toast
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { requireAsync } from "@moodle/lms/core/amd";
let loading = null;
const load = /* @__PURE__ */ __name(async () => {
  const module = await requireAsync("core/toast");
  return "default" in module ? module.default : module;
}, "load");
const addToast = /* @__PURE__ */ __name(async (message, options = {}) => {
  loading ??= load();
  const toast = await loading;
  await toast.add(message, options);
}, "addToast");
export {
  addToast
};
//# sourceMappingURL=toast.dev.js.map
