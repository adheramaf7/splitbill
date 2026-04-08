import { getSplitBills, SplitBillStatus } from "@/app/actions/split-bill"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { formatNumber } from "@/lib/utils"
import {
  ArrowRightIcon,
  ListXIcon,
  Trash2Icon,
  UsersRoundIcon,
} from "lucide-react"
import Link from "next/link"
import { DeleteSessionButton } from "./delete-session-button"
import { SessionItem } from "./session-item"

export const SessionHistory = async ({
  status,
}: {
  status: SplitBillStatus
}) => {
  const splitBills = await getSplitBills({ status })

  return (
    <>
      <ul className="mt-4 flex w-full flex-col gap-2">
        {splitBills.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ListXIcon />
              </EmptyMedia>
              <EmptyTitle>No Split Bill History</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any split bills yet..
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href={"/new-session"}>
                <Button type="button" size={"lg"}>
                  Start Your First Session <ArrowRightIcon />
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}
        {splitBills.map((splitBill) => (
          <SessionItem key={splitBill.id} splitBill={splitBill} />
        ))}
      </ul>
    </>
  )
}
