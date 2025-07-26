'use client'

import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState, useEffect, FC } from 'react';
import { ChevronRight, ChevronLeft, Package, Truck, Shield, Award } from 'lucide-react';
import WholesaleCard from './WholesaleCard';
import BackButton from '../BackButton/BackButton';

// Mock service function - replace with your actual API call
const getWholesaleFish = async () => {
  // Replace this with your actual API call
  return {
    count: 12,
    list: [
      {
        id: 1,
        name: "Premium Betta",
        category: "Bettas",
        minOrder: 50,
        unitPrice: 300,
        bulkPrice: 220,
        imageUrl: "/hero.jpeg",
        availability: "In Stock",
        rating: 4.8,
        description: "High-quality mixed betta varieties perfect for retail"
      },
      {
        id: 2,
        name: "Neon Tetra",
        category: "Tetras",
        minOrder: 100,
        unitPrice: 200,
        bulkPrice: 150,
        imageUrl: "/hero.jpeg",
        availability: "In Stock",
        rating: 4.9,
        description: "Vibrant neon tetras in bulk quantities"
      },
      // Add more mock data as needed
    ]
  };
};

// Wholesale Card Skeleton Component
const WholesaleCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse"></div>
        
        {/* Wholesale badge skeleton */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded-md animate-pulse">
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>

        {/* Min order badge skeleton */}
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 rounded-md animate-pulse">
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title */}
        <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded mb-2"></div>

        {/* Supplier */}
        <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse mb-3"></div>

        {/* Price row */}
        <div className="flex items-center justify-between mb-3">
          <div className="space-y-1">
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-1">
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Rating and availability */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-sm animate-pulse"></div>
            ))}
          </div>
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Wholesale Section Skeleton
const WholesaleSectionSkeleton = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50/50 to-indigo-50/30 py-12 lg:py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded mx-auto mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-8"></div>
          
          {/* Features skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mx-auto mb-1"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="grid grid-rows-2 grid-flow-col gap-4 md:gap-6 md:grid-rows-1 auto-cols-max px-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="w-64 md:w-72 flex-shrink-0">
                  <WholesaleCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Error Display Component
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-700 mx-auto max-w-md text-center">
    <Package className="w-8 h-8 mx-auto mb-3 text-red-400" />
    <p className="font-medium mb-2">Failed to load wholesale products</p>
    <p className="text-sm">{message}</p>
  </div>
);

const WholesaleSection: FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fetch wholesale data
  const { data, isLoading, error } = useQuery({
    queryKey: ['wholesale-fish'],
    queryFn: getWholesaleFish,
  });

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('[data-wholesale-card]')?.clientWidth || 280;
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + 24),
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('[data-wholesale-card]')?.clientWidth || 280;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 24,
        behavior: 'smooth'
      });
    }
  };

  // Loading state
  if (isLoading) {
    return <WholesaleSectionSkeleton />;
  }

  // Error state
  if (error || !data) {
    return (
      <section className="bg-gradient-to-b from-blue-50/50 to-indigo-50/30 py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wholesale Products
            </h2>
          </div>
          <ErrorDisplay message={(error as Error)?.message || 'Unknown error occurred'} />
        </div>
      </section>
    );
  }

  // Empty state
  if (!data.count || data.count === 0) {
    return (
      <section className="bg-gradient-to-b from-blue-50/50 to-indigo-50/30 py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wholesale Products
            </h2>
            <div className="bg-blue-50 p-8 rounded-lg max-w-md mx-auto">
              <Package className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <p className="text-gray-600">No wholesale products available at the moment. Check back soon!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="wholesale" className="bg-gradient-to-b from-blue-50/50 to-indigo-50/30 py-1">
    <BackButton />
      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Wholesale Products
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Premium aquatic life in bulk quantities. Perfect for retailers, aquarium shops, and large-scale enthusiasts.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Bulk Orders</h3>
              <p className="text-sm text-gray-600">Minimum quantity discounts</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Shipping</h3>
              <p className="text-sm text-gray-600">Express delivery available</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Quality Assured</h3>
              <p className="text-sm text-gray-600">Health guarantee included</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Trusted Suppliers</h3>
              <p className="text-sm text-gray-600">Verified fish farms</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4"
            onScroll={checkScrollPosition}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="grid grid-rows-2 grid-flow-col gap-4 md:gap-6 md:grid-rows-1 auto-cols-max px-4">
              {data.list.map((product: any) => (
                <div
                  key={product.id}
                  data-wholesale-card
                  className="w-64 md:w-72 flex-shrink-0"
                >
                  <WholesaleCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {data?.list && data.count > 0 && (
            <>
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:shadow-xl transition-all duration-200"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:shadow-xl transition-all duration-200"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105">
            View All Wholesale Products
            <ChevronRight size={20} className="ml-2" />
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Need custom quantities? <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact our wholesale team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WholesaleSection;