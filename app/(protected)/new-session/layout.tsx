import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1 className="mb-5 text-lg font-bold text-primary">
        New Split Bill Session
      </h1>
      {children}
    </>
  )
}

export default Layout
