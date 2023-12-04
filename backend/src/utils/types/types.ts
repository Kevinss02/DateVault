import { type z } from 'zod';

import { type loginSchema } from '../../schemas/login.schema.js';
import { type registerSchema } from '../../schemas/register.schema.js';

export type UserData = z.infer<typeof registerSchema>;
export type UserLoginData = z.infer<typeof loginSchema>;

export type UserDataResponse = Omit<UserData, 'password'> & {
  id: string;
  registrationDate: Date;
};

export type mongoCustomError = {
  code: string;
  key: string;
  value: string;
};
