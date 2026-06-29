import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

async function addUserApi(newUser) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!res.ok) {
    throw new Error("Failed to add user");
  }
  return res.json();
}

function UsersPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ GET: Fetching data with query caching
  const {
    data: users,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 10000, // Data remains fresh for 10 seconds
  });

  // ✅ POST: Mutating data and invalidating stale cache entries
  const addUser = useMutation({
    mutationFn: addUserApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setName("");
      setEmail("");
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2>React Query (Single File) - GET + POST</h2>

      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refetch Users"}
      </button>

      <ul>
        {users?.map((u) => (
          <li key={u.id}>
            <b>{u.name}</b> — {u.email}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Add User (POST)</h3>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button
          onClick={() => addUser.mutate({ name, email })}
          disabled={addUser.isPending || !name || !email}
        >
          {addUser.isPending ? "Adding..." : "Add"}
        </button>
      </div>

      {addUser.isError && (
        <p style={{ color: "red" }}>Error: {addUser.error.message}</p>
      )}
      {addUser.isSuccess && <p style={{ color: "green" }}>Added ✅</p>}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
