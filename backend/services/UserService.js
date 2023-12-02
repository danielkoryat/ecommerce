import User from "../models/User.js";
import bcrypt from "bcryptjs";
import customeError from "../errors/customeError.js"


class UserService {
  async createUser(userData) {
    const { username, email, password } = userData;
    const user = await User.create({ username, email, password });
    return user;
  }

  async validateUser(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new customeError("Invalid username", 404);
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const userToSend = user.toObject();
      delete userToSend.password; // Remove sensitive data
      return userToSend;
    } else {
      throw new customeError("Invalid password", 401);
    }
    return null;
  }

   sanitizeUser = (user) => {
      const userToSend = user.toObject();
      delete userToSend.password; // Remove the password before sending it to the client
      return userToSend;
    };

    async getUserById(id) {
      const user = await User.findById(id);
      if (!user) {
        throw new customeError("User not found", 404);
      }
      return user;
    }

    async getAllUsers() {
      const users = await User.find();
      return users;
    }
}


export default new UserService();