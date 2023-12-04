import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../src/app.js';

describe('logout', () => {
  it('should delete token successfully', async () => {
    const response = await request(app).post('/logout').expect(200);

    expect(response).not.toBe(null);
  });
});
