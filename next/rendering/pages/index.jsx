import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Next.js Rendering Strategies</h1>
      <p>Click the links below to see how each method renders data:</p>
      
      <ul style={{ lineHeight: "2" }}>
        <li><Link href="/csr">🔗 CSR Example (Client-Side Rendering)</Link></li>
        <li><Link href="/ssr">🔗 SSR Example (Server-Side Rendering)</Link></li>
        <li><Link href="/ssg">🔗 SSG Example (Static Site Generation)</Link></li>
        <li><Link href="/isr">🔗 ISR Example (Incremental Static Regeneration)</Link></li>
      </ul>
    </div>
  );
}
