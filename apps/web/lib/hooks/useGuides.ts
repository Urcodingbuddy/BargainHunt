import { useEffect, useState } from "react";
export default function useGuides() {
    const [guides, setGuides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchGuides = async () => {
        try {
          const res = await fetch("/api/guides");
          const data = await res.json();
          setGuides(data);
        } catch (err) {
          console.error("Failed to fetch guides", err);
        } finally {
          setLoading(false);
        }
      };
      fetchGuides();
    }, []);
  
    return { guides, loading };
  }