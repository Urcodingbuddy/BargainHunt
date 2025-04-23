"use client"
import { Input } from "@/components/ui/input"
import { useProductFilters } from "@/lib/hooks/useProductFilters"
import { useEffect } from "react"
import { Search } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import ProductComparisonCardSkeleton from "@/components/skeletons/ProductComparisonCardSkeleton";


export default function ProductsPage() {
  const { search, setSearch, category, setCategory, brand, setBrand, categories, brands, products, isLoading } =
    useProductFilters()

  useEffect(() => {
    console.log("Updated products:", products)
  }, [products])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6" style={{ background: "#0a0a0a" }}>
      <h1 className="text-3xl font-bold text-white">Product Listings</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 rounded bg-black border-gray-700 text-white transition-all duration-200"
          />
        </div>

        <div className="relative w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 bg-white text-black rounded border border-gray-700 appearance-none pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative w-full md:w-auto">
          <select
            value={brand}
            title={category ? "Choose Brand" : "Choose Category"}
            onChange={(e) => setBrand(e.target.value)}
            className={`w-full p-2 bg-white text-black rounded border border-gray-700 appearance-none pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 
              ${!category ? "opacity-60 cursor-not-allowed border-gray-800 bg-gray-950" : "hover:border-gray-600"}`}
            disabled={!category}
          >
            <option value="">All Brands</option>
            {brands.map((br) => (
              <option key={br} value={br}>
                {br}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      )}
    </div>
  )
}
