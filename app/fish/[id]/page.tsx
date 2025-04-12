'use client';

import { useParams } from 'next/navigation';
import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';
import BackButton from '@/app/components/BackButton/BackButton';
import Preview from '@/app/components/FishDetails/Preview';
import CareInfo from '@/app/components/FishDetails/CareInfo';
import { fishData, RelatedFish } from '@/app/datasets/fishDetails';
import FishInfo from '@/app/components/FishDetails/FishInfo';
import FAQ from '@/app/components/FishDetails/FAQ';
import RelatedFishRecommendation from '@/app/components/FishDetails/RelatedFish';
import BreederInfo from '@/app/components/FishDetails/BreederInfo';

export default function FishDetailPage() {

  const fish = fishData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BackButton />
      <main className="container mx-auto px-30 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className='lg:w-1/2'>
            <Preview />
            <BreederInfo />
          </div>
          <div className="lg:w-1/2">
            <FishInfo fish={fish} />
            <CareInfo fish={fish} />
          </div>
        </div>
        <RelatedFishRecommendation relatedFish={fish.relatedFish} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}