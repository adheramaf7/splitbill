"use client"

import { Button } from "./ui/button"
import { GoogleIcon } from "./google-icon"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function GoogleSignIn() {
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
    <Button type="button" size="xl" variant={"outline"} onClick={handleSignIn}>
      <GoogleIcon className="mr-2 size-4" />
      Continue with Google
    </Button>
  )
}
