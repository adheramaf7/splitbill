"use client"

import React, { useMemo } from "react"
import AdjustmentItems from "./adjustment-items"
import {
  BillAdjustment,
  BillParticipant,
  SplitBill,
} from "@/app/actions/split-bill"
import GrandTotal from "./grand-total"

type Params = {
  splitBill: SplitBill & {
    billAdjustments: BillAdjustment[]
    billParticipants: BillParticipant[]
  }
}

const ClientContent = ({
  splitBill: { billAdjustments, billParticipants },
}: Params) => {
  const taxesFees = useMemo(() => {
    return billAdjustments.filter((e) => e.type === "additional")
  }, [billAdjustments])

  const discounts = useMemo(() => {
    return billAdjustments.filter((e) => e.type === "discount")
  }, [billAdjustments])

  return (
    <>
      <section className="mb-6 flex flex-col gap-4">
        <AdjustmentItems type="additional" />
        <AdjustmentItems type="discount" />
      </section>

      <GrandTotal billParticipantsCount={billParticipants.length} />
    </>
  )
}

export default ClientContent
