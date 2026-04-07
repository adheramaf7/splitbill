"use client"

import { BillItem } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DollarSignIcon,
  Edit2Icon,
  Loader2Icon,
  PercentCircleIcon,
  PercentIcon,
  PieChartIcon,
  UserPlusIcon,
  XIcon,
} from "lucide-react"
import { useActionState, useEffect, useMemo, useState } from "react"
import { BillParticipant } from "@/app/actions/split-bill"
import { Input } from "@/components/ui/input"
import {
  BillItemParticipant,
  saveBillItemParticipant,
} from "@/app/actions/bill-item-participant"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { AllocationBadgeSatus } from "./allocation-badge-status"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { success } from "zod"
import { toast } from "sonner"
import { id } from "zod/v4/locales"

type AllocationType = BillItemParticipant["type"]

type ParticipantProportion = Record<string, string>

const getParticipantProportionTotal = (
  item: BillItem,
  allocationType: AllocationType,
  allocationValue: number
): number => {
  if (allocationType === "percentage") {
    return Number(((Number(item.total) * allocationValue) / 100).toFixed(0))
  }

  if (allocationType === "nominal") {
    return allocationValue
  }

  const totalDiscount = Number(item.discount || "0")
  const discountPerItem =
    totalDiscount === 0 ? 0 : Number((totalDiscount / item.quantity).toFixed(0))

  return (Number(item.price) - discountPerItem) * allocationValue
}

type ActionState = {
  success?: boolean
  error?: string
}

