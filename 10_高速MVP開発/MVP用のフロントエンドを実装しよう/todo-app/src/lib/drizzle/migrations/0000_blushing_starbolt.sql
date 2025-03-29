CREATE TABLE "posts" (
	"id" numeric PRIMARY KEY NOT NULL,
	"userId" numeric NOT NULL,
	"title" varchar NOT NULL,
	"body" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" numeric PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL
);
