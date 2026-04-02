import { getSplitBillById } from "@/app/actions/split-bill"
import { Metadata } from "next"
import PageContent from "./page.content"

export const metadata: Metadata = {
  title: "Bill Information",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const splitBill = await getSplitBillById(id)

  return (
    <div className="flex flex-col gap-4">
      <section>
        <p className="text-xs text-muted-foreground">Step 1 of 4</p>
        <p className="text-sm">Fill general bill information.</p>
      </section>
      <PageContent splitBill={splitBill} />
    </div>
  )
}

export default Page
