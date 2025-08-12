'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Search, Grid, List, ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getFishByName, getFishCategoryByName } from '@/app/services/authServices'
import { FishListing } from '@/app/types/list/fishList'
import { FishCard } from './FishCard'
import SearchResultsSkeleton from './Loading/SearchResultsSkeleton'
import _ from 'lodash'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Main SearchResults Component
const SearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState<string>("")
  const [searchResult, setSearchResult] = useState<FishListing[]>([])
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    size: '',
    location: '',
    inStock: false
  })

  const params = useParams()
  const search = params?.slug as string
  const router = useRouter()

  const debouncedSetQuery = useMemo(
    () => _.debounce((query: string) => {
      setDebouncedQuery(query)
    }, 600), // Reduced to 300ms for better UX
    []
  )

  const { data, isLoading } = useQuery({
    queryKey: ['get-categorized-fish', search],
    queryFn: () => getFishCategoryByName(search),
    enabled: !!search,
  });

  const searchData = useQuery({
    queryKey: ['get-fish-by-name', debouncedQuery],
    queryFn: () => getFishByName(debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery.trim().length > 0
  })

  useEffect(() => {
    setSearchResult(searchData.data?.data)
    console.log("search result : ", searchData.data?.data)
    // Show dropdown when we have search results and search is active
    if (searchData.data && searchData.data.length > 0 && debouncedQuery) {
      setShowDropdown(true)
    } else if (debouncedQuery && searchData.data && searchData.data.length === 0) {
      setShowDropdown(true) // Show "no results" dropdown
    } else {
      setShowDropdown(false)
    }
  }, [searchData.data, debouncedQuery])

  useEffect(() => {
    debouncedSetQuery(searchQuery)
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [searchQuery, debouncedSetQuery])

  // Filter and sort logic
  const filteredFishes = data?.list.filter((fish: FishListing) => {
    if (filters.category && fish.breed !== filters.category) return false
    if (filters.size && fish.size !== filters.size) return false
    if (filters.inStock && fish.listingStatus !== 'active') return false
    return true
  })

  const sortedFishes = filteredFishes && [...filteredFishes].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.avgRating - a.avgRating
      case 'newest':
        return b.id - a.id
      default:
        return 0
    }
  })

  const totalResults = sortedFishes?.length
  const categories = ['Bettas', 'Tetras', 'Arowana', 'Angelfish', 'Discus', 'Cichlid', 'Shrimp']
  // const sizes = ['Small', 'Medium', 'Large']
  const priceRanges = ['Under ₹20', '₹20 - ₹50', '₹50 - ₹100', 'Above ₹100']

  const sortOptions = [
    { value: "relevance", label: "Sort by Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" }
  ]

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      size: '',
      location: '',
      inStock: false
    })
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value.trim() === '') {
      setShowDropdown(false)
    }
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    setSearchResult([])
    setShowDropdown(false)
  }, [])

  const handleInputFocus = () => {
    setIsSearchFocused(true)
    // Show dropdown if we have results
    if (searchResult && searchResult.length > 0 && debouncedQuery) {
      setShowDropdown(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding to allow for clicks on dropdown items
    setTimeout(() => {
      setIsSearchFocused(false)
      setShowDropdown(false)
    }, 200)
  }

  const handleResultClick = (data: FishListing) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedFish', JSON.stringify(data))
    }
    router.push(`/fish/${data.id}`)
    setIsSearchFocused(false)
    setShowDropdown(false)
  }

  if (isLoading) return <SearchResultsSkeleton />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 lg:mb-20">
      {/* Enhanced Header Section */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Enhanced Search Bar */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">

            {/* Enhanced Search Section */}
            <div className="relative flex-1 w-full lg:max-w-3xl">
              <div className="relative">
                <div className={`relative transition-all duration-300 ${isSearchFocused
                    ? 'transform scale-[1.02] shadow-xl shadow-blue-500/10'
                    : 'shadow-lg shadow-slate-900/5'
                  }`}>
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${isSearchFocused ? 'text-blue-500' : 'text-slate-400'
                    }`} size={20} />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Search for ornamental fish..."
                    className={`w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-sm border-2 rounded-2xl 
                      transition-all duration-300 outline-none text-slate-700 placeholder-slate-400
                      ${isSearchFocused
                        ? 'border-blue-400 bg-white shadow-lg'
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                  />

                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                    >
                      <X size={16} className="text-slate-400" />
                    </motion.button>
                  )}

                  {/* Loading indicator */}
                  {searchData.isLoading && debouncedQuery && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                {/* Enhanced Search Results Dropdown */}
                <AnimatePresence>
                  {searchResult && searchResult.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="p-2">
                        {/* Results count header */}
                        <div className="px-3 py-2 text-xs text-slate-500 border-b border-slate-100 mb-2">
                          {searchResult.length} result{searchResult.length !== 1 ? 's' : ''} found
                        </div>

                        {searchResult.map((data: FishListing, index) => (
                          <motion.div
                            key={data.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50/50 cursor-pointer transition-all duration-200 group"
                            onClick={() => handleResultClick(data)}
                          >
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                              <Image
                                src={data.images[0] as string}
                                alt={`${data.name} - ${data.breed}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                                {data.name}
                              </p>
                              <p className="text-sm text-slate-500 truncate">{data.breed}</p>
                            </div>
                            {data.price && (
                              <div className="text-right">
                                <p className="font-bold text-blue-600">₹{data.price}</p>
                              </div>
                            )}
                          </motion.div>
                        ))}

                        {/* View all results footer */}
                        {/* {searchResult.length > 5 && (
                          <div className="px-3 py-2 border-t border-slate-100 mt-2">
                            <button
                              onClick={() => {
                                setShowDropdown(false)
                              }}
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                              View all {searchResult.length} results →
                            </button>
                          </div>
                        )} */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* No results message */}
                <AnimatePresence>
                  {showDropdown && debouncedQuery && searchResult && searchResult.length === 0 && !searchData.isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl z-50"
                    >
                      <div className="p-4 text-center">
                        <Search size={24} className="text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">No fish found for &quot;{debouncedQuery}&quot;</p>
                        <p className="text-xs text-slate-500 mt-1">Try a different search term</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Enhanced Controls Section */}
            <div className="flex items-center gap-4 w-full lg:w-auto">

              {/* Modern Sort Dropdown */}
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/90 backdrop-blur-sm border-0 rounded-xl px-4 py-3 pr-10 
                    text-sm font-medium shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10
                    focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none cursor-pointer
                    transition-all duration-300 text-slate-700"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 
                  group-hover:text-blue-500 transition-colors pointer-events-none" size={16} />
              </div>

              {/* Enhanced View Toggle */}
              <div className="flex bg-white/90 backdrop-blur-sm border-0 rounded-xl overflow-hidden shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300">
                {[
                  { mode: 'grid', icon: Grid, label: 'Grid View' },
                  { mode: 'list', icon: List, label: 'List View' }
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    title={label}
                    className={`p-3 transition-all duration-300 ${viewMode === mode
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>

              {/* Enhanced Filters Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex lg:hidden items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium 
                  transition-all duration-300 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10
                  ${showFilters
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                <SlidersHorizontal size={18} />
                Filters
                {showFilters && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            </div>
          </div>

          {/* Enhanced Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-between text-sm"
          >
            <div className="text-slate-600">
              Showing <span className="font-semibold text-blue-600">{totalResults}</span> results
              {searchQuery && (
                <span> for &quot;<span className="font-medium text-slate-800">{searchQuery}</span>&quot;</span>
              )}
            </div>
            <div className="text-slate-500">
              {totalResults} of 247 fish available
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Enhanced Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0`}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-slate-800 text-lg">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden p-1 rounded-full hover:bg-slate-100 transition-colors"
                    >
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-slate-700 mb-4">Category</h4>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center group cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={filters.category === category}
                            onChange={(e) => {
                              setFilters({ ...filters, category: e.target.value })
                              router.push(`/list/${category.toLowerCase().replace(/\s+/g, '-')}`);
                            }}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-slate-700 mb-4">Price Range</h4>
                    <div className="space-y-3">
                      {priceRanges.map((range) => (
                        <label key={range} className="flex items-center group cursor-pointer">
                          <input
                            type="radio"
                            name="priceRange"
                            value={range}
                            checked={filters.priceRange === range}
                            onChange={(e) => {
                              setFilters({ ...filters, priceRange: e.target.value })
                            }}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                            {range}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="w-full py-3 px-4 text-sm font-medium text-blue-600 border-2 border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                  >
                    Clear All Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {totalResults > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Results Grid */}
                <div className={`grid gap-6 ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
                  }`}>
                  {sortedFishes.map((fish: FishListing, index: number) => (
                    <motion.div
                      key={fish.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FishCard fish={fish} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Enhanced No Results State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16"
              >
                <div className="max-w-md mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Search size={32} className="text-blue-500" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No fish found</h3>
                  <p className="text-slate-600 mb-8">
                    We couldn&apos;t find any ornamental fish matching your search criteria.
                    Try adjusting your filters or search terms.
                  </p>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="text-sm text-slate-500 mb-2 w-full">Try searching for:</span>
                      {['Betta', 'Tetra', 'Guppy', 'Angelfish'].map((suggestion) => (
                        <motion.button
                          key={suggestion}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSearchQuery(suggestion.toLowerCase())}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-all duration-200 font-medium"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex gap-4 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchQuery('')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg"
                      >
                        Clear Search
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium"
                      >
                        Browse All Fish
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage