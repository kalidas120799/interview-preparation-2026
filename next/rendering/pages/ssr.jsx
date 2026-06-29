export async function getServerSideProps() {
  const res = await fetch("https://typicode.com");
  const data = await res.json();

  // Passes data directly to the component below at request-time
  return { props: { data } };
}

export default function SSR({ data }) {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>SSR - Server Side Rendering</h2>
      <p style={{ color: "gray" }}>This data was compiled on the server for this exact request.</p>
      {data.map((user) => (
        <p key={user.id}>👤 {user.name}</p>
      ))}
    </div>
  );
}
