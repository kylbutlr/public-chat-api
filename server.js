const { Client } = require('pg');
const App = require('./app');

const client = new Client({
  user: 'postgres',
  password: 'pass',
  database: 'public-chat',
});

client.connect();
const app = App(client);
const port = 3000;
console.log('Listening on port: '+port);
app.listen(port);
