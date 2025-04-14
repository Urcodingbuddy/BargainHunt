"use client";
import { useState} from "react";
import { useCompare } from "@/contexts/CompareContext";
import SeedProductsCard from "@/components/SeedProductsCard";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function SeedPage() {
  const { products } = useCompare();

  const [categoryInputs, setCategoryInputs] = useState<Record<string, string>>(
    {}
  );
  const [brandInputs, setBrandInputs] = useState<Record<string, string>>({});
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, boolean>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  const handleCategoryChange = (id: string, value: string) => {
    setCategoryInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleBrandChange = (id: string, value: string) => {
    setBrandInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectionChange = (id: string, checked: boolean) => {
    setSelectedProducts((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSaveSelected = async () => {
    setIsSaving(true);
    const selected = products.filter((p) => selectedProducts[p.id]);

    const payload = selected.map((product) => {
      const category =
        categoryInputs[product.id] || product.category || "uncategorized";
      const brand = brandInputs[product.id] || "unknown";

      return {
        uniqueId: product.uniqueID,
        title: product.title,
        normalizedTitle: product.normalizedTitle,
        category,
        brand,
        image: product.image,
        amazonPrice: product.prices.amazon?.price || "N/A",
        flipkartPrice: product.prices.flipkart?.price || "N/A",
        amazonReview: product.reviews?.toString(),
        flipkartReview: product.reviews?.toString(),
        amazonLink: product.prices.amazon?.link || "#",
        flipkartLink: product.prices.flipkart?.link || "#",
        amazonRating: product.rating?.toString(),
        flipkartRating: product.rating?.toString(),
        amazonOriginalPrice: product.prices.amazon?.originalPrice,
        flipkartOriginalPrice: product.prices.flipkart?.originalPrice,
        availability: product.availability || "N/A",
        boughtInLastMonth: product.boughtInPastMonth,
        source: product.source || "amazon",
        matchScore: product.matchedSpecs?.toString() || "0",
      };
    });

    try {
      await axios.post("/api/save-product", { products: payload });
      alert("Products saved successfully!");
    } catch (error) {
      console.error("Saving failed:", error);
      alert("Error while saving products");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSelected}
          className="bg-green-600 hover:bg-green-500"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Selected"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {products.map((product) => (
          <SeedProductsCard
            key={product.id}
            product={product}
            checked={!!selectedProducts[product.id]}
            onCheckboxChange={(checked) =>
              handleSelectionChange(product.id, checked)
            }
            onCategoryChange={(val) => handleCategoryChange(product.id, val)}
            onBrandChange={(val) => handleBrandChange(product.id, val)}
            categoryValue={categoryInputs[product.id] || ""}
            brandValue={brandInputs[product.id] || ""}
          />
        ))}
      </div>
    </div>
  );
}

