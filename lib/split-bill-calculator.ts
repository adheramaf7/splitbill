import { BillAdjustment } from "@/app/actions/split-bill"

type CalculateTotalAdjustmentsParams = {
  participantSubTotal: number;
  allParticipantsCount: number;
  billAdjustments: BillAdjustment[]
}

type CalculateTotalAdjustmentsResult = {
  total: number;
  details: Record<'additional' | 'discount', number>;
}

export const calculateTotalAdjustments = ({ participantSubTotal, allParticipantsCount, billAdjustments }: CalculateTotalAdjustmentsParams): CalculateTotalAdjustmentsResult => {
  let total = 0;
  let additional = 0;
  let discount = 0;

  const getAmountByAdjustmentItem = (adjustment: BillAdjustment) => {
    if (adjustment.valueType === 'percentage') {
      return Number((participantSubTotal * Number(adjustment.value) / 100).toFixed(0))
    } else {
      return Number((Number(adjustment.amount) / allParticipantsCount).toFixed(0))
    }
  }

  billAdjustments.forEach((adjustment) => {
    if (adjustment.type === "additional") {
      const adjustmentAmount = getAmountByAdjustmentItem(adjustment);
      additional += adjustmentAmount;
      total += adjustmentAmount;
    } else {
      const adjustmentAmount = getAmountByAdjustmentItem(adjustment);
      discount += adjustmentAmount;
      total -= adjustmentAmount;
    }
  })

  return { total, details: { additional, discount } };
}  
