CREATE TABLE "bill_adjustments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"type" text NOT NULL,
	"percentage" numeric,
	"amount" numeric NOT NULL,
	"split_bill_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bill_item_participants" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "split_bills" ALTER COLUMN "total" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "bill_items" ADD COLUMN "discount" numeric DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "bill_items" ADD COLUMN "total" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "bill_participants" ADD COLUMN "total_bill" numeric;--> statement-breakpoint
ALTER TABLE "bill_participants" ADD COLUMN "adjustments" json;--> statement-breakpoint
ALTER TABLE "bill_participants" ADD COLUMN "final_amount" numeric;--> statement-breakpoint
ALTER TABLE "split_bills" ADD COLUMN "total_adjustments" numeric;--> statement-breakpoint
ALTER TABLE "split_bills" ADD COLUMN "grand_total" numeric;--> statement-breakpoint
ALTER TABLE "bill_adjustments" ADD CONSTRAINT "bill_adjustments_split_bill_id_split_bills_id_fk" FOREIGN KEY ("split_bill_id") REFERENCES "public"."split_bills"("id") ON DELETE cascade ON UPDATE no action;