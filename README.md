# Public Chat API

Old school public chat room application API server

Created to be used with my [Public Chat App](https://github.com/kylbutlr/public-chat-app) front-end

Features: REST CRUD, routing, tests, user accounts, authorization, and encryption

Uses: PostgreSQL, Express, Jest, JWT, and Bcrypt

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
