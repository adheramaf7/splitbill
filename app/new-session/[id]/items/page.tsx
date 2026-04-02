import { getSplitBillById } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import ParticipantsSection from "./components/participants-section"
import ItemsSection from "./components/items-section"
import Navigation from "./components/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Input Participant and Items",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const splitBill = await getSplitBillById(id)

  return (
    <>
      <section className="mb-4">
        <p className="text-xs text-muted-foreground">Step 2 of 4</p>
        <p className="text-sm">Input participants and items.</p>
      </section>
      <ScrollArea className="mb-4 flex flex-1 flex-col overflow-y-auto">
        {/* <p className="my-5">BILL ID: {splitBill.id}</p> */}

        <ParticipantsSection
          splitBillId={id}
          participants={splitBill.billParticipants.sort((a, b) =>
            a.name.localeCompare(b.name)
          )}
        />

        <ItemsSection
          splitBillId={id}
          items={splitBill.billItems.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
          )}
        />
      </ScrollArea>
      <div className="mb-6 flex flex-col items-center rounded-md bg-secondary p-4 text-secondary-foreground">
        <p className="text-xs font-medium text-secondary-foreground/50">
          Total Bills
        </p>
        <p className="text-lg font-semibold">
          {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(
            splitBill.billItems.reduce(
              (acc, item) => acc + Number(item.price) * Number(item.quantity),
              0
            )
          )}
        </p>
      </div>
      <Navigation
        splitBillId={id}
        nextActionDisabled={
          splitBill.billItems.length === 0 ||
          splitBill.billParticipants.length === 0
        }
      />
    </>
  )
}

export default Page
