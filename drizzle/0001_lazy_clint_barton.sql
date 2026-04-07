CREATE TABLE "bill_item_participants" (
	"bill_item_id" uuid NOT NULL,
	"bill_participant_id" uuid NOT NULL,
	"type" text,
	"value" numeric NOT NULL,
	"total" numeric NOT NULL,
	CONSTRAINT "bill_item_participants_bill_item_id_bill_participant_id_pk" PRIMARY KEY("bill_item_id","bill_participant_id")
);
--> statement-breakpoint
CREATE TABLE "bill_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"price" numeric NOT NULL,
	"quantity" integer NOT NULL,
	"split_bill_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bill_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"split_bill_id" uuid NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "split_bills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"date" timestamp NOT NULL,
	"is_draft" boolean DEFAULT true NOT NULL,
	"total" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "bill_item_participants" ADD CONSTRAINT "bill_item_participants_bill_item_id_bill_items_id_fk" FOREIGN KEY ("bill_item_id") REFERENCES "public"."bill_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bill_item_participants" ADD CONSTRAINT "bill_item_participants_bill_participant_id_bill_participants_id_fk" FOREIGN KEY ("bill_participant_id") REFERENCES "public"."bill_participants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bill_items" ADD CONSTRAINT "bill_items_split_bill_id_split_bills_id_fk" FOREIGN KEY ("split_bill_id") REFERENCES "public"."split_bills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bill_participants" ADD CONSTRAINT "bill_participants_split_bill_id_split_bills_id_fk" FOREIGN KEY ("split_bill_id") REFERENCES "public"."split_bills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bill_participants" ADD CONSTRAINT "bill_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "split_bills" ADD CONSTRAINT "split_bills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;