'use server'

import { db } from "@/db"
import { billItems } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { deleteBillItemParticipantByItem } from "./bill-item-participant"

export async function createBillItem(splitBillId: string, formData: FormData) {
  const name = formData.get("name") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string
  const discount = formData.get("discount") as string

  await db.insert(billItems).values({
    name,
    price,
    quantity: Number(quantity),
    splitBillId,
    discount: discount || '0',
    subTotal: (Number(price) * Number(quantity)).toFixed(0),
    total: ((Number(price) * Number(quantity)) - Number(discount || '0')).toFixed(0),
  })

  revalidatePath(`/new-session`)

  return {
    success: true,
  }
}

export async function updateBillItem(id: string, formData: FormData) {
  const existing = await db.query.billItems.findFirst({
    where: eq(billItems.id, id),
  })

  if (!existing) {
    return {
      success: false,
      error: "Item not found.",
    }
  }

  const name = formData.get("name") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string
  const discount = formData.get("discount") as string

  const priceQuantityDiscountChanged =
    existing.price !== price ||
    existing.quantity !== Number(quantity) ||
    existing.discount !== (discount || '0')

  await db.update(billItems).set({
    name,
    price,
    quantity: Number(quantity),
    discount: discount || '0',
    subTotal: (Number(price) * Number(quantity)).toFixed(0),
    total: ((Number(price) * Number(quantity)) - Number(discount || '0')).toFixed(0),
  }).where(eq(billItems.id, id))

  if (priceQuantityDiscountChanged) {
    await deleteBillItemParticipantByItem(id);
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

  if (item.quantity === newQuantity) {
    return {
      success: true,
    }
  }

  await db.update(billItems).set({
    quantity: newQuantity,
    subTotal: (Number(item.price) * Number(newQuantity)).toFixed(0),
    total: ((Number(item.price) * Number(newQuantity)) - Number(item.discount || '0')).toFixed(0),
  }).where(eq(billItems.id, id))

  await deleteBillItemParticipantByItem(id);

  revalidatePath(`/new-session`)

  return {
    success: true,
  }
}