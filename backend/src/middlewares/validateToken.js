import jwt from 'jsonwebtoken';

import { TOKEN_SECRET } from '../config.js';
import { handleHttp } from '../utils/error.handler.js';

export const authRequired = function (req, res, next) {
  const token = req.cookies.token ?? req.headers.token;
  if (token == null) {
    res
      .status(401)
      .json(
        handleHttp(
          'tokenValidation',
          { params: req.params, body: req.body, cookies: req.cookies.headers },
          'No token, authorization denied',
        ),
      );
    return;
  }
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
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
    console.log(user);
    next();
  });
};
