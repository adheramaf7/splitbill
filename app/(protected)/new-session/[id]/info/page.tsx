import { getSplitBillById, updateSplitBill } from "@/app/actions/split-bill"
import { Metadata } from "next"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "../../components/submit-button"
import { ArrowRightIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Bill Information",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const splitBill = await getSplitBillById(id)

  return (
    <div className="flex flex-col gap-4">
      <section>
        <p className="text-sm">Fill general bill information.</p>
      </section>
      <form action={updateSplitBill.bind(null, splitBill.id)}>
        <FieldGroup className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="bill_name">Bill Name</FieldLabel>
            <Input
              id="bill_name"
              name="name"
              placeholder="Enter bill name"
              required
              defaultValue={splitBill.name}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="date">Date</FieldLabel>
            <Input
              id="date"
              type="date"
              name="date"
              required
              defaultValue={splitBill.date.toISOString().split("T")[0]}
            />
          </Field>
          <SubmitButton loadingText="Saving...">
            <ArrowRightIcon /> Next Step
          </SubmitButton>
        </FieldGroup>
      </form>
    </div>
  )
}

export default Page
