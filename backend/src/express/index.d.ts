import * as jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    user?: jwt.JwtPayload;
  }
}
