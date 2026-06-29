import React, { useState, useEffect } from "react";

export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState([]);

  // ✅ Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // ✅ API Call (only after debounce)
  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((user) =>
          user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setUsers(filtered);
      });
  }, [debouncedQuery]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Debounced Search</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
