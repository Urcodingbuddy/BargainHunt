import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: ProductCategory | null;
  onCategoryChange: (category: ProductCategory | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onCategoryChange(null)}
        className="text-sm"
      >
        All Categories
      </Button>
      {Object.keys(PRODUCT_CATEGORIES).map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category as ProductCategory)}
          className="text-sm"
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
}
