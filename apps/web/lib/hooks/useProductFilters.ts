import { useEffect, useState } from "react";
import axios from "axios";

export function useProductFilters() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/categories").then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (!category) {
      setBrand("");
      setBrands([]);
      return;
    }

    axios.get(`/api/brands?category=${category}`)
      .then(res => setBrands(res.data));
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products", {
        params: { q: search, category, brand }
      });
      setProducts(res.data);
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
    products
  };
}