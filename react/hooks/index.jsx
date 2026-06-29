import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useReducer,
  useContext,
  useRef,
  useOptimistic,
  useActionState,
  startTransition, // global startTransition API
  useTransition,
  useDeferredValue,
  useId,
  createContext,
} from "react";

/** -----------------------------------------------------
 *  1) useContext setup (Theme)
 * ----------------------------------------------------- */
const ThemeContext = createContext({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // ✅ useState

  const toggle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []); // ✅ useCallback

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]); // ✅ useMemo

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  return useContext(ThemeContext); // ✅ useContext
}

/** -----------------------------------------------------
 *  2) useReducer setup (Counter)
 * ----------------------------------------------------- */
function counterReducer(state, action) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

/** -----------------------------------------------------
 *  3) Heavy Task Simulator Helpers
 * ----------------------------------------------------- */
function makeBigList(size = 5000) {
  return Array.from({ length: size }, (_, i) => `Item ${i + 1}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** -----------------------------------------------------
 *  Main Core Component
 * ----------------------------------------------------- */
export default function HooksExample() {
  const { theme, toggle } = useTheme();

  /** ✅ useId (Stable unique accessibility IDs) */
  const searchId = useId();
  const todoId = useId();

  /** ✅ useRef (DOM reference + tracking render count without re-rendering) */
  const searchInputRef = useRef(null);
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  /** ✅ useState (Basic state blocks) */
  const [bigList, setBigList] = useState(() => makeBigList(5000));
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(() => bigList.slice(0, 30));

  /** ✅ useDeferredValue (Defers a value to prioritize urgent updates) */
  const deferredSearch = useDeferredValue(search);

  /** ✅ useTransition (Marks updates as non-blocking) */
  const [isPending, startUiTransition] = useTransition();

  /** ✅ useReducer (Complex state machine) */
  const [counter, dispatch] = useReducer(counterReducer, { count: 0 });

  /** ✅ useEffect (Data fetching lifecycle orchestration with cleanup) */
  const [serverStatus, setServerStatus] = useState("loading...");
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await sleep(400); // Simulated API latency
      if (!cancelled) setServerStatus("ready ✅");
    })();
    return () => {
      cancelled = true; // Cleanup block prevents race conditions
    };
  }, []);

  /** ✅ useMemo (Caches heavy filtering calculations across renders) */
  const memoFiltered = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    if (!q) return bigList.slice(0, 30);
    return bigList.filter((x) => x.toLowerCase().includes(q)).slice(0, 30);
  }, [bigList, deferredSearch]);

  /** ✅ useCallback (Prevents handler function re-creation on every re-render) */
  const onSearchChange = useCallback(
    (e) => {
      const value = e.target.value;

      // 1. Urgent state operation (Must run instantly for smooth input field typing)
      setSearch(value);

      // 2. Non-urgent state operation (Can be interrupted if user continues typing)
      startUiTransition(() => {
        const q = value.trim().toLowerCase();
        const next = !q
          ? bigList.slice(0, 30)
          : bigList.filter((x) => x.toLowerCase().includes(q)).slice(0, 30);
        setResults(next);
      });
    },
    [bigList, startUiTransition]
  );

  /** ✅ startTransition (Global execution framework for massive computations) */
  const regenerateBigList = () => {
    startTransition(() => {
      const newList = makeBigList(8000);
      setBigList(newList);
      setSearch("");
      setResults(newList.slice(0, 30));
    });
  };

  /** -----------------------------------------------------
   *  React 19 Optimistic Mutations Layer
   * ----------------------------------------------------- */
  const [todos, setTodos] = useState([{ id: 1, text: "Learn Hooks", pending: false }]);

  /** ✅ useOptimistic (Instantly flashes predicted state values to UI) */
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (current, newTodo) => [...current, newTodo]
  );

  /**
   * ✅ useActionState (React 19 Form Action Manager)
   * - Format: [state, formAction, pending]
   * - Arguments: (prevState, formData)
   */
  const [actionState, addTodoAction, todoPending] = useActionState(
    async (prevState, formData) => {
      const text = String(formData.get("todo") || "").trim();
      if (!text) return { message: "Please type a todo.", ok: false };

      const tempId = Date.now();

      // Trigger optimistic addition (Must execute inside an async Action context)
      addOptimisticTodo({ id: tempId, text, pending: true });

      await sleep(700); // Simulating backend API post request

      // Real state synchronization
      setTodos((t) => [...t, { id: tempId, text, pending: false }]);
      return { message: "Todo saved ✅", ok: true };
    },
    { message: "", ok: true }
  );

  /** UI Command Wrapper using DOM refs */
  const focusSearch = () => searchInputRef.current?.focus();

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <h2>Single File Demo: All Hooks</h2>
      <p>Theme (useContext): <b>{theme}</b> | Server status (useEffect): <b>{serverStatus}</b></p>
      <p>Renders (useRef): <b>{rendersRef.current}</b></p>

      <button onClick={toggle}>Toggle Theme</button>{" "}
      <button onClick={focusSearch}>Focus Search</button>{" "}
      <button onClick={regenerateBigList}>Regenerate Big List (startTransition)</button>

      <hr />

      <h3>useReducer Counter</h3>
      <p>Count: <b>{counter.count}</b></p>
      <button onClick={() => dispatch({ type: "dec" })}>-</button>{" "}
      <button onClick={() => dispatch({ type: "inc" })}>+</button>{" "}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>

      <hr />

      <h3>Search Large List (useTransition + useDeferredValue + useMemo)</h3>
      <label htmlFor={searchId}>Search:</label>{" "}
      <input
        id={searchId}
        ref={searchInputRef}
        value={search}
        onChange={onSearchChange}
        placeholder="Type to filter..."
      />
      <p>
        Transition pending (useTransition): <b>{String(isPending)}</b> | Deferred value:
        <b> {deferredSearch}</b>
      </p>

      <p style={{ color: "#666" }}>
        (Showing results from state update) Results: <b>{results.length}</b> | (Memo results:{" "}
        <b>{memoFiltered.length}</b>)
      </p>

      <ul>
        {results.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <hr />

      <h3>Optimistic Todo Form (useOptimistic + useActionState)</h3>
      <form action={addTodoAction}>
        <label htmlFor={todoId}>Todo:</label>{" "}
        <input id={todoId} name="todo" placeholder="Add todo..." />
        <button type="submit" disabled={todoPending}>
          {todoPending ? "Saving..." : "Add"}
        </button>
      </form>

      {actionState.message && (
        <p style={{ color: actionState.ok ? "green" : "crimson" }}>{actionState.message}</p>
      )}

      <ul>
        {optimisticTodos.map((t) => (
          <li key={t.id}>
            {t.text} {t.pending ? <i>(sending...)</i> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
