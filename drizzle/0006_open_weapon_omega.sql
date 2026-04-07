ALTER TABLE "bill_adjustments" ADD COLUMN "value_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bill_adjustments" ADD COLUMN "value" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "bill_adjustments" DROP COLUMN "percentage";