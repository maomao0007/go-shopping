import axios from "axios";
const api = axios.create({
  baseURL: "https://goshopping-backend.onrender.com"
});

export default api;
