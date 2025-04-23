import { useEffect, useState } from "react";

export default function useArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return { articles, loading };
}
