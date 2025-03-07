'use client';
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import SearchGradients from './SearchGradients';
import { useRouter } from 'next/navigation';
const filters = [
  "All Categories",
  "Laptops",
  "Smartphones",
  "Headphones",
  "Cameras",
  "Gaming"
];

const SearchContainer = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch 
}: { 
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
    onSearch(searchQuery); // Call the passed onSearch function
  }

  return (
    <div className="w-full mx-auto px-5">
      {/* Search Section */}
      <form onSubmit={handleSearch} className="relative w-full">
        <div id="poda" className="relative flex items-center justify-center group">
          {/* Glow effects */}
          <SearchGradients />
          {/* Search input */}
          <div className="relative flex items-center">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <input
              type="text"
              placeholder="Search..."
              className="w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] h-[46px] py-2 pl-12 pr-12 rounded-lg bg-[#010201] 
                       text-white text-lg focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type='submit'
              className="absolute left-142 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/5 
                       rounded-lg transition-colors bg-[linear-gradient(180deg,#161329,black,#1d1b4b)]
                       border border-transparent z-20 cursor-pointer"
            >
              <Search size={25} className="text-gray-400" />
            </button>
        
          </div>
        </div>
      </form>
    </div>
  );
} 

export default SearchContainer;