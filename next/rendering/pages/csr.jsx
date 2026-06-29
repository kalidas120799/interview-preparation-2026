import { useEffect, useState } from "react";

export default function CSR() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://typicode.com")
      .then((res) => res.json())
      .then((users) => {
        setData(users);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "40px" }}>Loading data from browser...</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>CSR - Client Side Rendering</h2>
      <p style={{ color: "gray" }}>Data is fetched by your browser after the page loads.</p>
      {data.map((user) => (
        <p key={user.id}>👤 {user.name}</p>
      ))}
    </div>
  );
}
