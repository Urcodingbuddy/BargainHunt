"use client"
import React, { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Star, ExternalLink, Mail, Github, Linkedin, Twitter } from "lucide-react"
import { scrapeAndStoreProduct } from "../api/actions"

// Normalized product type that works with both Amazon and Flipkart data
type NormalizedProduct = {
  id: string
  title: string
  normalizedTitle?: string
  image: string
  rating?: number
  reviews?: number
  boughtInPastMonth?: number
  availability?: string
  prices: {
    amazon?: {
      price: string
      originalPrice?: string
      numericValue: number
      discount?: string
      link?: string
    }
    flipkart?: {
      price: string
      originalPrice?: string
      numericValue: number
      link?: string
    }
  }
}

// Function to normalize product data from both sources
const normalizeProductData = (amazonProducts: any[], flipkartProducts: any[]): NormalizedProduct[] => {
  const normalizedProducts: NormalizedProduct[] = []

  // Process Amazon products
  amazonProducts.forEach((amazonProduct, index) => {
    // Create a normalized title for better matching with Flipkart
    const normalizedTitle = amazonProduct.name?.toLowerCase().replace(/\s+/g, " ").trim().split("|")[0] || "unknown-product"
    
    // Handle potential missing or undefined price
    const priceStr = amazonProduct.price || "0"
    const numericValue = Number.parseFloat(priceStr.replace(/[₹,]/g, "")) || 0
    
    normalizedProducts.push({
      // Add index to ensure uniqueness even with same name/price
      id: `amazon-${normalizedTitle.replace(/\s+/g, "-")}-${numericValue}-${index}`,
      title: amazonProduct.name || "Unknown Product",
      normalizedTitle,
      image: amazonProduct.image || "/placeholder.svg",
      rating: amazonProduct.rating,
      reviews: amazonProduct.reviews,
      boughtInPastMonth: amazonProduct.boughtInPastMonth,
      availability: amazonProduct.availability,
      prices: {
        amazon: {
          price: priceStr,
          originalPrice: amazonProduct.discount
            ? (numericValue * (1 + Number.parseFloat(amazonProduct.discount) / 100)).toFixed(2).toString()
            : undefined,
          numericValue,
          discount: amazonProduct.discount,
          link: amazonProduct.link,
        },
      },
    })
  })

  // Process Flipkart products and try to match with Amazon products
  flipkartProducts.forEach((flipkartProduct, index) => {
    const normalizedFlipkartTitle = flipkartProduct.name?.toLowerCase().replace(/\s+/g, " ").trim().split("|")[0] || "unknown-product"
    
    // Handle potential missing or undefined price
    const priceStr = flipkartProduct.price || "0"
    const numericValue = Number.parseFloat(priceStr.replace(/[₹,]/g, "")) || 0

    // Try to find a matching Amazon product
    const matchingProductIndex = normalizedProducts.findIndex(
      (product) =>
        product.normalizedTitle &&
        (product.normalizedTitle.includes(normalizedFlipkartTitle) ||
          normalizedFlipkartTitle.includes(product.normalizedTitle)),
    )

    if (matchingProductIndex !== -1 && normalizedProducts[matchingProductIndex]) {
      // Add Flipkart data to the existing product
      normalizedProducts[matchingProductIndex].prices.flipkart = {
        price: priceStr,
        originalPrice: flipkartProduct.originalPrice,
        numericValue,
        link: flipkartProduct.link,
      }
    } else {
      // Create a new product entry for Flipkart
      normalizedProducts.push({
        // Add index to ensure uniqueness even with same name/price
        id: `flipkart-${normalizedFlipkartTitle.replace(/\s+/g, "-")}-${numericValue}-${index}`,
        title: flipkartProduct.name || "Unknown Product",
        normalizedTitle: normalizedFlipkartTitle,
        image: flipkartProduct.image || "/placeholder.svg",
        prices: {
          flipkart: {
            price: priceStr,
            originalPrice: flipkartProduct.originalPrice,
            numericValue,
            link: flipkartProduct.link,
          },
        },
      })
    }
  })

  return normalizedProducts
}

export default function ComparePage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [products, setProducts] = useState<NormalizedProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Handle search using the scraping hook
  const handleSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return

    setIsLoading(true)

    try {
      // Use the provided scraping hook
      const response = await scrapeAndStoreProduct(searchTerm)

      // Check if response is null or has the expected structure
      if (response) {
        if (Array.isArray(response)) {
          // If response is already an array of normalized products
          setProducts(response)
        } else if (response.amazon || response.flipkart) {
          // If response has amazon and flipkart properties, normalize it
          const normalizedData = normalizeProductData(response.amazon || [], response.flipkart || [])
          setProducts(normalizedData)
        } else {
          // Fallback to empty data if response structure is unexpected
          setProducts([])
        }
      } else {
        // Fallback to empty data if response is null
        setProducts([])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      // Fallback to empty data in case of error
      setProducts([])
    } finally {
      setIsLoading(false)
      setHasSearched(true)
    }
  }, [])

  // Process search results when the component mounts - only once
  useEffect(() => {
    if (query && !hasSearched) {
      handleSearch(query)
    }
  }, [query, handleSearch, hasSearched])

  // Set page title based on search query or category
  let pageTitle = "Compare Prices"
  if (query) {
    pageTitle = `Results for "${query}"`
  } else if (category) {
    pageTitle = `${category.charAt(0).toUpperCase() + category.slice(1)}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Bargain<span className="text-purple-500">Hunt</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/compare" className="text-white transition-colors border-b-2 border-purple-500 pb-1">
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
            className="border-purple-500 bg-transparent text-purple-500 hover:bg-purple-950 hover:text-white rounded-md"
            onClick={() => (window.location.href = "/search?open=true")}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{query ? `Results for "${query}"` : pageTitle}</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch(searchQuery)
          }}
          className="mb-8 max-w-xl"
        >
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for products to compare..."
              className="bg-[#111827] border-gray-700 focus-visible:ring-purple-500 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 rounded-md" disabled={isLoading}>
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
            {products.length > 0 ? (
              products.map((product) => <ProductComparisonCard key={product.id} product={product} />)
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No products found matching your search criteria.</p>
              </div>
            )}
          </div>
        )}
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
              <h3 className="font-medium mb-4">Contact Developer</h3>
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
                    <span className="text-white">{product.boughtInPastMonth}</span> bought in past month
                  </div>
                )}
              </div>

              {/* Price Comparison - Right Side */}
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                {/* Amazon Price */}
                {product.prices.amazon && (
                  <div className="relative">
                    <div className="bg-[#1F2937] p-4 rounded-lg">
                      <h4 className="text-lg font-bold mb-2">Amazon</h4>
                      {product.prices.amazon.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">₹{product.prices.amazon.originalPrice}</div>
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
                )}

                {/* Flipkart Price */}
                {product.prices.flipkart && (
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
                )}

                {/* If neither Amazon nor Flipkart price is available */}
                {!product.prices.amazon && !product.prices.flipkart && (
                  <div className="col-span-2 text-center py-4 text-gray-400">No price information available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}