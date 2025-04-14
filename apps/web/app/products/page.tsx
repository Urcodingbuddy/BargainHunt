"use client";
import { Input } from "@/components/ui/input";
import { useProductFilters } from "@/lib/hooks/useProductFilters";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
export default function ProductsPage() {
  const {
    search,
    setSearch,
    category,
    setCategory,
    brand,
    setBrand,
    categories,
    brands,
    products,
  } = useProductFilters();

  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]);
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Product Listings</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded border border-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded border border-gray-700"
          disabled={!category}
        >
          <option value="">All Brands</option>
          {brands.map((br) => (
            <option key={br} value={br}>
              {br}
            </option>
          ))}
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <Products key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lens } from "@/components/ui/lense";

function Products({ product }: { product: any }) {
  const amazonPrice = parseFloat(product.amazonPrice.replace(/[^\d.]/g, ""));
  const flipkartPrice = parseFloat(
    product.flipkartPrice.replace(/[^\d.]/g, "")
  );

  let bestPrice = "none";
  if (!isNaN(amazonPrice) && !isNaN(flipkartPrice)) {
    bestPrice = amazonPrice <= flipkartPrice ? "amazon" : "flipkart";
  } else if (!isNaN(amazonPrice)) {
    bestPrice = "amazon";
  } else if (!isNaN(flipkartPrice)) {
    bestPrice = "flipkart";
  }

  const image =
    product.image && product.image !== "N/A"
      ? product.image
      : "/placeholder.svg";

  return (
    <Card className="bg-transparent backdrop-blur-3xl border-gray-800 overflow-hidden rounded-lg">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-5/8">
              {/* Product Image */}
              <div className="relative w-full sm:max-w-[180px] min-h-[200px] sm:h-full flex justify-center items-center border bg-[#fefcfc] rounded-lg">
                <Lens zoomFactor={2} lensSize={100} isStatic={false}>
                  <img
                    src={image}
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

                <div className="text-sm text-gray-300 mb-2">
                  Brand: <span className="text-white">{product.brand}</span>
                </div>

                {/* Amazon Rating & Reviews */}
                {(product.amazonRating !== "N/A" ||
                  product.amazonReview !== "N/A") && (
                  <div className="text-xs text-yellow-400">
                    {product.amazonRating !== "N/A" && (
                      <span className="mr-2">
                        Amazon: {product.amazonRating} ★
                      </span>
                    )}
                    {product.amazonReview !== "N/A" && (
                      <span>({product.amazonReview} reviews)</span>
                    )}
                  </div>
                )}
                {product.boughtInLastMonth !== "N/A" &&
                  product.boughtInLastMonth !== "M.R.P:" && (
                    <div className="text-sm text-green-400 mt-2">
                      {product.boughtInLastMonth}
                    </div>
                  )}
              </div>
            </div>

            {/* Price Section */}
            <div className="grid grid-cols-2 gap-6 w-full lg:w-3/8">
              {/* Amazon */}
              {product.amazonPrice !== "N/A" ? (
                <div className="relative">
                  <div className="bg-[#130e054d] backdrop-blur-3xl border-2 p-4 rounded-lg h-full flex flex-col justify-evenly">
                    <h4 className="text-sm flex justify-between items-center md:text-lg font-bold mb-2">
                      Amazon
                      <span className="h-8 w-8 flex justify-center items-center rounded bg-neutral-300">
                        <img
                          className="h-7 w-7"
                          src="/amazon-icon.svg"
                          alt="Amazon"
                        />
                      </span>
                    </h4>
                    {product.amazonOriginalPrice !== "N/A" && (
                      <div className="text-xs text-gray-400 line-through">
                        {product.amazonOriginalPrice}
                      </div>
                    )}
                    <div
                      className={`text-md md:text-2xl font-bold ${bestPrice === "amazon" ? "text-green-500" : "text-white"}`}
                    >
                      {product.amazonPrice}
                    </div>

                    <Link
                      href={product.amazonLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Button className="w-full cursor-pointer text-xs mt-2 bg-amber-500 hover:bg-amber-600 text-black font-bold">
                        Buy on Amazon <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                  {bestPrice === "amazon" &&
                    product.flipkartPrice !== "N/A" && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Best Price
                      </div>
                    )}
                </div>
              ) : (
                <div className="bg-blend-darken border-2 p-4 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-center text-sm">
                    Not available on Amazon
                  </p>
                </div>
              )}

              {/* Flipkart */}
              {product.flipkartPrice !== "N/A" ? (
                <div className="relative">
                  <div className="bg-[#0b0912c2] backdrop-blur-3xl border-2 p-4 rounded-lg h-full flex flex-col justify-evenly">
                    <h4 className="flex justify-between items-center text-sm md:text-lg font-bold mb-2">
                      Flipkart{" "}
                      <img
                        className="h-8"
                        src="/flipkart-icon.svg"
                        alt="Flipkart"
                      />
                    </h4>
                    {product.flipkartOriginalPrice !== "N/A" && (
                      <div className="text-xs text-gray-400 line-through">
                        {product.flipkartOriginalPrice}
                      </div>
                    )}
                    <div
                      className={`text-md md:text-2xl font-bold ${bestPrice === "flipkart" ? "text-green-500" : "text-white"}`}
                    >
                      {product.flipkartPrice}
                    </div>

                      <Link
                        href={product.flipkartLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                    <Button className="w-full cursor-pointer text-xs mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold">
                        Buy on Flipkart{" "}
                        <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                      </Link>
                  </div>
                  {bestPrice === "flipkart" &&
                    product.amazonPrice !== "N/A" && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Best Price
                      </div>
                    )}
                </div>
              ) : (
                <div className="bg-blend-darken border-2 p-4 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-center text-sm">
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
