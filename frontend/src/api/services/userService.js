// UserService.js
import apiClient from "../axios.js";

class UserService {
  async validateUser({username, password}) {
    const response = await apiClient.post("/user/login", {
      username,
      password,
    });
    return response.data;
  }

  async createUser({ username, email, password }) {
    const response = await apiClient.post("/user/signup", {
      username,
      email,
      password,
    });
    return response.data;
  }
}

export default new UserService();