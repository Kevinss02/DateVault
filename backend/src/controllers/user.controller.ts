import bcrypt from 'bcryptjs';
import { type Request, type Response } from 'express';

import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';
import { registerUser } from '../services/user.service.js';
import { handleHttp } from '../utils/error.handler.js';
import { type UserData, type UserDataResponse } from '../utils/types/types.js';

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password, name }: UserData = req.body;

  try {
    const result = await registerUser({ username, email, password, name });

    const { user, token } = result;

    const userDataResponse: UserDataResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      registrationDate: user.registrationDate,
    };

    res.cookie('token', token);
    res.status(201).json(handleHttp('registerUser', userDataResponse));
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof Error) {
      res
        .status(400)
        .json(
          handleHttp(
            'registerUser',
            { params: req.params, body: req.body },
            error.message,
          ),
        );
    } else {
      res
        .status(500)
        .json(
          handleHttp(
            'registerUser',
            { params: req.params, body: req.body },
            `Unexpected error: ${error as any}`,
          ),
        );
    }
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

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (isMatch == null || isMatch === undefined || !isMatch) {
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
