"use client";

import type React from "react";
import Spline from "@splinetool/react-spline";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { type ProductCategory } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useCompare } from "@/contexts/CompareContext";
import ProductComparisonCard from "@/components/PriceComparisonCard";
import ProductComparisonCardSkeleton from "@/components/skeletons/ProductComparisonCardSkeleton";

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
  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [inputValue, selectedCategory, fetchProducts, setSearchQuery]
  );
  const handleSearchInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleCategoryChange = useCallback(
    (category: ProductCategory | null) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory]
  );

  useEffect(() => {
    if (products.length === 0 && isLoading && initialLoadProcessed.current) {
      toast({
        title: "Searching for products...",
        description: "This may take a few seconds.",
        duration: 2000,
        action: (
          <Button variant="link" onClick={closeSearch}>
            Close
          </Button>
        ),
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
      <div className="mb-8 max-w-xl relative group">
        <Input
          type="text"
          placeholder="Search for products to compare..."
          className="bg-gradient-to-r from-[#2a2e37] to-[#1c1f26] border border-gray-600 focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg cursor-pointer pr-12 text-white placeholder-gray-400 shadow-md transition-all duration-300 ease-in-out group-hover:shadow-lg"
          value={inputValue}
          onClick={openSearch}
          readOnly
        />
        <span className="absolute text-xs rounded-md right-16 px-2 py-1 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white pointer-events-none shadow-md">
          ⌘ + <span>K</span>
        </span>
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5 pointer-events-none group-hover:text-purple-300 transition-colors duration-300" />
      </div>

      {/* Search Popup */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
            onClick={closeSearch}
          />

          {/* Popup Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-lg bg-gradient-to-br from-black/70 to-gray-800/70 backdrop-blur-xl shadow-2xl border border-gray-700"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-600 p-4">
                <h2 className="text-lg font-semibold text-white">
                  Search Products
                </h2>
                <span className="absolute text-xs rounded-md right-16 px-2 py-1 top-8 transform -translate-y-1/2 bg-purple-600 text-white pointer-events-none shadow-md">
                  ⌘ + <span>K</span>
                </span>
                <button
                  onClick={closeSearch}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSearch} className="p-4 space-y-4">
                <div className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for products..."
                    className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 pr-10 focus:ring-2 focus:ring-purple-500"
                    value={inputValue}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {/* Search Button */}
                <Button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md ${isLoading ? "cursor-wait" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search Products"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </motion.div>
          </div>
        </>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          <ProductComparisonCardSkeleton/>
          <ProductComparisonCardSkeleton/>
          <ProductComparisonCardSkeleton/>
          <ProductComparisonCardSkeleton/>
          <ProductComparisonCardSkeleton/>
          <ProductComparisonCardSkeleton/>
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

