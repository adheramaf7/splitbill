import { Button } from "@/components/ui/button"
import { HomeIcon, Search } from "lucide-react"
import Link from "next/link"
import React from "react"

const NotFound = () => {
  return (
    <main className="flex h-screen flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-indigo-100">
              <span className="text-8xl font-bold text-indigo-600">404</span>
            </div>
            <div className="absolute -right-2 -bottom-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Search className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="mb-4 text-3xl font-bold text-balance text-slate-900 md:text-4xl">
          Page Not Found
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-pretty text-slate-600">
          Oops! Looks like this page got lost in the split. The page you&apos;re
          looking for doesn&apos;t exist or may have been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Link href="/home">
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default NotFound
