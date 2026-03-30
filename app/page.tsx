import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-lg flex-col p-4">
      <h1 className="text-lg font-bold text-primary">APP NAME</h1>
      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-primary">
          Split Bill History
        </h2>
        <p className="text-sm text-muted-foreground">Your split bill history</p>
      </section>
      <section className="mt-4">
        <div>CARD SPLIT BILL</div>
        <div>CARD SPLIT BILL</div>
        <div>CARD SPLIT BILL</div>
        <div>CARD SPLIT BILL</div>
        <div>CARD SPLIT BILL</div>
      </section>
      <Link href={"/new-session"}>
        <Button className="absolute right-4 bottom-4" type="button" size={"xl"}>
          <PlusIcon /> New Session
        </Button>
      </Link>
    </main>
  )
}
