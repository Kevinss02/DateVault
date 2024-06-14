import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import app from '../src/app.js';
import { connectDB } from '../src/database/db.js';
import User from '../src/models/user.model.js';

void connectDB();

describe('register', () => {
  beforeEach(async () => {
    await User.deleteOne({ username: 'test_user' });
  });

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

  it('should register user successfully', async () => {
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
        username: 'test_user',
        email: 'someguy@gmail.com',
        name: 'Some random guy',
        id: expect.any(String),
        registrationDate: expect.any(String),
      },
    });
  });

  it('should fail because duplicated user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'username',
        name: 'user name',
        email: 'username@gmail.com',
        password: 'somewhat123',
      })
      .expect(400);

    expect(response.text).toContain('"success":false');
  });
});
