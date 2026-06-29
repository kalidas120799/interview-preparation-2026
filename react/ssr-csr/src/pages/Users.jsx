import React from "react";
import { Link } from "react-router-dom";

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
];

export default function Users() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Users</h1>
      {users.map((u) => (
        <div key={u.id} style={{ margin: "10px 0" }}>
          <Link to={`/users/${u.id}`} style={{ textDecoration: "none", color: "blue" }}>
            <span>👤 {u.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
