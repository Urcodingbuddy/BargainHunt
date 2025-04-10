"use client";

import type React from "react";
import Spline from "@splinetool/react-spline";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Star, ExternalLink, ArrowLeft } from "lucide-react";
import type { NormalizedProduct } from "@/lib/ProductMatching";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useCompare } from "@/contexts/CompareContext";

export default function ComparePage() {
  const { toast } = useToast();
  const {
    products,
    isLoading,
    searchQuery,
    selectedCategory,
    fetchProducts,
    setSearchQuery,
    setSelectedCategory,
  } = useCompare();

  // Transient UI state for input value - separate from application state
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  

  
  // Track if initial URL processing has occurred
  const initialLoadProcessed = useRef(false);

  // Handle URL parameter changes
  useEffect(() => {
    const query = searchParams.get("q");
    const category = searchParams.get("category") as ProductCategory | null;
  
    // If the query changes in the URL, update the input value and trigger the API call
    if (query && query !== searchQuery) {
      setSearchQuery(query); // Update the search query state
      setInputValue(query); // Update the input box value
      fetchProducts(query, category); // Trigger the API call
    }

    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  }, [searchQuery]);
  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSearchQuery(searchParams.get("q") || inputValue);
    
    
    fetchProducts(inputValue, selectedCategory);
    
    
    setIsSearchOpen(false);
    
    const url = new URL(window.location.href);
    url.searchParams.set("q", inputValue);
    if (selectedCategory) {
      url.searchParams.set("category", selectedCategory);
    } else {
      url.searchParams.delete("category");
    }
    window.history.replaceState({}, "", url.toString());
  }, [inputValue, selectedCategory, fetchProducts, setSearchQuery]);
  const handleSearchInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleCategoryChange = useCallback((category: ProductCategory | null) => {
    setSelectedCategory(category);
  }, [setSelectedCategory]);

  useEffect(() => {
    if (products.length === 0 && isLoading && initialLoadProcessed.current) {
      toast({
        title: "Searching for products...",
        description: "This may take a few seconds.",
        duration: 2000,
        action: <Button variant="link" onClick={closeSearch}>Close</Button>,
        className: "bg-black/20 border-white/10 text-white",
        variant: "default",
      });
    }
  }, [products.length, isLoading, toast]);

  useEffect(() => {
    let isThrottled = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        if (isThrottled) return;

        setIsSearchOpen((prev) => {
          if (!prev) {
            setTimeout(() => {
              searchInputRef.current?.focus();
            }, 100);
          }
          return !prev;
        });
        isThrottled = true;

        setTimeout(() => {
          isThrottled = false;
        }, 500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Modal open/close handlers
  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);
  
  // Reset input value when modal opens to match current search query
  useEffect(() => {
    if (isSearchOpen) {
      setInputValue(searchQuery);
    }
  }, [isSearchOpen, searchQuery]);
  // Rest of the component remains unchanged
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Compare Prices</h1>

      {/* Search Input that opens popup */}
      <div className="mb-8 max-w-xl relative">
        <Input
          type="text"
          placeholder="Search for products to compare..."
          className="bg-[#111827] border-gray-700 focus-visible:ring-purple-500 rounded-md cursor-pointer pr-10"
          value={inputValue}
          onClick={openSearch}
          readOnly
        />
        <span className="absolute text-sm rounded-sm right-16 px-2 py-1 top-1/6 bg-purple-600 text-white pointer-events-none">
          ⌘ + <span>K</span>
        </span>
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5 pointer-events-none" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-lg border backdrop-blur-2xl shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <h2 className="text-lg font-medium text-white">
                  Search Products
                </h2>
                <button
                  onClick={closeSearch}
                  className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="absolute text-sm rounded-sm right-16 px-2 py-1 top-4 bg-purple-600 text-white pointer-events-none">
                    ⌘ + <span>K</span>
                  </span>
                  <X className="h-4 w-4" />
                </button>
              </div>

              
              <form onSubmit={handleSearch} className="p-4 space-y-4">
                <div className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for products..."
                    className="bg-black/20 border-white/10 text-white placeholder:text-white/50 pr-10"
                    value={inputValue}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-2 h-80">
                  {/* Categories */}
                  <div className="space-y-2 pr-5 md:w-1/3 overflow-y-scroll scroll-smooth ultra-scrollbar select-none">
                    <h3 className="text-xs font-medium text-white/70">
                      Categories
                    </h3>
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant={
                          selectedCategory === null ? "default" : "outline"
                        }
                        onClick={() => handleCategoryChange(null)}
                        className={`text-xs ${
                          selectedCategory === null
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "bg-black/20 border-white/10 text-white hover:bg-white/10"
                        }`}
                      >
                        All Categories
                      </Button>
                      {Object.keys(PRODUCT_CATEGORIES).map((category) => (
                        <Button
                          key={category}
                          type="button"
                          size="sm"
                          variant={
                            selectedCategory === category
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            handleCategoryChange(category as ProductCategory)
                          }
                          className={`text-xs ${
                            selectedCategory === category
                              ? "bg-purple-600 hover:bg-purple-700 text-white"
                              : "bg-black/20 border-white/10 text-white hover:bg-white/10"
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Products */}
                  <Card className="bg-black/20 px-4 py-7.5 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">
                      Trending Searches
                    </h3>
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
                      <li>
                        <Link
                          href="/compare?q=sony%20wh-1000xm5"
                          onClick={closeSearch}
                          className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Sony WH-1000XM5
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
                  </Card>
                </div>
                {/* Search Button */}
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search Products"}
                </Button>
              </form>
            </motion.div>
          </div>
        </>
      )}
      {isLoading ? (
        <div
          className="relative h-5vh overflow-auto pointer-events-none"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className=" bg-[#0a0a0a] h-9 w-35 absolute right-5 bottom-5"></div>
          <Spline scene="https://prod.spline.design/I0fZjdwinGcOCQNa/scene.splinecode" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <ProductComparisonCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductComparisonCard({ product }: { product: NormalizedProduct }) {
  // Determine which store has the better price (if both are available)
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
              <div className="relative w-full sm:max-w-[150px] min-h-[150px] sm:h-full flex justify-center border bg-[#fefcfc] rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-[100px] h-auto object-contain"
                />
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

                {product.boughtInPastMonth != "M.R.P:"  && (
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
                    <h4 className="text-sm md:text-lg font-bold mb-2">
                      Amazon
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
                    <h4 className="text-sm md:text-lg font-bold mb-2">
                      Flipkart
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