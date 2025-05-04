'use client'

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
// import Image from 'next/image';
import { getFishList } from '@/app/services/authServices';
import FishCard from './FIshCard';
import { FishListing } from '@/app/types/list/fishList';

// Interface for fish item display
// interface FishDisplayProps {
//   id: string;
//   name: string;
//   price: number;
//   images: string[];
//   avg_rating: number;
//   is_featured: boolean;
// }


const FishLoadingSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <div className="h-48 bg-gray-200 animate-pulse"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
    </div>
  </div>
);

// Error component
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
    <p className="font-medium">Failed to load featured fish</p>
    <p className="text-sm">{message}</p>
  </div>
);

const FeaturesFishSection = () => {
  // Use React Query to fetch featured fish
  const { data, isLoading, error } = useQuery({
    queryKey: ['featured-fish'],
    queryFn: () => getFishList({
        // search: "Clown Fish",
        // minPrice: 10,
        // maxPrice: 50,
        // category: "some-category-id",
        // sort: "price",
        // order: "asc",
        // featured: true,
        // inStock: true
      }),
  });

  // Handle loading state
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Fish</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <FishLoadingSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  // Handle error state
  if (error || !data) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Fish</h2>
        <ErrorDisplay message={(error as Error)?.message || 'Unknown error occurred'} />
      </section>
    );
  }

  // If no featured fish are available
//   if (data.data.length === 0) {
//     return (
//       <section className="container mx-auto px-4 py-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Fish</h2>
//         <p className="text-gray-600">No featured fish available at the moment. Check back soon!</p>
//       </section>
//     );
//   }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Fish</h2>
        <Link href="/fish" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
          View all
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.fishListings.map((fish: FishListing) => (
          <FishCard key={fish.id} fish={fish} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesFishSection;