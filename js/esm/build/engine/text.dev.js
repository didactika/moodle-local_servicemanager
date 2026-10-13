var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Text of the page, which the server sends once with the properties of the component.
 *
 * @module     local_servicemanager/engine/text
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const createText = /* @__PURE__ */ __name((strings) => (name, value = "") => {
  const text = strings[name] ?? "";
  if (value !== null && typeof value === "object") {
    return Object.keys(value).reduce((result, key) => result.split(`{${key}}`).join(String(value[key])), text);
  }
  return text.replace("{n}", String(value));
}, "createText");
export {
  createText
};
//# sourceMappingURL=text.dev.js.map
