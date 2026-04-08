'use server'

import { db } from "@/db"
import { billParticipants } from "@/db/schema";
import { BillParticipant } from "./split-bill";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type CreateState = {
  success: boolean
  message?: string
  data?: BillParticipant
}

export async function createBillParticipant(_: CreateState, formData: FormData): Promise<CreateState> {
  const result = await db.insert(billParticipants).values({
    name: formData.get('name') as string,
    splitBillId: formData.get('split_bill_id') as string,
  }).returning()

  revalidatePath('/new-session');

  return {
    success: true,
    data: result[0],
  }
}

export type DeleteState = {
  success: boolean
  message?: string
}

export async function deleteBillParticipantById(_: DeleteState, id: string): Promise<DeleteState> {
  await db.delete(billParticipants)
    .where(eq(billParticipants.id, id));

  revalidatePath('/new-session');

  return {
    success: true,
  }
}