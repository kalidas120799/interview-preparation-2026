import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");

  const makeApiCall = async (endpoint) => {
    try {
      const res = await fetch(endpoint, {
        headers: { authorization: "token123" }, // Try removing this to test 401 errors
      });
      const data = await res.json();
      setResult(data.message);
    } catch (err) {
      setResult("Failed to fetch data");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Next.js Clean API Example</h1>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => makeApiCall("/api/users")}>Get Users</button>
        <button onClick={() => makeApiCall("/api/products")}>Get Products</button>
      </div>

      <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "5px" }}>
        <strong>Server Response:</strong> {result || "No requests sent yet."}
      </div>
    </div>
  );
}
