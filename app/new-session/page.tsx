import { Metadata } from "next"
import PageContent from "./page.content"

export const metadata: Metadata = {
  title: "New Split Bill Session",
}

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <section>
        <p className="text-xs text-muted-foreground">Step 1 of 4</p>
        <p className="text-sm">Create new split bill session.</p>
      </section>
      <PageContent />
    </div>
  )
}

export default Page
