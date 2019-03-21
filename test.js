const request = require('supertest');
const { Client } = require('pg');
const App = require('./app');
const DB = require('./db');
const UserModel = require('./model/user');
let db;
let client;

const userModel = UserModel(db);

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
    text: 'test entry 3',
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
        expect(res).toHaveLength(2);
        expect(res[0].user_id).toBe(1);
        expect(res[0].text).toBe('test entry 1');
        done();
      });
    });
  });

  describe('POST /posts', () => {
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

  describe('GET /posts', () => {
    it('should return all from /posts', done => {
      request(app)
        .get('/posts')
        .expect(200);
      db.getPosts((err, res) => {
        if (err) throw err;
        expect(res).toHaveLength(3);
        expect(res[2].user_id).toBe(1);
        expect(res[2].text).toBe(newPost1.text);
        done();
      });
    });
  });

  describe('DELETE /posts', () => {
    it('should delete a post from /posts', done => {
      request(app)
        .delete('/posts/1')
        .expect(204);
      db.deletePost(1, done);
    });
    it('should fail when invalid post', done => {
      request(app)
        .delete('/posts/-1')
        .expect(401, done);
    });
    it('should fail when unauthorized', done => {
      request(app)
        .delete('/posts/2')
        .expect(401, done);
    });
  });

  describe('GET /posts', () => {
    it('should return all from /posts', done => {
      request(app)
        .get('/posts')
        .expect(200);
      db.getPosts((err, res) => {
        if (err) throw err;
        expect(res).toHaveLength(2);
        expect(res[1].user_id).toBe(1);
        expect(res[1].text).toBe(newPost1.text);
        done();
      });
    });
  });
});

describe('users', () => {
  const newUser1 = {
    username: 'testUser3',
    password: 'pass',
  };

  describe('POST /register', () => {
    it('should register a user to /users', done => {
      request(app)
        .post('/register')
        .send(newUser1)
        .expect(201);
      userModel.hashPass(newUser1.password, hashedPass => {
        db.register(newUser1.username, hashedPass, (err, res) => {
          if (err) throw err;
          expect(res[0].id).toBe(3);
          expect(res[0].username).toBe(newUser1.username);
          done();
        });
      });
    });
    it('should refuse registering a duplicate username', done => {
      request(app)
        .post('/register')
        .send(newUser1)
        .expect(201);
      userModel.hashPass(newUser1.password, hashedPass => {
        db.register(newUser1.username, hashedPass, (err, res) => {
          expect(err.code === 23505);
          done();
        });
      });
    });
  });

  describe('POST /login', () => {
    it('should login a user to /users', done => {
      request(app)
        .post('/login')
        .send(newUser1)
        .expect(201);
      db.login(newUser1.username, (err, res) => {
        if (err) throw err;
        expect(res);
        userModel.checkPass(newUser1.password, res[0].password, passMatch => {
          expect(passMatch).toBe(true);
        });
        done();
      });
    });
    it('should return unauthorized for wrong password', done => {
      request(app)
        .post('/login')
        .send(newUser1)
        .expect(201);
      db.login(newUser1.username, (err, res) => {
        if (err) throw err;
        expect(res);
        userModel.checkPass('wrongPass', res[0].password, passMatch => {
          expect(passMatch).toBe(false);
        });
        done();
      });
    });
  });
});
