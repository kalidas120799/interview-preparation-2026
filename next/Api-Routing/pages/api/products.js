import { apiHandler } from "../../lib/apiHandler";

export default apiHandler({
  get: async (req, res) => {
    res.status(200).json({
      message: "All products",
      data: [{ id: 1, name: "Laptop" }],
    });
  },

  delete: async (req, res) => {
    res.status(200).json({ message: "Product deleted" });
  },
});
