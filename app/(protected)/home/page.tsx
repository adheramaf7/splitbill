import { Suspense } from "react"
import { SessionHistory } from "./components/session-history"
import { SessionItemSkeleton } from "./components/session-item-skeleton"
import { SplitBillStatus } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

type Props = {
  searchParams: Promise<{ status: SplitBillStatus }>
}

export default async function Page({ searchParams }: Props) {
  const { status = "all" } = await searchParams

  return (
    <>
      <div className="grid grid-cols-3 gap-3 rounded-md border bg-gray-100 p-0">
        <Link href="/home?status=all">
          <Button
            type="button"
            className="w-full"
            variant={status === "all" ? "secondary" : "ghost"}
          >
            All
          </Button>
        </Link>
        <Link href="/home?status=completed">
          <Button
            type="button"
            variant={status === "completed" ? "secondary" : "ghost"}
            className="w-full"
          >
            Completed
          </Button>
        </Link>
        <Link href="/home?status=draft">
          <Button
            type="button"
            variant={status === "draft" ? "secondary" : "ghost"}
            className="w-full"
          >
            Draft
          </Button>
        </Link>
      </div>
      <Suspense
        fallback={
          <ul className="mt-4 flex w-full flex-col gap-2">
            <SessionItemSkeleton />
            <SessionItemSkeleton />
            <SessionItemSkeleton />
            <SessionItemSkeleton />
            <SessionItemSkeleton />
          </ul>
        }
      >
        <SessionHistory status={status} />
      </Suspense>
      <div className="absolute right-4 bottom-4">
        <Link href={"/new-session"}>
          <Button type="button" size={"xl"}>
            <PlusIcon /> Create New Session
          </Button>
        </Link>
      </div>
    </>
  )
}
