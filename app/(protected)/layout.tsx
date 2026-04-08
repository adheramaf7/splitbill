import { InitialLogo } from "@/components/initial-logo"
import React from "react"

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <InitialLogo />
        </div>
      </nav>

      <main>{children}</main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <div className="mb-2">
                <InitialLogo />
              </div>
              <p className="text-slate-600">Fair splits, zero hassle.</p>
            </div>
            <div className="flex gap-6">
              {/* <a
                      href="#"
                      className="text-slate-600 transition-colors hover:text-slate-900"
                    >
                      Privacy
                    </a>
                    <a
                      href="#"
                      className="text-slate-600 transition-colors hover:text-slate-900"
                    >
                      Terms
                    </a> */}
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>
              © {new Date().getFullYear()} DivvyUp. Made with care for fair
              splits everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProtectedLayout
