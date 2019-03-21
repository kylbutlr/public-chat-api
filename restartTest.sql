TRUNCATE posts RESTART IDENTITY;
TRUNCATE users RESTART IDENTITY;

ALTER SEQUENCE posts_id_seq RESTART 1;
ALTER SEQUENCE users_id_seq RESTART 1;

INSERT INTO posts (text, time, date, user_id) VALUES ('test entry 1', null, null, 1);
INSERT INTO posts (text, time, date, user_id) VALUES ('test entry 2', null, null, 2);
INSERT INTO users (username, password) VALUES ('testUser1', 'pass');
INSERT INTO users (username, password) VALUES ('testUser2', 'pass');