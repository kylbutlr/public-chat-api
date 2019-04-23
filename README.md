# Public Chat API

#### RESTful API for an old school public chat room application

Created to be used with [Public Chat App](https://github.com/kylbutlr/public-chat-app)

Uses: PostgreSQL, Express, Jest, JWT, and Bcrypt

## How to Use:

API Endpoint: ```https://kylbutlr-chat-api.herokuapp.com/```

[Click here for an example](https://kylbutlr-chat-api.herokuapp.com/posts) (this link goes to /posts)

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
| GET  | /users    | Returns all registered users                                |
| POST | /login    | Checks returned hashed password and creates new JWT session |
| POST | /register | Registers a new user after hashing the password             |

#### Posts:

| HTTP   | Request    | Response                                      |
| ------ | ---------- | --------------------------------------------- |
| GET    | /posts     | Returns all posts                             |
| POST   | /posts     | Creates a new post                            |
| PUT    | /posts/:id | Edits one post with a corresponding post id   |
| DELETE | /posts/:id | Deletes one post with a corresponding post id |

***

## Contributing:

[@kylbutlr](https://github.com/kylbutlr)

## License:

MIT
