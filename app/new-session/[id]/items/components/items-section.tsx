"use client"

import {
  createBillItem,
  deleteBillItemById,
  updateBillItem,
  updateQuantity,
} from "@/app/actions/bill-item"
import { BillItem } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  EditIcon,
  ListXIcon,
  Loader2Icon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"
import { startTransition, useActionState, useEffect, useState } from "react"
import { toast } from "sonner"

type ActionState = {
  success?: boolean
  error?: string
}

const ItemsSection = ({
  splitBillId,
  items,
}: {
  splitBillId: string
  items: BillItem[]
}) => {
  const [editItem, setEditItem] = useState<BillItem>()
  const [openForm, setOpenForm] = useState<boolean>(false)

  const handleNewEntry = () => {
    setEditItem(undefined)
    setOpenForm(true)
  }

  const handleCloseForm = () => {
    setEditItem(undefined)
    setOpenForm(false)
  }

  const handleEdit = (item: BillItem) => {
    setEditItem(item)
    setOpenForm(true)
  }

  return (
    <section id="item-section">
      <div className="flex items-center justify-between gap-2">
        <p className="mb-2 font-medium">Receipt Items</p>
        <p className="mb-2 text-xs text-muted-foreground">
          {items.length} Item{items.length > 1 && "s"}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {items.length === 0 && !openForm && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ListXIcon />
              </EmptyMedia>
              <EmptyTitle>No Items Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t added any items yet..
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button type="button" onClick={handleNewEntry}>
                Add First Item
              </Button>
            </EmptyContent>
          </Empty>
        )}
        {items.map((item) =>
          editItem?.id === item.id ? (
            <FormCard
              key={item.id}
              splitBillId={splitBillId}
              existingItem={item}
              onClose={() => handleCloseForm()}
            />
          ) : (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={() => handleEdit(item)}
            />
          )
        )}
        {openForm && !editItem && (
          <FormCard
            splitBillId={splitBillId}
            onClose={() => handleCloseForm()}
          />
        )}
        {!openForm && items.length > 0 && (
          <div
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed border-primary p-3 text-primary"
            onClick={() => handleNewEntry()}
          >
            <PlusCircleIcon size={"14"} />
            <p className="text-sm font-medium">Entry New Item</p>
          </div>
        )}
      </div>
    </section>
  )
}

