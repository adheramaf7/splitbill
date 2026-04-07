import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative mx-auto flex h-screen max-w-lg flex-col p-4">
      <h1 className="mb-5 text-lg font-bold text-primary">
        New Split Bill Session
      </h1>
      {children}
    </main>
  )
}

export default Layout
