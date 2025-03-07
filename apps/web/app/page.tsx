'use client';
import { useState } from "react";
import ProductGrid from './components/ProductGrid';
import HeroSection from './components/HeroSection';
import Branding from './components/Branding';
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    router.push(`/search?query=${searchQuery}`);
  }
  return (
    <div className="min-h-screen p-4">
      <HeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <h2 className="col-span-full mb-5 text-2xl sm:text-3xl md:text-4xl font-bold
                bg-clip-text text-transparent 
                bg-gradient-to-b from-white via-gray-200 to-gray-400
                border-l-8 border-primary/80 py-2">
                Suggestions
      </h2>
      <ProductGrid />
    </div>
  );
}
