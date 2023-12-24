import User from "../models/User.js";
import bcrypt from "bcryptjs";
import CustomError from "../errors/customError.js";

class UserService {
  async createUser({ username, email, password }) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new CustomError("User already exists", 409);
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new CustomError("Email already exists", 409);
    }
    const user = await User.create({ username, email, password });
    return this.sanitizeUser(user);
  }

  async validateUser({ username, password }) {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new CustomError("Invalid username or password", 401);
    }

    return this.sanitizeUser(user);
  }

  sanitizeUser = (user) => {
    let userToSend;
    if (user.toObject) {
      userToSend = user.toObject();
    } else {
      userToSend = { ...user };
    }

    delete userToSend.password; 
    return userToSend;
  };

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }
}

export default new UserService();
