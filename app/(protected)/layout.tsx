import { InitialLogo } from "@/components/initial-logo"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import React from "react"
import { headers } from "next/headers"
import Link from "next/link"

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.session) {
    return redirect("/")
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-linear-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href={"/home"}>
            <InitialLogo />
          </Link>
          <UserDropdownMenu />
        </div>
      </nav>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-4">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl py-3">
          <div className="text-center text-sm text-slate-600">
            <p>© {new Date().getFullYear()} DivvyUp.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProtectedLayout
