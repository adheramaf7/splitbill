'use server'

import { BillItem } from "@/app/actions/split-bill"
import { db } from "@/db"
import { billItems } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createBillItem(splitBillId: string, formData: FormData) {
  const name = formData.get("name") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string

  const result = await db.insert(billItems).values({
    name,
    price,
    quantity: Number(quantity),
    splitBillId,
  })

  revalidatePath(`/new-session`)

  return {
    success: true,
  }
}

export async function updateBillItem(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string

  await db.update(billItems).set({
    name,
    price,
    quantity: Number(quantity),
  }).where(eq(billItems.id, id))

  revalidatePath(`/new-session`)

  return {
    success: true,
  }
}

export async function deleteBillItemById(id: string) {
  await db.delete(billItems).where(eq(billItems.id, id))

  revalidatePath(`/new-session`)

  return {
    success: true,
  }
}

export async function updateQuantity(id: string, newQuantity: number) {
  if (newQuantity === 0) {
    return await deleteBillItemById(id);
  }

  await db.update(billItems).set({
    quantity: newQuantity,
  }).where(eq(billItems.id, id))

  revalidatePath(`/new-session`)

  return {
    success: true,
  }
}