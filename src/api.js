import axios from "axios";
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://goshopping-backend.onrender.com"
      : "http://localhost:5001",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
