import { Button } from "@/components/ui/button"
import { PlusIcon, UsersRoundIcon } from "lucide-react"
import Link from "next/link"
import { getSplitBills } from "./actions/split-bill"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ListXIcon } from "lucide-react"
import { formatNumber } from "@/lib/utils"

export default async function Page() {
  const splitBills = await getSplitBills()
  return (
    <main className="relative mx-auto flex min-h-screen max-w-lg flex-col p-4">
      <h1 className="text-lg font-bold text-primary">Split Biller</h1>
      <ul className="mt-4 flex flex-col gap-2">
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
            <EmptyContent className="flex-row justify-center gap-2">
              <Link href={"/new-session"}>
                <Button type="button">Start Your First Session</Button>
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
              href={`/split-bill/${splitBill.id}`}
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
              <div className="flex flex-row">
                <div className="mt-2 flex flex-row items-center justify-center gap-2 rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-muted-foreground">
                  <UsersRoundIcon className="text-muted-foregroun size-3" />{" "}
                  Split by {splitBill.billParticipants.length}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {splitBills.length > 0 && (
        <Link href={"/new-session"}>
          <Button
            className="absolute right-4 bottom-4"
            type="button"
            size={"xl"}
          >
            <PlusIcon /> New Session
          </Button>
        </Link>
      )}
    </main>
  )
}
