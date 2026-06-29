export async function getStaticProps() {
  const res = await fetch("https://typicode.com");
  const data = await res.json();

  return {
    props: { data },
    revalidate: 10, // Next.js checks for data changes at most every 10 seconds
  };
}

export default function ISR({ data }) {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>ISR - Incremental Static Regeneration</h2>
      <p style={{ color: "gray" }}>Pre-rendered page that updates itself silently in the background every 10s.</p>
      {data.map((user) => (
        <p key={user.id}>👤 {user.name}</p>
      ))}
    </div>
  );
}
