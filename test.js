const request = require('supertest');
const { Client } = require('pg');
const App = require('./app');
const DB = require('./db');
const UserModel = require('./model/user');
const SessionModel = require('./model/session');
let db;
let client;
let session;

beforeAll(() => {
  client = new Client({
    user: 'wwszofscjfotfu',
    password: 'cefba8a94611cfa65c685484d637100afbc4616f0b48fed523675e66804370b4',
    database: 'd3pl30210m0fh0',
    port: 5432,
    host: 'ec2-23-23-173-30.compute-1.amazonaws.com',
    ssl: true,
  });
  client.connect();
  db = DB(client);
  app = App(client);
  userModel = UserModel(db);
  sessionModel = SessionModel(db);
});

afterAll(() => {
  client.end();
});

describe('USERS', () => {
  const newUser1 = {
    username: 'testUser3',
    password: 'pass',
  };
  const newUser2 = {
    username: 'testUser4',
    password: 'pass',
  };
  describe('GET /users', () => {
    it('should get from /users', done => {
      request(app)
        .get('/users')
        .expect(200, done);
    });
    it('should call db.getUsers', done => {
      db.getUsers((err, res) => {
        if (err) throw err;
        expect(res);
        done();
      });
    });
  });
  describe('POST /register', () => {
    it('should post to /register', done => {
      request(app)
        .post('/register')
        .send(newUser1)
        .expect(201, done);
    });
    it('should use userModel and register', done => {
      userModel.hashPass(newUser2.password, hashedPass => {
        db.register(newUser2.username, hashedPass, (err, res) => {
          if (err) throw err;
          expect(res[0].id).toBe(2);
          expect(res[0].username).toBe(newUser2.username);
          done();
        });
      });
    });
    it('should refuse registering a duplicate username', done => {
      userModel.hashPass(newUser1.password, hashedPass => {
        db.register(newUser1.username, hashedPass, (err, res) => {
          expect(err.code === 23505);
          done();
        });
      });
    });
  });
  describe('POST /login', () => {
    it('should post to /login', done => {
      request(app)
        .post('/login')
        .send(newUser1)
        .expect(200, done);
    });
    it('should use userModel and login', done => {
      db.login(newUser1.username, (err, res) => {
        if (err) throw err;
        expect(res);
        userModel.checkPass(newUser1.password, res[0].password, passMatch => {
          expect(passMatch).toBe(true);
          sessionModel.signSession(res[0].id, newUser1.username, newSession => {
            session = {
              jwt: newSession.jwt,
              user_id: res[0].id,
              username: newUser1.username,
            };
            done();
          });
        });
      });
    });
    it('should return unauthorized for wrong password', done => {
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

describe('POSTS', () => {
  const newPost1 = {
    text: 'test entry 3',
    created: new Date(),
    user_id: 1,
  };
  const newPost2 = {
    text: 'test entry 4',
    created: new Date(),
    user_id: 1,
  };
  const badPost = {
    text: 'bad entry',
    created: new Date(),
    user_id: -1,
  };
  describe('GET /posts', () => {
    it('should get from /posts', done => {
      request(app)
        .get('/posts')
        .expect(200, done);
    });
    it('should call db.getPosts', done => {
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
        .set('authorization', session.jwt)
        .send(newPost1)
        .expect(201, done);
    });
    it('should call db.createPost', done => {
      const { text, created, user_id } = newPost2;
      db.createPost(text, created, user_id, (err, res) => {
        if (err) throw err;
        expect(res[0].user_id).toBe(1);
        expect(res[0].text).toBe(newPost2.text);
        done();
      });
    });
    it('should fail when unauthorized', done => {
      request(app)
        .post('/posts')
        .send(badPost)
        .expect(401, done);
    });
    it('should return all from /posts', done => {
      db.getPosts((err, res) => {
        if (err) throw err;
        expect(res).toHaveLength(4);
        expect(res[2].user_id).toBe(1);
        expect(res[2].text).toBe(newPost1.text);
        done();
      });
    });
  });
  describe('DELETE /posts', () => {
    it('should delete from /posts', done => {
      request(app)
        .delete('/posts/1')
        .set('authorization', session.jwt)
        .expect(204, done);
    });
    it('should call db.deletePost', done => {
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
    it('should delete from /posts', done => {
      request(app)
        .delete('/posts/2')
        .set('authorization', session.jwt)
        .expect(204, done);
    });
    it('should delete from /posts', done => {
      request(app)
        .delete('/posts/3')
        .set('authorization', session.jwt)
        .expect(204, done);
    });
    it('should delete from /posts', done => {
      request(app)
        .delete('/posts/4')
        .set('authorization', session.jwt)
        .expect(204, done);
    });
    it('should return all from /posts', done => {
      db.getPosts((err, res) => {
        if (err) throw err;
        expect(res).toHaveLength(0);
        done();
      });
    });
  });
});

describe('404', () => {
  it('should 404', done => {
    request(app)
      .get('/nothing')
      .expect(404, done);
  });
});
