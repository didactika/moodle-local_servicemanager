var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * How a status is shown: the colour of its badge and its icon.
 *
 * @module     local_servicemanager/lib/status
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const LOOKS = {
  healthy: { tone: "success", icon: "circle-check" },
  warning: { tone: "warning", icon: "triangle-exclamation" },
  critical: { tone: "danger", icon: "circle-xmark" },
  history: { tone: "secondary", icon: "clock" }
};
const statusLook = /* @__PURE__ */ __name((status) => LOOKS[status] ?? LOOKS.healthy, "statusLook");
export {
  statusLook
};
//# sourceMappingURL=status.dev.js.map
