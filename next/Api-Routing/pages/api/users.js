import { apiHandler } from "../../lib/apiHandler";

export default apiHandler({
  get: async (req, res) => {
    res.status(200).json({
      message: "All users",
      data: [{ id: 1, name: "Kalidas" }],
    });
  },

  post: async (req, res) => {
    res.status(201).json({ message: "User created" });
  },
});
