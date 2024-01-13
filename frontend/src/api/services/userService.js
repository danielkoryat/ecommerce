// UserService.js
import apiClient from "../axios.js";

class UserService {
  async loginUser({ username, password }) {
    const response = await apiClient.post("/user/login", {
      username,
      password,
    });
    return response.data;
  }

  async isAuthenticated() {
    try {
      await apiClient.get("/user/checkUserAuth");
      return true;
    } catch (error) {
      return false;
    }
  }

  async createUser({ username, email, password }) {
    const response = await apiClient.post("/user/signup", {
      username,
      email,
      password,
    });
    return response.data;
  }

  async logUserOut() {
    const response = await apiClient.post("/user/logout");
    return response.data;
  }

 
}

export default new UserService();
