import { getSplitBillById } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EditIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  Trash2Icon,
  UserPlusIcon,
  XIcon,
} from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import PageContent from "./page.content"

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

      <p className="my-5">BILL ID: {splitBill.id}</p>

      <PageContent
        splitBillId={splitBill.id}
        participants={splitBill.billParticipants}
        items={splitBill.billItems}
      />
    </div>
  )
}

export default Page
