    import React, { useEffect, useState } from "react";

const DUMMY_POSTS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  body: `This is dummy post content for post ${i + 1}`,
}));

export default function App() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const limit = 10;

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        await new Promise((r) => setTimeout(r, 300));

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = DUMMY_POSTS.slice(start, end);

        if (ignore) return;

        setItems(paginatedData);
        setTotal(DUMMY_POSTS.length);
      } catch (e) {
        if (!ignore) setError(e.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: 16 }}>
      <h2>Dummy Pagination</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {items.map((p) => (
          <li key={p.id}>
            <b>{p.title}</b>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
