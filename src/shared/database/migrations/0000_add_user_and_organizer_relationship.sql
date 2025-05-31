CREATE TYPE "public"."organizer_member_role" AS ENUM('owner', 'moderator', 'member');--> statement-breakpoint
CREATE TABLE "organizers" (
	"id" varchar PRIMARY KEY NOT NULL,
	"organizer_name" varchar NOT NULL,
	"organizer_username" varchar NOT NULL,
	"organizer_email" varchar NOT NULL,
	"organizer_contact" varchar NOT NULL,
	"organizer_address" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "organizers_organizerUsername_unique" UNIQUE("organizer_username"),
	CONSTRAINT "organizers_organizerEmail_unique" UNIQUE("organizer_email"),
	CONSTRAINT "organizers_organizerContact_unique" UNIQUE("organizer_contact")
);
--> statement-breakpoint
CREATE TABLE "organizer_members" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"organizer_id" varchar,
	"organizer_user_role" "organizer_member_role" DEFAULT 'member',
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"phone_number" integer,
	"verified_at" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "organizer_members" ADD CONSTRAINT "organizer_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizer_members" ADD CONSTRAINT "organizer_members_organizer_id_organizers_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "public"."organizers"("id") ON DELETE no action ON UPDATE no action;