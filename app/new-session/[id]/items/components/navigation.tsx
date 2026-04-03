import { updateSplitBillTotal } from "@/app/actions/split-bill"
import SubmitButton from "@/app/new-session/components/submit-button"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

type Props = {
  splitBillId: string
  nextActionDisabled?: boolean
}

const Navigation = ({ splitBillId, nextActionDisabled }: Props) => {
  return (
    <form action={updateSplitBillTotal.bind(null, splitBillId)}>
      <div className="flex justify-between">
        <Link href={`/new-session/${splitBillId}/info`}>
          <Button type="button" variant={"outline"} size={"lg"}>
            <ArrowLeftIcon /> Prev
          </Button>
        </Link>

        <SubmitButton loadingText="Processing..." disabled={nextActionDisabled}>
          <ArrowRightIcon /> Next Step
        </SubmitButton>
      </div>
    </form>
  )
}

export default Navigation
