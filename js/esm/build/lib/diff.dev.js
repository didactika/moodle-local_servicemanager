var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * How the rows of a comparison are shown: which are marked, which are folded away and where the changes are.
 *
 * @module     local_servicemanager/lib/diff
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const isChange = /* @__PURE__ */ __name((row) => row.kind !== "same", "isChange");
const changeStarts = /* @__PURE__ */ __name((rows) => {
  const starts = [];
  rows.forEach((row, index) => {
    if (isChange(row) && (index === 0 || !isChange(rows[index - 1]))) {
      starts.push(index);
    }
  });
  return starts;
}, "changeStarts");
const changeRuns = /* @__PURE__ */ __name((rows) => changeStarts(rows).map((start) => {
  let end = start;
  const kinds = /* @__PURE__ */ new Set();
  while (end < rows.length && isChange(rows[end])) {
    kinds.add(rows[end].kind);
    end++;
  }
  const only = kinds.size === 1 ? [...kinds][0] : "changed";
  return { start, kind: only === "added" || only === "removed" ? only : "changed", line: rows[start].right?.no ?? rows[start].left?.no ?? 0 };
}), "changeRuns");
const segments = /* @__PURE__ */ __name((rows, context, expanded = /* @__PURE__ */ new Set()) => {
  const keep = new Array(rows.length).fill(false);
  rows.forEach((row, index2) => {
    if (isChange(row)) {
      for (let near = Math.max(0, index2 - context); near <= Math.min(rows.length - 1, index2 + context); near++) {
        keep[near] = true;
      }
    }
  });
  const result = [];
  let index = 0;
  while (index < rows.length) {
    const start = index;
    const shows = keep[index];
    while (index < rows.length && keep[index] === shows) {
      index++;
    }
    if (shows || expanded.has(start)) {
      result.push({ type: "rows", rows: rows.slice(start, index).map((row, offset) => ({ row, index: start + offset })) });
    } else {
      result.push({ type: "folded", from: start, count: index - start });
    }
  }
  return result;
}, "segments");
const ofArea = /* @__PURE__ */ __name((changes, area) => changes.filter((change) => change.area === area), "ofArea");
export {
  changeRuns,
  changeStarts,
  isChange,
  ofArea,
  segments
};
//# sourceMappingURL=diff.dev.js.map
