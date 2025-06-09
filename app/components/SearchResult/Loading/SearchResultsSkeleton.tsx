'use client'

import React from 'react'
import { Search, Grid, List, ChevronDown, SlidersHorizontal } from 'lucide-react'

// Skeleton shimmer animation
const SkeletonShimmer = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] ${className}`} 
       style={{
         animation: 'shimmer 1.5s ease-in-out infinite',
       }}>
    <style jsx>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  </div>
)

// Fish Card Skeleton
const FishCardSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex gap-6">
          <SkeletonShimmer className="w-32 h-32 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <SkeletonShimmer className="h-6 w-3/4 rounded" />
              <SkeletonShimmer className="h-4 w-1/2 rounded" />
            </div>
            <div className="space-y-2">
              <SkeletonShimmer className="h-4 w-full rounded" />
              <SkeletonShimmer className="h-4 w-5/6 rounded" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <SkeletonShimmer className="h-6 w-20 rounded" />
              <SkeletonShimmer className="h-10 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <SkeletonShimmer className="w-full h-48" />
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <SkeletonShimmer className="h-5 w-4/5 rounded" />
          <SkeletonShimmer className="h-4 w-3/5 rounded" />
        </div>
        <div className="space-y-2">
          <SkeletonShimmer className="h-4 w-full rounded" />
          <SkeletonShimmer className="h-4 w-3/4 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <SkeletonShimmer className="h-5 w-16 rounded" />
          <SkeletonShimmer className="h-9 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

// Filter Section Skeleton
const FilterSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
    <div className="flex items-center justify-between mb-6">
      <SkeletonShimmer className="h-6 w-16 rounded" />
    </div>

    {/* Category Filter */}
    <div className="mb-6">
      <SkeletonShimmer className="h-5 w-20 rounded mb-3" />
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item} className="flex items-center">
            <SkeletonShimmer className="w-4 h-4 rounded mr-2" />
            <SkeletonShimmer className="h-4 w-16 rounded" />
          </div>
        ))}
      </div>
    </div>

    {/* Price Range Filter */}
    <div className="mb-6">
      <SkeletonShimmer className="h-5 w-24 rounded mb-3" />
      <div className="space-y-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center">
            <SkeletonShimmer className="w-4 h-4 rounded mr-2" />
            <SkeletonShimmer className="h-4 w-20 rounded" />
          </div>
        ))}
      </div>
    </div>

    {/* Size Filter */}
    <div className="mb-6">
      <SkeletonShimmer className="h-5 w-12 rounded mb-3" />
      <div className="space-y-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center">
            <SkeletonShimmer className="w-4 h-4 rounded mr-2" />
            <SkeletonShimmer className="h-4 w-14 rounded" />
          </div>
        ))}
      </div>
    </div>

    {/* In Stock Filter */}
    <div className="mb-6">
      <div className="flex items-center">
        <SkeletonShimmer className="w-4 h-4 rounded mr-2" />
        <SkeletonShimmer className="h-4 w-24 rounded" />
      </div>
    </div>

    {/* Clear Filters Button */}
    <SkeletonShimmer className="w-full h-10 rounded-lg" />
  </div>
)

// Pagination Skeleton
const PaginationSkeleton = () => (
  <div className="mt-12 flex items-center justify-center">
    <div className="flex items-center gap-2">
      <SkeletonShimmer className="h-10 w-20 rounded-lg" />
      <SkeletonShimmer className="h-10 w-10 rounded-lg" />
      <SkeletonShimmer className="h-10 w-10 rounded-lg" />
      <SkeletonShimmer className="h-10 w-10 rounded-lg" />
      <div className="px-2">
        <SkeletonShimmer className="h-4 w-6 rounded" />
      </div>
      <SkeletonShimmer className="h-10 w-10 rounded-lg" />
      <SkeletonShimmer className="h-10 w-16 rounded-lg" />
    </div>
  </div>
)

// Main SearchResultsSkeleton Component
const SearchResultsSkeleton = () => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = React.useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <div className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg">
                <SkeletonShimmer className="h-5 w-48 rounded" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <div className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2.5 pr-8 flex items-center">
                  <SkeletonShimmer className="h-4 w-32 rounded" />
                </div>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              </div>

              {/* View Toggle */}
              <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Showing</span>
              <SkeletonShimmer className="h-4 w-6 rounded inline-block" />
              <span className="text-slate-600">results for</span>
              <SkeletonShimmer className="h-4 w-24 rounded inline-block" />
            </div>
            <div className="flex items-center gap-2">
              <SkeletonShimmer className="h-4 w-6 rounded" />
              <span className="text-slate-600">of</span>
              <SkeletonShimmer className="h-4 w-8 rounded" />
              <span className="text-slate-600">fish available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0`}>
            <FilterSkeleton />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
            }`}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <FishCardSkeleton key={item} viewMode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            <PaginationSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsSkeleton