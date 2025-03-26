import type React from "react"
import type { Metadata } from "next"
import { Funnel_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Funnel_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BargainHunt - Compare Prices",
  description: "Find the best deals across Amazon and Flipkart",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-[#1a11a]
        [&::-webkit-scrollbar-thumb]:bg-primary/50
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:border-2
        [&::-webkit-scrollbar-thumb]:border-[#1a1a1a]
        [&::-webkit-scrollbar-thumb]:hover:bg-primary`
      }>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 mx-15">{children}</main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  )
}

