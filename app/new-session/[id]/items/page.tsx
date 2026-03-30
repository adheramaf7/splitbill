import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Input Bill's Items",
}

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <section>
        <p className="text-xs text-muted-foreground">Step 2 of 4</p>
        <p className="text-sm">Input bill's items.</p>
      </section>
      <section className="flex flex-col gap-2">
        <p>Participants</p>
      </section>
      <section>
        <p>Add Item</p>
      </section>
      <Link href={"/new-session/xxxx-1/allocation"}>
        <Button type="button" size={"lg"} className="w-full">
          Next <ArrowRightIcon />
        </Button>
      </Link>
    </div>
  )
}

export default Page
