/* Client Component
"use client" is required when using React hooks or browser APIs. Without it, components become server components by 
default. Client components support interactivity. */

"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

/* Server Component
Server components run only on the server and reduce browser JavaScript size. 
They improve performance and security. They are default components in App Router. */

export default async function Users() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

/* Dynamic Import
Dynamic imports load components only when needed. 
This reduces initial bundle size and improves performance. It is useful for heavy components. */

import dynamic from "next/dynamic";

const Users = dynamic(() => import("./Users"));

export default function App() {
  return <Users />;
}

/* Server Action
Server actions allow server-side logic directly from components. 
They reduce API boilerplate and improve security. They work in App Router. */

async function saveData(formData) {
  "use server";

  console.log(formData.get("name"));
}

export default function Form() {
  return (
    <form action={saveData}>
      <input name="name" />
      <button type="submit">Save</button>
    </form>
  );
}