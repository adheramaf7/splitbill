"use client"

import { SplitBill, updateSplitBill } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ArrowRightIcon, Loader2Icon } from "lucide-react"
import { useFormStatus } from "react-dom"

const PageContent = ({ splitBill }: { splitBill: SplitBill }) => {
  const { pending } = useFormStatus()

  return (
    <form action={(formData) => updateSplitBill(splitBill.id, formData)}>
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
        <Button type="submit" size={"lg"} className="w-full" disabled={pending}>
          {pending ? "Saving..." : "Next Step"}{" "}
          {pending ? <Loader2Icon /> : <ArrowRightIcon />}
        </Button>
      </FieldGroup>
    </form>
  )
}

export default PageContent
