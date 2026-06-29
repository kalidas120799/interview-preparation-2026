import React, { useRef, useState } from "react";

export default function App() {
  // ----------------------------
  // 1) Local Component State
  // ----------------------------
  const [count, setCount] = useState(0);

  // ----------------------------
  // 2) Controlled Component
  // ----------------------------
  const [controlledName, setControlledName] = useState("");

  const handleControlledSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Controlled Submitted: ${controlledName}`);
    setControlledName(""); // Clear input
  };

  // ----------------------------
  // 3) Uncontrolled Component
  // ----------------------------
  const uncontrolledRef = useRef(null);

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    const value = uncontrolledRef.current.value;
    alert(`✅ Uncontrolled Submitted: ${value}`);
    uncontrolledRef.current.value = ""; // Clear input
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>React State Management Concepts</h1>

      {/* 1) Local Component State */}
      <section style={{ marginBottom: "24px" }}>
        <h2>1) Local Component State</h2>
        <p>State lives inside the component (e.g., counter/toggle UI states).</p>

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setCount((c) => c + 1)}>+ Increment</button>
          <button onClick={() => setCount((c) => c - 1)}>- Decrement</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>

        <p>
          Count: <b>{count}</b>
        </p>
      </section>

      {/* 2) Controlled Component */}
      <section style={{ marginBottom: "24px" }}>
        <h2>2) Controlled Component</h2>
        <p>Input value is controlled by React state (single source of truth).</p>

        <form onSubmit={handleControlledSubmit} style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={controlledName}
            onChange={(e) => setControlledName(e.target.value)}
            placeholder="Type name (controlled)"
          />
          <button type="submit">Submit</button>
        </form>

        <p>
          Live Preview: <b>{controlledName || "(empty)"}</b>
        </p>
      </section>

      {/* 3) Uncontrolled Component */}
      <section style={{ marginBottom: "24px" }}>
        <h2>3) Uncontrolled Component</h2>
        <p>DOM manages the input value. React reads it using a ref when needed.</p>

        <form onSubmit={handleUncontrolledSubmit} style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            ref={uncontrolledRef}
            placeholder="Type name (uncontrolled)"
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}
