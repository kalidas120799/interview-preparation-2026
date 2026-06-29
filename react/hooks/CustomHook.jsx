import { useState } from "react";

// ✅ Reusable custom hook encapsulating counter state and logic
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return { count, increment, decrement };
}

export default function CounterComponent() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div style={{ padding: "16px" }}>
      <p>
        Count: <b>{count}</b>
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  );
}
