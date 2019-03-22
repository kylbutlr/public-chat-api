const { Client } = require('pg');
const App = require('./app');
const client = new Client({
  host: 'ec2-54-83-61-142.compute-1.amazonaws.com',
  database: 'd9k74lmko8dj3q',
  user: 'mzwqmxtmxprlyi',
  password: '2d338c2194cc17e8c4d6e2077f1660b193544b831b811f734c77f224cd1ff2c3',
  port: 5432,
  ssl: true
});
client.connect();
const app = App(client);
app.listen(process.env.PORT || 3000);
