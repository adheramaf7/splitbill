import { insertTemplateAdjustments } from "@/app/actions/bill-adjustment"
import SubmitButton from "@/app/(protected)/new-session/components/submit-button"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

type Props = {
  splitBillId: string
  nextActionDisabled?: boolean
}

const Navigation = ({ splitBillId, nextActionDisabled }: Props) => {
  return (
    <form
      action={insertTemplateAdjustments.bind(null, splitBillId)}
      className="flex justify-between"
    >
      <Link href={`/new-session/${splitBillId}/items`}>
        <Button type="button" variant={"outline"} size={"lg"}>
          <ArrowLeftIcon /> Prev
        </Button>
      </Link>
      <SubmitButton disabled={nextActionDisabled}>
        Next <ArrowRightIcon />
      </SubmitButton>
    </form>
  )
}

export default Navigation
