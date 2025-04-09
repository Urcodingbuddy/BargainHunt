// contexts/CompareContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { normalizeProductData, scrapeAndStoreProduct } from "@/lib/ProductMatching";
import type { NormalizedProduct } from "@/lib/ProductMatching";
import type { ProductCategory } from "@/lib/utils";

interface CompareContextType {
  products: NormalizedProduct[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: ProductCategory | null;
  fetchProducts: (query: string, category?: ProductCategory | null) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory | null) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const storedState = localStorage.getItem("compareState");
    if (storedState) {
      try {
        const { products, searchQuery, selectedCategory } = JSON.parse(storedState);
        setProducts(products || []);
        setSearchQuery(searchQuery || "");
        setSelectedCategory(selectedCategory || null);
      } catch (error) {
        console.error("Error parsing stored compare state:", error);
      }
    }
    setInitialized(true);
  }, []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (!initialized) return;
    
    localStorage.setItem(
      "compareState",
      JSON.stringify({
        products,
        searchQuery,
        selectedCategory,
      })
    );
  }, [products, searchQuery, selectedCategory, initialized]);

  const fetchProducts = async (query: string, category?: ProductCategory | null) => {
    setIsLoading(true);
    try {
      const scrapedProducts = await scrapeAndStoreProduct(query, category || undefined);
      setProducts(scrapedProducts.length > 0 ? scrapedProducts : []);
      
      // Update URL without causing navigation
      const url = new URL(window.location.href);
      url.searchParams.set("q", query);
      if (category) {
        url.searchParams.set("category", category);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState({}, "", url.toString());
      
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    products,
    isLoading,
    searchQuery,
    selectedCategory,
    fetchProducts,
    setSearchQuery,
    setSelectedCategory,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}