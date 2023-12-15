import axios from "axios";

//TODO create a way to update redux that the user is not logged in
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  withCredentials: true,
  credentials: "include",
  timeout: 10000,
});


export default apiClient;
