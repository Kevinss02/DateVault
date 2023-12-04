import { type NextFunction, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { TOKEN_SECRET } from '../config.js';
import { handleHttp } from '../utils/error.handler.js';

export const authRequired = function (
  req: any,
  res: Response,
  next: NextFunction,
): void {
  const token = req.cookies.token;

  if (token == null) {
    res
      .status(401)
      .json(
        handleHttp(
          'tokenValidation',
          { params: req.params, body: req.body },
          'No token, authorization denied',
        ),
      );
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
    if (err != null) {
      console.error('Token validation error:', err);
      res
        .status(401)
        .json(
          handleHttp(
            'tokenValidation',
            { params: req.params, body: req.body },
            'Invalid token',
          ),
        );
      return;
    }

    req.user = user;

    next();
  });
};
