import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api"
});

function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

API.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers["x-auth-token"] = token;
  }

  return request;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    const isAuthError = status === 401 || (status === 400 && message === "Invalid token.");

    if (isAuthError) {
      clearAuth();
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const getStreak = () => API.get("/streak");
export const markStreak = () => API.post("/streak/complete");
export const addHealthEntry = (data) => API.post("/health", data);
export const getHealthEntries = () => API.get("/health");

export default API;
