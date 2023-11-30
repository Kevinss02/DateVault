import { type NextFunction, type Request, type Response } from 'express';
import { ZodError, type z } from 'zod';

import { handleHttp } from '../utils/error.handler.js';

export const validateSchema = function (
  schema: z.ZodObject<any, any, any, any>,
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.errors);
        return res.status(400).json(
          handleHttp(
            'zodValidation',
            { params: req.params, body: req.body },
            error.errors.map((error) => error.message),
          ),
        );
      } else {
        console.error('Internal server error:', error);
        return res
          .status(500)
          .json(
            handleHttp(
              'zodValidation',
              { params: req.params, body: req.body },
              'Internal Server Error',
            ),
          );
      }
    }
  };
};
