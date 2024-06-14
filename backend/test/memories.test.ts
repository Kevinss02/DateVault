import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

import app from '../src/app.js';
import { TOKEN_SECRET } from '../src/config.js';
import { connectDB } from '../src/database/db.js';

void connectDB();

let token: string;
let memoryId: string;

beforeAll(() => {
  token = jwt.sign({ id: '657a1f10cd4c888117d9b7bf' }, TOKEN_SECRET, {
    expiresIn: '1h',
  });
});

describe('create memories', () => {
  it('should give verification error', async () => {
    const response = await request(app).post('/memories').expect(401);

    expect(response.body).toEqual({
      type: 'tokenValidation',
      success: false,
      output: { params: {}, body: {} },
      error: 'No token, authorization denied',
    });
  });
  it('should give params error', async () => {
    const response = await request(app)
      .post('/memories')
      .set('Token', token)
      .expect(500);

    expect(response.body.success).toEqual(false);
    expect(JSON.parse(response.body.error)).toEqual([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['title'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['description'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: "'very bad' | 'bad' | 'regular' | 'good' | 'very good'",
        received: 'undefined',
        path: ['feelings'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['date'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['location'],
        message: 'Required',
      },
    ]);
  });
  it('should create memory successfully', async () => {
    const response = await request(app)
      .post('/memories')
      .set('Token', token)
      .send({
        title: 'test',
        description: 'this is a test',
        feelings: 'good',
        date: '11/06/2024',
        location: 'mi casa',
      })
      .expect(200);

    memoryId = response.body.output._id;

    expect(response.body).toEqual({
      type: 'add',
      success: true,
      output: expect.objectContaining({
        title: 'test',
        description: 'this is a test',
        feelings: 'good',
        date: '11/06/2024',
        location: 'mi casa',
        imagesUrl: [],
      }),
    });
  });
});

describe('read memories', () => {
  it('should give id error', async () => {
    const response = await request(app)
      .get('/memories/not_a_memory')
      .set('Token', token)
      .expect(500);

    expect(response.body).toEqual({
      type: 'get',
      success: false,
      output: {
        params: { id: 'not_a_memory' },
      },
      error:
        'Cast to ObjectId failed for value "not_a_memory" (type string) at path "_id" for model "Memory"',
    });
  });
  it('should read one memory from a user', async () => {
    const response = await request(app)
      .get(`/memories/${memoryId}`)
      .set('Token', token)
      .expect(200);

    expect(response.body).toEqual({
      type: 'get',
      success: true,
      output: expect.objectContaining({
        title: 'test',
        description: 'this is a test',
        feelings: 'good',
        imagesUrl: [],
        user: '657a1f10cd4c888117d9b7bf',
        date: '11/06/2024',
        location: 'mi casa',
      }),
    });
  });
  it('should read all memories from a user', async () => {
    const response = await request(app)
      .get(`/memories`)
      .set('Token', token)
      .expect(200);

    expect(response.body).toEqual({
      type: 'get',
      success: true,
      output: expect.arrayContaining([
        expect.objectContaining({
          title: 'a',
          description: 'II',
          feelings: 'good',
          imagesUrl: [],
          user: '657a1f10cd4c888117d9b7bf',
        }),
        expect.objectContaining({
          title: 'a',
          description: 'III',
          feelings: 'good',
          imagesUrl: [],
          user: '657a1f10cd4c888117d9b7bf',
        }),
        expect.objectContaining({
          title: 'myself',
          description: 'this is a photo of myself xd',
          feelings: 'very good',
          imagesUrl: expect.any(Array),
          user: '657a1f10cd4c888117d9b7bf',
          date: '2024-05-30T12:00:00Z',
          location: 'my house',
        }),
        expect.objectContaining({
          title: 'test',
          description: 'this is a test',
          feelings: 'good',
          imagesUrl: [],
          user: '657a1f10cd4c888117d9b7bf',
          date: '11/06/2024',
          location: 'mi casa',
        }),
      ]),
    });
  });
});

describe('update memories', () => {
  it('should give params error', async () => {
    const response = await request(app)
      .put(`/memories/${memoryId}`)
      .set('Token', token)
      .expect(500);

    expect(response.body.type).toEqual('update');
    expect(response.body.success).toEqual(false);

    expect(JSON.parse(response.body.error)).toEqual([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['title'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['description'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: "'very bad' | 'bad' | 'regular' | 'good' | 'very good'",
        received: 'undefined',
        path: ['feelings'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['date'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['location'],
        message: 'Required',
      },
    ]);
  });
  it('should give id error', async () => {
    const response = await request(app)
      .put('/memories/not_a_memory')
      .set('Token', token)
      .send({
        title: 'test',
        description: 'this is the edited description of a test',
        feelings: 'very good',
        date: '11/06/2024',
        location: 'mi casa',
      })
      .expect(500);

    expect(response.body).toEqual({
      type: 'update',
      success: false,
      output: {
        params: { id: 'not_a_memory' },
        body: {
          title: 'test',
          description: 'this is the edited description of a test',
          feelings: 'very good',
          date: '11/06/2024',
          location: 'mi casa',
        },
      },
      error:
        'Cast to ObjectId failed for value "not_a_memory" (type string) at path "_id" for model "Memory"',
    });
  });
  it('should update memory successfully', async () => {
    const response = await request(app)
      .put(`/memories/${memoryId}`)
      .set('Token', token)
      .send({
        title: 'test',
        description: 'this is the edited description of a test',
        feelings: 'very good',
        date: '11/06/2024',
        location: 'mi casa',
      })
      .expect(200);

    expect(response.body).toEqual({
      type: 'update',
      success: true,
      output: expect.objectContaining({
        title: 'test',
        description: 'this is the edited description of a test',
        feelings: 'very good',
        date: '11/06/2024',
        location: 'mi casa',
        imagesUrl: [],
      }),
    });
  });
});

describe('delete memories', () => {
  it('should give id error', async () => {
    const response = await request(app)
      .delete(`/memories/not_a_memory`)
      .set('Token', token)
      .expect(500);

    expect(response.body).toEqual({
      type: 'delete',
      success: false,
      output: {
        params: { id: 'not_a_memory' },
      },
      error:
        'Cast to ObjectId failed for value "not_a_memory" (type string) at path "_id" for model "Memory"',
    });
  });
  it('should delete one memory successfully', async () => {
    const response = await request(app)
      .delete(`/memories/${memoryId}`)
      .set('Token', token)
      .expect(200);

    expect(response.body).toEqual({
      type: 'delete',
      success: true,
      output: 'Deleted memory with name test',
    });
  });
});
