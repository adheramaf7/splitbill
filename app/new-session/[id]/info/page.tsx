import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ArrowRightIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Bill Information",
}

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <section>
        <p className="text-xs text-muted-foreground">Step 1 of 4</p>
        <p className="text-sm">Fill general bill information.</p>
      </section>
      <FieldGroup className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="bill_name">Bill Name</FieldLabel>
          <Input id="bill_name" placeholder="Enter bill name" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="date">Date</FieldLabel>
          <Input
            id="date"
            type="date"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </Field>
        <Link href={"/new-session/xxxx-1/items"}>
          <Button type="button" size={"lg"} className="w-full">
            Next Step <ArrowRightIcon />
          </Button>
        </Link>
      </FieldGroup>
    </div>
  )
}

export default Page
