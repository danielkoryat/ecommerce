import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  withCredentials: true,
  credentials: "include",
  timeout: 50004,
});


export default apiClient;
