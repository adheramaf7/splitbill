"use client"

import { SplitBill } from "@/app/actions/split-bill"
import { Button } from "@/components/ui/button"
import { Share2Icon } from "lucide-react"
import { toast } from "sonner"

type Props = {
  splitBill: SplitBill
}

export const ShareButton = ({ splitBill }: Props) => {
  const handleClick = async () => {
    const url = `${window.location.origin}/shares/${splitBill.id}`
    console.info(url)
    if (navigator.share) {
      await navigator.share({
        title: "SplitBudy",
        text: `Check out this split bill from ${splitBill.name}`,
        url: url,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  return (
    <Button type="button" size={"xl"} onClick={handleClick} className="w-full">
      <Share2Icon /> Share
    </Button>
  )
}
