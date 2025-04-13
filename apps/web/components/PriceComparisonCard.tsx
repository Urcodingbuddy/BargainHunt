import { Star, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { NormalizedProduct } from "@/lib/ProductMatching";
import Link from "next/link";
import { Lens } from "./ui/lense";
import { Button } from "./ui/button";


export default function ProductComparisonCard({ product }: { product: NormalizedProduct }) {

    const amazonPrice = product.prices.amazon?.numericValue;
    const flipkartPrice = product.prices.flipkart?.numericValue;
  
    let bestPrice = "none";
  
    if (amazonPrice && flipkartPrice) {
      bestPrice = amazonPrice <= flipkartPrice ? "amazon" : "flipkart";
    } else if (amazonPrice) {
      bestPrice = "amazon";
    } else if (flipkartPrice) {
      bestPrice = "flipkart";
    }
  
    return (
      <Card className="bg-transperent backdrop-blur-3xl border-gray-800 overflow-hidden rounded-lg">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-5/8">
                {/* Product Image */}
  
                <div className="relative w-full sm:max-w-[180px] min-h-[200px] sm:h-full flex justify-center items-center border bg-[#fefcfc] rounded-lg">
                  <Lens
                    zoomFactor={2}
                    lensSize={100}
                    isStatic={false}
                    ariaLabel="Zoom Area"
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-[160px] h-auto object-contain cursor-none px-4 py-2"
                    />
                  </Lens>
                </div>
  
                {/* Product Details */}
  
                <div className="flex flex-col">
                  <h3 className="text-sm md:text-lg font-bold text-white mb-2">
                    {product.title}
                  </h3>
  
                  {/* Ratings */}
                  {product.rating && (
                    <div className="flex flex-wrap items-center gap-2 mb-0 sm:mb-4">
                      <div className="flex items-center text-yellow-400 text-sm md:text-lg">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1">
                          {product.rating} out of 5 stars
                        </span>
                      </div>
                      {product.reviews && (
                        <span className="text-gray-500">
                          ({product.reviews} reviews)
                        </span>
                      )}
                    </div>
                  )}
  
                  {/* Additional details if available */}
                  {product.availability != "N/A" && (
                    <div className="text-xs sm:text-sm text-gray-400 ">
                      Availability:{" "}
                      <span className="text-white">{product.availability}</span>
                    </div>
                  )}
  
                  {product.boughtInPastMonth != "M.R.P:" && (
                    <div className="text-sm text-gray-400 mb-2">
                      <span className="text-white">
                        {product.boughtInPastMonth}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Price Comparison - Right Side */}
              <div className="grid grid-cols-2 gap-6 md:gap-6 w-full lg:w-3/8">
                {/* Amazon Price */}
                {product.prices.amazon ? (
                  <div className="relative">
                    <div className="bg-[#130e054d] backdrop-blur-3xl border-2 p-4 rounded-lg h-full flex flex-col justify-evenly">
                      <h4 className="text-sm flex justify-between   items-center md:text-lg font-bold mb-2">
                        Amazon <span className="h-8 w-8 flex justify-center items-center rounded bg-neutral-300">
                          <img
                            className="h-7 w-7 p-0.5 saturate-180 contrast-185"
                            src="./amazon-icon.svg"
                            alt=""
                          />
                        </span>
                      </h4>
                      {product.prices.amazon.originalPrice && (
                        <div className="text-xs md:text-sm text-gray-400 line-through">
                          {product.prices.amazon.originalPrice}
                        </div>
                      )}
                      <div
                        className={`text-md md:text-2xl font-bold ${bestPrice === "amazon" ? "text-green-500" : "text-white"}`}
                      >
                        {product.prices.amazon.price}
                      </div>
  
                      <Button className="w-full text-xs mt-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-md">
                        <Link
                          href={product.prices.amazon.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full"
                        >
                          <span className="hidden sm:block mr-1">Buy on</span>
                          Amazon <ExternalLink className="ml-1 h-3 w-3" />
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
                  <div className="bg-blend-darken border-2 p-4 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400 text-center">
                      Not available on Amazon
                    </p>
                  </div>
                )}
  
                {/* Flipkart Price */}
                {product.prices.flipkart ? (
                  <div className="relative">
                    <div className="bg-[#0b0912c2] backdrop-blur-3xl border-2 p-4 rounded-lg h-full flex flex-col justify-evenly">
                      <h4 className="flex justify-between items-center text-sm md:text-lg font-bold mb-2">
                        Flipkart <img className="h-8" src="./flipkart-icon.svg" alt="" />
                      </h4>
                      {product.prices.flipkart.originalPrice != "N/A" && (
                        <div className="text-xs md:text-sm text-gray-400 line-through">
                          {product.prices.flipkart.originalPrice}
                        </div>
                      )}
                      <div
                        className={`text-md md:text-2xl font-bold ${bestPrice === "flipkart" ? "text-green-500" : "text-white"}`}
                      >
                        {product.prices.flipkart.price}
                      </div>
  
                      <Button className="w-full text-xs mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md">
                        <Link
                          href={product.prices.flipkart.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full"
                        >
                          <span className="hidden sm:block mr-1">Buy on</span>{" "}
                          Flipkart <ExternalLink className="ml-1 h-3 w-3" />
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
                  <div className="bg-blend-darken border-2 p-4 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400 text-center">
                      Not available on Flipkart
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  