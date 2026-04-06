import { getBillItemParticipantBySplitBillId } from "@/app/actions/bill-item-participant"
import { getSplitBillById } from "@/app/actions/split-bill"
import { determineAllocationStatusItem } from "../allocation/components/allocation-badge-status"
import { redirect } from "next/navigation"
import { InfoIcon, UsersRoundIcon } from "lucide-react"
import AdjustmentItems from "./components/adjustment-items"
import Navigation from "./components/navigation"
import ClientContent from "./components/client-content"

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const splitBill = await getSplitBillById(id)

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

  const isAllAllocated =
    billItemParticipants.length > 0 &&
    billItemsAllocationStatus.every((e) => e.isAllocated)

  if (!isAllAllocated) {
    redirect(`/new-session/${id}/allocation`)
  }

  return (
    <>
      <section className="mb-4">
        <p className="text-xs text-muted-foreground">Step 3 of 4</p>
        <p className="text-sm">Input bill adjustments.</p>
      </section>
      <section className="flex flex-1 flex-col">
        <div className="mb-4 flex flex-col items-center justify-center rounded-md bg-gray-200 py-5">
          <p className="mb-1 text-sm font-medium text-muted-foreground">
            Sub Total
          </p>
          <p className="text-2xl font-bold text-primary">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(Number(splitBill.total))}
          </p>
        </div>

        <div className="mb-4 flex flex-row items-start justify-start gap-2 rounded-md bg-gray-100 px-4 py-3">
          <div className="pt-1">
            <InfoIcon className="size-4 text-primary" />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">Split Proportions</p>
            <p className="text-justify text-sm text-muted-foreground">
              Extra charges and discounts are automatically split proportionally
              based on each person's item total. This ensures fair distribution
              of tax and fees.
            </p>
          </div>
        </div>

        <ClientContent splitBill={splitBill} />
      </section>
      <Navigation splitBillId={id} />
    </>
  )
}

export default Page
