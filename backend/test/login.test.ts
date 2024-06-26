import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../src/app.js';
import { connectDB } from '../src/database/db.js';

void connectDB();

describe('login', () => {
  it('should give attribute missing error', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'someguy@gmail.com',
      })
      .expect(400);

    expect(response.body).toEqual({
      type: 'zodValidation',
      error: ['Password is required'],
      output: {
        body: {
          email: 'someguy@gmail.com',
        },
        params: {},
      },
      success: false,
    });
  });

  it('should give password error', async () => {
    const response = await request(app)
      .post('/login')
      .send({
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
          password: '1567',
        },
        params: {},
      },
      success: false,
    });
  });

  it('should login user successfully', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'shadow77@gmail.com',
        password: 'aaaaaa',
      })
      .expect(201);

    expect(response.body).toEqual({
      type: 'loginUser',
      success: true,
      output: {
        id: '657b6eb54c4749f09a1a1346',
        email: 'shadow77@gmail.com',
        registrationDate: '2023-12-14T21:08:05.343Z',
        username: 'shadow',
        name: 'Juan Carlos',
      },
    });
  });

  it('should receive user not found', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'notauser@gmail.com',
        password: '1234567',
      })
      .expect(404);

    expect(response.body).toEqual({
      type: 'loginUser',
      success: false,
      output: {
        params: {},
        body: {
          email: 'notauser@gmail.com',
          password: '1234567',
        },
      },
      error: 'User not found',
    });
  });

  it('should receive incorrect password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'shadow77@gmail.com',
        password: 'notmypassword',
      })
      .expect(401);

    expect(response.body).toEqual({
      type: 'loginUser',
      success: false,
      output: {
        params: {},
        body: {
          email: 'shadow77@gmail.com',
          password: 'notmypassword',
        },
      },
      error: 'Invalid password',
    });
  });
});
