import React, { useEffect, useState } from "react";

export default function LiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        setStatus("loading");
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Search failed");
        }

        const data = await res.json();
        setResults(data);
        setStatus("idle");
      } catch (e) {
        if (e.name === "AbortError") return; // Ignore aborted request
        setStatus("error");
      }
    };

    fetchResults();

    return () => {
      controller.abort(); // Abort previous request when query changes
    };
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
      />

      {status === "loading" && <p>Searching…</p>}
      {status === "error" && <p style={{ color: "red" }}>Error loading results</p>}

      <ul>
        {results.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}
