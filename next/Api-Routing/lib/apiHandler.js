export function apiHandler(handlers) {
  return async (req, res) => {
    // 1. Extract and normalize HTTP method
    const method = req.method?.toLowerCase();

    // 2. Reject unsupported methods
    if (!method || !handlers[method]) {
      res.setHeader("Allow", Object.keys(handlers).map((m) => m.toUpperCase()));
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    try {
      // 3. Execute the matching route handler
      await handlers[method](req, res);
    } catch (err) {
      // 4. Global catch-all error fallback
      console.error("API Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
