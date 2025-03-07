import SearchContainer from "./SearchContainer";

export default function HeroSection({ searchQuery, setSearchQuery, handleSearch }:any) {
    return (
        <div className="w-full mx-auto px-5">
            <SearchContainer
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onSearch={handleSearch}
            />
        </div>
    )
}

