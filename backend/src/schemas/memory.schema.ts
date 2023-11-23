import ajvModule from 'ajv';

import { FEELINGS } from '../utils/constants.js';

const Ajv = ajvModule.default;

const ajv = new Ajv({ allErrors: true });

const memoryAjvSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    feelings: {
      type: 'string',
      enum: FEELINGS,
    },
    images: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          public_id: { type: 'string' },
        },
        required: ['url', 'public_id'],
      },
    },
  },
  required: ['title', 'description', 'feelings'],
  additionalProperties: false,
};

const validateMemory = ajv.compile(memoryAjvSchema);

export default validateMemory;
