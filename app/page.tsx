'use client'

import { useState } from 'react';
import { Search, Heart, ShoppingCart, Menu } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './components/Footer/Footer';
import { featuredFish } from './datasets/featuredFish';
import { breeders } from './datasets/breeders';
import Header from './components/Header/Header';
import Hero from './components/Home/Hero';
import FeaturesFishSection from './components/Home/FeaturesFishSection';
import BreedersSection from './components/Home/BreedersSection';

// Define types for our data


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-zinc-50">
      <Head>
        <title>Fish Market - Find Your Perfect Ornamental Fish</title>
        <meta name="description" content="Marketplace for ornamental fish and aquatic plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <div className='px-40'>
        <FeaturesFishSection />
        <BreedersSection />
      </div>
      <Footer />
    </div>
  );
}