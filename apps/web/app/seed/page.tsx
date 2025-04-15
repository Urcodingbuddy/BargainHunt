"use client";
import { useEffect, useState } from "react";
import { useCompare } from "@/contexts/CompareContext";
import SeedProductsCard from "@/components/SeedProductsCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Mail, Home, ShieldOff } from "lucide-react";

export default function SeedPage() {
  const { products } = useCompare();
  console.log("Products in SeedPage:", products);
  const { data: session, status } = useSession();
  const [isModrator, setIsModrator] = useState<boolean | null>(null);
  const [categoryInputs, setCategoryInputs] = useState<Record<string, string>>(
    {}
  );
  const [brandInputs, setBrandInputs] = useState<Record<string, string>>({});
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, boolean>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const checkModStatus = async () => {
      if (session?.user?.email) {
        try {
          const res = await axios.get(
            `/api/modrator?email=${session.user.email}`
          );
          setIsModrator(res.data.modrator);
        } catch (err) {
          console.error("Error checking moderator status", err);
          setIsModrator(false);
        }
      }
    };
    checkModStatus();
  }, [session]);

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

  if (!isModrator) {
    return (
      <div className="max-w-xl mx-auto text-center py-24 px-4 space-y-6">
        <h2 className="text-2xl font-semibold text-white flex justify-center items-center gap-2">
          Restricted Access
          <ShieldOff className="w-10 h-10" />
        </h2>
        <p className="text-slate-200">
          This page is restricted to <strong>BargainHunt Developers</strong>. If
          you believe you should have access, please reach out to the
          development team.
        </p>

        <div className="flex justify-center gap-4 pt-6">
          <a
            href={`mailto:anshpethe110@gmail.com?subject=Request to access BargainHunt Seed page`}
            className="inline-flex items-center px-4 py-2 border border-black text-black bg-white hover:bg-gray-100 transition rounded-lg"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Developer
          </a>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-black text-black bg-white hover:bg-gray-100 transition rounded-lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </a>
        </div>
      </div>
    );
  }

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
