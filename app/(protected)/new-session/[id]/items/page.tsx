import { getSplitBillById } from "@/app/actions/split-bill"
import { Metadata } from "next"
import ParticipantsSection from "./components/participants-section"
import ItemsSection from "./components/items-section"
import Navigation from "./components/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InfoIcon } from "lucide-react"
import { formatNumber } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Input Participant and Items",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const splitBill = await getSplitBillById(id)

  return (
    <>
      <section className="mb-4">
        <p className="text-xs text-muted-foreground">Step 1 of 4</p>
        <p className="text-sm">Input participants and items.</p>
      </section>
      <div className="mb-4 flex flex-1 flex-col overflow-y-auto">
        <ParticipantsSection
          splitBillId={id}
          participants={splitBill.billParticipants.sort((a, b) =>
            a.name.localeCompare(b.name)
          )}
        />

        <ItemsSection
          splitBillId={id}
          items={splitBill.billItems.sort(
            (a, b) => a.sequenceNumber - b.sequenceNumber
          )}
        />

        <div className="mt-4 mb-2 flex flex-col items-center rounded-md bg-secondary p-4 text-secondary-foreground">
          <p className="text-xs font-medium text-secondary-foreground/50">
            Total Bills
          </p>
          <p className="text-lg font-semibold">
            {formatNumber(
              splitBill.billItems.reduce(
                (acc, item) => acc + Number(item.total),
                0
              )
            )}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 rounded-md bg-gray-100 p-2">
          <div className="flex items-center gap-2 text-sm text-yellow-700">
            <InfoIcon className="size-4" />
            <p className="font-medium">Warning</p>
          </div>
          <ul className="flex list-disc flex-col gap-1 pl-10 text-xs">
            <li className="leading-relaxed">
              {" "}
              Please make sure all items and participants are correct before
              proceeding.
            </li>
            <li className="leading-relaxed">
              {" "}
              Any changes on this step will require you to restart the
              allocation session.
            </li>
          </ul>
        </div>
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
