ALTER TABLE "bill_adjustments" ADD COLUMN "sequence_number" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "bill_items" ADD COLUMN "sequence_number" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "bill_participants" ADD COLUMN "sequence_number" serial NOT NULL;