import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { ErrorBoundary } from "./ClassPractice"; // Error Boundaries are class-only

function ClassPracticeHook({ title = "React Class All Concepts" }) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [users, setUsers] = useState(["Kalidas", "React", "Class"]);
  const [show, setShow] = useState(true);
  const [timer, setTimer] = useState(0);

  const inputRef = useRef(null);

  // Combines componentDidMount and componentWillUnmount
  useEffect(() => {
    console.log("componentDidMount (useEffect [])");
    inputRef.current?.focus();

    const id = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(id);
      console.log("componentWillUnmount cleanup (useEffect return)");
    };
  }, []);

  // Mimics componentDidUpdate specifically targeting 'count' changes
  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const decrement = () => setCount((c) => c - 1);
  const toggleShow = () => setShow((s) => !s);
  const handleChange = (e) => setText(e.target.value);

  const addUser = () => {
    if (!text.trim()) return;
    setUsers((u) => [...u, text.trim()]);
    setText("");
  };

  // Optimization: Mimics aspects of shouldComponentUpdate for specific node trees
  const renderedUsers = useMemo(() => {
    return users.map((user, index) => <li key={index}>{user}</li>);
  }, [users]);

  if (count === 5) {
    throw new Error("Test error boundary");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{title}</h1>

      <h3>Counter: {count}</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>

      {show && <p>This is conditionally rendered</p>}
      <button onClick={toggleShow} style={{ marginBottom: "16px" }}>Toggle Text</button>

      <hr />

      <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
        <input
          ref={inputRef}
          value={text}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <button onClick={addUser}>Add</button>
      </div>

      <ul>{renderedUsers}</ul>

      <hr />
      <p>Timer: {timer}s</p>
    </div>
  );
}

// Equates to pure component strategy or custom shouldComponentUpdate checks
const MemoClassPracticeHook = memo(ClassPracticeHook);

export default function HookApp() {
  return (
    <ErrorBoundary>
      <MemoClassPracticeHook title="React Hooks – Converted from Class" />
    </ErrorBoundary>
  );
}
