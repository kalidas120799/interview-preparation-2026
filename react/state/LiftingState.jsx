import React, { useState } from "react";

function ControlPanel({ count, onIncrement, onDecrement }) {
  return (
    <div>
      <h3>ControlPanel (Sibling)</h3>
      <p>Count here: {count}</p>

      <button onClick={onIncrement}>+ Increment</button>
      <button onClick={onDecrement}>- Decrement</button>
    </div>
  );
}

function DisplayPanel({ count }) {
  return (
    <div>
      <h4>DisplayPanel (Deep Child)</h4>
      <p>Count shown deep: {count}</p>
    </div>
  );
}

function Dashboard({ count }) {
  return (
    <div>
      <h3>Dashboard (Intermediate)</h3>
      <p>Dashboard doesn't use count, just passes it down 👇</p>
      <DisplayPanel count={count} />
    </div>
  );
}

export default function AppWithLiftingState() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return (
    <div style={{ padding: "16px" }}>
      <h2>Lifting State Up + Prop Drilling</h2>
      <p>
        <b>Shared State in App:</b> {count}
      </p>
      <hr />

      <ControlPanel
        count={count}
        onIncrement={increment}
        onDecrement={decrement}
      />
      <hr />

      <Dashboard count={count} />
    </div>
  );
}