"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X, ArrowLeft } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Check if the search should be open based on URL parameter
  useEffect(() => {
    const shouldOpen = searchParams.get("open") === "true"
    setIsSearchOpen(shouldOpen)

    if (shouldOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/compare?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
    router.push("/search")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      
      {/* Overlay when search is open */}
      {isSearchOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-10" onClick={closeSearch}></div>}

      {/* Search popup */}
      {isSearchOpen && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-10 px-4">
          <Card className="bg-gray-900 border-gray-800 rounded-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Search Products</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white rounded-full"
                  onClick={closeSearch}
                  type="button"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products to compare prices..."
                  className="bg-black border-gray-700 focus-visible:ring-purple-500 pr-10 text-lg py-6 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button
                  type="submit"
                  className="absolute right-0 top-0 h-full bg-transparent hover:bg-transparent text-gray-400 hover:text-white rounded-md"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
              <div className="mt-4 text-gray-400 text-sm">
                <p>Popular searches: smartphone, laptop, headphones, smartwatch</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Search Products to Compare Prices</h1>
        <p className="text-gray-400 text-lg mb-8">
          Find the best deals across Amazon and Flipkart by searching for products you're interested in.
        </p>

        {!isSearchOpen && (
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-12">
            <Input
              type="text"
              placeholder="Search for products..."
              className="bg-gray-900 border-gray-700 focus-visible:ring-purple-500 pr-10 text-lg py-6 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="absolute right-0 top-0 h-full bg-transparent hover:bg-transparent text-gray-400 hover:text-white rounded-md"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/compare?category=smartphones"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/compare?category=laptops"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/compare?category=headphones"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Headphones
                </Link>
              </li>
              <li>
                <Link
                  href="/compare?category=smartwatches"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Smartwatches
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Trending Searches</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/compare?q=iphone%2015%20pro"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  iPhone 15 Pro
                </Link>
              </li>
              <li>
                <Link
                  href="/compare?q=samsung%20galaxy%20s24"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Samsung Galaxy S24
                </Link>
              </li>
              <li>
                <Link
                  href="/compare?q=macbook%20air%20m3"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  MacBook Air M3
                </Link>
              </li>
              <li>
                <Link
                  href="/compare?q=sony%20wh-1000xm5"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Sony WH-1000XM5
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

