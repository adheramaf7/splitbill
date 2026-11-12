"use client"

import { calculateTotalAdjustments } from "@/lib/split-bill-calculator"
import { formatNumber } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, ChevronUpIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  BillAdjustment,
  BillItem,
  BillParticipant,
  SplitBill,
} from "@/app/actions/split-bill"
import { BillItemParticipant } from "@/app/actions/bill-item-participant"
import { useState, useMemo } from "react"

const ParticipantSummaryCard = ({
  participant,
  billItemParticipants,
  billAdjustments,
  billItems,
  allParticipantsCount,
}: {
  participant: BillParticipant
  billItemParticipants: BillItemParticipant[]
  billAdjustments: BillAdjustment[]
  billItems: BillItem[]
  splitBill: SplitBill
  allParticipantsCount: number
}) => {
  const [detailOpen, setDetailOpen] = useState(false)

  const {
    participantItemIds,
    filteredItems,
    billSubtotal,
    totalAdjustments,
    detailsAdjustment,
  } = useMemo(() => {
    const participantItemIds = billItemParticipants.map((bp) => bp.billItemId)
    const filteredItems = billItems
      .filter((bi) => participantItemIds.includes(bi.id))
      .sort((a, b) => a.sequenceNumber - b.sequenceNumber)

    const billSubtotal = billItemParticipants.reduce(
      (acc, bp) => acc + Number(bp.total),
      0
    )

    const { total: totalAdjustments, details: detailsAdjustment } =
      calculateTotalAdjustments({
        participantSubTotal: billSubtotal,
        allParticipantsCount: allParticipantsCount,
        billAdjustments,
      })

    return {
      participantItemIds,
      filteredItems,
      billSubtotal,
      totalAdjustments,
      detailsAdjustment,
    }
  }, [billItemParticipants, billItems, allParticipantsCount, billAdjustments])

  return (
    <Collapsible open={detailOpen} onOpenChange={setDetailOpen}>
      <div className="flex flex-col rounded-md border p-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <p className="mb-2 font-semibold">{participant.name}</p>
            <p className="text-xs text-muted-foreground">
              {participantItemIds.length} items
            </p>
          </div>
          <div className="flex flex-col items-end justify-center">
            <p className="text-xs text-muted-foreground">Total Bill</p>
            <p className="text-lg font-semibold text-primary">
              {formatNumber(Number(billSubtotal + totalAdjustments))}
            </p>
          </div>
        </div>
        <hr className="my-2 border-dashed" />
        <div className="flex flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Inc. Fees & Discounts: {formatNumber(Number(totalAdjustments))}
          </p>
          <CollapsibleTrigger asChild>
            <Button type="button" variant={"ghost"}>
              {detailOpen ? "Hide" : "Show"} Details{" "}
              {detailOpen ? <ChevronUpIcon /> : <ChevronRightIcon />}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2">
          <p className="mb-2 border-b border-dashed pb-1 text-xs font-semibold text-muted-foreground">
            Items:
          </p>
          <div className="flex flex-col gap-2">
            {filteredItems.map((item) => {
              const billItemParticipant = billItemParticipants.find(
                (bip) => bip.billItemId === item.id
              )

              return (
                <div
                  key={item.id}
                  className="flex flex-row items-start justify-between"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">{item.name}</p>
                    {billItemParticipant?.type === "quantity" && (
                      <p className="text-xs text-muted-foreground">
                        {billItemParticipant?.value || 0} x{" "}
                        {formatNumber(Number(item.price))}
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-medium">
                    {formatNumber(Number(billItemParticipant?.total || 0))}
                  </p>
                </div>
              )
            })}
            <div className="mt-2 flex flex-row items-start justify-between border-t border-dashed pt-1.5">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-bold">Sub Total</p>
              </div>
              <p className="text-sm font-bold">
                {formatNumber(Number(billSubtotal))}
              </p>
            </div>

            {billAdjustments.length > 0 && (
              <div className="flex flex-col gap-1.5 border-t border-dashed pt-2">
                <div className="flex flex-row items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">Additional Fees</p>
                  </div>
                  <p className="text-sm font-medium">
                    {detailsAdjustment["additional"] > 0
                      ? `+${formatNumber(Number(detailsAdjustment["additional"]))}`
                      : "-"}
                  </p>
                </div>
                <div className="flex flex-row items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">Discounts & Savings</p>
                  </div>
                  <p className="text-sm font-medium">
                    {detailsAdjustment["discount"] > 0
                      ? `-${formatNumber(Number(detailsAdjustment["discount"]))}`
                      : "-"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export default ParticipantSummaryCard
