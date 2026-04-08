import { Metadata } from "next"
import { createSplitBill } from "../../actions/split-bill"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "./components/submit-button"
import { ArrowRightIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "New Split Bill Session",
}

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <section>
        <p className="text-sm">Fill general bill information to start.</p>
      </section>
      <form action={createSplitBill}>
        <FieldGroup className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="name">Bill Name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Enter bill name"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="date">Date</FieldLabel>
            <Input
              id="date"
              type="date"
              name="date"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </Field>
          <SubmitButton loadingText="Creating...">
            Next
            <ArrowRightIcon />
          </SubmitButton>
        </FieldGroup>
      </form>
    </div>
  )
}

export default Page
