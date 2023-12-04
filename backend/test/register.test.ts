import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../src/app.js';

describe('register', () => {
  it('should give attribute missing error', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'test_user',
        name: 'Some random guy',
        email: 'someguy@gmail.com',
      })
      .expect(400);

    expect(response.body).toEqual({
      type: 'zodValidation',
      error: ['Password is required'],
      output: {
        body: {
          email: 'someguy@gmail.com',
          name: 'Some random guy',
          username: 'test_user',
        },
        params: {},
      },
      success: false,
    });
  });

  it('should give password error', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'test_user',
        name: 'Some random guy',
        email: 'someguy@gmail.com',
        password: '1567',
      })
      .expect(400);

    expect(response.body).toEqual({
      type: 'zodValidation',
      error: ['Password must be at least 6 characters'],
      output: {
        body: {
          email: 'someguy@gmail.com',
          name: 'Some random guy',
          password: '1567',
          username: 'test_user',
        },
        params: {},
      },
      success: false,
    });
  });

  /**
  it('should register user successfuly', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'test_user',
        name: 'Some random guy',
        email: 'someguy@gmail.com',
        password: '1234567',
      })
      .expect(201);

    expect(response.body).toEqual({
      type: 'registerUser',
      success: true,
      output: {
        id: '656de84d1f891f154eb435c5',
        username: 'test_user',
        email: 'someguy@gmail.com',
        name: 'Some random guy',
        registrationDate: '2023-12-04T14:55:09.142Z',
      },
    });
  });
  */
});
