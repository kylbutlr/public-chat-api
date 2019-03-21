const request = require('supertest');
const { Client } = require('pg');
const App = require('./app');
const DB = require('./db');
let db;
let client;

beforeAll(() => {
  client = new Client({
    user: 'postgres',
    password: 'pass',
    database: 'public-chat',
  });
  client.connect();
  db = DB(client);
  app = App(client);
});
afterAll(() => {
  client.end();
});

describe('posts', () => {
  const newPost1 = {
    text: 'test entry 2',
    time: null,
    date: new Date(),
    user_id: 1,
  };

  describe('GET /posts', () => {
    it('should return all from /posts', done => {
      request(app)
        .get('/posts')
        .expect(200);
      db.getPosts((err, res) => {
        if (err) throw err;
        expect(res).toHaveLength(1);
        expect(res[0].user_id).toBe(1);
        expect(res[0].text).toBe('test entry 1');
        done();
      });
    });

    it('should post to /posts', done => {
      request(app)
        .post('/posts')
        .send(newPost1)
        .expect(201);
      db.createPost(newPost1.text, newPost1.time, newPost1.date, newPost1.user_id, (err, res) => {
        if (err) throw err;
        expect(res[0].user_id).toBe(1);
        expect(res[0].text).toBe(newPost1.text);
        done();
      });
    });
  });
});
