import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

export const DownloadButton = ({ splitBill }: { splitBill: any }) => {
  return (
    <Button size={"icon-xl"} variant={"outline"}>
      <DownloadIcon />
    </Button>
  )
}
