'use server';

import { db } from "@/db";
import { billItems, billParticipants, splitBills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

export async function createSplitBill(formData: FormData) {

  const billName = formData.get('name') as string;
  const date = formData.get('date') as string;

  const results = await db.insert(splitBills).values({
    name: billName,
    date: new Date(date),
    total: '0',
    isDraft: true,
  }).returning();

  const splitBill = results[0];

  redirect(`/new-session/${splitBill.id}/items`)
}

export type BillItem = typeof billItems.$inferSelect;
export type BillParticipant = typeof billParticipants.$inferSelect;
export type SplitBill = typeof splitBills.$inferSelect;

export async function getSplitBillById(id: string): Promise<SplitBill & { billItems: BillItem[], billParticipants: BillParticipant[] }> {
  const result = await db.query.splitBills.findFirst({
    where: eq(splitBills.id, id),
    with: {
      billItems: true,
      billParticipants: true,
    },
  });

  if (result === undefined) {
    notFound();
  }

  return result;
}