"use client"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Loader2Icon, UserPlusIcon, XIcon } from "lucide-react"
import { toast } from "sonner"
import { startTransition, useActionState, useRef } from "react"
import { BillParticipant } from "@/app/actions/split-bill"
import {
  createBillParticipant,
  deleteBillParticipantById,
} from "@/app/actions/bill-participant"

type Params = {
  splitBillId: string
  participants: BillParticipant[]
}

const ParticipantsSection = ({ splitBillId, participants }: Params) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [createState, createAction, createPending] = useActionState(
    createBillParticipant,
    {
      success: false,
    }
  )

  const handleCreate = async (formData: FormData) => {
    try {
      const name = (formData.get("name") as string).trim()
      if (name === "") {
        return
      }

      if (participants.findIndex((p) => p.name === name) !== -1) {
        toast.error("Participant already exists")
        return
      }

      formData.append("split_bill_id", splitBillId)

      createAction(formData)
    } catch (error) {
      toast.error("Failed to add participant")
    }
  }

  return (
    <section id="participant-section" className="mb-6">
      <div className="flex items-center justify-between gap-2">
        <p className="mb-2 font-medium">Participants</p>
        <p className="mb-2 text-xs text-muted-foreground">
          {participants.length} Participant{participants.length > 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex flex-col rounded-md border p-2">
        <form action={handleCreate}>
          <InputGroup>
            <InputGroupInput
              placeholder="Add participant..."
              disabled={createPending}
              name="name"
              required
              ref={inputRef}
            />
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton
                disabled={createPending}
                type="submit"
                aria-label="Add"
                title="Add"
                size={"icon-sm"}
              >
                {createPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <UserPlusIcon />
                )}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
        {participants.length > 0 && (
          <section className="mt-4 flex flex-wrap gap-2">
            {participants.map((participant) => (
              <ParticipantItem key={participant.id} participant={participant} />
            ))}
          </section>
        )}
      </div>
    </section>
  )
}

const ParticipantItem = ({ participant }: { participant: BillParticipant }) => {
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteBillParticipantById,
    {
      success: false,
    }
  )

  return (
    <div
      key={`${participant.id}`}
      className="flex items-center gap-2 rounded-md border px-1.5 py-0.5"
    >
      <p className="text-xs">{participant.name}</p>
      <Button
        type="button"
        size={"icon-sm"}
        variant={"outline"}
        disabled={deletePending}
        onClick={() => startTransition(() => deleteAction(participant.id))}
      >
        {deletePending ? <Loader2Icon className="animate-spin" /> : <XIcon />}
      </Button>
    </div>
  )
}

export default ParticipantsSection
