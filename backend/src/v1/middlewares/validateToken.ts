import { type NextFunction, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { TOKEN_SECRET } from '../../config.js';

export function authRequired(
  req: any,
  res: Response,
  next: NextFunction,
): void {
  const token = req.cookies.token;

  if (token == null) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
    if (err != null) {
      console.log(err);
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.user = user;

    next();
  });
}
