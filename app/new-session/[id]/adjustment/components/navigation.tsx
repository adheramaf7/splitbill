"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const Navigation = ({ splitBillId }: { splitBillId: string }) => {
  return (
    <div className="flex justify-between">
      <Link href={`/new-session/${splitBillId}/allocation`}>
        <Button type="button" variant={"outline"} size={"lg"}>
          <ArrowLeftIcon /> Prev
        </Button>
      </Link>
      <Button type="button" size={"lg"} onClick={() => {}}>
        Next <ArrowRightIcon />
      </Button>
    </div>
  )
}

export default Navigation
