"use client"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { UserPlusIcon, XIcon } from "lucide-react"
import { useParticipantsStore } from "../stores/participants-store"
import { toast } from "sonner"
import { useActionState, useOptimistic, useRef } from "react"
import { BillParticipant } from "@/app/actions/split-bill"
import { createBillParticipant } from "@/app/actions/bill-participant"

type Params = {
  splitBillId: string
  participants: BillParticipant[]
}

type OptimisticReducerAction =
  | { type: "add"; item: BillParticipant }
  | { type: "remove"; id: string }

const ParticipantsSection = ({ splitBillId, participants }: Params) => {
  const [createState, createFormAction, createPending] = useActionState(
    createBillParticipant,
    {
      success: false,
    }
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const [items, dispatchItems] = useOptimistic<
    BillParticipant[],
    OptimisticReducerAction
  >(participants, (prev, action) => {
    switch (action.type) {
      case "add":
        return [...prev, action.item]
      case "remove":
        return prev.filter((item) => item.id !== action.id)
      default:
        return prev
    }
  })

  const handleCreate = (formData: FormData) => {}

  const removeItem = (id: string) => {}

  return (
    <section id="participant-section" className="mb-6">
      <div className="flex items-center justify-between gap-2">
        <p className="mb-2 font-medium">Participants</p>
        <p className="mb-2 text-xs text-muted-foreground">
          {items.length} Participant{items.length > 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex flex-col rounded-md border p-2">
        <form action={handleCreate}>
          <input
            type="hidden"
            name="split_bill_id"
            defaultValue={splitBillId}
          />
          <InputGroup>
            <InputGroupInput
              placeholder="Add participant..."
              disabled={createPending}
              name="name"
            />
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton
                disabled={createPending}
                type="submit"
                aria-label="Add"
                title="Add"
                size={"icon-sm"}
              >
                <UserPlusIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
        {items.length > 0 && (
          <section className="mt-4 flex flex-wrap gap-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md border px-1.5 py-0.5"
              >
                <p className="text-xs">{item.name}</p>
                <Button
                  type="button"
                  size={"icon-sm"}
                  variant={"secondary"}
                  onClick={() => removeItem(item.id)}
                >
                  <XIcon />
                </Button>
              </div>
            ))}
          </section>
        )}
      </div>
    </section>
  )
}

export default ParticipantsSection
