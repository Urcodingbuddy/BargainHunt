import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { ScraperProvider } from "./ScraperContext"

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "BargainHunt | Find the best deals on products",
  description: "BargainHunt is a platform for finding the best deals on products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-[#1a11a]
        [&::-webkit-scrollbar-thumb]:bg-primary/50
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:border-2
        [&::-webkit-scrollbar-thumb]:border-[#1a1a1a]
        [&::-webkit-scrollbar-thumb]:hover:bg-primary`
      }>
        <ScraperProvider>
        {children}
        </ScraperProvider>
        <Toaster/>
      </body>
    </html>
  )
}
