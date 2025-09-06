'use client'

import { useQuery } from '@tanstack/react-query';
// import Link from 'next/link';
import React, { useRef, useState, useEffect, FC } from 'react';
import { getFeaturedFishes, getFishCategoryByName } from '@/app/services/authServices';
import { FishListing } from '@/app/types/list/fishList';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import FishCard from './FishCard';

// Fish Card Skeleton Component
const FishCardSkeleton = ({ isFeatured = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 ${isFeatured ? 'ring-2 ring-amber-100' : ''
      }`}>
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse"></div>

        {/* Featured badge skeleton */}
        {isFeatured && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full animate-pulse">
            <div className="w-3 h-3 bg-gray-200 rounded-sm m-1.5"></div>
          </div>
        )}

        {/* Price badge skeleton */}
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 rounded-md animate-pulse">
          <div className="h-3 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <div className="h-4 sm:h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded mb-2"></div>

        {/* Subtitle/Description */}
        <div className="space-y-1.5 mb-3">
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Details row */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Bottom row with rating and availability */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <div className="flex items-center space-x-1">
            {/* Star ratings skeleton */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-sm animate-pulse"></div>
            ))}
          </div>
          <div className="h-2.5 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Professional Fish Section Skeleton Component
const FishSectionSkeleton = ({ isFeaturedFish = false, title = "" }) => {
  return (
    <section className={`bg-gradient-to-b scroll-smooth from-white to-blue-50/30 sm:px-6 py-8 lg:pl-12 sm:py-12`}>
      {isFeaturedFish && (
        <div className='mb-10 border w-3/5 flex mx-auto'>
          <hr />
        </div>
      )}

      <div className="mx-auto sm:px-16">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className='pl-4 sm:pl-0'>
            <div className={`transition-all duration-200 ${isFeaturedFish
              ? 'px-4 py-2 bg-white rounded-lg border-l-4 border-l-gray-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]'
              : ''
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Show actual title while loading or skeleton if no title */}
                  {title ? (
                    <span className={`text-xl sm:text-2xl font-medium ${isFeaturedFish ? 'text-gray-900' : 'text-gray-600'}`}>
                      {title}
                    </span>
                  ) : (
                    <div className="h-6 sm:h-8 w-32 sm:w-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded"></div>
                  )}
                </div>
                {isFeaturedFish && (
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 md:grid-rows-1 auto-cols-max pl-5 sm:pl-0 sm:px-8 sm:py-4">
              {/* Generate 8 skeleton cards */}
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 2xl:w-60 flex-shrink-0"
                >
                  <FishCardSkeleton isFeatured={isFeaturedFish} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Button Skeletons */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 bg-white/50 rounded-full shadow-lg border border-gray-100 animate-pulse">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 bg-white/50 rounded-full shadow-lg border border-gray-100 animate-pulse">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

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

const FeaturesFishSection: FC<Props> = ({ title }) => {
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

  if (!isFeaturedFish) {
    console.log('Categorized list : ', data)
  }

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

  // Handle loading state with professional skeleton
  if (isLoading) {
    return <FishSectionSkeleton isFeaturedFish={isFeaturedFish} title={title} />;
  }

  // Handle error state
  if (error || !data) {
    return (
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="container mx-auto">
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800`}>{title}</h2>
          <ErrorDisplay message={(error as Error)?.message || 'Unknown error occurred'} />
        </div>
      </section>
    );
  }

  // If no featured fish are available
  if (!data.count || data.count === 0) {
    return (
      <section id="featuredFish" className={`bg-gradient-to-b scroll-smooth from-white to-blue-100/20 sm:px-6 py-8 lg:pl-12 sm:py-12`}>
        {isFeaturedFish && (
          <div className='mb-10 border w-3/5 flex mx-auto'>
            <hr />
          </div>
        )}
        <div className="mx-auto sm:px-16">
          {/* Header with responsive spacing and alignment */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">

            <div className='pl-4 sm:pl-0'>
              <h2 className={`text-xl sm:text-2xl font-medium transition-all duration-200 ${isFeaturedFish
                ? 'relative text-gray-900 px-4 py-2 bg-white rounded-lg border-l-4 border-l-amber-500 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]'
                : 'text-gray-600 hover:text-gray-900'
                }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={isFeaturedFish ? 'text-gray-900' : ''}>{title}</span>
                  </div>
                  {isFeaturedFish && (
                    <div className="w-6 h-6 bg-amber-50 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}
                </div>
              </h2>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-xs sm:text-base">No {title} available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featuredFish" className={`bg-gradient-to-b scroll-smooth from-white to-blue-50/30 sm:px-6 py-8 lg:pl-12 sm:py-12`}>
      {isFeaturedFish && (
        <div className='mb-10 border w-3/5 flex mx-auto'>
          <hr />
        </div>
      )}
      <div className="mx-auto sm:px-16">
        {/* Header with responsive spacing and alignment */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">

          <div className='pl-4 sm:pl-0'>
            <h2 className={`text-xl sm:text-2xl font-medium transition-all duration-200 ${isFeaturedFish
              ? 'relative text-gray-900 px-4 py-2 bg-white rounded-lg border-l-4 border-l-amber-500 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]'
              : 'text-gray-600 hover:text-gray-900'
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={isFeaturedFish ? 'text-gray-900' : ''}>{title}</span>
                </div>
                {isFeaturedFish && (
                  <div className="w-6 h-6 bg-amber-50 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
            </h2>
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
            <div className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 md:grid-rows-1 auto-cols-max pl-5 sm:pl-0 sm:px-8 sm:py-4">
              {data.list.map((fish: FishListing) => {
                // const isLast = index === data.list.length - 1;
                return (
                  <>
                    <div
                      key={fish.id}
                      data-card
                      className={`w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 2xl:w-60 flex-shrink-0`}
                    >
                      <FishCard fish={fish} isFeatured={isFeaturedFish} />
                    </div>
                  </>
                )
              })}
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
        {/* <div className="sm:hidden text-center mt-6">
          <Link
            href="/fish"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 text-sm font-medium shadow-sm hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Explore All Fish
            <ChevronRight size={16} className="ms-1.5" />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturesFishSection;