"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Star, ExternalLink } from "lucide-react"
import { normalizeProductData, scrapeAndStoreProduct } from "@/lib/api"
import type { NormalizedProduct } from "@/lib/api"

export default function ComparePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState(normalizeProductData())
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)

    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    try {
      // Call the scrapeAndStoreProduct function from api.ts
      const scrapedProducts = await scrapeAndStoreProduct(searchQuery)
      
      // Update products state with scraped and normalized data
      if (scrapedProducts.length > 0) {
        setProducts(scrapedProducts)
      } else {
        // Optional: Handle case where no products are found
        setProducts([])
      }
    } catch (error) {
      console.error("Error searching for products:", error)
      // Optional: Add error handling (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Compare Prices</h1>

      <form onSubmit={handleSearch} className="mb-8 max-w-xl">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for products to compare..."
            className="bg-[#111827] border-gray-700 focus-visible:ring-purple-500 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-md" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <ProductComparisonCard key={product.id} product={product} />
          ))}
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
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="md:w-1/6 flex justify-center">
            <div className="relative w-32 h-32">
              <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-5/6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Info - Left Side */}
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>

                {/* Ratings */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1">{product.rating} out of 5 stars</span>
                    </div>
                    {product.reviews && <span className="text-gray-500">({product.reviews} reviews)</span>}
                  </div>
                )}

                {/* Additional details if available */}
                {product.availability && (
                  <div className="text-sm text-gray-400 mb-2">
                    Availability: <span className="text-white">{product.availability}</span>
                  </div>
                )}

                {product.boughtInPastMonth && (
                  <div className="text-sm text-gray-400 mb-2">
                    <span className="text-white">{product.boughtInPastMonth}</span>
                  </div>
                )}
              </div>

              {/* Price Comparison - Right Side */}
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                {/* Amazon Price */}
                {product.prices.amazon ? (
                  <div className="relative">
                    <div className="bg-[#1F2937] p-4 rounded-lg">
                      <h4 className="text-lg font-bold mb-2">Amazon</h4>
                      {product.prices.amazon.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">{product.prices.amazon.originalPrice}</div>
                      )}
                      <div className={`text-2xl font-bold ${bestPrice === "amazon" ? "text-green-500" : "text-white"}`}>
                        {product.prices.amazon.price}
                      </div>
                      {product.prices.amazon.discount && (
                        <div className="text-sm text-green-500 mt-1">Save {product.prices.amazon.discount}</div>
                      )}
                    </div>
                    {bestPrice === "amazon" && product.prices.flipkart && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Best Price
                      </div>
                    )}
                    <Button className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-md">
                      <a
                        href={product.prices.amazon.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full"
                      >
                        Buy on Amazon <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="bg-[#1F2937] p-4 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Not available on Amazon</p>
                  </div>
                )}

                {/* Flipkart Price */}
                {product.prices.flipkart ? (
                  <div className="relative">
                    <div className="bg-[#1F2937] p-4 rounded-lg">
                      <h4 className="text-lg font-bold mb-2">Flipkart</h4>
                      {product.prices.flipkart.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">
                          {product.prices.flipkart.originalPrice}
                        </div>
                      )}
                      <div
                        className={`text-2xl font-bold ${bestPrice === "flipkart" ? "text-green-500" : "text-white"}`}
                      >
                        {product.prices.flipkart.price}
                      </div>
                    </div>
                    {bestPrice === "flipkart" && product.prices.amazon && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Best Price
                      </div>
                    )}
                    <Button className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md">
                      <a
                        href={product.prices.flipkart.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full"
                      >
                        Buy on Flipkart <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="bg-[#1F2937] p-4 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Not available on Flipkart</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

