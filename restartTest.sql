TRUNCATE posts RESTART IDENTITY;
TRUNCATE users RESTART IDENTITY;

ALTER SEQUENCE posts_id_seq RESTART 1;
ALTER SEQUENCE users_id_seq RESTART 1;

INSERT INTO posts (text, created, user_id) VALUES ('test entry 1', '2019-03-21T23:00:08.555Z', 1);
INSERT INTO posts (text, created, user_id) VALUES ('test entry 2', '2019-03-21T23:00:08.555Z', 2);