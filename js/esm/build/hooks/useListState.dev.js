var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
/**
 * What the person asked of a list, kept in the address of the page so that a refresh or a shared link shows the same list.
 *
 * Changing the state filters the list at once and never reloads the page; the address follows a moment later.
 *
 * @module     local_servicemanager/hooks/useListState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { parseState, stateQuery } from "../lib/listing";
const ADDRESS_DELAY = 300;
const useListState = /* @__PURE__ */ __name((perpage, options) => {
  const [state, setState] = useState(() => parseState(window.location.search, perpage, options));
  const timer = useRef(void 0);
  useEffect(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const url = window.location.pathname + stateQuery(state, perpage) + window.location.hash;
      window.history.replaceState(window.history.state, "", url);
    }, ADDRESS_DELAY);
    return () => window.clearTimeout(timer.current);
  }, [state, perpage]);
  const set = useCallback((changes) => {
    setState((before) => ({ ...before, page: 0, ...changes }));
  }, []);
  const reset = useCallback(() => {
    setState({ query: "", status: "", from: "", to: "", perpage, page: 0 });
  }, [perpage]);
  const extras = (state.from ? 1 : 0) + (state.to ? 1 : 0) + (state.perpage !== perpage ? 1 : 0);
  return { state, set, reset, extras };
}, "useListState");
export {
  useListState
};
//# sourceMappingURL=useListState.dev.js.map
