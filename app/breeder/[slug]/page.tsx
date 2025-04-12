'use client'

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Bell, Bookmark, ChevronRight } from 'lucide-react';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import BackButton from '@/app/components/BackButton/BackButton';
import Listings from '@/app/components/BreedersPage/Listings';
import About from '@/app/components/BreedersPage/About';
import BreedersProfile from '@/app/components/BreedersPage/BreedersProfile';
import NavigationTab from '@/app/components/BreedersPage/NavigationTab';

export default function BreederStore() {
    const [activeTab, setActiveTab] = useState('listings');

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Tropical Fish Hobbyist | Fishy</title>
                <meta name="description" content="Premium tropical fish from an experienced breeder" />
            </Head>
            <Header />
            <BackButton />
            <BreedersProfile />
            <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="container mx-auto py-8 px-30">
                {activeTab === 'listings' ? (
                    <Listings />
                ) : (
                    <About />                    
                )}
            </main>
            <Footer />
        </div>
    );
}