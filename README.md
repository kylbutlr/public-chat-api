# Public Chat API

Old school public chat room application API node server

Created to be used with my [Public Chat App](https://github.com/kylbutlr/public-chat-app) front-end

Features: REST CRUD, routing, tests, user accounts, authorization, and encryption

Uses: PostgreSQL, Express, Jest, JWT, and Bcrypt

***

### [Click here for a live preview](https://kylbutlr-chat-app.herokuapp.com/) of my React app that uses this API. 

Or [go to the API directly](https://kylbutlr-chat-api.herokuapp.com/) in your browser. (Try going to /posts)

**All messages will be publicly displayed (deleted daily)**.

No e-mail required to register a new user, or feel free to use the public test account (username: test, password: test).

***

## Install

```shell
npm install
```

## Usage

Start the local server:

```shell
npm start
```

Create, update, and delete post requests require a Config Object of Headers for Authorization containing the JSON Web Token:

```js
headers: {
  authorization: JWT
}
```

#### Users:

| HTTP | Request   | Response                                                    |
| ---- | --------- | ----------------------------------------------------------- |
| POST | /login    | Checks returned hashed password and creates new JWT session |
| POST | /register | Registers a new user after hashing the password             |
| GET  | /users    | Returns all users                                           |

#### Posts:

| HTTP   | Request    | Response                                      |
| ------ | ---------- | --------------------------------------------- |
| GET    | /posts     | Returns all posts                             |
| POST   | /posts     | Creates a new post                            |
| PUT    | /posts/:id | Edits one post with a corresponding post id   |
| DELETE | /posts/:id | Deletes one post with a corresponding post id |

#### Tests:

Start unit and integration tests:

```shell
npm test
```

***

## Contributing

[@kylbutlr](https://github.com/kylbutlr)

#### Special Thanks: 

[@NoumanSaleem](https://github.com/NoumanSaleem)

## License

MIT
