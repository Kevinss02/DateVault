import { type NextFunction, type Request, type Response } from 'express';
import { ZodError, type z } from 'zod';

export const validateSchema = (schema: z.ZodObject<any, any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ error: error.errors.map((error) => error.message) });
      } else {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
};
