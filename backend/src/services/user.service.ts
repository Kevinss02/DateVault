import bcrypt from 'bcryptjs';

import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';
import { type UserData, type UserDataResponse } from '../utils/types/types.js';

export async function registerUser(
  userData: UserData,
): Promise<{ user: UserDataResponse; token: string }> {
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
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      name: userSaved.name,
      registrationDate: userSaved.register_date,
    },
    token,
  };
}
