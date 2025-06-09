'use client'

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useRef, useState, useEffect, FC } from 'react';
import { getFeaturedFishes, getFishCategoryByName } from '@/app/services/authServices';
import FishCard from './FIshCard';
import { FishListing } from '@/app/types/list/fishList';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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

type Props = {
  title: string;
}

const FeaturesFishSection:FC<Props> = ({ title }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Use React Query to fetch fish data
  const isFeaturedFish = title === 'Featured Fish';

  // Always call both hooks, but enable only one based on condition
  const featuredFishData = useQuery({
    queryKey: ['get-featured-fish'],
    queryFn: () => getFeaturedFishes(),
    enabled: isFeaturedFish,
  });

  const categorizedFishData = useQuery({
    queryKey: ['get-categorized-fish', title],
    queryFn: () => getFishCategoryByName(title),
    enabled: !isFeaturedFish && !!title,
  });

  // Use the appropriate data based on the fish type
  const data = isFeaturedFish ? featuredFishData.data : categorizedFishData.data;
  const isLoading = isFeaturedFish ? featuredFishData.isLoading : categorizedFishData.isLoading;
  const error = isFeaturedFish ? featuredFishData.error : categorizedFishData.error;

  // Check scroll position and update button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('[data-card]')?.clientWidth || 250;
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + 24), // Card width + gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('[data-card]')?.clientWidth || 250;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 24, // Card width + gap
        behavior: 'smooth'
      });
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <section className="px-4 sm:px-16 py-8 sm:py-12">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{title}</h2>
          <div className="overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 lg:grid-rows-1 auto-cols-max">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 2xl:w-60 flex-shrink-0">
                  <FishLoadingSkeleton />
                </div>
              ))}
            </div>
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{title}</h2>
          <ErrorDisplay message={(error as Error)?.message || 'Unknown error occurred'} />
        </div>
      </section>
    );
  }

  // If no featured fish are available
  if (!data.count || data.count === 0) {
    return (
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{title}</h2>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">No {title} available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featuredFish" className="bg-gradient-to-b scroll-smooth from-white to-blue-50/30 px-4 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto px-2 sm:px-16">
        {/* Header with responsive spacing and alignment */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          {/* <Link
            href="/fish"
            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center bg-white/80 py-1.5 px-2.5 sm:px-3 rounded-full shadow-sm hover:shadow transition-all"
          >
            View all
            <ChevronRight size={16} className="ml-0.5" />
          </Link> */}
        </div>

        {/* Card grid with scrollable layout */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4"
            onScroll={checkScrollPosition}
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
          >
            {/* Two rows on small screens, one row on large screens */}
            <div className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 md:grid-rows-1 auto-cols-max">
              {data.list.map((fish: FishListing) => (
                <div 
                  key={fish.id} 
                  data-card
                  className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 2xl:w-60 flex-shrink-0"
                >
                  <FishCard fish={fish} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons - positioned as overlay on both sides */}
          {!isLoading && data?.list && data.count > 0 && (
            <>
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:shadow-xl transition-all duration-200"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} className="sm:w-5 sm:h-5" />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:shadow-xl transition-all duration-200"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} className="sm:w-5 sm:h-5" />
                </button>
              )}
            </>
          )}
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