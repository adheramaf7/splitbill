import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-lg flex-col p-4">
      <h1 className="mb-4 text-lg font-bold text-primary">
        New Split Bill Session
      </h1>
      {children}
    </main>
  )
}

export default Layout
