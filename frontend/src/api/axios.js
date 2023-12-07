import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
  validateStatus: function (status) {
    // Always resolves the promise, regardless of the status code
    return true; // Resolve the promise for all HTTP status codes
  }
});

export default apiClient;