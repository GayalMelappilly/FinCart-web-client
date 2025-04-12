'use client';

import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';
import BackButton from '@/app/components/BackButton/BackButton';
import Preview from '@/app/components/FishDetails/Preview';
import CareInfo from '@/app/components/FishDetails/CareInfo';
import { fishData } from '@/app/datasets/fishDetails';
import FishInfo from '@/app/components/FishDetails/FishInfo';
import FAQ from '@/app/components/FishDetails/FAQ';
import RelatedFishRecommendation from '@/app/components/FishDetails/RelatedFish';
import BreederInfo from '@/app/components/FishDetails/BreederInfo';

export default function Page() {
  const fish = fishData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-4 sm:px-6">
        <BackButton />
      </div>
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <div className='w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6'>
            <Preview />
            <div className="hidden sm:block">
              <BreederInfo />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6">
            <FishInfo fish={fish} />
            <div className="sm:hidden">
              <BreederInfo />
            </div>
            <CareInfo fish={fish} />
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12">
          <RelatedFishRecommendation relatedFish={fish.relatedFish} />
        </div>
        <div className="mt-8 sm:mt-12">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}