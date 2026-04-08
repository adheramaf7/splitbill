"use client"

import { BillAdjustment } from "@/app/actions/split-bill"
import {
  CircleDollarSignIcon,
  EditIcon,
  ListXIcon,
  Loader2Icon,
  PercentCircleIcon,
  PercentIcon,
  PlusCircleIcon,
  PlusIcon,
  Trash2Icon,
  TrendingDownIcon,
  TrendingUpIcon,
  XIcon,
} from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { startTransition, useActionState, useEffect, useState } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  deleteAdjustment,
  insertAdjustment,
  updateAdjustment,
} from "@/app/actions/bill-adjustment"
import { toast } from "sonner"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { formatNumber } from "@/lib/utils"

type Params = {
  type: BillAdjustment["type"]
  items: BillAdjustment[]
  splitBillId: string
}

const adjustmentTypeLabel = ({ type }: { type: BillAdjustment["type"] }) => {
  switch (type) {
    case "additional":
      return "Additional Fees"
    case "discount":
      return "Discounts and Savings"
    default:
      return ""
  }
}

const AdjustmentItems = ({ type, items, splitBillId }: Params) => {
  const [editItem, setEditItem] = useState<BillAdjustment>()
  const [openForm, setOpenForm] = useState(false)

  const handleNewEntry = () => {
    setEditItem(undefined)
    setOpenForm(true)
  }

  const handleCloseForm = () => {
    setEditItem(undefined)
    setOpenForm(false)
  }

  const handleEdit = (item: BillAdjustment) => {
    setEditItem(item)
    setOpenForm(true)
  }

  return (
    <section className="flex flex-col">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
        <div className="flex flex-1 items-center gap-2">
          {type === "additional" ? (
            <>
              <TrendingUpIcon className="size-4 text-green-600" />{" "}
              {adjustmentTypeLabel({ type })}
            </>
          ) : (
            <>
              <TrendingDownIcon className="size-4 text-red-600" />{" "}
              {adjustmentTypeLabel({ type })}
            </>
          )}
        </div>
        <Button
          variant={"outline"}
          type="button"
          size={"sm"}
          onClick={handleNewEntry}
        >
          <PlusIcon /> Item
        </Button>
      </div>
      <div className="flex flex-col gap-1.5">
        {items.length === 0 && !openForm && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ListXIcon />
              </EmptyMedia>
              <EmptyTitle>No {adjustmentTypeLabel({ type })} Added</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t added any items yet.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {items.map((item) =>
          editItem?.id === item.id ? (
            <FormContent
              existing={item}
              onClose={() => handleCloseForm()}
              type={item.type}
              splitBillId={item.splitBillId}
              key={item.id}
            />
          ) : (
            <AdjustmentItemCard
              key={item.id}
              item={item}
              onEdit={() => handleEdit(item)}
            />
          )
        )}
        {openForm && !editItem && (
          <FormContent
            type={type}
            splitBillId={splitBillId}
            onClose={() => handleCloseForm()}
          />
        )}
      </div>
    </section>
  )
}

const AdjustmentItemCard = ({
  item,
  onEdit,
}: {
  item: BillAdjustment
  onEdit: () => void
}) => {
  const [deleteState, deleteAction, deletePending] = useActionState<
    { success?: boolean; error?: string },
    string
  >((_: any, id: string) => {
    try {
      return deleteAdjustment(id)
    } catch {
      return {
        success: false,
        error: "Failed to delete item. Please try again.",
      }
    }
  }, {})

  useEffect(() => {
    if (deleteState.success === false && !deletePending) {
      toast.error(deleteState.error)
    }
  }, [deleteState, deletePending])

  return (
    <div className="flex flex-col rounded-md border p-2">
      <div className="mb-1 flex items-start justify-between">
        <p className="font-semibold">{item.name}</p>
        <div className="text-right font-semibold text-primary">
          {formatNumber(Number(item.value))}{" "}
          {item.valueType === "percentage" && "%"}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <Button
            variant={"ghost"}
            type="button"
            size={"icon"}
            className="text-gray-500"
            onClick={() => onEdit()}
          >
            <EditIcon />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                type="button"
                size={"icon"}
                className="text-gray-500"
              >
                <Trash2Icon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex max-w-50 flex-col items-start">
              <p>Are you sure to delete this item?</p>
              <Button
                variant={"destructive"}
                type="button"
                size={"sm"}
                onClick={() => startTransition(() => deleteAction(item.id!))}
                disabled={deletePending}
              >
                {deletePending ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Confirm Delete"
                )}
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

const FormContent = ({
  existing,
  type,
  splitBillId,
  onClose,
}: {
  existing?: BillAdjustment
  type: BillAdjustment["type"]
  splitBillId: string
  onClose: () => void
}) => {
  const [valueType, setValueType] = useState<BillAdjustment["valueType"]>(
    existing?.valueType || "nominal"
  )

  const [state, action, pending] = useActionState<
    {
      success?: boolean
      error?: string
    },
    FormData
  >(async (_, formData) => {
    try {
      formData.append("type", type)
      formData.append("valueType", valueType)
      if (existing) {
        const result = await updateAdjustment(existing.id!, formData)
        if (result.success) onClose()
        return result
      } else {
        const result = await insertAdjustment(splitBillId, formData)
        if (result.success) onClose()
        return result
      }
    } catch (error) {
      return { success: false, error: "Failed to update adjustment" }
    }
  }, {})

  useEffect(() => {
    if (state.success === false && !pending) {
      toast.error(state.error)
    }
  }, [state, pending])

  return (
    <form action={action} className="flex flex-col rounded-md border p-2">
      <div className="mb-1 flex items-start">
        <p className="flex-1 text-sm font-medium">
          {existing ? "Edit Item" : "Add Item"}
        </p>
        <Button
          variant={"ghost"}
          type="button"
          size={"icon"}
          className="text-gray-500"
          onClick={onClose}
        >
          <XIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Field>
          <FieldLabel>Item Name</FieldLabel>
          <Input
            type="text"
            placeholder="e.g. Service Charge"
            defaultValue={existing?.name || ""}
            name="name"
          />
        </Field>
        <div className="grid grid-cols-2 items-end gap-2">
          <Field>
            <FieldLabel>Type</FieldLabel>
            <ButtonGroup>
              <Button
                size={"xs"}
                variant={valueType === "percentage" ? "default" : "outline"}
                type="button"
                onClick={() => setValueType("percentage")}
              >
                <PercentCircleIcon /> Percentage
              </Button>
              <Button
                size={"xs"}
                variant={valueType === "nominal" ? "default" : "outline"}
                type="button"
                onClick={() => setValueType("nominal")}
              >
                <CircleDollarSignIcon /> Amount
              </Button>
            </ButtonGroup>
          </Field>
          <Field>
            <FieldLabel>Value</FieldLabel>
            <InputGroup>
              <InputGroupInput
                type="number"
                defaultValue={existing?.value || ""}
                name="value"
              />
              <InputGroupAddon align={"inline-end"}>
                {existing?.valueType === "percentage" ? (
                  <PercentIcon />
                ) : (
                  <CircleDollarSignIcon />
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2Icon className="animate-spin" />
              {existing ? "Updating..." : "Adding..."}
            </>
          ) : (
            <>{existing ? "Update" : "Add"} Item</>
          )}
        </Button>
      </div>
    </form>
  )
}

export default AdjustmentItems
