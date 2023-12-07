import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

export default apiClient;
