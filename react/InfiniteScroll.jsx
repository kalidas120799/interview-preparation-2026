import React, { useEffect, useRef, useState } from "react";

const DUMMY_POSTS = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  body: `This is dummy post content for post ${i + 1}`,
}));

export default function InfiniteScroll() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total] = useState(DUMMY_POSTS.length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loaderRef = useRef(null);
  const limit = 10;
  const hasMore = items.length < total;

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        await new Promise((r) => setTimeout(r, 400));

        const start = (page - 1) * limit;
        const end = start + limit;
        const nextChunk = DUMMY_POSTS.slice(start, end);

        if (ignore) return;

        setItems((prev) => [...prev, ...nextChunk]);
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
  }, [page]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  const reset = () => {
    setItems([]);
    setPage(1);
    setError("");
  };

  return (
    <div style={{ padding: 16, maxWidth: 720, margin: "0 auto" }}>
      <h2>Infinite Scroll (Dummy Data)</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <p style={{ margin: 0 }}>
          Loaded: <b>{items.length}</b> / {total}
        </p>
        <button onClick={reset} style={{ padding: "6px 10px" }}>
          Reset
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ paddingLeft: 18 }}>
        {items.map((p) => (
          <li key={p.id} style={{ marginBottom: 12 }}>
            <b>{p.title}</b>
            <div>{p.body}</div>
          </li>
        ))}
      </ul>

      <div ref={loaderRef} style={{ height: 1 }} />

      <div style={{ padding: "12px 0" }}>
        {loading && <p>Loading more...</p>}
        {!loading && !hasMore && <p>✅ All items loaded</p>}
      </div>
    </div>
  );
}
