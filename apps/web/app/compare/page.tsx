"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Star, ExternalLink } from "lucide-react"
import { normalizeProductData, scrapeAndStoreProduct } from "@/lib/api"
import type { NormalizedProduct } from "@/lib/api"
import { useSearchParams } from "next/navigation"

export default function ComparePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState(normalizeProductData())
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()


  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      fetchProducts(query); // Automatically fetch products when searchParams change
    }
  }, []);

  const fetchProducts = async (query: string) => {
    setIsLoading(true);
    try {
      const scrapedProducts = await scrapeAndStoreProduct(query);
      setProducts(scrapedProducts.length > 0 ? scrapedProducts : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    fetchProducts(searchQuery);
  };

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
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-md cursor-pointer " disabled={isLoading}>
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
          <div className="md:w-1/6 flex justify-center border bg-[#f6f6f6] rounded-lg">
            <div className="relative w-36">
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
                    <div className="bg-[#1F2937] p-4 rounded-lg h-full flex flex-col justify-evenly">
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
                    {bestPrice === "amazon" && product.prices.flipkart && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Best Price
                      </div>
                    )}

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

const DummyData = [
  {
    amazon: [
      {
        name: "realme GT 6T 5G (Razor Green,8GB RAM+256GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M + AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
        rating: '4.3 out of 5 stars',
        reviews: '3,501',
        boughtInPastMonth: '1K+ bought in past month',
        price: '28,998',
        originalPrice: '₹28,998',
        discount: 'Only 1 left in stock.',
        availability: 'In Stock',
        image: 'https://m.media-amazon.com/images/I/71OoxNHXPoL._AC_UY218_.jpg',
        link: 'https://www.amazon.in/realme-Storage-Flagship-Chipset-Brightest/dp/B0D3J7HS89/ref=sr_1_3?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRtQy24acFAZOksHoD7VFKGDmdzsNa2Nm7OJ1Fdh5Vqr01YlfcG74Ok6XQJvDyNknEzayKnxIzPhv_Rvf2tO-_syOj17P14Grgq0ec34nMa10tXDKIqjEmKw3vQQEg5mYMckzfLYb2l5nBp-QIUQCV5qDhdtVWaLZm1D2aVeWahOw.k-PeqJq-NExih9CSxzBWSEkQ-Fjn-vNdWJzZ419HTYo&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1743192658&sr=8-3'
      },
      {
        name: "realme GT 6T 5G (Fluid Silver,12GB RAM+256GB Storage) | India's 1st 7+ Gen 3 Flagship Chipset | 1.5M + AnTuTu Score | 5500mAh+120W | The World's Brightest Flagship Display",
        rating: '4.3 out of 5 stars',
        reviews: '3,501',
        boughtInPastMonth: '1K+ bought in past month',
        price: '30,998',
        originalPrice: '₹30,998',
        discount: '',
        availability: 'In Stock',
        image: 'https://m.media-amazon.com/images/I/61HyiMlCuTL._AC_UY218_.jpg',
        link: 'https://www.amazon.in/realme-Storage-Flagship-Chipset-Brightest/dp/B0D3J8HYDD/ref=sr_1_4?dib=eyJ2IjoiMSJ9.idPca3vooz8z4V5fYJ7HoCMFAwfh-U0oOa5QEEMZqlDz1SF-iYQ2g3trhMiaOTsRtQy24acFAZOksHoD7VFKGDmdzsNa2Nm7OJ1Fdh5Vqr01YlfcG74Ok6XQJvDyNknEzayKnxIzPhv_Rvf2tO-_syOj17P14Grgq0ec34nMa10tXDKIqjEmKw3vQQEg5mYMckzfLYb2l5nBp-QIUQCV5qDhdtVWaLZm1D2aVeWahOw.k-PeqJq-NExih9CSxzBWSEkQ-Fjn-vNdWJzZ419HTYo&dib_tag=se&keywords=Realme%2BGT%2B6T&nsdOptOutParam=true&qid=1743192658&sr=8-4'
      }
    ],
    flipkart: [
      {
        name: 'realme GT Neo 3T (Drifting White, 128 GB)|',
        price: '₹29,100',
        orignalPrice: '₹34,999',
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile-refurbished-fk/y/b/s/-original-imaha52t6hgzskgx.jpeg?q=70',
        link: 'https://www.flipkart.com/refurbished-realme-gt-neo-3t-drifting-white-128-gb/p/itmd0184c630babf?pid=MFRH4ZCHCTEEYJQM&lid=LSTMFRH4ZCHCTEEYJQMYG6CET&marketplace=FLIPKART&bu=REFURBISHED&q=Realme%2BGT%2B6T&store=tyy%2F4io&srno=s_1_21&otracker=search&iid=eb079925-5cd6-43ca-b6ae-803a7643a55a.MFRH4ZCHCTEEYJQM.SEARCH&ssid=ellvk4cuvk0000001743192659915&qH=d1ba4797af0ddbca'
      },
      {
        name: 'realme GT Neo 3T (Drifting White, 128 GB)|',
        price: '₹29,100',
        orignalPrice: '₹34,999',
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile-refurbished-fk/y/b/s/-original-imaha52t6hgzskgx.jpeg?q=70',
        link: 'https://www.flipkart.com/refurbished-realme-gt-neo-3t-drifting-white-128-gb/p/itmd0184c630babf?pid=MFRH4ZCHCTEEYJQM&lid=LSTMFRH4ZCHCTEEYJQMYG6CET&marketplace=FLIPKART&bu=REFURBISHED&q=Realme%2BGT%2B6T&store=tyy%2F4io&srno=s_1_21&otracker=search&iid=eb079925-5cd6-43ca-b6ae-803a7643a55a.MFRH4ZCHCTEEYJQM.SEARCH&ssid=ellvk4cuvk0000001743192659915&qH=d1ba4797af0ddbca'
      }

    ]
  }
]
