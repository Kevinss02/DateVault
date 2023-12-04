import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../src/app.js';
import { connectDB } from '../src/database/db.js';

void connectDB();

describe('profile', () => {
  it('should fail because no token', async () => {
    const response = await request(app).get('/profile').expect(401);

    expect(response.body).toEqual({
      type: 'tokenValidation',
      success: false,
      output: {
        params: {},
        body: {},
      },
      error: 'No token, authorization denied',
    });
  });
});
