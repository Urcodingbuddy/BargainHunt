import type { NormalizedProduct } from "@/lib/ProductMatching";
import { Lens } from "@/components/ui/lense";
import { Card } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/inputv2";
import { Button } from "@/components/ui/button";

interface Props {
    product: NormalizedProduct;
    checked: boolean;
    onCheckboxChange: (checked: boolean) => void;
    onCategoryChange: (val: string) => void;
    onBrandChange: (val: string) => void;
    categoryValue: string;
    brandValue: string;
  }
  
export default function SeedProductsCard({
    product,
    checked,
    onCheckboxChange,
    onCategoryChange,
    onBrandChange,
    categoryValue,
    brandValue,
  }: Props) {
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
  
    if (amazonPrice && flipkartPrice) {
      return (
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800 overflow-hidden rounded-xl shadow-lg">
          <div className="absolute top-4 right-4 z-10"></div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-3/5">
                {/* Product Image */}
                <div className="relative w-full sm:w-[180px] h-[200px] flex justify-center items-center bg-white rounded-lg overflow-hidden">
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
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2">
                    {product.title}
                  </h3>
  
                  {/* Ratings */}
                  {product.rating && (
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${product.reviews ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-yellow-400">
                          {product.rating}
                          <span className="text-gray-400 text-sm ml-1">
                            out of 5 stars
                          </span>
                        </span>
                      </div>
                      {product.reviews && (
                        <span className="text-gray-400 text-sm">
                          ({product.reviews} reviews)
                        </span>
                      )}
                    </div>
                  )}
  
                  {/* Additional details */}
                  <div className="space-y-1 mt-auto">
                    {product.availability && product.availability !== "N/A" && (
                      <div className="text-sm text-gray-400">
                        Availability:{" "}
                        <span className="text-white">{product.availability}</span>
                      </div>
                    )}
  
                    {product.boughtInPastMonth &&
                      product.boughtInPastMonth !== "M.R.P:" && (
                        <div className="text-sm text-green-500 font-medium">
                          {product.boughtInPastMonth}
                        </div>
                      )}
                  </div>
                </div>
              </div>
  
              {/* Price Comparison - Right Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-2/5">
                {/* Price Comparison Card */}
                <div className="relative flex flex-col h-full">
                  <Card className="bg-black/60 backdrop-blur-xl border border-gray-800 overflow-hidden">
                    <div className="p-4 flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        {/* Amazon Price */}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 border-gray-700 text-white"
                          >
                            <Link
                              href={product.prices.amazon?.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <img
                                className="h-5 w-5 mr-2"
                                src="/amazon-icon.svg"
                                alt="Amazon"
                              />
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                          <div
                            className={`text-xl md:text-2xl font-bold ${
                              bestPrice === "amazon"
                                ? "text-green-500"
                                : "text-white"
                            }`}
                          >
                            {product.prices.amazon?.price || "N/A"}
                          </div>
                        </div>
  
                        {/* Flipkart Price */}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 border-gray-700 text-white"
                          >
                            <Link
                              href={product.prices.flipkart?.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <img
                                className="h-5 w-5 mr-2"
                                src="/flipkart-icon.svg"
                                alt="Flipkart"
                              />
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                          <div
                            className={`text-xl md:text-2xl font-bold ${
                              bestPrice === "flipkart"
                                ? "text-green-500"
                                : "text-white"
                            }`}
                          >
                            {product.prices.flipkart?.price || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  {bestPrice !== "none" && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full">
                      Best Price
                    </Badge>
                  )}
                </div>
  
                {/* Product Specs & Brand Input */}
                <Card className="bg-black/60 backdrop-blur-xl border border-gray-800 overflow-hidden">
                  <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant="outline"
                        className="bg-white/10 text-white border-gray-700"
                      >
                        {product.matchedSpecs}/100
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-white/10 text-white border-gray-700"
                      >
                        {product.category}
                      </Badge>
                    </div>
  
                    <div className="w-full h-px bg-gray-800 my-3"></div>
  
                    <form className="space-y-3 mt-auto">
                      
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={!brandValue}
                          onChange={(e) => onCheckboxChange(e.target.checked)}
                          className="w-full cursor-pointer bg-green-600 hover:bg-green-500 text-white font-medium"
                        />
                        <Input
                          id="category"
                          required
                          placeholder="Category"
                          defaultValue={product.category || ""} 
                          onChange={(e) => onCategoryChange(e.target.value)}
                          className="bg-black/30 border-gray-700 focus:border-purple-500 text-white"
                        />
                        <Input
                          id="brand"
                          required
                          placeholder="Brand"
                          onChange={(e) => onBrandChange(e.target.value)}
                          className="bg-black/30 border-gray-700 focus:border-purple-500 text-white"
                        />
                      
                    </form>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      );
    }
  }
  