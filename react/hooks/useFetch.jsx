import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serialize options object safely to avoid infinite re-render loops
  const serializedOptions = JSON.stringify(options);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const parsedOptions = serializedOptions ? JSON.parse(serializedOptions) : {};
        const res = await fetch(url, { ...parsedOptions, signal: controller.signal });

        if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        if (err.name === "AbortError") return; // Ignore expected browser abort events
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cancel pending network requests if URL or options change
    };
  }, [url, serializedOptions]);

  return { data, loading, error };
}
