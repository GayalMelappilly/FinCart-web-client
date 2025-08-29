'use client';

import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';
import BackButton from '@/app/components/BackButton/BackButton';
import Preview from '@/app/components/FishDetails/Preview';
import CareInfo from '@/app/components/FishDetails/CareInfo';
import FishInfo from '@/app/components/FishDetails/FishInfo';
import FAQ from '@/app/components/FishDetails/FAQ';
// import RelatedFishRecommendation from '@/app/components/FishDetails/RelatedFish';
import BreederInfo from '@/app/components/FishDetails/BreederInfo';
import { useEffect, useState } from 'react';
import { FishListing } from '@/app/types/list/fishList';
import Spinner from '@/app/components/LoadingSpinner/Spinner';

export default function Page() {
  
  const [fishData, setFishData] = useState<FishListing | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    const data = typeof window !== 'undefined' ? localStorage.getItem('selectedFish') : ''
    if (data) {
      try {
        setFishData(JSON.parse(data));
      } catch (error) {
        console.error('Failed to decode fish data from URL:', error);
      }
    }
    
    setIsLoading(false);
  }, []);

  if(isLoading) return <Spinner />

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-4 sm:px-6">
        <BackButton />
      </div>
      <main className="container mx-auto px-4 sm:px-6 md:px-30 py-4 sm:py-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <div className='w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6'>
            <Preview images={fishData?.images} videos={fishData?.videos} />
            <div className="hidden sm:block">
              <BreederInfo breeder={fishData?.users} />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6">
            <FishInfo fish={fishData} />
            <div className="sm:hidden">
              <BreederInfo breeder={fishData?.users} />
            </div>
            <CareInfo />
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12">
          {/* <RelatedFishRecommendation relatedFish={fish.relatedFish} /> */}
        </div>
        <div className="mt-8 sm:mt-12">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}