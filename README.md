# Public Chat API

#### Old school public chat room application API

Created to be used with my [Public Chat App](https://github.com/kylbutlr/public-chat-app) front-end

Features: REST CRUD, routing, tests, user accounts, authorization, and encryption

Uses: PostgreSQL, Express, Jest, JWT, and Bcrypt

## How to Use

The API can be found at: ```https://kylbutlr-chat-api.herokuapp.com/```

[Click here for an example](https://kylbutlr-chat-api.herokuapp.com/posts). (This link goes to /posts)

Alternatively, download this repository and run the server locally:

1. Install the dependencies: ```npm install```
2. Run unit and integration tests: ```npm test```
3. Start the server: ```npm start``` 
4. API can be found at: ```localhost:3000```

### Requests:

Create, update, and delete post requests require a Config Object of Headers for Authorization containing the JSON Web Token for the current session (tied to the logged in user):

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

***

## Contributing

[@kylbutlr](https://github.com/kylbutlr)

## License

MIT
