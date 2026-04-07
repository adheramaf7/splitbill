'use server'

import { db } from "@/db"
import { billAdjustments, splitBills } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

export async function insertTemplateAdjustments(splitBillId: string) {
  const splitBill = await db.query.splitBills.findFirst({
    where: eq(splitBills.id, splitBillId),
    with: {
      billAdjustments: true,
    }
  })

  if (!splitBill) notFound()

  if (splitBill.billAdjustments.length > 0) {
    redirect(`/new-session/${splitBillId}/adjustment`)
  }

  await db.transaction(async (tx) => {
    await Promise.all([
      tx.insert(billAdjustments).values({
        splitBillId: splitBill.id,
        name: "Tax",
        type: "additional",
        valueType: "percentage",
        value: '11',
        amount: (Number(splitBill.total) * 11 / 100).toFixed(0),
      }),
      tx.insert(billAdjustments).values({
        splitBillId: splitBill.id,
        name: "Service Charge",
        type: "additional",
        valueType: "percentage",
        value: '0',
        amount: '0',
      }),
      tx.insert(billAdjustments).values({
        splitBillId: splitBill.id,
        name: "Admin Fee",
        type: "additional",
        valueType: "nominal",
        value: '0',
        amount: '0',
      }),
      tx.insert(billAdjustments).values({
        splitBillId: splitBill.id,
        name: "Discount",
        type: "discount",
        valueType: "nominal",
        value: '0',
        amount: '0',
      }),
      tx.insert(billAdjustments).values({
        splitBillId: splitBill.id,
        name: "Cashback",
        type: "discount",
        valueType: "nominal",
        value: '0',
        amount: '0',
      }),
    ])

    const adjustmentsData = await tx.query.billAdjustments.findMany({
      where: eq(billAdjustments.splitBillId, splitBillId),
    })

    const totalAdjustments = adjustmentsData.reduce((acc, adjustment) => {
      return acc + Number(adjustment.amount) * (adjustment.type === 'discount' ? -1 : 1)
    }, 0)

    await tx.update(splitBills).set({
      totalAdjustments: totalAdjustments.toString(),
      grandTotal: (Number(splitBill.total) + totalAdjustments).toString(),
    }).where(eq(splitBills.id, splitBillId))
  })

  revalidatePath('/new-session')
  redirect(`/new-session/${splitBillId}/adjustment`)
}

export async function insertAdjustment(splitBillId: string, formData: FormData) {
  const splitBill = await db.query.splitBills.findFirst({
    where: eq(splitBills.id, splitBillId),
  })

  if (!splitBill) notFound()

  await db.transaction(async (tx) => {
    const name = formData.get("name") as string
    const type = formData.get("type") as any
    const valueType = formData.get("valueType") as any
    const value = formData.get("value") as string
    const amount = valueType === "percentage" ? (Number(splitBill.total) * Number(value) / 100).toFixed(0) : value

    await tx.insert(billAdjustments).values({
      splitBillId,
      name,
      type,
      valueType,
      value,
      amount,
    })

    const adjustmentsData = await tx.query.billAdjustments.findMany({
      where: eq(billAdjustments.splitBillId, splitBillId),
    })

    const totalAdjustments = adjustmentsData.reduce((acc, adjustment) => {
      return acc + Number(adjustment.amount) * (adjustment.type === 'discount' ? -1 : 1)
    }, 0)

    await tx.update(splitBills).set({
      totalAdjustments: totalAdjustments.toString(),
      grandTotal: (Number(splitBill.total) + totalAdjustments).toString(),
    }).where(eq(splitBills.id, splitBillId))
  })

  revalidatePath(`/new-session/${splitBillId}/adjustment`)

  return {
    success: true,
  }
}

export async function deleteAdjustment(id: string) {
  const splitBillId = await db.transaction(async (tx) => {
    const billAdjustment = await tx.query.billAdjustments.findFirst({
      where: eq(billAdjustments.id, id),
    })

    if (!billAdjustment) notFound()

    const splitBill = await tx.query.splitBills.findFirst({
      where: eq(splitBills.id, billAdjustment.splitBillId),
    })

    if (!splitBill) notFound()

    await tx.delete(billAdjustments).where(eq(billAdjustments.id, id))

    const adjustmentsData = await tx.query.billAdjustments.findMany({
      where: eq(billAdjustments.splitBillId, splitBill.id),
    })

    const totalAdjustments = adjustmentsData.reduce((acc, adjustment) => {
      return acc + Number(adjustment.amount) * (adjustment.type === 'discount' ? -1 : 1)
    }, 0)

    await tx.update(splitBills).set({
      totalAdjustments: totalAdjustments.toString(),
      grandTotal: (Number(splitBill.total) + totalAdjustments).toString(),
    }).where(eq(splitBills.id, splitBill.id))

    return splitBill.id;
  })

  revalidatePath(`/new-session/${splitBillId}/adjustment`)

  return {
    success: true,
  }
}

export async function updateAdjustment(id: string, formData: FormData) {
  const billAdjustment = await db.query.billAdjustments.findFirst({
    where: eq(billAdjustments.id, id),
  })

  if (!billAdjustment) notFound()

  const splitBill = await db.query.splitBills.findFirst({
    where: eq(splitBills.id, billAdjustment.splitBillId),
  })

  if (!splitBill) notFound()

  await db.transaction(async (tx) => {
    const name = formData.get("name") as string
    const type = formData.get("type") as any
    const valueType = formData.get("valueType") as any
    const value = formData.get("value") as string
    const amount = valueType === "percentage" ? (Number(splitBill.total) * Number(value) / 100).toFixed(0) : value

    await tx.update(billAdjustments).set({
      name,
      type,
      valueType,
      value,
      amount,
    }).where(eq(billAdjustments.id, id))

    const adjustmentsData = await tx.query.billAdjustments.findMany({
      where: eq(billAdjustments.splitBillId, splitBill.id),
    })

    const totalAdjustments = adjustmentsData.reduce((acc, adjustment) => {
      return acc + Number(adjustment.amount) * (adjustment.type === 'discount' ? -1 : 1)
    }, 0)

    await tx.update(splitBills).set({
      totalAdjustments: totalAdjustments.toString(),
      grandTotal: (Number(splitBill.total) + totalAdjustments).toString(),
    }).where(eq(splitBills.id, splitBill.id))
  })

  revalidatePath(`/new-session/${splitBill.id}/adjustment`)

  return {
    success: true,
  }
}