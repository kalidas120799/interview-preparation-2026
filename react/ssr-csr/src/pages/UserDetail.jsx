import React from "react";
import { useParams, Link } from "react-router-dom";

export default function UserDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>User Detail</h1>
      <p><strong>User ID:</strong> {id}</p>
      <Link to="/users">⬅ Back to Users</Link>
    </div>
  );
}
