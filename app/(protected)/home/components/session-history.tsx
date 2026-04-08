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
import { ArrowRightIcon, ListXIcon, UsersRoundIcon } from "lucide-react"
import Link from "next/link"

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
          <li
            key={splitBill.id}
            className="group overflow-hidden rounded-md border transition-opacity odd:border-l-4 odd:border-l-primary odd:bg-white even:bg-gray-50 hover:opacity-80"
          >
            <Link
              href={
                splitBill.isDraft
                  ? `/new-session/${splitBill.id}/items`
                  : `/split-bill/${splitBill.id}`
              }
              className="flex h-full w-full flex-col p-2"
            >
              <div className="flex flex-row items-start justify-between">
                <div>
                  <p className="text-lg font-semibold">{splitBill.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {splitBill.date.toDateString()}
                  </p>
                </div>
                <div className="text-xl font-bold tracking-wide text-primary">
                  {formatNumber(Number(splitBill.grandTotal))}
                </div>
              </div>
              <div className="flex flex-row items-end justify-between">
                <div className="mt-2 flex flex-row items-center justify-center gap-2 rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-muted-foreground">
                  <UsersRoundIcon className="text-muted-foregroun size-3" />{" "}
                  Split by {splitBill.billParticipants.length}
                </div>
                {splitBill.isDraft && <Badge variant="secondary">Draft</Badge>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
