'use client'

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import ContinueShoppingButton from '../components/ContinueShoppingButton/ContinueShoppingButton';
import Footer from '../components/Footer/Footer';
// import ShareWishlist from '../components/Wishlist/ShareWishlist';
import WishlistItem from '../components/Wishlist/WishlistItem';
import EmptyWishlist from '../components/Wishlist/EmptyWishlist';
import DiscoverButton from '../components/Wishlist/DiscoverButton';
import Spinner from '../components/LoadingSpinner/Spinner';
import { useMutation } from '@tanstack/react-query';
import { deletewishlistItem } from '../services/authServices';
import { useToast } from '../providers/ToastProvider';
import { WishlistItem as WishlistItemType } from '../types/user/type';

const Page: React.FC = () => {
    // Sample wishlist items
    const [wishlistItems, setWishlistItems] = useState<WishlistItemType[] | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    // const [ordersCount, setOrderCount] = useState<number | null>()
    // const [wishlistCount, setWishlistCount] = useState<number | null>()

    const { showToast } = useToast()

    useEffect(() => {
        try {
            const storageData = typeof window !== 'undefined' ? localStorage.getItem('user') : ''
            const userData = storageData ? JSON.parse(storageData) : ''
            setIsLoading(true);
            if (userData) {
                setWishlistItems(userData.wishlists[0].wishlistItems)
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err)
            setIsLoading(false);
        }
    }, []);

    const mutation = useMutation({
        mutationFn: deletewishlistItem,
        onSuccess: (data) => {
            showToast('success', 'Item removed from wishlist')
            console.log(data);
        },
        onError: (err) => {
            console.log('Delete item from cart error : ', err);
            showToast('error', 'Failed to remove item from wishlist')
        }
    });

    const removeFromWishlist = (id: string) => {
        setWishlistItems(wishlistItems?.filter(item => item.fishListings.id !== id));
        mutation.mutate(id)
    };

    if (wishlistItems) console.log('wishlist Items : ', wishlistItems)
    if (isLoading) return (<Spinner />)

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-6">
                <Head>
                    <title>My Wishlist | Fincart</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <ContinueShoppingButton />
                <main className="container mx-auto px-4 md:px-32 py-8">
                    {wishlistItems && wishlistItems.length > 0 ? (
                        <>
                            {/* <ShareWishlist wishlistItems={wishlistItems} /> */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {wishlistItems.map((item, index) => (
                                    <WishlistItem key={index} wishlistItems={item} removeFromWishlist={removeFromWishlist} />
                                ))}
                            </div>
                            <DiscoverButton />
                        </>
                    ) : (
                        <EmptyWishlist />
                    )}
                    {/* <RecentlyViewed /> */}
                    {/* <TipsSection /> */}
                </main>

            </div>
            <Footer />
        </>
    );
};

export default Page;