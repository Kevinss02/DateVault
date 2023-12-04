import { type Request, type Response } from 'express';

import User from '../models/user.model.js';
import { loginUser, registerUser } from '../services/user.service.js';
import { handleHttp, parseMongoErr } from '../utils/error.handler.js';
import { type UserData, type UserDataResponse } from '../utils/types/types.js';

export const register = async function (
  req: Request,
  res: Response,
): Promise<any> {
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
    return res.status(201).json(handleHttp('registerUser', userDataResponse));
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof Error) {
      if (error.name === 'MongoServerError') {
        const parsedError = parseMongoErr(error.message);
        return res
          .status(400)
          .json(
            handleHttp(
              'registerUser',
              { params: req.params, body: req.body },
              parsedError,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            handleHttp(
              'registerUser',
              { params: req.params, body: req.body },
              error.message,
            ),
          );
      }
    } else {
      return res
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
};

export const login = async function (
  req: Request,
  res: Response,
): Promise<any> {
  const { email, password }: UserData = req.body;

  try {
    const result = await loginUser({ email, password });

    const { user, token } = result;

    const loginDataResponse: UserDataResponse = {
      id: user.id,
      email: user.email,
      registrationDate: user.registrationDate,
      username: user.username,
      name: user.name,
    };

    res.cookie('token', token);
    return res.status(201).json(handleHttp('loginUser', loginDataResponse));
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof Error) {
      if (error.message === 'Invalid password') {
        return res
          .status(401)
          .json(
            handleHttp(
              'loginUser',
              { params: req.params, body: req.body },
              error.message,
            ),
          );
      } else if (error.message === 'User not found') {
        return res
          .status(404)
          .json(
            handleHttp(
              'loginUser',
              { params: req.params, body: req.body },
              error.message,
            ),
          );
      } else {
        return res
          .status(500)
          .json(
            handleHttp(
              'loginUser',
              { params: req.params, body: req.body },
              `Unexpected error: ${error as any}`,
            ),
          );
      }
    } else {
      return res
        .status(500)
        .json(
          handleHttp(
            'loginUser',
            { params: req.params, body: req.body },
            `Unexpected error: ${error as any}`,
          ),
        );
    }
  }
};

export const logout = async function (
  req: Request,
  res: Response,
): Promise<any> {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async function (req: any, res: Response): Promise<any> {
  try {
    const userFound = await User.findById(req.user.id);

    if (userFound == null) {
      throw new Error('User not found');
    }

    return res.status(201).json(
      handleHttp('profileUser', {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        name: userFound.name,
        registrationDate: userFound.register_date,
      }),
    );
  } catch (error) {
    console.error('Profile error:', error);

    if (error instanceof Error) {
      if (error.message === 'User not found') {
        return res
          .status(404)
          .json(
            handleHttp(
              'profileUser',
              { params: req.params, body: req.body },
              'Error: User not found',
            ),
          );
      } else {
        return res
          .status(500)
          .json(
            handleHttp(
              'profileUser',
              { params: req.params, body: req.body },
              `Unexpected error: ${error as any}`,
            ),
          );
      }
    } else {
      return res
        .status(500)
        .json(
          handleHttp(
            'profileUser',
            { params: req.params, body: req.body },
            `Unexpected error: ${error as any}`,
          ),
        );
    }
  }
};
