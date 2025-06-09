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

export default function FincartHomepage() {

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken') || '');
    }
  }, []);


  return (
    <div className="min-h-screen bg-zinc-100 text-gray-800 overflow-hidden">
      <Header />
      <Hero />
      {/* Featured Fish moved above SearchBar */}
      <FeaturesFishSection title={'Featured Fish'} />
      <FeaturesFishSection title={'Bettas'} />
      <FeaturesFishSection title={'Guppies'} />
      <FeaturesFishSection title={'Clownfish'} />
      <FeaturesFishSection title={'Tetras'} />
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