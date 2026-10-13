var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * The schemas chosen in the list, and what can be done with them together.
 *
 * @module     local_servicemanager/hooks/useBulkSelection
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useCallback, useMemo, useState } from "react";
import { bulkActions } from "../lib/selection";
const useBulkSelection = /* @__PURE__ */ __name((rows, all = rows) => {
  const [chosen, setChosen] = useState(/* @__PURE__ */ new Set());
  const toggle = useCallback((id) => {
    setChosen((before) => {
      const next = new Set(before);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);
  const allChosen = rows.length > 0 && rows.every((row) => chosen.has(row.id));
  const toggleAll = useCallback(() => {
    setChosen(allChosen ? /* @__PURE__ */ new Set() : new Set(rows.map((row) => row.id)));
  }, [allChosen, rows]);
  const clear = useCallback(() => setChosen(/* @__PURE__ */ new Set()), []);
  const actions = useMemo(() => bulkActions(all, chosen), [all, chosen]);
  return { chosen, allChosen, actions, toggle, toggleAll, clear };
}, "useBulkSelection");
export {
  useBulkSelection
};
//# sourceMappingURL=useBulkSelection.dev.js.map
