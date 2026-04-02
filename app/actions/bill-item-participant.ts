'use server';

import { db } from "@/db";
import { billItemParticipants, billItems } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export type BillItemParticipant = typeof billItemParticipants.$inferSelect

export async function getBillItemParticipantBySplitBillId(splitBillId: string): Promise<BillItemParticipant[]> {

  const billItemIds = await db.select({ id: billItems.id }).from(billItems).where(eq(billItems.splitBillId, splitBillId))

  const result = await db.select().from(billItemParticipants).where(inArray(billItemParticipants.billItemId, billItemIds.map((item) => item.id)))

  return result
}