TRUNCATE posts RESTART IDENTITY;
TRUNCATE users RESTART IDENTITY;

ALTER SEQUENCE posts_id_seq RESTART 1;
ALTER SEQUENCE users_id_seq RESTART 1;

INSERT INTO posts (text, time, date, user_id) VALUES ('test text 1', null, null, 1);
INSERT INTO users (username, password) VALUES ('user1', 'pass1');