-- Your SQL goes here
CREATE TABLE "tasks"(
	"id" INT4 NOT NULL PRIMARY KEY,
	"description" TEXT NOT NULL,
	"reward" INT8 NOT NULL,
	"completed" BOOL NOT NULL
);

CREATE TABLE "users"(
	"id" INT4 NOT NULL PRIMARY KEY,
	"username" VARCHAR NOT NULL,
	"password_hash" VARCHAR NOT NULL
);

