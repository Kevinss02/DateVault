import { type Types } from 'mongoose';
import { type z } from 'zod';

import { type loginSchema } from '../../schemas/login.schema.js';
import { type registerSchema } from '../../schemas/register.schema.js';

export type UserData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export type UserDataResponse = Omit<UserData, 'password'> & {
  id: Types.ObjectId;
  registrationDate: Date;
};

export type LoginDataResponse = Omit<LoginData, 'password'> & {
  id: Types.ObjectId;
  registrationDate: Date;
};
