"use client"

import { SplitBill } from "@/app/actions/split-bill"
import { formatNumber } from "@/lib/utils"
import { UsersRoundIcon } from "lucide-react"
import Link from "next/link"
import { DeleteSessionButton } from "./delete-session-button"
import { Badge } from "@/components/ui/badge"
import { BillParticipant } from "@/app/actions/split-bill"
import { useRouter } from "next/navigation"

export const SessionItem = ({
  splitBill,
}: {
  splitBill: SplitBill & { billParticipants: BillParticipant[] }
}) => {
  const router = useRouter()

  return (
    <li
      key={splitBill.id}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-md border p-2 transition-opacity odd:border-l-4 odd:border-l-primary odd:bg-white even:bg-gray-50 hover:opacity-80"
      onClick={() =>
        router.push(
          splitBill.isDraft
            ? `/new-session/${splitBill.id}/items`
            : `/split-bill/${splitBill.id}`
        )
      }
    >
      <div className="flex flex-row items-start justify-between">
        <div>
          <p className="text-lg font-semibold">{splitBill.name}</p>
          <p className="text-sm text-muted-foreground">
            {splitBill.date.toDateString()}
          </p>
        </div>
        <div className="text-xl font-bold tracking-wide text-primary">
          {formatNumber(Number(splitBill.grandTotal))}
        </div>
      </div>
      <div className="flex flex-row items-end justify-between">
        <div className="mt-2 flex flex-row items-center justify-center gap-2 rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-muted-foreground">
          <UsersRoundIcon className="text-muted-foregroun size-3" /> Split by{" "}
          {splitBill.billParticipants.length}
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          {splitBill.isDraft && <Badge variant="secondary">Draft</Badge>}
          <DeleteSessionButton splitBillId={splitBill.id} />
        </div>
      </div>
    </li>
  )
}
