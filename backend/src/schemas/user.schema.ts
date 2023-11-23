import ajvModule from 'ajv';

import { USER_ROLES } from '../utils/constants.js';

const Ajv = ajvModule.default;

const ajv = new Ajv({ allErrors: true });

const userSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string', format: 'objectid' },
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    salt: { type: 'string' },
    nombre: { type: 'string' },
    fecha_registro: { type: 'number' },
    roles: { type: 'array', items: { type: 'string', enum: USER_ROLES } },
    activo: { type: 'boolean' },
  },
  required: [
    'username',
    'email',
    'password',
    'salt',
    'nombre',
    'fecha_registro',
    'roles',
    'activo',
  ],
  additionalProperties: false,
};

const validateUser = ajv.compile(userSchema);

export default validateUser;
