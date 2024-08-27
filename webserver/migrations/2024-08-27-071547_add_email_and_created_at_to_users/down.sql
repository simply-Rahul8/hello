-- This file should undo anything in `up.sql`
ALTER TABLE users
DROP COLUMN created_at;

DROP INDEX unique_email_index;

ALTER TABLE users
DROP COLUMN email;
