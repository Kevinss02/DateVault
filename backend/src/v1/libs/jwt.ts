import jwt from 'jsonwebtoken';

import { TOKEN_SECRET } from '../../config.js';

export async function createAccessToken(payload: any): Promise<string> {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err instanceof Error) {
          reject(err);
        } else if (typeof token === 'string') {
          resolve(token);
        } else {
          reject(new Error('Unexpected error during token generation.'));
        }
      },
    );
  });
}
