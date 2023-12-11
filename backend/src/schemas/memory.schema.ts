import { z } from 'zod';

import { FEELINGS } from '../utils/constants.js';

export const memorySchema = z
  .object({
    title: z.string().refine((data) => data.trim() !== '', {
      message: 'Title is required',
    }),
    description: z.string().refine((data) => data.trim() !== '', {
      message: 'Description is required',
    }),
    feelings: z.enum(FEELINGS).refine((data) => data !== undefined, {
      message: 'Feelings are required',
    }),
    imagesUrl: z.array(z.string()).default([]),
  })
  .refine(
    (data) => data.title !== '' && data.description !== '' && data.feelings,
    {
      message: 'Title, description, and feelings are required',
    },
  );
