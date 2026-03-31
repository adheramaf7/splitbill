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
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRightIcon,
  EditIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  Trash2Icon,
  TrashIcon,
  UserPlusIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Input Participant and Items",
}

const Page = () => {
  return (
    <div className="flex flex-col">
      <section className="mb-4">
        <p className="text-xs text-muted-foreground">Step 2 of 4</p>
        <p className="text-sm">Input participants and items.</p>
      </section>

      <section id="participant-section" className="mb-6">
        <div className="flex items-center justify-between gap-2">
          <p className="mb-2 font-medium">Participants</p>
          <p className="mb-2 text-xs text-muted-foreground">2 Participants</p>
        </div>
        <div className="flex flex-col rounded-md border p-2">
          <InputGroup>
            <InputGroupInput placeholder="Add participant..." />
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton aria-label="Add" title="Add" size={"icon-sm"}>
                <UserPlusIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <section className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-md border px-1.5 py-0.5">
              <p className="text-xs">John Doe</p>
              <Button type="button" size={"icon-sm"} variant={"secondary"}>
                <XIcon />
              </Button>
            </div>
          </section>
        </div>
      </section>

      <section id="item-section" className="mb-4">
        <div className="flex items-center justify-between gap-2">
          <p className="mb-2 font-medium">Receipt Items</p>
          <p className="mb-2 text-xs text-muted-foreground">2 Items</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col rounded-md border px-2 pt-2 pb-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Item Name</p>
              <div className="flex">
                <Button
                  variant={"ghost"}
                  type="button"
                  size={"icon"}
                  className="text-gray-500"
                >
                  <EditIcon />
                </Button>
                <Button
                  variant={"ghost"}
                  type="button"
                  size={"icon"}
                  className="text-gray-500"
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
            <hr className="my-2 border-dashed border-muted" />
            <div className="flex items-end justify-between">
              <ButtonGroup
                orientation="horizontal"
                aria-label="Quantity controls"
              >
                <Button variant="outline" size="icon">
                  <MinusIcon />
                </Button>
                <Button variant="outline" size="icon">
                  1
                </Button>
                <Button variant="outline" size="icon">
                  <PlusIcon />
                </Button>
              </ButtonGroup>
              <div className="flex flex-col items-end gap-1">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-sm font-medium">10.000,00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-md border border-primary px-2 pt-2 pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Add New Item</p>
              <Button
                variant={"ghost"}
                type="button"
                size={"icon"}
                className="text-gray-500"
                title="Cancel"
              >
                <XIcon />
              </Button>
            </div>
            <Field>
              <FieldLabel htmlFor="item_name">Item Name</FieldLabel>
              <Input id="item_name" autoComplete="off" />
            </Field>
            <div className="grid grid-cols-4 gap-2">
              <Field className="col-span-1">
                <FieldLabel htmlFor="item_qty">Quantity</FieldLabel>
                <Input id="item_qty" type="number" autoComplete="off" />
              </Field>
              <Field className="col-span-3">
                <FieldLabel htmlFor="item_price">Price</FieldLabel>
                <Input id="item_price" type="number" autoComplete="off" />
              </Field>
            </div>
            <Button className="mt-2 w-full" type="button">
              Add Item
            </Button>
          </div>

          <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed border-primary p-3 text-primary">
            <PlusCircleIcon size={"14"} />
            <p className="text-sm font-medium">Add Item</p>
          </div>
        </div>
      </section>
      <div className="mb-6 flex flex-col items-center rounded-md bg-secondary p-4 text-secondary-foreground">
        <p className="text-xs font-medium text-secondary-foreground/50">
          Total Bills
        </p>
        <p className="text-lg font-semibold">10.000,00</p>
      </div>

      <div className="flex justify-between">
        <Link href={"/new-session/xxxx-1/info"}>
          <Button
            type="button"
            variant={"outline"}
            size={"lg"}
            className="w-full"
          >
            <ArrowLeftIcon /> Prev
          </Button>
        </Link>
        <Link href={"/new-session/xxxx-1/allocation"}>
          <Button type="button" size={"lg"} className="w-full">
            Next <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Page
