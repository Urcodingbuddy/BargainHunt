"use client"

export type ProductCategory =
  | "smartphones"
  | "laptops"
  | "pc-components"
  | "television"
  | "washing-machine"
  | "refrigerator"
  | "air-conditioner"
  | "hair-dryers"

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  smartphones: "Smartphones",
  laptops: "Laptops",
  "pc-components": "PC Components",
  television: "Television",
  "washing-machine": "Washing Machine",
  refrigerator: "Refrigerator",
  "air-conditioner": "Air Conditioner",
  "hair-dryers": "Hair Dryers",
}

interface CategorySelectorProps {
  selectedCategory: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
}

export function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-white text-lg mb-3">Select Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>
    </div>
  )
}

