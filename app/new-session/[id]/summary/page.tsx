import { getSplitBillById, lockSplitBill } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftIcon,
  CheckIcon,
  PercentCircleIcon,
  ReceiptIcon,
} from "lucide-react"
import { redirect } from "next/navigation"
import { determineAllocationStatusItem } from "../allocation/components/allocation-badge-status"
import { getBillItemParticipantBySplitBillId } from "@/app/actions/bill-item-participant"
import { formatNumber } from "@/lib/utils"

import ParticipantSummaryCard from "./components/participant-summary-card"
import { Metadata } from "next"
import SubmitButton from "../../components/submit-button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Split Bill Summary",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const splitBill = await getSplitBillById(id)

  if (
    splitBill.billItems.length === 0 ||
    splitBill.billParticipants.length === 0
  ) {
    return redirect(`/new-session/${id}/items`)
  }

  const billItemParticipants = await getBillItemParticipantBySplitBillId(id)

  const billItemsAllocationStatus = splitBill.billItems.map((item) => {
    const allocations = billItemParticipants.filter(
      (e) => e.billItemId === item.id
    )

    return {
      id: item.id,
      isAllocated:
        determineAllocationStatusItem({ item, allocations }) === "Allocated",
    }
  })

  if (billItemsAllocationStatus.some((e) => e.isAllocated === false)) {
    return redirect(`/new-session/${id}/allocation`)
  }

  return (
    <>
      <section className="mb-4">
        <p className="text-xs text-muted-foreground">Step 4 of 4</p>
        <p className="text-sm">Review and finish session.</p>
      </section>

      <section className="mb-4 flex flex-1 flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col items-start justify-center rounded-md bg-gray-100 px-5 py-5">
          <p className="mb-1 text-sm font-medium text-muted-foreground">
            Grand Total
          </p>
          <p className="text-3xl font-bold text-primary">
            {formatNumber(Number(splitBill.grandTotal))}
          </p>
          <div className="mt-2 flex flex-row items-center gap-4 text-xs font-semibold text-muted-foreground">
            <div className="flex flex-row items-center gap-1">
              <ReceiptIcon className="text-muted-foregroun size-3" /> Subtotal:{" "}
              {formatNumber(Number(splitBill.total))}
            </div>
            <div className="flex flex-row items-center gap-1">
              <PercentCircleIcon className="text-muted-foregroun size-3" /> Fees
              & Discounts: {formatNumber(Number(splitBill.totalAdjustments))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-3">
            <p className="font-semibold">Bill per Person</p>
          </div>

          <div className="flex flex-col gap-2">
            {splitBill.billParticipants.map((participant) => (
              <ParticipantSummaryCard
                participant={participant}
                key={participant.id}
                billItemParticipants={billItemParticipants.filter(
                  (bp) => bp.billParticipantId === participant.id
                )}
                billAdjustments={splitBill.billAdjustments}
                billItems={splitBill.billItems}
                splitBill={splitBill}
                allParticipantsCount={splitBill.billParticipants.length}
              />
            ))}
          </div>
        </div>
      </section>

      <form action={lockSplitBill.bind(null, id)}>
        <div className="flex justify-between">
          <Link href={`/new-session/${id}/info`}>
            <Button type="button" variant={"outline"} size={"lg"}>
              <ArrowLeftIcon /> Prev
            </Button>
          </Link>

          <SubmitButton loadingText="Processing...">
            <CheckIcon /> Finish Session
          </SubmitButton>
        </div>
      </form>
    </>
  )
}

export default Page
