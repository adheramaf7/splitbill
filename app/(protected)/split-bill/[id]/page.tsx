import Link from "next/link"
import { Metadata } from "next"
import ParticipantSummaryCard from "../../../../components/participant-summary-card"
import {
  ArrowLeftIcon,
  DownloadIcon,
  PercentCircleIcon,
  ReceiptIcon,
  Share2Icon,
} from "lucide-react"
import { formatDate, formatNumber } from "@/lib/utils"
import { getSplitBillById } from "@/app/actions/split-bill"
import { getBillItemParticipantBySplitBillId } from "@/app/actions/bill-item-participant"
import { Button } from "@/components/ui/button"
import { ShareButton } from "./components/share-button"
import { DownloadButton } from "./components/download-button"

export const metadata: Metadata = {
  title: "Summary",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const splitBill = await getSplitBillById(id)
  const billItemParticipants = await getBillItemParticipantBySplitBillId(id)

  return (
    <>
      <div className="mb-5 flex flex-row items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">{splitBill.name}</h1>
          <p className="text-sm text-muted-foreground">
            {formatDate(splitBill.date)}
          </p>
        </div>
        <Link href={`/home`}>
          <Button type="button" variant={"ghost"} size={"lg"}>
            <ArrowLeftIcon /> Back
          </Button>
        </Link>
      </div>
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
      <div className="flex flex-row items-center gap-2">
        <div className="flex-1">
          <ShareButton splitBill={splitBill} />
        </div>
        <DownloadButton splitBill={splitBill} />
      </div>
    </>
  )
}

export default Page
