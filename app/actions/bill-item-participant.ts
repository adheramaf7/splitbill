'use server';

import { db } from "@/db";
import { billItemParticipants, billItems } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type BillItemParticipant = typeof billItemParticipants.$inferSelect

export async function getBillItemParticipantBySplitBillId(splitBillId: string): Promise<BillItemParticipant[]> {

  const billItemIds = await db.select({ id: billItems.id }).from(billItems).where(eq(billItems.splitBillId, splitBillId))

  const result = await db.select().from(billItemParticipants).where(inArray(billItemParticipants.billItemId, billItemIds.map((item) => item.id)))

  return result
}


type SaveBillItemParticipantParams = {
  splitBillId: string
  billItemId: string
  participantProportions: {
    participantId: string
    type: BillItemParticipant['type'],
    value: number,
    total: number,
  }[]
}

export async function saveBillItemParticipant(params: SaveBillItemParticipantParams) {
  await db.transaction(async () => {
    await db.delete(billItemParticipants).where(eq(billItemParticipants.billItemId, params.billItemId))

    await Promise.all(
      params.participantProportions.map((p) =>
        db.insert(billItemParticipants).values({
          billItemId: params.billItemId,
          billParticipantId: p.participantId,
          type: p.type,
          value: p.value.toString(),
          total: p.total.toFixed(0),
        })
      )
    );
  })

  revalidatePath('/new-session');

  return { success: true }
}

export async function deleteBillItemParticipantByItem(itemId: string) {
  await db.delete(billItemParticipants).where(eq(billItemParticipants.billItemId, itemId));
}