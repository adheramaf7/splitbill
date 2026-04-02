"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  splitBillId: string
  nextActionDisabled?: boolean
}

const Navigation = ({ splitBillId, nextActionDisabled }: Props) => {
  const router = useRouter()

  return (
    <div className="flex justify-between">
      <Link href={`/new-session/${splitBillId}/info`}>
        <Button type="button" variant={"outline"} size={"lg"}>
          <ArrowLeftIcon /> Prev
        </Button>
      </Link>
      <Button
        type="button"
        size={"lg"}
        disabled={nextActionDisabled}
        onClick={() => router.push(`/new-session/${splitBillId}/allocation`)}
      >
        Next <ArrowRightIcon />
      </Button>
    </div>
  )
}

export default Navigation
