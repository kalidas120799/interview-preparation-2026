export async function getStaticPaths() {
  const res = await fetch("https://typicode.com");
  const users = await res.json();

  // Generate the URL parameter list for the build system
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Throws a 404 error if the user ID doesn't exist
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://typicode.com/${params.id}`);
  const user = await res.json();

  return {
    props: { user },
  };
}

export default function UserPage({ user }) {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>User Details Page</h2>
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.company?.name}</p>
      </div>
    </div>
  );
}
