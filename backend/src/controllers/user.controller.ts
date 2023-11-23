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
    res.status(500).json({
      message: error.message !== undefined || 'Internal Server Error',
    });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (userFound == null) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (isMatch == null || isMatch === undefined) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      name: userFound.name,
      registrationDate: userFound.register_date,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message !== undefined || 'Internal Server Error',
    });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  res.sendStatus(200);
}

export async function profile(req: any, res: Response): Promise<void> {
  const userFound = await User.findById(req.user.id);

  if (userFound == null) {
    res.status(400).json({ message: 'User not found' });
    return;
  }

  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    name: userFound.name,
    registrationDate: userFound.register_date,
  });
}
