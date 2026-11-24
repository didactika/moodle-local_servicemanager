var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The columns of a table that keep their width.
 *
 * @module     local_servicemanager/hooks/useStableColumns
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useLayoutEffect } from "react";
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
export {
  useStableColumns
};
//# sourceMappingURL=useStableColumns.dev.js.map
