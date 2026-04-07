import { getSplitBillById } from "@/app/actions/split-bill"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import Navigation from "./components/navigation"
import ItemCard from "./components/item-card"
import { getBillItemParticipantBySplitBillId } from "@/app/actions/bill-item-participant"
import { determineAllocationStatusItem } from "./components/allocation-badge-status"

export const metadata: Metadata = {
  title: "Allocate Items",
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

  return (
    <>
      <section className="mb-4">
        <p className="text-xs text-muted-foreground">Step 2 of 4</p>
        <p className="text-sm">Input items allocation.</p>
      </section>
      <section className="mb-6 flex flex-1 flex-col gap-2 overflow-y-auto">
        {splitBill.billItems
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              participants={splitBill.billParticipants.sort((a, b) =>
                a.name.localeCompare(b.name)
              )}
              allocations={billItemParticipants.filter(
                (e) => e.billItemId === item.id
              )}
            />
          ))}
      </section>
      <Navigation
        splitBillId={id}
        nextActionDisabled={
          billItemParticipants.length === 0 ||
          billItemsAllocationStatus.some((e) => !e.isAllocated)
        }
      />
    </>
  )
}

export default Page