const ItemCard = ({
  item,
  participants,
  allocations,
}: {
  item: BillItem
  participants: BillParticipant[]
  allocations: BillItemParticipant[]
}) => {
  const [openForm, setOpenForm] = useState(false)
  const [allocationType, setAllocationType] =
    useState<AllocationType>("quantity")
  const [participantProportion, setParticipantProportion] =
    useState<ParticipantProportion>(
      participants.reduce((acc, p) => {
        acc[p.id] = "0"
        return acc
      }, {} as ParticipantProportion)
    )

  const [formState, formAction, formPending] = useActionState<
    ActionState,
    FormData
  >(async (_, formData) => {
    try {
      const participantProportionPayload = Object.entries(
        participantProportion
      ).map(([participantId, value]) => {
        return {
          participantId: participantId,
          type: allocationType,
          value: Number(value),
          total: getParticipantProportionTotal(
            item,
            allocationType,
            Number(value)
          ),
        }
      })

      return await saveBillItemParticipant({
        splitBillId: item.splitBillId,
        billItemId: item.id,
        participantProportions: participantProportionPayload,
      })
    } catch (error) {
      return {
        success: false,
        error: "Failed to save allocation.",
      }
    }
  }, {})

  useEffect(() => {
    if (formState.success === true && !formPending) {
      setOpenForm(false)
    } else if (formState.success === false && !formPending) {
      toast.error(formState.error)
    }
  }, [formState, formPending])

  const toggleForm = () => {
    setOpenForm((prev) => !prev)
  }

  useEffect(() => {
    initializeAllocation()
  }, [])

  const initializeAllocation = () => {
    if (allocations.length === 0) {
      initWithDefaultAllocation()
    } else {
      initWithExistingAllocation()
    }
  }

  const initWithDefaultAllocation = () => {
    const defaultAllocationType =
      item.quantity === 1 ? "percentage" : "quantity"

    setAllocationType(defaultAllocationType)

    if (defaultAllocationType === "percentage") {
      let sum = 0
      setParticipantProportion(
        participants.reduce((acc, p, index) => {
          if (index === participants.length - 1) {
            acc[p.id] = (100 - sum).toString()
          } else {
            const val = Number((100 / participants.length).toFixed(0))
            sum += val
            acc[p.id] = val.toString()
          }
          return acc
        }, {} as ParticipantProportion)
      )
    }
  }

  const initWithExistingAllocation = () => {
    const allocationType = allocations[0].type
    setAllocationType(allocationType)

    setParticipantProportion(
      allocations.reduce((acc, a) => {
        acc[a.billParticipantId] = a.value.toString()
        return acc
      }, {} as ParticipantProportion)
    )
  }

  const allocatedBill = useMemo<number>(() => {
    return Object.entries(participantProportion).reduce((acc, [key, value]) => {
      return (
        acc + getParticipantProportionTotal(item, allocationType, Number(value))
      )
    }, 0)
  }, [participantProportion])

  const changeAllocationType = (type: AllocationType) => {
    setAllocationType(type)

    setParticipantProportion(
      Object.entries(participantProportion).reduce((acc, [key, _]) => {
        acc[key] = "0"
        return acc
      }, {} as ParticipantProportion)
    )
  }

  const unselectedParticipants = useMemo<BillParticipant[]>(() => {
    return participants.filter(
      (p) => !Object.keys(participantProportion).includes(p.id)
    )
  }, [participants, participantProportion])

  const handleSubmit = async (formData: FormData) => {
    if (Object.entries(participantProportion).some(([id, value]) => !value)) {
      toast.error("Please fill all allocation values.")
      return
    }

    if (allocatedBill !== Number(item.total)) {
      toast.error("Allocated bill must be equal to total bill.")
      return
    }

    formAction(formData)
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col rounded-md border px-2 pt-2 pb-4"
    >
      <div className="mb-0.5 flex items-start justify-between">
        <p className="text-lg font-semibold">{item.name}</p>
        <p className="text-lg font-semibold text-primary">
          {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(Number(item.total))}
        </p>
      </div>
      <div className="mb-3 flex items-start justify-between">
        <p className="text-xs text-muted-foreground">
          {Intl.NumberFormat("id-ID", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Number(item.price))}{" "}
          x {item.quantity}
        </p>
        {Number(item.discount || "0") > 0 && (
          <p className="text-xs font-medium text-destructive/80">
            Discount:{" "}
            {Intl.NumberFormat("id-ID", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(Number(item.discount))}
          </p>
        )}
      </div>
      <div className="flex flex-row items-center justify-between">
        <AllocationBadgeSatus item={item} allocations={allocations} />
        <Button
          type="button"
          variant={"secondary"}
          size={"sm"}
          onClick={toggleForm}
        >
          {openForm ? <XIcon /> : <Edit2Icon />}
          {openForm ? "Close" : "Set Allocation"}
        </Button>
      </div>
      {openForm && (
        <section className="mt-3">
          <hr className="border-dashed" />
          <p className="mt-2 mb-2 text-sm font-medium">Allocation Method</p>
          <ButtonGroup orientation="horizontal" aria-label="Quantity controls">
            <Button
              type="button"
              variant={allocationType === "percentage" ? "default" : "outline"}
              size={"sm"}
              onClick={() => changeAllocationType("percentage")}
            >
              <PercentCircleIcon /> Percentage
            </Button>
            <Button
              type="button"
              variant={allocationType === "quantity" ? "default" : "outline"}
              size={"sm"}
              onClick={() => changeAllocationType("quantity")}
            >
              <PieChartIcon /> Quantity
            </Button>
            <Button
              type="button"
              variant={allocationType === "nominal" ? "default" : "outline"}
              size={"sm"}
              onClick={() => changeAllocationType("nominal")}
            >
              <DollarSignIcon /> Amount
            </Button>
          </ButtonGroup>

          <div className="mt-4 mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Allocate to</p>
            {unselectedParticipants.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant={"outline"} size={"sm"}>
                    <UserPlusIcon /> Add Participant
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-wrap gap-2">
                    {unselectedParticipants.map((participant) => (
                      <Button
                        type="button"
                        variant={"outline"}
                        key={participant.id}
                        onClick={() => {
                          setParticipantProportion((prev) => {
                            return { ...prev, [participant.id]: "" }
                          })
                        }}
                      >
                        {participant.name}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {Object.entries(participantProportion).map(
              ([participantID, proportionValue]) => {
                const participant = participants.find(
                  (p) => p.id === participantID
                )
                return (
                  <div
                    key={participantID}
                    className="flex flex-col rounded-md border p-2"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <p className="text-sm font-semibold">
                        {participant?.name || "Unknown"}
                      </p>
                      <Button
                        type="button"
                        variant={"destructive"}
                        size={"icon-sm"}
                        onClick={() => {
                          setParticipantProportion((prev) => {
                            const newParticipantProportion = { ...prev }
                            delete newParticipantProportion[participantID]
                            return newParticipantProportion
                          })
                        }}
                      >
                        <XIcon />
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold text-primary">
                        {Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(
                          getParticipantProportionTotal(
                            item,
                            allocationType,
                            Number(proportionValue)
                          )
                        )}
                      </p>
                      {allocationType === "percentage" && (
                        <InputGroup className="max-w-[30%]">
                          <InputGroupAddon align={"inline-end"}>
                            <PercentIcon />
                          </InputGroupAddon>
                          <InputGroupInput
                            type="number"
                            min={1}
                            max={100}
                            value={proportionValue}
                            required
                            onChange={(e) => {
                              setParticipantProportion((prev) => ({
                                ...prev,
                                [participantID]: e.target.value,
                              }))
                            }}
                          />
                        </InputGroup>
                      )}

                      {allocationType === "quantity" && (
                        <Input
                          className="max-w-[30%]"
                          type="number"
                          min={1}
                          max={item.quantity}
                          value={proportionValue}
                          name={`participants[${participantID}]`}
                          required
                          onChange={(e) => {
                            setParticipantProportion((prev) => ({
                              ...prev,
                              [participantID]: e.target.value,
                            }))
                          }}
                        />
                      )}

                      {allocationType === "nominal" && (
                        <Input
                          className="max-w-[30%]"
                          type="number"
                          min={1}
                          max={item.total}
                          value={proportionValue}
                          name={`participants[${participantID}]`}
                          required
                          onChange={(e) => {
                            setParticipantProportion((prev) => ({
                              ...prev,
                              [participantID]: e.target.value,
                            }))
                          }}
                        />
                      )}
                    </div>
                  </div>
                )
              }
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-medium">Allocated bill</p>
            <p className="font-medium text-primary">
              {Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(allocatedBill)}
            </p>
          </div>

          <Button type="submit" className="mt-4 w-full" disabled={formPending}>
            {formPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Allocation"
            )}
          </Button>
        </section>
      )}
    </form>
  )
}

export default ItemCard
