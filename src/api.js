import axios from "axios";
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://goshopping-backend.onrender.com"
      : "http://localhost:5001",
});

export default api;
