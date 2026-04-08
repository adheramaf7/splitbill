import { getAuthSession } from "@/app/actions/session"
import { getSplitBillById } from "@/app/actions/split-bill"
import { redirect } from "next/navigation"
import React from "react"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const splitBill = await getSplitBillById(id)

  if (!splitBill.isDraft) {
    redirect(`/split-bill/${id}`)
  }

  const session = await getAuthSession()

  if (!session?.session) {
    redirect("/login")
  }

  if (splitBill.userId !== session.user.id) {
    redirect("/home?error=unauthorized")
  }

  return <>{children}</>
}
