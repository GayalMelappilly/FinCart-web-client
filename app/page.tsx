'use client'

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import FeaturesFishSection from './components/Home/FeaturesFishSection';
import Hero from './components/Home/Hero';
import Categories from './components/Home/Categories';
import Working from './components/Home/Working';
import Join from './components/Home/Join';
import { useEffect, useState } from 'react';
import { getFeaturedCategories } from './services/authServices';
import { useQuery } from '@tanstack/react-query';
import Spinner from './components/LoadingSpinner/Spinner';
import { FeaturedCategory } from './types/featuredCategories/types';

export default function FincartHomepage() {

  const [accessToken, setAccessToken] = useState('');
  const [categories, setCategories] = useState<FeaturedCategory[]>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken') || '');
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['get-featured-categories'],
    queryFn: getFeaturedCategories
  });

  useEffect(() => {
    console.log("Data : ", data)
    setCategories(data?.data)
  }, [data])

  if (isLoading) return <Spinner />
  if (error) return error

  return (
    <div className="min-h-screen bg-zinc-100 text-gray-800 overflow-hidden">
      <Header />
      <Hero />
      {/* Featured Fish moved above SearchBar */}
      <FeaturesFishSection title={'Featured Fish'} />

      {categories?.map((category: FeaturedCategory) => (
        <FeaturesFishSection key={category.id} title={category.name} />
      ))}

      <section className="pb-12 relative">
        <SearchBar />
      </section>
      <Categories />
      <Working />
      {!accessToken && <Join />}
      <Footer />
    </div>
  )
}