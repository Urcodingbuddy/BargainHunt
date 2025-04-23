import { useEffect, useState } from "react";
import axios from "axios";

export function useProductFilters() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!category) {
        setBrand("");
        setBrands([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await axios.get(`/api/brands?category=${category}`);
        setBrands(res.data);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/products", {
          params: { q: search, category, brand },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, brand]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    brand,
    setBrand,
    categories,
    brands,
    products,
    isLoading,
  };
}
