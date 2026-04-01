'use server'

import { db } from "@/db"
import { billParticipants } from "@/db/schema";
import { BillParticipant } from "./split-bill";

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

  return {
    success: true,
    data: result[0],
  }
}