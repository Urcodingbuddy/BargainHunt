"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X, ArrowLeft, Github, Linkedin, Mail, Twitter } from "lucide-react"

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
    <div className="min-h-screen bg-black text-white">
      {/* Overlay when search is open */}
      {isSearchOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={closeSearch}></div>}

      <header className="container mx-auto py-6 relative z-50">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Bargain<span className="text-purple-500">Hunt</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/compare" className="text-gray-400 hover:text-white transition-colors">
              Compare Prices
            </Link>
            <Link href="/deals/" className="text-gray-400 hover:text-white transition-colors">
              Today's Deals
            </Link>
            <Link href="/guides/" className="text-gray-400 hover:text-white transition-colors">
              Buying Guides
            </Link>
          </nav>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white rounded-md"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </header>

      {/* Search popup */}
      {isSearchOpen && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4">
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

      <main className="container mx-auto px-4 py-12">
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
      </main>

      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="text-xl font-bold tracking-tighter">
                Bargain<span className="text-purple-500">Hunt</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Your trusted companion for finding the best deals across Amazon and Flipkart.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Home & Kitchen
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Books & Media
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Beauty & Personal Care
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Buying Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Deal Alerts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Price History
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Coupon Codes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Shopping Tips
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:anshpethe110@gmail.com" className="hover:text-white">
                    anshpethe110@gmail.com
                  </a>
                </li>
                <li>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} BargainHunt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

