import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const APP_NAME = process.env.APP_NAME || "APP_NAME"

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - Split Bills Fairly & Instantly`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Split shared expenses accurately with friends, coworkers, and groups. DivvyUp handles taxes, discounts, and mixed portions. 100% free forever.",
  icons: {
    icon: [
      {
        url: "/logo.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        geistHeading.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
