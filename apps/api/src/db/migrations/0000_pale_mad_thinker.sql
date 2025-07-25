CREATE SCHEMA "user_schema";
--> statement-breakpoint
CREATE TABLE "user_schema"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text
);
