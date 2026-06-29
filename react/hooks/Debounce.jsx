import React, { useState, useEffect } from "react";

// ✅ Reusable custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // Cleanup on fast keystrokes
  }, [value, delay]);

  return debouncedValue;
}

export default function DebouncedSearchApp() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const debouncedQuery = useDebounce(query, 500);

  // ✅ API call runs only when debounced value changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setUsers([]);
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network error");
        }
        return res.json();
      })
      .then((data) => {
        const filtered = data.filter((u) =>
          u.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setUsers(filtered);
      })
      .catch((err) => console.error(err));
  }, [debouncedQuery]);

  return (
    <div style={{ padding: "16px" }}>
      <h2>Debounced User Search</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "100%", maxWidth: "300px" }}
      />

      <ul style={{ marginTop: "12px" }}>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
