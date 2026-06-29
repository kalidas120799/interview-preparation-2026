import React, { Suspense, lazy } from "react";

// ✅ Lazy import
const HeavyComponent = lazy(() => import("./HeavyComponent"));

export default function App() {
  return (
    <div>
      <h1>Main App</h1>

      <Suspense fallback={<p>Loading...</p>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
