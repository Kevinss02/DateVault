import bcrypt from 'bcryptjs';

import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';

export const registerUser = async function (userData) {
  const { username, email, password, name } = userData;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: passwordHash,
    name,
  });
  const userSaved = await newUser.save();
  const token = await createAccessToken({ id: userSaved._id });
  return {
    user: {
      id: userSaved._id.toString(),
      username: userSaved.username,
      email: userSaved.email,
      name: userSaved.name,
      registrationDate: userSaved.register_date,
    },
    token,
  };
};
export const loginUser = async function (loginData) {
  const { email, password } = loginData;
  const userFound = await User.findOne({ email });
  if (userFound != null) {
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (isMatch) {
      const token = await createAccessToken({ id: userFound._id });
      return {
        user: {
          id: userFound._id.toString(),
          email: userFound.email,
          registrationDate: userFound.register_date,
          username: userFound.username,
          name: userFound.name,
        },
        token,
      };
    }
    throw new Error('Invalid password');
  }
  throw new Error('User not found');
};
