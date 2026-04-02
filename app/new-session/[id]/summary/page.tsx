import { getSplitBillById } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import { redirect } from "next/navigation"

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const splitBill = await getSplitBillById(id)

  if (
    splitBill.billItems.length === 0 ||
    splitBill.billParticipants.length === 0
  ) {
    return redirect(`/new-session/${id}/items`)
  }

  return (
    <div className="flex flex-col">
      <section className="mb-4">
        <p className="text-xs text-muted-foreground">Step 4 of 4</p>
        <p className="text-sm">Review and finish session.</p>
      </section>

      <Button type="button" size={"lg"} className="w-full">
        <CheckIcon /> Finish Session
      </Button>
    </div>
  )
}

export default Page
