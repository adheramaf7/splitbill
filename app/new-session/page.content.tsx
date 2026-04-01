"use client"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, Loader2Icon } from "lucide-react"
import { createSplitBill } from "../actions/split-bill"
import { useFormStatus } from "react-dom"

const PageContent = () => {
  const { pending } = useFormStatus()

  return (
    <form action={createSplitBill}>
      <FieldGroup className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="name">Bill Name</FieldLabel>
          <Input id="name" name="name" placeholder="Enter bill name" required />
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
        <Button type="submit" size={"lg"} className="w-full" disabled={pending}>
          {pending ? "Creating..." : "Create New Session"}{" "}
          {pending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <ArrowRightIcon />
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}

export default PageContent
