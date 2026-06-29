import React, { useState, createContext, useContext } from "react";

const CounterContext = createContext({
  count: 0,
  setCount: () => {},
});

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export function CounterUI() {
  const { count, setCount } = useContext(CounterContext);

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Click
      </button>
    </div>
  );
}

export default function AppWithContext() {
  return (
    <CounterProvider>
      <CounterUI />
    </CounterProvider>
  );
}
