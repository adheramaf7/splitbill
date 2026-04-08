"use client"

import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function GettingStartedButton() {
  const router = useRouter()

  const handleSignIn = async () => {
    const { data: session, error } = await authClient.getSession()

    if (session) {
      return router.push("/home")
    }

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/home",
    })
  }

  return (
    <Button size="xl" type="button" onClick={handleSignIn}>
      Start Splitting Now
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  )
}
