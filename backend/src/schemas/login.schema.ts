import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .refine(
      (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
      {
        message: 'Invalid email',
      },
    ),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(20, {
      message: 'Password must not exceed 20 characters',
    }),
});
