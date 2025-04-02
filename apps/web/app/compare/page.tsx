"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Star, ExternalLink } from "lucide-react"
import { normalizeProductData, scrapeAndStoreProduct } from "@/lib/api"
import type { NormalizedProduct } from "@/lib/api"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/utils"


export default function ComparePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<NormalizedProduct[]>(normalizeProductData())
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q")
    const category = searchParams.get("category") as ProductCategory | null
    
    if (query) {
      setSearchQuery(query)
      if (category) {
        setSelectedCategory(category)
      }
      fetchProducts(query, category)
    } else if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const fetchProducts = async (query: string, category?: ProductCategory | null) => {
    setIsLoading(true)
    try {
      const scrapedProducts = await scrapeAndStoreProduct(query, category || undefined)
      setProducts(scrapedProducts.length > 0 ? scrapedProducts : [])
      setIsSearchOpen(false) // Close the popup after successful search
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() || !hasChanges) return
    fetchProducts(searchQuery, selectedCategory)
    setHasChanges(false)
  }

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value)
    setHasChanges(true)
  }

  const handleCategoryChange = (category: ProductCategory | null) => {
    setSelectedCategory(category)
    setHasChanges(true)
  }

  const openSearch = () => {
    setIsSearchOpen(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Compare Prices</h1>

      {/* Search Input that opens popup */}
      <div className="mb-8 max-w-xl">
        <Input
          type="text"
          placeholder="Search for products to compare..."
          className="bg-[#111827] border-gray-700 focus-visible:ring-purple-500 rounded-md cursor-pointer"
          value={searchQuery}
          onClick={openSearch}
          readOnly
        />
      </div>

      {/* Search Popup */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={closeSearch}
          />

          {/* Popup Content */}
          <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Search Products</h2>
                  <button
                    onClick={closeSearch}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="relative">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for products..."
                      className="bg-black border-gray-700 focus-visible:ring-purple-500 pr-10 text-lg py-6 rounded-md"
                      value={searchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>

                  {/* Categories */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-400">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={selectedCategory === null ? "default" : "outline"}
                        onClick={() => handleCategoryChange(null)}
                        className={`text-sm ${
                          selectedCategory === null
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "hover:bg-purple-600 hover:text-white"
                        }`}
                      >
                        All Categories
                      </Button>
                      {Object.keys(PRODUCT_CATEGORIES).map((category) => (
                        <Button
                          key={category}
                          type="button"
                          variant={selectedCategory === category ? "default" : "outline"}
                          onClick={() => handleCategoryChange(category as ProductCategory)}
                          className={`text-sm ${
                            selectedCategory === category
                              ? "bg-purple-600 hover:bg-purple-700 text-white"
                              : "hover:bg-purple-600 hover:text-white"
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Search Button */}
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md transition-colors"
                    disabled={!hasChanges || isLoading}
                  >
                    {isLoading ? "Searching..." : "Search Products"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <ProductComparisonCard key={product.id} product={product} />
          ))}
           {products.length === 0 && !isLoading && (
            <div className="text-center text-gray-400 py-12">
              No products found. Try a different search or category.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ProductComparisonCard({ product }: { product: NormalizedProduct }) {
  // Determine which store has the better price (if both are available)
  const amazonPrice = product.prices.amazon?.numericValue
  const flipkartPrice = product.prices.flipkart?.numericValue

  let bestPrice = "none"

  if (amazonPrice && flipkartPrice) {
    bestPrice = amazonPrice <= flipkartPrice ? "amazon" : "flipkart"
  } else if (amazonPrice) {
    bestPrice = "amazon"
  } else if (flipkartPrice) {
    bestPrice = "flipkart"
  }

  return (
    <Card className="bg-[#111827] border-gray-800 overflow-hidden rounded-lg">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 w-full">

          <div className="flex flex-col lg:flex-row gap-6 w-full">

            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-5/8">

              {/* Product Image */}
              <div className="relative w-full sm:max-w-[150px] min-h-[150px] sm:h-full flex justify-center border bg-[#fefcfc] rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-[100px] h-auto object-contain"
                />
              </div>
              {/* Product Details */}

              <div className="flex flex-col">
                <h3 className="text-sm md:text-lg font-bold text-white mb-2">{product.title}</h3>

                {/* Ratings */}
                {product.rating && (
                  <div className="flex flex-wrap items-center gap-2 mb-0 sm:mb-4">
                    <div className="flex items-center text-yellow-400 text-sm md:text-lg">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1">{product.rating} out of 5 stars</span>
                    </div>
                    {product.reviews && <span className="text-gray-500">({product.reviews} reviews)</span>}
                  </div>
                )}

                {/* Additional details if available */}
                {product.availability && (
                  <div className="text-xs sm:text-sm text-gray-400 ">
                    Availability: <span className="text-white">{product.availability}</span>
                  </div>
                )}

                {product.boughtInPastMonth && (
                  <div className="text-sm text-gray-400 mb-2">
                    <span className="text-white">{product.boughtInPastMonth}</span>
                  </div>
                )}

              </div>
            </div>
            {/* Price Comparison - Right Side */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 w-full lg:w-3/8">

              {/* Amazon Price */}
              {product.prices.amazon ? (
                <div className="relative">
                  <div className="bg-[#1F2937] p-4 rounded-lg h-full flex flex-col justify-evenly">
                    <h4 className="text-sm md:text-lg font-bold mb-2">Amazon</h4>
                    {product.prices.amazon.originalPrice && (
                      <div className="text-xs md:text-sm text-gray-400 line-through">{product.prices.amazon.originalPrice}</div>
                    )}
                    <div className={`text-md md:text-2xl font-bold ${bestPrice === "amazon" ? "text-green-500" : "text-white"}`}>
                      {product.prices.amazon.price}
                    </div>

                    <Button className="w-full text-xs mt-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-md">
                      <Link
                        href={product.prices.amazon.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full"
                      >
                        <span className="hidden sm:block mr-1">Buy on</span>Amazon <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                  {bestPrice === "amazon" && product.prices.flipkart && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Best Price
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-[#1F2937] p-4 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-center">Not available on Amazon</p>
                </div>
              )}

              {/* Flipkart Price */}
              {product.prices.flipkart ? (
                <div className="relative">
                  <div className="bg-[#1F2937] p-4 rounded-lg h-full flex flex-col justify-evenly">
                    <h4 className="text-sm md:text-lg font-bold mb-2">Flipkart</h4>
                    {product.prices.flipkart.originalPrice && (
                      <div className="text-xs md:text-sm text-gray-400 line-through">{product.prices.flipkart.originalPrice}</div>
                    )}
                    <div className={`text-md md:text-2xl font-bold ${bestPrice === "flipkart" ? "text-green-500" : "text-white"}`}>
                      {product.prices.flipkart.price}
                    </div>

                    <Button className="w-full text-xs mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md">
                      <Link
                        href={product.prices.flipkart.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full"
                      >
                        <span className="hidden sm:block mr-1">Buy on</span> Flipkart <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                  {bestPrice === "flipkart" && product.prices.amazon && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Best Price
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[#1F2937] p-4 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-center">Not available on Flipkart</p>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
