'use client'

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { getFishList } from '@/app/services/authServices';
import FishCard from './FIshCard';
import { FishListing } from '@/app/types/list/fishList';
import { ChevronRight } from 'lucide-react';

const FishLoadingSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="h-40 sm:h-48 bg-gray-200 animate-pulse"></div>
    <div className="p-3 sm:p-4">
      <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-1/4 mt-3"></div>
    </div>
  </div>
);

// Error component with better mobile styling
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 mx-auto max-w-md text-center">
    <p className="font-medium mb-1">Failed to load featured fish</p>
    <p className="text-sm">{message}</p>
  </div>
);

const FeaturesFishSection = () => {
  // Use React Query to fetch featured fish
  const { data, isLoading, error } = useQuery({
    queryKey: ['featured-fish'],
    queryFn: () => getFishList({}),
  });

  // Handle loading state
  if (isLoading) {
    return (
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Featured Fish</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-6">
            {[...Array(4)].map((_, index) => (
              <FishLoadingSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error || !data) {
    return (
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Featured Fish</h2>
          <ErrorDisplay message={(error as Error)?.message || 'Unknown error occurred'} />
        </div>
      </section>
    );
  }

  // If no featured fish are available
  if (!data.fishListings || data.fishListings.length === 0) {
    return (
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Featured Fish</h2>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">No featured fish available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-blue-50/30 px-4 sm:px-6 py-8 sm:py-12">
      <div className="container mx-auto px-0 sm:px-10">
        {/* Header with responsive spacing and alignment */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Featured Fish</h2>
          </div>
          <Link 
            href="/fish" 
            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center bg-white/80 py-1.5 px-2.5 sm:px-3 rounded-full shadow-sm hover:shadow transition-all"
          >
            View all
            <ChevronRight size={16} className="ml-0.5" />
          </Link>
        </div>

        {/* Card grid with improved responsive layout */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-6">
          {data.fishListings.slice(0, 4).map((fish: FishListing) => (
            <FishCard key={fish.id} fish={fish} />
          ))}
        </div>
        
        {/* Mobile-only call to action */}
        <div className="sm:hidden text-center mt-6">
          <Link 
            href="/fish" 
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 text-sm font-medium shadow-sm hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Explore All Fish
            <ChevronRight size={16} className="ms-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesFishSection;