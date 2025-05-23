-- Your SQL goes here
ALTER TABLE users
ADD COLUMN email VARCHAR NOT NULL;

CREATE UNIQUE INDEX unique_email_index ON users(email);

ALTER TABLE users
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();
