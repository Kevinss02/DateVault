import jwt from 'jsonwebtoken';

import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';
import { loginUser, registerUser } from '../services/user.service.js';
import { handleHttp, parseMongoErr } from '../utils/error.handler.js';

export const register = async function (req, res) {
  const { username, email, password, name } = req.body;
  try {
    const result = await registerUser({ username, email, password, name });
    const { user, token } = result;
    const userDataResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      registrationDate: user.registrationDate,
    };
    res.cookie('token', token, {
      secure: true,
      sameSite: 'none',
    });
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
            `Unexpected error: ${String(error)}`,
          ),
        );
    }
  }
};
export const login = async function (req, res) {
  const { email, password } = req.body;
  try {
    const result = await loginUser({ email, password });
    const { user, token } = result;
    const loginDataResponse = {
      id: user.id,
      email: user.email,
      registrationDate: user.registrationDate,
      username: user.username,
      name: user.name,
    };
    res.cookie('token', token, {
      secure: true,
      sameSite: 'none',
    });
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
              `Unexpected error: ${error.message}`,
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
            `Unexpected error: ${String(error)}`,
          ),
        );
    }
  }
};
export const logout = async function (req, res) {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(200);
};
export const verifyToken = async function (req, res) {
  const { token } = req.cookies;
  if (token == null) {
    return res
      .status(401)
      .json(
        handleHttp(
          'verifyToken',
          { params: req.params, body: req.body },
          'Unauthorized: No token',
        ),
      );
  }
  try {
    const user = jwt.verify(token, TOKEN_SECRET);
    const userFound = await User.findById(user.id);
    console.log('User Found: ', userFound);
    if (userFound == null) {
      return res
        .status(401)
        .json(
          handleHttp(
            'verifyToken',
            { params: req.params, body: req.body },
            'Unauthorized: User Not Found',
          ),
        );
    }
    return res.status(201).json(
      handleHttp('verifyToken', {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        name: userFound.name,
        registrationDate: userFound.register_date,
      }),
    );
  } catch (err) {
    return res
      .status(401)
      .json(
        handleHttp(
          'verifyToken',
          { params: req.params, body: req.body },
          'Unauthorized by jwt',
        ),
      );
  }
};
