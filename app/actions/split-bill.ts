'use server';

import { db } from "@/db";
import { billAdjustments, billItemParticipants, billItems, billParticipants, splitBills } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

export async function updateSplitBill(id: string, formData: FormData) {
  const billName = formData.get('name') as string;
  const date = formData.get('date') as string;

  await db.update(splitBills).set({
    name: billName,
    date: new Date(date),
  }).where(eq(splitBills.id, id));

  redirect(`/new-session/${id}/items`)
}

export type BillItem = typeof billItems.$inferSelect;
export type BillParticipant = typeof billParticipants.$inferSelect;
export type BillAdjustment = typeof billAdjustments.$inferSelect;
export type SplitBill = typeof splitBills.$inferSelect;

export async function getSplitBillById(id: string): Promise<SplitBill & { billItems: BillItem[], billParticipants: BillParticipant[], billAdjustments: BillAdjustment[] }> {
  const result = await db.query.splitBills.findFirst({
    where: eq(splitBills.id, id),
    with: {
      billItems: true,
      billParticipants: true,
      billAdjustments: true,
    },
  });

  if (result === undefined) {
    notFound();
  }

  return result;
}

export async function updateSplitBillTotal(id: string) {
  const itemsData = await db.query.billItems.findMany({
    where: eq(billItems.splitBillId, id),
  });

  const total = itemsData.reduce((acc, item) => acc + Number(item.total), 0);

  await db.update(splitBills).set({
    total: `${total}`,
    grandTotal: `${total}`,
  }).where(eq(splitBills.id, id));


  revalidatePath(`/new-session`);

  redirect(`/new-session/${id}/allocation`);
}
