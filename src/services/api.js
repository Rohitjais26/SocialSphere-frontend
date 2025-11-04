import axios from "axios";

const API = axios.create({
  // FIX: Use the Vercel-specific environment variable for the API's base URL.
  // This variable must be set on the Vercel platform to your live Render API URL.
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token to every request if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
