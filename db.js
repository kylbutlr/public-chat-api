module.exports = client => ({
  getPosts: cb =>
    client.query('SELECT * FROM posts', (err, res) => {
      if (err) return cb(err);
      cb(null, res.rows);
    }),

  createPost: (text, created, user_id, cb) =>
    client.query(
      'INSERT INTO posts (text, created, user_id) VALUES ($1, $2, $3) RETURNING *',
      [text, created, user_id],
      (err, res) => {
        if (err) return cb(err);
        cb(null, res.rows);
      }
    ),

  updatePost: (id, text, created, user_id, cb) =>
  client.query(
    'UPDATE posts SET text = $2, created = $3, user_id = $4 WHERE id = $1 RETURNING *',
    [id, text, created, user_id],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res.rows);
    }
  ),

  deletePost: (id, cb) =>
    client.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id], (err, res) => {
      if (err) return cb(err);
      cb(null, res.rows);
    }),

  getUsers: cb =>
    client.query('SELECT * FROM users', (err, res) => {
      if (err) return cb(err);
      cb(null, res.rows);
    }),


  register: (username, password, cb) =>
    client.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password],
      (err, res) => {
        if (err) return cb(err);
        cb(null, res.rows);
      }
    ),

  login: (username, cb) =>
    client.query('SELECT * FROM users WHERE username = $1', [username], (err, res) => {
      if (err) return cb(err);
      cb(null, res.rows);
    }),
});
