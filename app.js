const express = require('express');
const cors = require('cors');
const DB = require('./db');
const UserModel = require('./model/user');
const SessionModel = require('./model/session');
const authMiddleware = require('./middleware/auth');

module.exports = client => {
  const app = express();
  const db = DB(client);
  const userModel = UserModel(db);
  const sessionModel = SessionModel(db);

  const getPosts = (req, res, next) => {
    db.getPosts((err, data) => {
      if (err) return next(err);
      if (!data) return next();
      res.status(200).send(data);
    });
  };

  const createPost = (req, res, next) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { text, time, date, user_id } = JSON.parse(body);
      db.createPost(text, time, date, user_id, (err, data) => {
        if (err) return next(err);
        res.status(201).send(data[0]);
      });
    });
  };

  const deletePost = (req, res, next) => {
    const id = Number(req.params.id);
    db.deletePost(id, (err, data) => {
      if (err) return next(err);
      if (!data[0]) return next();
      res.status(204).send(data[0]);
    });
  };

  const register = (req, res, next) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { username, password } = JSON.parse(body);
      userModel.hashPass(password, hashedPass => {
        db.register(username, hashedPass, (err, data) => {
          if (err) {
            if (err.code === '23505') {
              res.status(422);
            }
            return next(err);
          }
          res.status(201).send(data[0]);
        });
      });
    });
  };

  const login = (req, res, next) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { username, password } = JSON.parse(body);
      db.login(username, (err, data) => {
        if (err) return next(err);
        if (!data[0]) return next();
        const user_id = data[0].id;
        const hashedPass = data[0].password;
        userModel.checkPass(password, hashedPass, passMatch => {
          if (passMatch === true) {
            sessionModel.signSession(user_id, username, newData => {
              res.status(200).send(newData);
            });
          } else {
            return next();
          }
        });
      });
    });
  };

  app.use(cors());
  app.post('/posts', [authMiddleware(db), createPost]);
  app.delete('/posts/:id', [authMiddleware(db), deletePost]);
  app.get('/posts', getPosts);
  app.post('/register', register);
  app.post('/login', login);
  app.use((req, res) => res.status(404).send('404: Not Found'));
  return app;
};
