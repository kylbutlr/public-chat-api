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

describe('GET /posts', () => {
  it('should return all from /posts', done => {
    request(app)
      .get('/posts')
      .expect(200);
    db.getPosts((err, res) => {
      if (err) throw err;
      expect(res);
      done();
    });
  });
});
