import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Home</h1>
      <Link to="/users">Go to Users</Link>
    </div>
  );
}
