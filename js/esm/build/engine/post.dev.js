var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Send the browser to a page of the plugin with a form, which is how the actions that change something are asked for: they are
 * checked with the session key, answered by a page and followed by the notification of Moodle.
 *
 * @module     local_servicemanager/engine/post
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const postForm = /* @__PURE__ */ __name((url, fields) => {
  const form = document.createElement("form");
  form.method = "post";
  form.action = url;
  form.hidden = true;
  for (const [name, value] of Object.entries(fields)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = Array.isArray(value) ? `${name}[]` : name;
      input.value = String(item);
      form.appendChild(input);
    }
  }
  document.body.appendChild(form);
  form.submit();
}, "postForm");
export {
  postForm
};
//# sourceMappingURL=post.dev.js.map
