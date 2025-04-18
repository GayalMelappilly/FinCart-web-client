'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import ContinueShoppingButton from '../components/ContinueShoppingButton/ContinueShoppingButton';
import Footer from '../components/Footer/Footer';
import ShareWishlist from '../components/Wishlist/ShareWishlist';
import WishlistItem from '../components/Wishlist/WishlistItem';
import { WishlistItemInterface } from '../types/types';
import EmptyWishlist from '../components/Wishlist/EmptyWishlist';
import { wishlistData } from '../datasets/wishlistItems';
import DiscoverButton from '../components/Wishlist/DiscoverButton';
import RecentlyViewed from '../components/Wishlist/RecentlyViewed';
import TipsSection from '../components/Wishlist/TipsSection';

const Page: React.FC = () => {
    // Sample wishlist items
    const [wishlistItems, setWishlistItems] = useState<WishlistItemInterface[]>(wishlistData);

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-6">
                <Head>
                    <title>My Wishlist | Fincart</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <ContinueShoppingButton />
                <main className="container mx-auto px-4 md:px-30 py-8">
                    {wishlistItems.length > 0 ? (
                        <>
                            <ShareWishlist wishlistItems={wishlistItems} />
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {wishlistItems.map((item) => (
                                    <WishlistItem key={item.id} item={item} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />
                                ))}
                            </div>
                            <DiscoverButton />
                        </>
                    ) : (
                        <EmptyWishlist />
                    )}
                    <RecentlyViewed />
                    <TipsSection />
                </main>

            </div>
            <Footer />
        </>
    );
};

export default Page;