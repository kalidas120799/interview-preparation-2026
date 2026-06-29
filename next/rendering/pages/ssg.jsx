export async function getStaticProps() {
  const res = await fetch("https://typicode.com");
  const data = await res.json();

  // Passes data during the 'npm run build' process
  return { props: { data } };
}

export default function SSG({ data }) {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>SSG - Static Site Generation</h2>
      <p style={{ color: "gray" }}>This page is a flat, pre-built HTML file. It never refetches data on its own.</p>
      {data.map((user) => (
        <p key={user.id}>👤 {user.name}</p>
      ))}
    </div>
  );
}
