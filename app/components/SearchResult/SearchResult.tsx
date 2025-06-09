'use client'

import React, { useState } from 'react'
import { Search, Grid, List, ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getFishCategoryByName } from '@/app/services/authServices'
import { FishListing } from '@/app/types/list/fishList'
import { FishCard } from './FishCard'
import SearchResultsSkeleton from './Loading/SearchResultsSkeleton'

// Main SearchResults Component
const SearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
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

  const { data, isLoading } = useQuery({
    queryKey: ['get-categorized-fish', search],
    queryFn: () => getFishCategoryByName(search),
    enabled: !!search,
  });

  // useEffect(() => {
  //   console.log('search : ', data)
  // }, [data])

  // Filter and sort logic
  const filteredFishes = data?.list.filter((fish: FishListing) => {
    if (filters.category && fish.breed !== filters.category) return false
    if (filters.size && fish.size !== filters.size) return false
    if (filters.inStock && fish.listingStatus !== 'active') return false
    return true
  })

  // console.log('filtered : ',filteredFishes)

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
  const categories = ['Bettas', 'Tetras', 'Guppies', 'Angelfish', 'Discus', 'Cichlid', 'Shrimp']
  const sizes = ['Small', 'Medium', 'Large']
  const priceRanges = ['Under ₹20', '₹20 - ₹50', '₹50 - ₹100', 'Above ₹100']

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      size: '',
      location: '',
      inStock: false
    })
  }

  if (isLoading) return <SearchResultsSkeleton />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 lg:mb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full lg:max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for ornamental fish..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              </div>

              {/* View Toggle */}
              <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex lg:hidden items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>
              Showing {totalResults} results for &quot;<span className="font-medium text-slate-800">{searchQuery}</span>&quot;
            </span>
            <span>{totalResults} of 247 fish available</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0`}>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-800">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => {
                          setFilters({ ...filters, category: e.target.value })
                          router.push(`/list/${category.toLowerCase().replace(/\s+/g, '-')}`);
                          }
                        }
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm text-slate-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range}
                        checked={filters.priceRange === range}
                        onChange={(e) => {
                          setFilters({ ...filters, priceRange: e.target.value })
                        }}
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm text-slate-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-3">Size</h4>
                <div className="space-y-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={filters.size === size}
                        onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm text-slate-600">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm text-slate-600">In Stock Only</span>
                </label>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {totalResults > 0 ? (
              <>
                {/* Results */}
                <div className={`grid gap-6 ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
                  }`}>
                  {sortedFishes.map((fish: FishListing) => (
                    <FishCard key={fish.id} fish={fish} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination */}
                {/* <div className="mt-12 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">2</button>
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">3</button>
                    <span className="px-2 text-slate-500">...</span>
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">10</button>
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                      Next
                    </button>
                  </div>
                </div> */}
              </>
            ) : (
              /* No Results State */
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No fish found</h3>
                  <p className="text-slate-600 mb-8">
                    We couldn&apos;t find any ornamental fish matching your search criteria.
                    Try adjusting your filters or search terms.
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="text-sm text-slate-500">Try searching for:</span>
                      {['Betta', 'Tetra', 'Guppy', 'Angelfish'].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setSearchQuery(suggestion.toLowerCase())}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setSearchQuery('')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Clear Search
                      </button>
                      <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                        Browse All Fish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage