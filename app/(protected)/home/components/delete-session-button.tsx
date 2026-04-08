"use client"

import { deleteSplitBill } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Loader2Icon, Trash2Icon } from "lucide-react"
import { startTransition, useActionState, useState } from "react"

export const DeleteSessionButton = ({
  splitBillId,
}: {
  splitBillId: string
}) => {
  const [deleteState, deleteAction, deletePending] = useActionState<
    {
      success?: boolean
    },
    string
  >(async (_, id) => {
    try {
      return await deleteSplitBill(id)
    } catch (error) {
      return { success: false }
    }
  }, {})

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          disabled={deletePending}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {deletePending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Trash2Icon />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex max-w-50 flex-col items-start">
        <p>Are you sure to delete this item?</p>
        <Button
          type="button"
          variant={"destructive"}
          onClick={(e) => {
            e.stopPropagation()
            startTransition(() => deleteAction(splitBillId))
          }}
        >
          {deletePending ? (
            <>
              <Loader2Icon className="animate-spin" /> Deleting
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </PopoverContent>
    </Popover>
  )
}
