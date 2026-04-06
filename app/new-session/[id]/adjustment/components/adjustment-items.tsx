import { BillAdjustment } from "@/app/actions/split-bill"

type Params = {
  type: BillAdjustment["type"]
}

const AdjustmentItems = ({ type }: Params) => {
  return (
    <section className="flex flex-col">
      <p className="mb-2 text-sm font-semibold">
        {type === "additional" ? "Taxes and Fees" : "Discounts and Savings"}
      </p>
      <div className="flex flex-col"></div>
    </section>
  )
}

export default AdjustmentItems
