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
    date: z.date().refine((data) => data !== undefined, {
      message: 'Date is required',
    }),
    location: z.string().refine((data) => data.trim() !== '', {
      message: 'Location is required',
    }),
  })
  .refine(
    (data) =>
      data.title !== '' &&
      data.description !== '' &&
      data.feelings !== undefined &&
      data.date !== undefined &&
      data.location !== '',
    {
      message: 'Title, description, feelings, date, and location are required',
    },
  );
