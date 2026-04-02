import { getSplitBillById } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import ParticipantsSection from "./components/participants-section"
import ItemsSection from "./components/items-section"

export const metadata: Metadata = {
  title: "Input Participant and Items",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const splitBill = await getSplitBillById(id)

  return (
    <div className="flex flex-col">
      <section className="mb-4">
        <p className="text-xs text-muted-foreground">Step 2 of 4</p>
        <p className="text-sm">Input participants and items.</p>
      </section>

      {/* <p className="my-5">BILL ID: {splitBill.id}</p> */}

      <ParticipantsSection
        splitBillId={id}
        participants={splitBill.billParticipants}
      />

      <ItemsSection splitBillId={id} items={splitBill.billItems} />

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

      <div className="flex justify-between">
        <Link href={`/new-session/${id}/info`}>
          <Button type="button" variant={"outline"} size={"lg"}>
            <ArrowLeftIcon /> Prev
          </Button>
        </Link>
        <Button type="button" size={"lg"}>
          Next <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}

export default Page
