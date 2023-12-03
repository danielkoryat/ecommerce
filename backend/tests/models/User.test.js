import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from "../../src/models/User.js";

// Connect to a new in-memory database before running any tests.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear all test data after every test.
afterEach(async () => {
  await User.deleteMany();
});

// Remove and close the db and server.
afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Model', () => {
  it('should hash the password before saving', async () => {
    const userData = {
      username: 'testuser1',
      email: 'test@example.com',
      password: 'Password123',
    };

    const user = new User(userData);
    await user.save();

    const foundUser = await User.findById(user._id);
    expect(foundUser).not.toBe(null);
    expect(foundUser.password).not.toBe(userData.password);
    expect(bcrypt.compareSync(userData.password, foundUser.password)).toBe(true);
  });

  it('should compare passwords correctly', async () => {
    const userData = {
      username: 'testuser2',
      email: 'test@example.com',
      password: 'Password123',
    };

    const user = new User(userData);
    await user.save();

    const isMatch = await user.comparePassword('Password123');
    expect(isMatch).toBe(true);

    const isMatchIncorrect = await user.comparePassword('wrongpassword');
    expect(isMatchIncorrect).toBe(false);
  });
});