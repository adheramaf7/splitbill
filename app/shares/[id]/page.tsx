import { getBillItemParticipantBySplitBillId } from "@/app/actions/bill-item-participant"
import { getSplitBillById } from "@/app/actions/split-bill"
import { formatDate, formatNumber } from "@/lib/utils"
import { PercentCircleIcon, ReceiptIcon } from "lucide-react"
import Link from "next/link"
import ParticipantSummaryCard from "@/components/participant-summary-card"
import { InitialLogo } from "@/components/initial-logo"

const APP_NAME = process.env.APP_NAME || "APP_NAME"

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const splitBill = await getSplitBillById(id)
  const billItemParticipants = await getBillItemParticipantBySplitBillId(id)

  return (
    <div className="flex min-h-screen w-full flex-col bg-linear-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
          <Link href={"/"}>
            <InitialLogo size="lg" />
          </Link>
        </div>
      </nav>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-4">
        <div className="mb-5 flex flex-row items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold">{splitBill.name}</h1>
            <p className="text-sm text-muted-foreground">
              {formatDate(splitBill.date)}
            </p>
          </div>
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
                <ReceiptIcon className="text-muted-foregroun size-3" />{" "}
                Subtotal: {formatNumber(Number(splitBill.total))}
              </div>
              <div className="flex flex-row items-center gap-1">
                <PercentCircleIcon className="text-muted-foregroun size-3" />{" "}
                Fees & Discounts:{" "}
                {formatNumber(Number(splitBill.totalAdjustments))}
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
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl py-3">
          <div className="text-center text-sm text-slate-600">
            <p>
              © {new Date().getFullYear()} {APP_NAME}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Page
