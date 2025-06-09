import { useState } from "react";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ModernSearchBarProps {
    initialFilter?: string;
    onSearch?: (searchParams: SearchParams) => void;
}

interface SearchParams {
    term: string;
    filter: string;
    tags: string[];
}

export default function SearchBar({
    initialFilter = "All",
    onSearch
}: ModernSearchBarProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const router = useRouter()

    const filters: string[] = ["All", "Tropical", "Coldwater", "Marine", "Cichlids", "Rare Species"];

    const popularTags: string[] = ["Angelfish", "Discus", "Guppies", "Goldfish", "Bettas", "Coral Compatible"];

    const handleTagClick = (tag: string): void => {
        router.push(`/list/${tag.toLowerCase().replace(/\s+/g, '-')}`);
    };

    const removeTag = (tag: string): void => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    const clearSearch = (): void => {
        setSearchTerm("");
        setSelectedTags([]);
    };

    const handleSearch = (): void => {
        if (onSearch) {
            onSearch({
                term: searchTerm,
                filter: selectedFilter,
                tags: selectedTags
            });
        }
        router.push(`/list/${searchTerm.toLowerCase().replace(/\s+/g, '-')}`);
    };

    return (
        <section className="py-10 md:py-16 bg-gradient-to-r from-blue-900 to-blue-700 relative">
            <div className="container mx-auto px-4 mb-6 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3 md:mb-4">
                    Find Your Perfect Aquatic Companion
                </h2>
                <p className="text-blue-100 text-center mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
                    Browse our extensive collection of freshwater and marine fish from around the world
                </p>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                        {/* Search area with stacked layout on mobile */}
                        <div className="flex flex-col p-3 md:p-4 gap-3">
                            {/* Main search input - Full width on mobile */}
                            <div className="bg-gray-50 rounded-lg flex items-center w-full px-3 py-2 md:px-4 md:py-3">
                                <Search size={18} className="text-indigo-500 mr-2 flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search for fish..."
                                    className="w-full outline-none text-gray-800 bg-transparent text-sm md:text-base"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={clearSearch}
                                        className="text-gray-400 hover:text-gray-600"
                                        aria-label="Clear search"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Filter and Search button row - Side by side with flex */}
                            <div className="flex gap-2 w-full">
                                {/* Filter dropdown - Grows to fill available space */}
                                <div className="relative flex-grow">
                                    <button
                                        className="bg-gray-50 text-gray-700 py-2 md:py-3 px-3 md:px-4 rounded-lg w-full font-medium flex items-center justify-between gap-2 hover:bg-gray-100 transition-colors text-sm md:text-base"
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        type="button"
                                        aria-haspopup="true"
                                        aria-expanded={isFilterOpen}
                                    >
                                        <div className="flex items-center">
                                            <Filter size={16} className="mr-1 flex-shrink-0" />
                                            <span className="truncate">{selectedFilter}</span>
                                        </div>
                                        <ChevronDown size={14} className={`transition-transform duration-200 flex-shrink-0 ${isFilterOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isFilterOpen && (
                                        <div
                                            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-100"
                                            role="menu"
                                        >
                                            {filters.map((filter) => (
                                                <button
                                                    key={filter}
                                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${selectedFilter === filter ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'}`}
                                                    onClick={() => {
                                                        setSelectedFilter(filter);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    role="menuitem"
                                                >
                                                    {filter}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Search button */}
                                <button
                                    className="bg-blue-600 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base flex-shrink-0"
                                    onClick={handleSearch}
                                    type="button"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Popular tags section */}
                        <div className="px-3 md:px-4 pb-4 md:pb-5 pt-0 md:pt-1">
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-gray-500 text-xs md:text-sm">Popular:</span>
                                <div className="flex flex-wrap gap-1 md:gap-2">
                                    {popularTags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagClick(tag)}
                                            className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full transition-all ${selectedTags.includes(tag)
                                                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                                                }`}
                                            type="button"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Selected tags */}
                            {selectedTags.length > 0 && (
                                <div className="mt-3 md:mt-4 flex flex-wrap gap-1 md:gap-2">
                                    {selectedTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-blue-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded-full flex items-center"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:bg-blue-700 rounded-full p-0.5"
                                                aria-label={`Remove ${tag} tag`}
                                                type="button"
                                            >
                                                <X size={10} />
                                            </button>
                                        </span>
                                    ))}

                                    {selectedTags.length > 0 && (
                                        <button
                                            onClick={() => setSelectedTags([])}
                                            className="text-xs md:text-sm text-gray-500 hover:text-gray-700"
                                            type="button"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave decoration at bottom */}
            <div className="absolute left-0 right-0 bottom-0 h-10 md:h-16 overflow-hidden">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full fill-current text-zinc-100">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.43,20.39,119.55,27.15,157.84,41.89,202.74,59.67,272.39,69.07,321.39,56.44Z"></path>
                </svg>
            </div>
        </section>
    );
}