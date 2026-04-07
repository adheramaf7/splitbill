"use client"

import { UsersRoundIcon } from "lucide-react"

type Params = {
  subTotal: number
  billParticipantsCount: number
  totalAdjustments: number
}

const GrandTotal = ({
  subTotal,
  billParticipantsCount,
  totalAdjustments,
}: Params) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-100 py-5">
      <p className="mb-1 text-sm font-medium text-muted-foreground">
        Est. Grand Total
      </p>
      <p className="text-3xl font-bold text-primary">
        {Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(subTotal + totalAdjustments)}
      </p>
      <div className="mt-3 flex flex-row items-center justify-center gap-2 rounded bg-gray-200 p-2 text-xs font-semibold text-muted-foreground">
        <UsersRoundIcon className="text-muted-foregroun size-3" /> Split by{" "}
        {billParticipantsCount}
      </div>
    </div>
  )
}

export default GrandTotal
