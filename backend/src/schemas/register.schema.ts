import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(4, {
      message: 'Username must be at least 4 characters',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is requiered',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
  name: z.string({
    required_error: 'Name is requiered',
  }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is requiered',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});

/*
import ajvModule from 'ajv';

import { USER_ROLES } from '../utils/constants.js';

const Ajv = ajvModule.default;

const ajv = new Ajv({ allErrors: true });

ajv.addFormat('objectid', (data) => {
  return typeof data === 'string' && /^[0-9a-fA-F]{24}$/.test(data);
});

ajv.addFormat('email', (data) => {
  return typeof data === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
});

const registerSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string', format: 'objectid' },
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: {
      type: 'string',
      minLength: 6,
      pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])'
    },
    nombre: { type: 'string' },
    fecha_registro: { type: 'number' },
    roles: { type: 'array', items: { type: 'string', enum: USER_ROLES } },
    activo: { type: 'boolean' },
  },
  required: [
    'username',
    'email',
    'password',
    'nombre'
  ],
  additionalProperties: false,
};

const validateRegister = ajv.compile(registerSchema);

export default validateRegister;
*/
