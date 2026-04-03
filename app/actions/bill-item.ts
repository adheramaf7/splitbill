'use server'

import { resetSplitBillAllocations } from "@/app/actions/split-bill"
import { db } from "@/db"
import { billItems } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createBillItem(splitBillId: string, formData: FormData) {
  const name = formData.get("name") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string
  const discount = formData.get("discount") as string

  const result = await db.insert(billItems).values({
    name,
    price,
    quantity: Number(quantity),
    splitBillId,
    discount: discount || '0',
    subTotal: (Number(price) * Number(quantity)).toString(),
    total: ((Number(price) * Number(quantity)) - Number(discount || '0')).toString(),
  })

  await resetSplitBillAllocations(splitBillId)

  revalidatePath(`/new-session`)

  return {
    success: true,
  }
}

export async function updateBillItem(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string
  const discount = formData.get("discount") as string

  const updatedItem = await db.update(billItems).set({
    name,
    price,
    quantity: Number(quantity),
    discount: discount || '0',
    subTotal: (Number(price) * Number(quantity)).toString(),
    total: ((Number(price) * Number(quantity)) - Number(discount || '0')).toString(),
  }).where(eq(billItems.id, id)).returning()

  if (updatedItem.length > 0) {
    await resetSplitBillAllocations(updatedItem[0].splitBillId)
  }

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

  const item = await db.query.billItems.findFirst({
    where: eq(billItems.id, id),
  })

  if (!item) {
    return {
      success: false,
      error: "Item not found.",
    }
  }

  const updatedItem = await db.update(billItems).set({
    quantity: newQuantity,
    subTotal: (Number(item.price) * Number(newQuantity)).toString(),
    total: ((Number(item.price) * Number(newQuantity)) - Number(item.discount || '0')).toString(),
  }).where(eq(billItems.id, id)).returning()

  if (updatedItem.length > 0) {
    await resetSplitBillAllocations(updatedItem[0].splitBillId)
  }

  revalidatePath(`/new-session`)

  return {
    success: true,
  }
}