import bcrypt from 'bcryptjs';
import { type Request, type Response } from 'express';

import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password, name } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      name,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      name: userSaved.name,
      registrationDate: userSaved.register_date,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: error.message !== undefined || 'Internal Server Error',
      });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  res.send('login');
}
