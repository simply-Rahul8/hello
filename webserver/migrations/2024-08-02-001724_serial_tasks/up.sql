-- Your SQL goes here
CREATE SEQUENCE tasks_id_seq;
ALTER TABLE "tasks" ALTER COLUMN "id" SET DEFAULT nextval('tasks_id_seq');
SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks));

CREATE SEQUENCE users_id_seq;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
