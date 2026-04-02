import { BillItemParticipant } from "@/app/actions/bill-item-participant"
import { BillItem } from "@/app/actions/split-bill"
import { Badge } from "@/components/ui/badge"

export const determineAllocationStatusItem = ({
  item,
  allocations,
}: {
  item: BillItem
  allocations: BillItemParticipant[]
}) => {
  const allocated = allocations.reduce((acc, allocation) => {
    return acc + Number(allocation.total)
  }, 0)

  if (allocated === 0) {
    return "Unallocated"
  }

  if (allocated === Number(item.price) * item.quantity) {
    return "Allocated"
  }

  return "Partially Allocated"
}

export const AllocationBadgeSatus = ({
  item,
  allocations,
}: {
  item: BillItem
  allocations: BillItemParticipant[]
}) => {
  const status = determineAllocationStatusItem({ item, allocations })

  if (status === "Unallocated") {
    return <Badge variant={"destructive"}>Unallocated</Badge>
  }

  if (status === "Allocated") {
    return <Badge variant={"default"}>Allocated</Badge>
  }

  return <Badge variant={"secondary"}>Partially Allocated</Badge>
}
