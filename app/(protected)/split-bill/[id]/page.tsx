import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Summary",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  return (
    <div>
      SPLIT BILL SUMMARY {id} <Link href={"/"}>Back</Link>
    </div>
  )
}

export default Page
