import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(2, {
      message: 'Username must be at least 2 characters',
    })
    .max(20, {
      message: 'Username must not exceed 20 characters',
    })
    .refine((value) => /^[a-zA-Z0-9_-]+$/.test(value), {
      message: 'Username can only contain letters, numbers, _, -',
    }),
  name: z
    .string({
      required_error: 'Full name is required',
    })
    .min(2, {
      message: 'Full name must be at least 2 characters',
    })
    .max(77, {
      message: 'Full name must not exceed 77 characters',
    })
    .refine((value) => /^[\p{L}\p{M}'\s-]+$/u.test(value), {
      message: 'Invalid full name',
    }),
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
