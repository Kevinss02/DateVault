import ajvModule from 'ajv';

const Ajv = ajvModule.default;
const ajv = new Ajv({ allErrors: true });
const imageUrlSchema = {
  type: 'object',
  properties: {
    url: { type: 'string', required: true, trim: true },
    public_id: { type: 'string', required: true, trim: true },
  },
  required: ['url', 'public_id'],
  additionalProperties: false,
};
const validateImageUrl = ajv.compile(imageUrlSchema);
export default validateImageUrl;
