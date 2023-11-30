import { type Types } from 'mongoose';
import { type z } from 'zod';

import { type registerSchema } from '../../schemas/register.schema.js';

export type UserData = z.infer<typeof registerSchema>;

export type UserDataResponse = Omit<UserData, 'password'> & {
  id: Types.ObjectId;
  registrationDate: Date;
};
