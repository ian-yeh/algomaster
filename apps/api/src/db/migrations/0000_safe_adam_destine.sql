CREATE TABLE "user_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"stack_user_id" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"image_url" varchar(500),
	"likes_count" integer DEFAULT 0,
	"comments_count" integer DEFAULT 0,
	"shares_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"age" integer,
	"stack_user_id" varchar(255) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"headline" varchar(200),
	"summary" text,
	"location" varchar(100),
	"profile_picture_url" varchar(500),
	"banner_image_url" varchar(500),
	"industry" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_profiles_email_unique" UNIQUE("email"),
	CONSTRAINT "user_profiles_stack_user_id_unique" UNIQUE("stack_user_id")
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"stack_user_id" varchar(255) PRIMARY KEY NOT NULL,
	"privacy_level" varchar(20) DEFAULT 'public',
	"email_notifications" boolean DEFAULT true,
	"connection_requests_open" boolean DEFAULT true,
	"profile_visibility" varchar(20) DEFAULT 'public',
	"activity_broadcast" boolean DEFAULT true,
	"theme_preference" varchar(10) DEFAULT 'light',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_posts" ADD CONSTRAINT "user_posts_stack_user_id_user_profiles_stack_user_id_fk" FOREIGN KEY ("stack_user_id") REFERENCES "public"."user_profiles"("stack_user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_stack_user_id_user_profiles_stack_user_id_fk" FOREIGN KEY ("stack_user_id") REFERENCES "public"."user_profiles"("stack_user_id") ON DELETE no action ON UPDATE no action;