const ItemCard = ({ item, onEdit }: { item: BillItem; onEdit: () => void }) => {
  const [deleteState, deleteAction, deletePending] = useActionState<
    ActionState,
    string
  >((_: any, id: string) => {
    try {
      return deleteBillItemById(id)
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

  const [updateQuantityState, updateQuantityAction, updateQuantityPending] =
    useActionState<ActionState, { id: string; newQuantity: number }>(
      (_: any, { id, newQuantity }: { id: string; newQuantity: number }) => {
        try {
          return updateQuantity(id, newQuantity)
        } catch {
          return {
            success: false,
            error: "Failed to update quantity. Please try again.",
          }
        }
      },
      {}
    )

  useEffect(() => {
    if (updateQuantityState.success === false && !updateQuantityPending) {
      toast.error(updateQuantityState.error)
    }
  }, [updateQuantityState, updateQuantityPending])

  return (
    <div className="flex flex-col rounded-md border px-2 pt-2 pb-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{item.name}</p>
        <div className="flex items-center">
          <Button
            variant={"ghost"}
            type="button"
            size={"icon"}
            className="text-gray-500"
            onClick={onEdit}
          >
            <EditIcon />
          </Button>
          <Popover>
            <PopoverTrigger className="text-gray-500">
              <Trash2Icon size={14} />
            </PopoverTrigger>
            <PopoverContent className="flex max-w-50 flex-col items-start">
              <p>Are you sure to delete this item?</p>
              <Button
                variant={"destructive"}
                type="button"
                size={"sm"}
                onClick={() => startTransition(() => deleteAction(item.id))}
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
      <hr className="my-2 border-dashed border-muted" />
      <div className="grid grid-cols-3 items-end gap-8">
        <div className="flex items-center gap-2">
          <ButtonGroup orientation="horizontal" aria-label="Quantity controls">
            <Button
              variant="outline"
              size="icon"
              disabled={updateQuantityPending}
              onClick={() =>
                startTransition(() =>
                  updateQuantityAction({
                    id: item.id,
                    newQuantity: item.quantity - 1,
                  })
                )
              }
            >
              <MinusIcon />
            </Button>
            <Button variant="outline" size="icon">
              {item.quantity}
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={updateQuantityPending}
              onClick={() =>
                startTransition(() =>
                  updateQuantityAction({
                    id: item.id,
                    newQuantity: item.quantity + 1,
                  })
                )
              }
            >
              <PlusIcon />
            </Button>
          </ButtonGroup>
          {updateQuantityPending && (
            <Loader2Icon className="animate-spin text-gray-300" size={18} />
          )}
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-sm font-medium">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(Number(item.price))}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-xs text-muted-foreground">Discount</p>
          <p className="text-sm font-medium">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(Number(item.discount))}
          </p>
        </div>
      </div>
    </div>
  )
}

const FormCard = ({
  splitBillId,
  existingItem,
  onClose,
}: {
  splitBillId: string
  existingItem?: BillItem
  onClose: () => void
}) => {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    async (_: ActionState, formData: FormData) => {
      try {
        if (existingItem) {
          return await updateBillItem(existingItem.id, formData)
        } else {
          return await createBillItem(splitBillId, formData)
        }
      } catch {
        return {
          success: false,
          error: "Failed to save item. Please try again.",
        }
      }
    },
    {}
  )

  useEffect(() => {
    if (state.success === true && !pending) {
      onClose()
    } else if (state.success === false && !pending) {
      toast.error(state.error)
    }
  }, [state, pending, onClose])

  return (
    <form
      className="flex flex-col gap-2 rounded-md border border-primary px-2 pt-2 pb-3"
      action={action}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {existingItem ? "Edit Item" : "Add New Item"}
        </p>
        <Button
          variant={"ghost"}
          type="button"
          size={"icon"}
          className="text-gray-500"
          title="Cancel"
          onClick={onClose}
        >
          <XIcon />
        </Button>
      </div>
      <Field>
        <FieldLabel htmlFor="item_name">Item Name</FieldLabel>
        <Input
          id="item_name"
          autoComplete="off"
          name="name"
          defaultValue={existingItem?.name}
          autoFocus
          required
        />
      </Field>
      <div className="grid grid-cols-5 gap-2">
        <Field className="col-span-1">
          <FieldLabel htmlFor="item_qty">Quantity</FieldLabel>
          <Input
            id="item_qty"
            type="number"
            autoComplete="off"
            name="quantity"
            min={1}
            defaultValue={existingItem?.quantity}
            required
          />
        </Field>
        <Field className="col-span-2">
          <FieldLabel htmlFor="item_price">Price</FieldLabel>
          <Input
            id="item_price"
            type="number"
            autoComplete="off"
            min={1}
            name="price"
            defaultValue={existingItem?.price}
            required
          />
        </Field>
        <Field className="col-span-2">
          <FieldLabel htmlFor="item_discount">Discount</FieldLabel>
          <Input
            id="item_discount"
            type="number"
            autoComplete="off"
            min={0}
            name="discount"
            defaultValue={existingItem?.discount}
            required
          />
        </Field>
      </div>
      <Button className="mt-2 w-full" type="submit" disabled={pending}>
        {pending ? "Saving..." : existingItem ? "Update Item" : "Add Item"}{" "}
        {pending && <Loader2Icon className="animate-spin" />}
      </Button>
    </form>
  )
}

export default ItemsSection
